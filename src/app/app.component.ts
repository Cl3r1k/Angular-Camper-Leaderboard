import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators/map';

class User {
    username: string;
    recent: number;
    alltime: number;
    img: string;

    constructor(userName: string, recent: number, alltime: number, img: string) {
        this.username = userName;
        this.recent = recent;
        this.alltime = alltime;
        this.img = img;
    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    state: number;
    dataLoaded = false;
    API_URLS = ['https://fcctop100.herokuapp.com/api/fccusers/top/recent', 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'];
    usersList: User[] = [];

    constructor(private _httpClient: HttpClient) { }

    ngOnInit() {
        this.initApp();
        const el = document.getElementById('loader-wrapper');
        if (el) {
            el.classList.add('loaded');
        }
    }

    initApp() {
        this.getUserList(0);
        this.state = 1;
    }

    getUserList(val: number) {
        this._httpClient.get(this.API_URLS[val]).subscribe((result) => {
            // console.log(result);
            this.usersList = [];

            Object.keys(result).forEach(key => {
                // console.log('item: ', result[key]);
                this.usersList.push(new User(result[key].username, result[key].recent, result[key].alltime, result[key].img));
            });

            this.dataLoaded = true;
            // console.log('users list: ', this.usersList);
        });
    }

    loadMonthlyPoints() {
        this.getUserList(0);
        this.state = 1;
    }

    loadAllTimePoints() {
        this.getUserList(1);
        this.state = 2;
    }
}
