import { Component, OnInit } from '@angular/core';
import { CardStore } from '../CardStore';
import { List } from '../models/list';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  listName!: string;
  cardStore: CardStore;
  lists: List[];
  constructor() { }
  setMockData(): void {
    this.cardStore = new CardStore();
    const lists: List[] = [
      {
        name: 'To Do',
        cards: []
      },
      {
        name: 'Doing',
        cards: []
      },
      {
        name: 'Done',
        cards: []
      }
    ]
    this.lists = lists;
  }

  ngOnInit() {
    this.setMockData();
  }
  onEnter(value: string) {
    this.lists.push({
      name: value,
      cards: []
    });
    this.listName="";
  }
}
