import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    // private selectedItem: any;
    // private icons = [
    //   'flask',
    //   'wifi',
    //   'beer',
    //   'football',
    //   'basketball',
    //   'paper-plane',
    //   'american-football',
    //   'boat',
    //   'bluetooth',
    //   'build'
    // ];
    // public items: Array<{ title: string; note: string; icon: string }> = [];
    // constructor() {
    //   for (let i = 1; i < 11; i++) {
    //     this.items.push({
    //       title: 'Item ' + i,
    //       note: 'This is item #' + i,
    //       icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //     });
    //   }
    // }

    public items: Array<object> = new Array<object>();

    constructor(private router: Router) {

    }

    ngOnInit() {
        this.items.push(
            {
                title: 'Matara - Colombo',
                number: '1)',
                completed: true
            },
            {
                title: 'Galle - Colombo',
                number: '2)',
                completed: false
            }
        );
    }

    selectRoute(item) {
        if(!item.completed){
            this.router.navigate(['/booking'])
        }
    }

    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }
}
