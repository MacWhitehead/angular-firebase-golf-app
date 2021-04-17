import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses, Course } from '../interfaces/courses';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  courses: Courses[] = [];
  course: Course[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getCourses(): Observable<any> {
    let data = this.http.get<any>(`https://golf-courses-api.herokuapp.com/courses`);
    return data;
  }

  getCourseData(courseId: string): Observable<any> {
    let courseData = this.http.get<any>(`https://golf-courses-api.herokuapp.com/courses/${courseId}`);
    return courseData;
  }
}
