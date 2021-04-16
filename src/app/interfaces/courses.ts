export interface Courses {
    name: string;
    image: string;
    id: string;
}

export interface Course 
{
    "course": {
        "id": number,
        "name": string,
        "holes": [
            {
                "hole_num": number,
                "id": number,
                "course_id": number,
                "tee_boxes": [
                    {
                        "id": number,
                        "course_hole_id": number,
                        "tee_type": string,
                        "tee_color_type": string,
                        "par": number,
                        "yards": number,
                        "meters": number,
                        "hcp": number,
                    }
                ],
            },
    ],
        "tee_types": [
            {
                "id": number,
                "course_id": number,
                "tee_type": string,
                "tee_color_type": string,
                "par": number,
                "yards": number,
                "meters": number,
                "front_nine_par": number,
                "front_nine_yards": number,
                "front_nine_meters": number,
                "back_nine_par": number,
                "back_nine_yards": number,
                "back_nine_meters": number,
                "tee_hex_color": string
            },
        ]
    }
}