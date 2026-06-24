import { CT_Director } from "./CT_Director.class";

export class CT_movie {
    pkMovie: number = 0;
    fkDirector: number | null = null;
    name: string = "No Name";
    releasedate: string = '';
    duration: string = "";
    gender: string = "No Gender";



    director: CT_Director | null = null;

    constructor(data?: Partial<CT_Director | null | undefined>) {
        if (!data) return this;
        return Object.assign(data);
    }

    createNew() {
        this.name = '';
        this.gender = '';
        return this;
    }
}

export class DTO_Movie extends CT_movie {
    durationNumber: number = 0;
    releseDateObj: Date = new Date();
}