import { Injectable } from '@angular/core';

export class Settings {
    public static  colors = ['','orange', 'red', 'green', 'pink', 'blue', 'purple', 'grey'];
    constructor(public name: string,
                public theme: string) { }
}



@Injectable()
export class AppSettings {
    public settings = new Settings(
        'Zad | زاد',  // theme name
        'orange'     // orange, green, blue, red, pink, purple, grey
    )
}