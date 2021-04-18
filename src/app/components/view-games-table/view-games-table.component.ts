import { Component, Input, OnInit } from '@angular/core';
import { Courses } from 'src/app/interfaces/courses';
import { Player } from 'src/app/interfaces/player';
import { CoursesService } from 'src/app/services/courses.service'
import { PlayersService } from 'src/app/services/players.service';

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

  constructor( private playerService: PlayersService) {}

  ngOnInit(): void {
    this.playerService.getGamesByCourse(this.courseId).subscribe((players: Player[]) => {
      this.players = players;
  });
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
