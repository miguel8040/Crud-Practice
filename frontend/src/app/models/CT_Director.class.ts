export class CT_Director {
    pkDirector: number = 0;
    name: string = 'No Name';
    nationality: string = "No Nationallity";
    age: number = 0;
    active: boolean = true;

    constructor(data?: Partial<CT_Director | null | undefined>) {
        if (!data) return this;
        return Object.assign(data);
    }

    createNew() {
        this.name = '';
        this.nationality = '';
        return this;
    }
}