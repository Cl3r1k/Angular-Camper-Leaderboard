import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

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
    hiddenSocialIcons = true;
    iconsHovered = false;
    isDesc = false;
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
        this.doSearch('recent');
        this.hiddenSocialIcons = false;
    }

    getUserList(val: number): Observable<any> {
        return this._httpClient.get(this.API_URLS[val]);
    }

    doSearch(tableName: string) {
        let newSearch = false;

        if (tableName === 'recent') {
            if (this.state === 1) {
                this.sortBy(tableName);
            } else {
                newSearch = true;
                this.state = 1;
                this.isDesc = false;
            }
        } else {
            if (this.state === 2) {
                this.sortBy(tableName);
            } else {
                newSearch = true;
                this.state = 2;
                this.isDesc = false;
            }
        }

        if (newSearch) {
            Observable.of(this.state - 1).switchMap((urlIndex) => {
                return this.getUserList(urlIndex);
            }).subscribe((res) => {
                this.usersList = res;
                this.dataLoaded = true;
            });
        }
    }

    sortBy(tableName: string) {
        this.isDesc = !this.isDesc;
        const direction = this.isDesc ? 1 : -1;

        this.usersList.sort((a, b) => {
            if (a[tableName] < b[tableName]) {
                return -1 * direction;
            } else if (a[tableName] > b[tableName]) {
                return 1 * direction;
            } else {
                return 0;
            }
        });
    }

    toggleSocialIconsState() {
        this.hiddenSocialIcons = !this.hiddenSocialIcons;
    }
}
