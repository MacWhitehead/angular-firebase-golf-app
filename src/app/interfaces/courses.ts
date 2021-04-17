export interface Courses {
  name: string;
  image: string;
  id: string;
}

export interface Course {
  id: number;
  name: string;
  holes: Hole[];
  tee_types: TeeType[];
}

export interface Hole {
    hole_num: number;
    id: number;
    course_id: number;
    tee_boxes: TeeBox[];
}

export interface TeeBox {
    id: number;
    course_hole_id: number;
    tee_type: string;
    tee_color_type: string;
    par: number;
    yards: number;
    meters: number;
    hcp: number;
}

export interface TeeType {
    id: number;
      course_id: number;
      tee_type: string;
      tee_color_type: string;
      par: number;
      yards: number;
      meters: number;
      front_nine_par: number;
      front_nine_yards: number;
      front_nine_meters: number;
      back_nine_par: number;
      back_nine_yards: number;
      back_nine_meters: number;
      tee_hex_color: string;
}