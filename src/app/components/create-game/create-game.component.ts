import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from 'src/app/interfaces/courses';
import { CoursesService } from 'src/app/services/courses.service';


@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  courses: Courses[];
  course: Courses;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.courses = this.coursesService.courses;
    this.course = this.courses.find(course => course.id === this.route.snapshot.params['id']);
}
}
