import { Component, Input } from '@angular/core';
import { drawFigure, eraseFigure } from '../../../shared/util/svg-drawing-tool.util';



@Component({
  selector: 'app-bunny',
  templateUrl: './bunny.html',
  styleUrls: ['./bunny.scss']
})
export class BunnyComponent {
  classSelector = '.bunny-outline';
  drawDuration = 2;
  eraseDuration = 1;
  strokeOffset = 1100;
  waitToErase = 10;
  staggerPause = 0.3;

  private draw() {
    return drawFigure(this.classSelector, this.drawDuration, this.staggerPause);
  }

  private animate() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('');
      }, 5000);
    });
  }

  private erase() {
    return eraseFigure(this.classSelector, this.eraseDuration, this.strokeOffset);
  }

  play() {
    this.draw().then(() => {
      return this.animate();
    }).then(() => {
      return this.erase();
    });
  }
}
