import { Component, Input } from '@angular/core';
import { drawFigure, eraseFigure } from '../../../shared/util/svg-drawing-tool.util';


@Component({
  selector: 'app-diver',
  templateUrl: './diver.html',
  styleUrls: ['./diver.scss']
})
export class DiverComponent {
  classSelector = '.diver-outline';
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
        resolve();
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
