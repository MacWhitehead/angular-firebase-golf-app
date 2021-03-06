import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidatorFn
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Course, Courses, Hole, TeeBox, TeeType } from 'src/app/interfaces/courses';
import { Player } from 'src/app/interfaces/player';
import { CoursesService } from 'src/app/services/courses.service';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
})
export class CreateGameComponent implements OnInit {
  courses: Courses[];
  course: any[];
  holesObservable: Observable<Hole[]>;
  hole: Hole[] = [];
  teeBox: TeeBox[] = [];
  teeType: TeeType[] = [];
  currentCourse: Course[];
  maxPlayersReached = false;
  isHidden = false;
  playersFinished: any[];
  totals = {
    yards: 0,
    hcp: 0,
    par: 0
  }
  totalPlayersPar = {}
  playerName = new FormControl('', this.nameValidator());
  players: Player[] = [];
  courseOptions: any[] = [];
  playerId = 0;
  courseId = +this.route.snapshot.paramMap.get('id');
  selectedTee = '';
  selectedHoles = '';
  numberOfHoles: string[] = [
    'Front 9',
    'Back 9',
    'Full 18'
  ]
  cloneHoles: string[];
  holesApiData: any[];
  holes: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
  ];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService, 
    private playerService: PlayersService, 
    private router: Router,
    private cd: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.courses = this.coursesService.courses;
    this.course = this.coursesService.course

    let findCourse = this.courses.filter(
      (course) => course.id === this.route.snapshot.params['id']
      );
    this.course.push(findCourse)

      this.playerService.getGamesByCourse(this.courseId.toString()).subscribe(players => {
        this.players = players;
    });
    this.courseData(this.courseId);
  }

  courseData(courseId) {
    this.coursesService.getCourseData(courseId.toString()).subscribe(response => {
      this.course = response.data;
      for(let i = 0; i < this.course['holes'].length; i++) {
        this.teeBox.push(response.data.holes[i].teeBoxes);
        this.hole.push(response.data.holes[i]);
      }
    })
  }

  getTeeType(event: any) {
    this.teeType = event.value['teeType']
    this.getTotals(this.holesApiData)
  }

  getHolesToPlay(event:any) {
    this.selectedHoles = event.value;
    this.getTotals(this.holesApiData)
  }

  dropdownSelected() {
    if(this.teeType.length > 0 && this.selectedHoles.length > 0) {
      this.isHidden = true;
    }
  }

  update() {
    this.holesObservable = this.coursesService.getCourseData(this.course['id']).pipe(
      map((course) => {
        this.cloneHoles = [...this.holes]
        if(this.selectedHoles == "Front 9") {
          course.data.holes.splice(9, 9)
          this.cloneHoles.splice(9, 9)
        } else if(this.selectedHoles == "Back 9") {
          course.data.holes.splice(0, 9)
          this.cloneHoles.splice(0, 9)
        }
        return course.data.holes;
      }), 
      tap((holes) => {
        this.holesApiData = holes;
      }),
      tap((this.getTotals.bind(this)))
    )
  }

  addPlayerHoles(): any {
    let result = {};
    this.cloneHoles.forEach((hole) => {
      if(parseInt(hole) == 10) {
        result[hole + 9] = 0;
      } else {
        result[hole] = 0;
      }
    })
    return result;
  }

  addPlayer(): void {
    if(this.players.length > 3) {
      this.maxPlayersReached = true;
      return;
    }
    if (this.playerName.value) {
      this.playerId++;
      this.totalPlayersPar[this.playerName.value] = 0;
      this.players.push({
        courseId: this.course['id'],
        name: this.playerName.value,
        holes: this.addPlayerHoles()
      });
      this.playerName.setValue('');
    }
  }

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let error = null;
      if (this.players && this.players.length) {
        this.players.forEach((player) => {
          if (player.name.toLowerCase() === control.value.toLowerCase()) {
            error = { duplicate: true };
          }
        });
      }
      return error;
    };
  }

  getTotalPar(player: Player): void {
    let result = 0;
    if(!player.holes) {
      player.holes = {};
    }
      for(const key in player.holes) {
        if(!player.holes[key]) {
          player.holes[key] = 0;
        } else {
          result += player.holes[key]
        }
      }
      this.cd.detectChanges();
      this.totalPlayersPar[player.name] = result;
      this.endGame(player)
  }

  deletePlayer(index: number): void {
    this.players.splice(index, 1);
  }
  submit(): void {
    this.players.forEach(player => {
      this.playerService.saveGameToScoreboard(player);
    });
    this.router.navigate(['./welcome']);
  }

  getTeeBoxInfo(hole: any, info: string) {
    let result = 0;
    hole.forEach(teeBox => {
      if(this.teeType == teeBox.teeType) {
        result = teeBox[info]
      }
    });
    return result;
  }

  getTotals(holes) {
    this.totals.par = 0;
    this.totals.hcp = 0;
    this.totals.yards = 0;
    if(holes) {
      holes.forEach(hole => {
        hole.teeBoxes.forEach(teeBoxInfo => {
          if(this.teeType == teeBoxInfo.teeType) {
            this.totals.par += teeBoxInfo.par
            this.totals.hcp += teeBoxInfo.hcp
            this.totals.yards += teeBoxInfo.yards
          }
        });
      });
    } 
  }

  endGame(player) {
    let playerFinishedHoles = true;
    for(let name in this.totalPlayersPar) {
        for(let hole in player.holes) {
          if(player.holes[hole].toString() == 0) {
            playerFinishedHoles = false;
          }
        }
    }
    if(playerFinishedHoles) {
      let totalScore = this.totalPlayersPar[player.name] - this.totals.par;
      if(totalScore == 0) {
        this.snackBar.open(`${player.name} your score was ${this.totalPlayersPar[player.name]}! You hit par!`, "Close")
      } 
      else if(totalScore > 0) {
        this.snackBar.open(`${player.name} your score was ${this.totalPlayersPar[player.name]}. Better luck next time!`, "Close")
      } 
      else {
        this.snackBar.open(`Wow, ${player.name} your score was ${this.totalPlayersPar[player.name]}. You did great!`, "Close")
      } 
    }
  }
}