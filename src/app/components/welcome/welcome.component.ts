import { Component, OnInit } from '@angular/core';
import { Courses } from 'src/app/interfaces/courses';
import { CoursesService } from 'src/app/services/courses.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  courses: Courses[];

  constructor(private coursesService: CoursesService, private router: Router) {}

  ngOnInit() {
    // this.courses = this.coursesService.courses;
    this.getCourseDetails();
  }

  getCourseDetails() {
    this.coursesService.getCourses().subscribe(courses => {
      this.courses = courses;
      console.log(courses)
    })
  }

  goToCourse(courseId: number): void {
    this.router.navigate(['./createGame', { id: courseId }]);
  }
}
