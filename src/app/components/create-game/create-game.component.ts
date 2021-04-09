import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidatorFn,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Courses } from 'src/app/interfaces/courses';
import { Player } from 'src/app/interfaces/player';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
})
export class CreateGameComponent implements OnInit {
  courses: Courses[];
  course: Courses;
  playerName = new FormControl('', this.nameValidator());
  players: Player[] = [];
  playerId = 0;
  holes: string[] = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    // 'ten',
    // 'eleven',
    // 'twelve',
    // 'thirteen',
    // 'fourteen',
    // 'fifteen',
    // 'sixteen',
    // 'seventeen',
    // 'eighteen',
  ];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.courses = this.coursesService.courses;
    this.course = this.courses.find(
      (course) => course.id === this.route.snapshot.params['id']
    );
  }

  addPlayer(): void {
    if (this.playerName.value) {
      this.playerId++;

      this.players.push({
        id: this.playerId.toString(),
        courseId: this.course.id,
        name: this.playerName.value,
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
        seven: 0,
        eight: 0,
        nine: 0,
        // ten: 0,
        // eleven: 0,
        // twelve: 0,
        // thirteen: 0,
        // fourteen: 0,
        // fifteen: 0,
        // sixteen: 0,
        // seventeen: 0,
        // eighteen: 0,
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

  getTotalPar(player: Player): number {
    return (
      player.one +
      player.two +
      player.three +
      player.four +
      player.five +
      player.six +
      player.seven +
      player.eight +
      player.nine
      // player.ten +
      // player.eleven +
      // player.twelve +
      // player.thirteen +
      // player.fourteen +
      // player.fifteen +
      // player.sixteen +
      // player.seventeen +
      // player.eighteen
    );
  }

  deletePlayer(index: number): void {
    this.players.splice(index, 1);
  }
}
