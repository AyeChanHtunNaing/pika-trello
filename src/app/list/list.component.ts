import { Component, HostListener, Input, OnInit } from '@angular/core';
import { List } from '../models/list';
import { CardStore } from '../CardStore';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() list: List;
  @Input() cardStore: CardStore;
  displayAddCard = false;
  constructor() {}
  // tslint:disable-next-line:typedef
  toggleDisplayAddCard() {
    this.displayAddCard = !this.displayAddCard;
  }
  ngOnInit(): void {}
  // tslint:disable-next-line:typedef
  allowDrop($event) {
    $event.preventDefault();
  }
  // tslint:disable-next-line:typedef
  drop($event) {
    $event.preventDefault();
    const data = $event.dataTransfer.getData('text');
    let target = $event.target;
    const targetClassName = target.className;
    while (target.className !== 'list') {
      target = target.parentNode;
    }
    target = target.querySelector('.cards');
    if (targetClassName === 'card') {
      $event.target.parentNode.insertBefore(
        document.getElementById(data),
        $event.target
      );
    } else if (targetClassName === 'list__title') {
      if (target.children.length) {
        target.insertBefore(document.getElementById(data), target.children[0]);
      } else {
        target.appendChild(document.getElementById(data));
      }
    } else {
      target.appendChild(document.getElementById(data));
    }
  }
  // tslint:disable-next-line:typedef
  onEnter(value: string) {
    const cardId = this.cardStore.newCard(value);
    this.list.cards.push(cardId);
  }
}
