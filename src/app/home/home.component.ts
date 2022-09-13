import { Component, OnInit, ViewChild, ElementRef,  } from '@angular/core';
import { PageControllerService } from '../shared/services/page-controller.service';

interface Word {
  word: string;
  variableName: string;
  pause?: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  run = 0;

  letMeHelp = '';
  you = '';
  dotAchieve = '';
  yourGoals = '';
  standOut = '';
  smiley = '';
  p1 = '';
  p2 = '';
  typing1 = '_';
  typing2 = '';
  typing3 = '';
  timeouts: any[] = [];

  constructor(private pageCtrlService: PageControllerService) { }

  ngOnInit() {
    this.presentApp();
  }

  presentApp() {
    // TODO: clean this mess...
    this.waitFor(3000).then(() => {
      return this.clearVariables('Hello!');
    }).then(() => {
      return this.waitFor(1500);
    }).then(() => {
      return this.clearVariables('My name is ');
    }).then(() => {
      return this.typeWord([
        {word: 'Richard William', variableName: 'dotAchieve'},
        {word: '.', variableName: 'p1'}
      ], 70);
    }).then(() => {
      this.typing1 = '';
      this.typing2 = '_';
      return this.waitFor(500);
    }).then(() => {
      return this.typeWord([
        {word: 'I\'m a Software Engineer ', variableName: 'standOut'}
      ], 50);
    }).then(() => {
      this.typing2 = '';
      this.typing3 = '_';
      return this.typeWord([
        {word: 'and Digital Content Producer.', variableName: 'smiley'}
      ], 50);
    }).then(() => {
      return this.waitFor(1000);
    }).then(() => {
      this.typeMainMessage();
    });
  }

  scrollToAbout() {
    this.pageCtrlService.scrollTo('about');
  }

  scrollToServices() {
    this.pageCtrlService.scrollTo('services');
  }

  private clearVariables(initialValue?: string) {
    this.timeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
    return this.deleteWord('smiley', 0, 20).then(() => {
      return this.deleteWord('smiley', 0, 20);
    }).then(() => {
      this.typing3 = '';
      this.typing2 = '_';
      return this.deleteWord('standOut', 0, 20);
    }).then(() => {
      this.typing2 = '';
      this.typing1 = '_';
      return this.deleteWord('p2', 0, 20);
    }).then(() => {
      return this.deleteWord('yourGoals', 0, 20);
    }).then(() => {
      return this.deleteWord('p1', 0, 20);
    }).then(() => {
      return this.deleteWord('dotAchieve', 0, 20);
    }).then(() => {
      return this.deleteWord('you', 0, 20);
    }).then(() => {
      return this.deleteWord('letMeHelp', 0, 20);
    }).then(() => {
      return this.typeWord([{word: initialValue, variableName: 'letMeHelp'}], 50);
    });
  }

  typeMainMessage() {
    return this.clearVariables().then(() => {
      return this.typeWord([
        {word: 'I\'ll help ', variableName: 'letMeHelp'},
        {word: 'You', variableName: 'you'},
        {word: '.achieve', variableName: 'dotAchieve'},
        {word: '(', variableName: 'p1'},
        {word: 'your_goals', variableName: 'yourGoals'},
        {word: ')', variableName: 'p2'}
      ], 60);
    }).then(() => {
      this.typing1 = '';
      this.typing2 = '_';
      return this.typeWord([
        {word: 'and stand out in the crowd', variableName: 'standOut'}
      ], 60);
    }).then(() => {
      this.typing2 = '';
      this.typing3 = '_';
      return this.waitFor(1700);
    }).then(() => {
      return this.typeWord([{word: ';D', variableName: 'smiley'}], 270);
    });
  }

  typeWord (words: Word[], typeSpeed = 100, pause = 100) {
    return new Promise((resolve, reject) => {
      let wait = 0;
      if (words.length === 1 && (!words[0].word || words[0].word.length === 0)) {
        resolve('');
      }
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        for (let j = 0; j < word.word.length; j++) {
          const letter = word.word[j];
          const timeout = setTimeout(() => {
            this[word.variableName] += letter;
            if (i + 1 === words.length && j + 1 === word.word.length) {
              resolve('');
            }
          }, wait + typeSpeed * j);
          this.timeouts.push(timeout);
        }
        wait += word.word.length * typeSpeed + (word.pause || pause);
      }
    });
  }

  deleteWord (variableName, wait = 250, deleteSpeed = 50) {
    return new Promise((resolve, reject) => {
      const string: string = this[variableName];
      if (string.length === 0) {
        resolve('');
      }
      const timeout = setTimeout(() => {
        for (let i = 0; i < string.length; i++) {
          const timeoutInner = setTimeout(() => {
            this[variableName] = string.slice(0, string.length - i - 1);
            if (i + 1 === string.length) {
              this[variableName] = '';
              resolve('');
            }
          }, deleteSpeed * i);
          this.timeouts.push(timeoutInner);
        }
      }, wait);
      this.timeouts.push(timeout);
    });
  }

  waitFor (time: number) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        resolve('');
      }, time);
      this.timeouts.push(timeout);
    });
  }
}
