import { Component, OnInit, AfterViewInit, ViewEncapsulation, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { TweenLite, TweenMax } from 'gsap';

import { OutlineProfileComponent } from './svg/outline-profile/outline-profile.component';
import { PirateComponent } from './svg/pirate/pirate.component';
import { BunnyComponent } from './svg/bunny/bunny.component';
import { DiverComponent } from './svg/diver/diver.component';
import { InsectComponent } from './svg/insect/insect.component';
import { drawFigure, eraseFigure } from '../shared/util/svg-drawing-tool.util';
import { sleep } from '../shared/util/util';
import { PageControllerService } from '../shared/services/page-controller.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnDestroy, AfterViewInit {
  @ViewChild('container') container: ElementRef;
  @ViewChild('aboutText') aboutText: ElementRef;
  @ViewChild('aboutImage') image: ElementRef;
  @ViewChild('pirate') pirate: PirateComponent;
  @ViewChild('bunny') bunny: BunnyComponent;
  @ViewChild('diver') diver: DiverComponent;
  @ViewChild('insect') insect: InsectComponent;
  private subscriptions: Subscription[] = [];
  showText = false;

  constructor(private pageCtrlService: PageControllerService) { }

  ngAfterViewInit() {
    this.initializeImages();
    const subscription = this.pageCtrlService.screenLoad.subscribe(() => {
      this.setDrawingCallback();
      subscription.unsubscribe();
    });
    this.subscriptions.push(subscription);
  }

  initializeImages() {
    TweenLite.to(this.image.nativeElement, 0.1, {opacity: 0});
    TweenLite.to('outline-profile', 0.1, {opacity: 0});
  }

  setDrawingCallback() {
    const subscription  = this.pageCtrlService.onScrollDown('about', -100).subscribe(() => {
      this.showPicture();
      this.showText = true;
      subscription.unsubscribe();
    });
    this.subscriptions.push(subscription);
  }

  async showPicture() {
    TweenLite.to('outline-profile', 0.2, {opacity: 1});
    drawFigure('.outline-profile', 2, 0.1);
    await sleep(800);
    TweenLite.fromTo(this.image.nativeElement, 0.5, {opacity: 0}, {opacity: 1, delay: 0});
    TweenLite.to('outline-profile', 0.5, {opacity: 0, delay: 0});
    // this.startDrawings();
  }

  getAge() {
    const today = new Date().getTime();
    const birthday = new Date('02/08/1994').getTime();
    const age = new Date(today - birthday).getUTCFullYear();
    return (age - 1970);
  }

  // startDrawings() {
  //   setTimeout(async () => {
  //     await drawFigure('.diver-outline', 10, 0.1);
  //     await sleep(200);
  //     await eraseFigure('.diver-outline', 1, 1100);

  //     await sleep(2000);

  //     await drawFigure('.bunny-outline', 5, 0.1);
  //     await sleep(200);
  //     await eraseFigure('.bunny-outline', 1, 1410);
      
  //     await sleep(2000);
  
  //     await drawFigure('.pirate-outline', 5, 0.1);
  //     await sleep(200);
  //     await eraseFigure('.pirate-outline', 1, 410);
      
  //     await sleep(2000);



  //   }, 2000)
  // }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
