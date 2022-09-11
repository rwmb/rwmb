import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class PageScrollSubject<T> extends Subject<T> {
  constructor (public offset: number) {
    super();
  }
}

interface IPageSection {
  name: string;
  element?: ElementRef;
  offsetY: number;
  position: number;
  scrollDownSubjects?: PageScrollSubject<any>[];
  scrollUpSubjects?: PageScrollSubject<any>[];
}

interface IPageSections {
  [index: string]: IPageSection;
}

@Injectable()
export class PageControllerService {
  lastSectionY = 0;
  pageSections = {} as IPageSections;
  screenLoad: Subject<boolean> = new Subject<boolean>();
  scrollDownSubject: Subject<number> = new Subject<number>();
  scrollUpSubject: Subject<number> = new Subject<number>();
  scrollTimeout: any;

  constructor () {
    window.addEventListener('resize', (event) => {
      this.refreshPageSectionsPositions();
    });
    window.addEventListener('scroll', (event) => {
      this.scroll();
    });
    this.screenLoad.subscribe(() => {
      setTimeout(() => {
        this.refreshPageSectionsPositions();
      }, 200);
    });

    this.setPageSection('top', 0);
    this.setPageSection('bottom', 5000);
  }

  private getOffset(el: ElementRef) {
    if (!el.nativeElement.getBoundingClientRect) {
      return {
        top: 0,
        left: 0
      };
    }
    const rect = el.nativeElement.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  }

  setPageSection(name: string, element: ElementRef, offsetY?: number);
  // tslint:disable-next-line:unified-signatures
  setPageSection(name: string, position: any, offsetY?: number);
  setPageSection(name: string, arg2: any, offsetY?: number) {
    this.pageSections[name] = {
      name,
      element: typeof arg2 === 'number' ? null : arg2,
      position: typeof arg2 === 'number' ? arg2 : this.getOffset(arg2).top,
      offsetY: offsetY || 0,
      scrollDownSubjects: [],
      scrollUpSubjects: []
    };
  }

  refreshPageSectionsPositions() {
    for (const pageSection in this.pageSections) {
      if (this.pageSections.hasOwnProperty(pageSection) && this.pageSections[pageSection].element) {
        this.pageSections[pageSection].position = this.getOffset(this.pageSections[pageSection].element).top;
      }
    }
  }

  getPageSection(pageSectionName: string) {
    const result = {...this.pageSections[pageSectionName]};
    return result;
  }

  scroll(event?: any) {
    const pageOffsetY = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    if (this.lastSectionY < pageOffsetY) {
      this.scrollDownSubject.next(pageOffsetY);
      this.checkScrollDown(pageOffsetY);
    } else {
      this.scrollUpSubject.next(pageOffsetY);
      this.checkScrollUp(pageOffsetY);
    }
    this.lastSectionY = pageOffsetY;
  }

  checkScrollDown(pageOffsetY) {
    for (const pageSection in this.pageSections) {
      if (this.pageSections.hasOwnProperty(pageSection)) {
        this.pageSections[pageSection].scrollDownSubjects.forEach((subject) => {
          const pagePosWithOffsets = this.pageSections[pageSection].position +
            this.pageSections[pageSection].offsetY + subject.offset;
          if (this.lastSectionY < pagePosWithOffsets &&
            pageOffsetY >= pagePosWithOffsets) {
              subject.next(pageOffsetY);
            }
        });
      }
    }
  }

  checkScrollUp(pageOffsetY) {
    for (const pageSection in this.pageSections) {
      if (this.pageSections.hasOwnProperty(pageSection)) {
        this.pageSections[pageSection].scrollUpSubjects.forEach((subject) => {
          const pagePosWithOffsets = this.pageSections[pageSection].position +
            this.pageSections[pageSection].offsetY + subject.offset;
          if (this.lastSectionY > pagePosWithOffsets &&
            pageOffsetY <= pagePosWithOffsets) {
              subject.next(pageOffsetY);
            }
        });
      }
    }
  }


  onScrollDown(name: string, offset?: number): Subject<number>;
  onScrollDown(arg1?: any, arg2?: any): Subject<number> {
    if (arg1 && typeof arg1 === 'string') {
      const newSubject = new PageScrollSubject<any>(arg2 || 0);
      this.pageSections[arg1].scrollDownSubjects.push(newSubject);
      return newSubject;
    }
    return this.scrollDownSubject;
  }

  onScrollUp(name: string, offset?: number): Subject<number>;
  onScrollUp(arg1?: any, arg2?: any): Subject<number> {
    if (arg1 && typeof arg1 === 'string') {
      const newSubject = new PageScrollSubject<any>(arg2 || 0);
      this.pageSections[arg1].scrollUpSubjects.push(newSubject);
      return newSubject;
    }
    return this.scrollUpSubject;
  }

  scrollTo(name: string, timeout: number = 0, offsetY: number = 10) {
    if (!this.pageSections[name]) {
      return false;
    }
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      window.scroll({
        top: this.pageSections[name].position + this.pageSections[name].offsetY + offsetY,
        left: 0,
        behavior: 'smooth'
      });
    }, timeout);
  }
}
