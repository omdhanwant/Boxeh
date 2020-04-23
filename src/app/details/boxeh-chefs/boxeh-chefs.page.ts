import { Component, OnInit } from '@angular/core';

interface chefs {
  display_name: string;
  avatar_url:'http://boxeh.net/boxeh/wp-content/uploads/2019/03/Icon.png';
  name:string;
  email: string;
  recipes: [
       []
   ],
  recipe_count: number;
}
@Component({
  selector: 'app-boxeh-chefs',
  templateUrl: './boxeh-chefs.page.html',
  styleUrls: ['./boxeh-chefs.page.scss'],
})
export class BoxehChefsPage implements OnInit {
  chefs:chefs[];
  searchFilter:any;
  constructor() {
    this.chefs = [{
      display_name: 'BoxehTeam',
      avatar_url:'http://boxeh.net/boxeh/wp-content/uploads/2019/03/Icon.png',
      name:null,
      email: null,
      recipes: [
           []
       ],
      recipe_count: 32
    }]
   }

  ngOnInit() {
  }

}
