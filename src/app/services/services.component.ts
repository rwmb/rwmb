import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { TweenLite } from 'gsap';
import { PageControllerService } from '../shared/services/page-controller.service';
import { Subscription } from 'rxjs';

interface Card {
  isActive: boolean;
  cardSelector: string;
  new: boolean;
  show: boolean;
}

interface ICards {
  [index: string]: Card;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {
  card: ICards = {
    dev: {isActive: false, cardSelector: '.svc-dev', new: true, show: false},
    design: {isActive: false, cardSelector: '.svc-design', new: true, show: false},
    producer: {isActive: false, cardSelector: '.svc-producer', new: true, show: false}
  } as ICards;
  subscriptions: Subscription[] = [];
  @ViewChild('container') container: ElementRef;

  constructor(private pageCtrlService: PageControllerService) { }

  ngOnInit() {
    const subscription = this.pageCtrlService.screenLoad.subscribe(() => {
      this.setDisposeCardsCallback();
      subscription.unsubscribe();
    });
    this.subscriptions.push(subscription);
  }

  private setDisposeCardsCallback() {
    const subscription  = this.pageCtrlService.onScrollDown('services', -200).subscribe(() => {
      this.disposeCards();
      subscription.unsubscribe();
    });
    this.subscriptions.push(subscription);
  }

  private disposeCards() {
    let index = 0;
    for (const card in this.card) {
      if (this.card.hasOwnProperty(card)) {
        TweenLite.fromTo(this.card[card].cardSelector, 0.5, {
          x: '100%',
          opacity: 0
        }, {
          x: '0%',
          opacity: 1,
          delay: index * 0.1
        });
        index++;
      }
    }
  }

  toggleCard(card: string) {
    this.card[card].new = false;
    this.card[card].isActive = !this.card[card].isActive;
    const from = this.card[card].isActive ? '.svc-card' : '.svc-info';
    const to = this.card[card].isActive ? '.svc-info' : '.svc-card';
    TweenLite.fromTo(from + this.card[card].cardSelector, 0.2, {rotationY: 0}, {rotationY: 90});
    TweenLite.to(from + this.card[card].cardSelector, 0.2, {opacity: 0});
    TweenLite.fromTo(to + this.card[card].cardSelector, 0.2, {rotationY: 90}, {rotationY: 0, delay: 0.2});
    TweenLite.to(from + this.card[card].cardSelector, 0.2, {opacity: 1});
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
