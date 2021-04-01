import { Component, OnInit } from '@angular/core';
import { Courses } from 'src/app/interfaces/courses';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

  courses: Courses[];

  constructor(
    private coursesService: CoursesService,
  ) { }

  ngOnInit(): void {
    this.courses = this.coursesService.courses;
  }
}
