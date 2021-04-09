import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/player';
import { CoursesService } from 'src/app/services/courses.service'

@Component({
  selector: 'app-view-games-table',
  templateUrl: './view-games-table.component.html',
  styleUrls: ['./view-games-table.component.sass'],
})
export class ViewGamesTableComponent implements OnInit {
  @Input()
  courseId: string;

  holes: string[] = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
  ];

  players: Player[] = [];
  playerData: Player[] = [
    {
      id: '1',
      courseId: '18300',
      name: 'Jane',
      one: 4,
      two: 2,
      three: 3,
      four: 5,
      five: 1,
      six: 2,
      seven: 3,
      eight: 6,
    },
    {
      id: '2',
      courseId: '11819',
      name: 'Jake',
      one: 4,
      two: 2,
      three: 3,
      four: 2,
      five: 1,
      six: 2,
      seven: 3,
      eight: 6,
    },
    {
      id: '3',
      courseId: '19002',
      name: 'Jessica',
      one: 4,
      two: 2,
      three: 3,
      four: 2,
      five: 1,
      six: 2,
      seven: 3,
      eight: 6,
    },
  ];

  constructor( private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.players = this.playerData.filter(
      (players) => players.courseId === this.courseId
    );
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
      player.eight
    );
  }
}
