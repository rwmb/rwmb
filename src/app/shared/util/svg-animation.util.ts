export class SVGAnimation {
  isBackwardActive  = false;
  isForwardActive = false;
  forwardPromise: Promise<any>;
  backwardPromise: Promise<any>;

  constructor (
    private element: any,
    private classForward: string,
    private duration: number,
    private classBackward?: string,
    private backwardDuration?: number) {}

  playForward () {
    if (this.isForwardActive) {
      this.isBackwardActive = false;
      return;
    }
    this.isForwardActive = true;
    this.forwardPromise = this.triggerForward();
    this.forwardPromise.catch(err => console.log(err));
  }

  playBackward () {
    if (!this.classBackward) {
      return;
    }
    if (this.isBackwardActive) {
      this.isForwardActive = false;
      return;
    }
    this.isBackwardActive = true;
    this.backwardPromise = this.triggerBackward();
    this.backwardPromise.catch(err => console.log(err));
  }

  private triggerForward () {
    if (this.isBackwardActive) {
      return this.backwardPromise.then(() => {
        return this.getForwardPromise();
      });
    }

    return this.getForwardPromise();
  }

  private triggerBackward () {
    if (this.isForwardActive) {
      return this.forwardPromise.then(() => {
        return this.getBackwardPromise();
      });
    }

    return this.getBackwardPromise();
  }

  private getForwardPromise () {
    if (!this.isForwardActive) {
      return Promise.reject('SVG-Animation Forward animation inactive');
    }
    return new Promise<string>((resolve, reject) => {
      if (this.classBackward) {
        this.element.classList.remove(this.classBackward);
      }
      this.element.classList.remove(this.classForward);
      const newEl = this.element.cloneNode(true);
      this.element.parentNode.replaceChild(newEl, this.element);
      this.element = newEl;
      this.element.classList.add(this.classForward);
      setTimeout(() => {
        this.isForwardActive = false;
        resolve('');
      }, this.duration);
    });
  }

  private getBackwardPromise () {
    if (!this.isBackwardActive) {
      return Promise.reject('SVG-Animation Backwards animation inactive');
    }
    return new Promise<string>((resolve, reject) => {
      this.element.classList.remove(this.classForward);
      this.element.classList.remove(this.classBackward);
      const newEl = this.element.cloneNode(true);
      this.element.parentNode.replaceChild(newEl, this.element);
      this.element = newEl;
      this.element.classList.add(this.classBackward);
      setTimeout(() => {
        this.isBackwardActive = false;
        resolve('');
      }, this.backwardDuration || this.duration);
    });
  }
}
