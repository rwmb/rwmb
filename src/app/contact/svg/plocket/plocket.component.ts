import { Component, Input } from '@angular/core';
import { gsap } from 'gsap';


@Component({
  selector: 'app-plocket',
  templateUrl: './plocket.html',
  styleUrls: ['./plocket.scss']
})
export class PlocketComponent {

  arrive() {
    return gsap.to('.plocket', {
      duration: 1,
      maxHeight: 500
    });
  }

  async shake() {
    gsap.set('.plocket', { transformOrigin: '50% 100%' });
    const timeline = gsap.timeline();
    timeline.to('.plocket', {
      duration: 0.05,
      rotation: 2
    }).to('.plocket', {
      duration: 0.05,
      rotation: -2
    }).repeat(5);
    await timeline.play();
  }

  fall() {
    return new Promise((resolve, reject) => {
      const timeline = gsap.timeline();
      timeline.to('.plocket', {
        duration: 0.5,
        rotation: 90,
        transformOrigin: 'bottom right'
      }).to('.plocket', {
        duration: 0.5,
        maxHeight: 0,
        delay: 1.5
      }).to('.plocket', {
        duration: 0.1,
        rotation: 0,
        transformOrigin: 'bottom right',
        onComplete: () => {
          resolve('');
        }
      });
    });
  }

  launch() {
    gsap.to('.plocket', {
      duration: 2,
      ease: "pwoer3.out",
      transform: 'translateY(-300px)',
      transformOrigin: 'bottom right',
    }).play();
    gsap.to('.plocket', {
      duration: 0.5,
      delay: 1,
      ease: "pwoer1.out",
      opacity: 0
    }).play();
  }
}
