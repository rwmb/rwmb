import { TweenLite, TweenMax } from 'gsap';

export function drawFigure(
  selector: string,
  durationDraw: number,
  stagger: number) {
    return new Promise((resolve, reject) => {
      TweenMax.to(selector, durationDraw, {strokeDashoffset: 0, onComplete: resolve});
    });
}

export function eraseFigure(selector: string, durationErase: number, strokeDashoffset: number) {
  return new Promise((resolve, reject) => {
    TweenLite.to(selector, durationErase, {strokeDashoffset, onComplete: resolve});
  });
}
