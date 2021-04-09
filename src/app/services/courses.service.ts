import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses } from '../interfaces/courses';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  courses: Courses[] = [
    {name: "Fox Hollow", id: '18300', image: "https://swingbyswing-b9.s3.amazonaws.com/photo/in-round/12486769/uploaded-photo43828077-480x360.png"},
    {name: "Thanksgiving Point", id: '11819', image: "https://swingbyswing-b9.s3.amazonaws.com/photo/in-round/10112953/uploaded-photo68921726-480x270.png"},
    {name: "Spanish Oaks", id: '19002', image: "https://swingbyswing-b9.s3.amazonaws.com/photo/in-round/12399619/uploaded-photo58903008-480x360.png"}
  ]

  constructor() { }
}
