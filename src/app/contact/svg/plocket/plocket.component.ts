import { Component, Input } from '@angular/core';
import { TweenLite, TimelineMax, Expo, TimelineLite } from 'gsap';


@Component({
  selector: 'app-plocket',
  templateUrl: './plocket.html',
  styleUrls: ['./plocket.scss']
})
export class PlocketComponent {

  arrive() {
    return new Promise((resolve, reject) => {
      TweenLite.to('.plocket', 1, {
        maxHeight: 500,
        onComplete: () => {
          resolve('');
        }
      });
    });
  }

  shake() {
    return new Promise((resolve, reject) => {
      TweenLite.apply('.plocket', {transformOrigin: '50% 100%'});
      const tl1 = new TimelineMax();
      tl1.to('.plocket', 0.05, {
        rotation: 3
      }).to('.plocket', 0.05, {
        rotation: -3
      }).to('.plocket', 0.05, {
        rotation: 0
      }).to('.plocket', 0.05, {
        rotation: 3
      }).to('.plocket', 0.05, {
        rotation: -3
      }).to('.plocket', 0.05, {
        rotation: 0
      }).to('.plocket', 0.05, {
        rotation: 3
      }).to('.plocket', 0.05, {
        rotation: -3
      }).to('.plocket', 0.05, {
        rotation: 0,
        onComplete: () => {
          resolve('');
        }
      });
    });
  }

  fall() {
    return new Promise((resolve, reject) => {
      const tl1 = new TimelineLite();
      tl1.to('.plocket', 1, {
        rotation: 90,
        ease: Expo.easeIn,
        transformOrigin: 'bottom right'
      }).to('.plocket', 0.5, {
        maxHeight: 0,
        delay: 1.5
      }).to('.plocket', 0.1, {
        rotation: 0,
        transformOrigin: 'bottom right',
        onComplete: () => {
          resolve('');
        }
      });
    });
  }

  launch() {
    return new Promise((resolve, reject) => {
      TweenLite.to('.plocket', 2, {
        ease: Expo.easeIn,
        transform: 'translateY(-500px)',
        transformOrigin: 'bottom right',
        onComplete: () => {
          TweenLite.to('.plocket', 0.1, {
            maxHeight: 0,
            onComplete: () => {
              resolve('');
            }
          });
        }
      });
    });
  }
}
