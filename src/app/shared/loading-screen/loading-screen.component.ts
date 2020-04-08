import { Component, OnInit, ViewEncapsulation, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingScreenComponent implements OnInit {
  @Input() isLoading: boolean;
  @ViewChild('divContainer') public container: ElementRef;
  text = 'loading';

  constructor() { }

  ngOnInit() {
    if (this._window().isEdge) {
      this.text = 'This browser is not supported yet. You can still use Chrome and Firefox until support is released for this browser.';
    }
  }

  _window(): any {
    return window;
  }
}
