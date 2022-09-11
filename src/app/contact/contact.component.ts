import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {gsap} from 'gsap';

import { ContactMessageService } from '../shared/services/contact-message.service';
import { PlocketComponent } from './svg/plocket/plocket.component';
import { configs } from '../shared/configs/configs';
import { PageControllerService } from '../shared/services/page-controller.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactMessageService],
  animations: [
    trigger('errorMessage', [
      state('bad', style({
        opacity: 1,
        maxHeight: '200px'
      })),
      state('good', style({
        opacity: 1,
        padding: 0,
        overflow: 'hidden',
        maxHeight: '0px'
      })),
      transition('good <=> bad', animate(200)),
    ])
  ]
})
export class ContactComponent implements OnInit, AfterViewChecked {
  @ViewChild('container') container: ElementRef;
  @ViewChild('form') form: NgForm;
  @ViewChild('plocket') plocket: PlocketComponent;
  @ViewChild('contactMessage') contactMessage: ElementRef;
  subscription: Subscription;
  isSent = false;
  isSending = false;
  messageFail = false;
  private subscriptions: Subscription[] = [];
  title = 'get in touch';

  constructor(private contactMsgSvc: ContactMessageService,
    private pageCtrlService: PageControllerService) { }

  ngOnInit() {
    // todo
  }

  ngAfterViewChecked() {
    const subscription = this.pageCtrlService.screenLoad.subscribe(() => {
      this.setDisposeCardsCallback();
      subscription.unsubscribe();
    });
    this.subscriptions.push(subscription);
  }

  private setDisposeCardsCallback() {
    const subscription  = this.pageCtrlService.onScrollDown('contact', -200).subscribe(() => {
      this.openForm();
      subscription.unsubscribe();
    });
    this.subscriptions.push(subscription);
  }

  async sendMessage() {
    this.isSending = true;

    console.log(this.form.value);
    const result = await this.contactMsgSvc.createContactMessage(this.form.value);
    this.isSending = false;
    if (result.error) {
      return this.messageFail = true;
    }
    this.title = 'great!';
    this.messageFail = false;
    this.isSent = true;

    //err
    return this.messageFail = true;
  }

  async shake(): Promise<string> {
    await this.plocket.shake();
    if (this.messageFail) {
      return Promise.reject('');
    } else if (this.isSent) {
      return Promise.resolve('');
    }
    return this.shake();
  }

  hideForm(): Promise<string> {
    return new Promise((resolve, reject) => {
      gsap.to(this.contactMessage.nativeElement, 0.5, {
        transform: 'rotateY(90deg)',
        borderTop: '2px solid ' + configs.primaryColor,
        borderBottom: '2px solid ' + configs.primaryColor,
        onComplete: () => {
          resolve('');
        }
      });
    });
  }

  minimizeForm(): Promise<string> {
    return new Promise((resolve, reject) => {
      gsap.to(this.contactMessage.nativeElement, 0.5, {
        transform: 'rotateY(90deg)',
        borderTop: '2px solid ' + configs.primaryColor,
        borderBottom: '2px solid ' + configs.primaryColor,
        maxHeight: 300,
        onComplete: () => {
          resolve('');
        }
      });
    });
  }

  closeForm(): Promise<string> {
    return new Promise((resolve, reject) => {
      gsap.to(this.contactMessage.nativeElement, 0.5, {
        maxHeight: 0,
        onComplete: () => {
          resolve('');
        }
      });
    });
  }

  openForm(): Promise<string> {
    return new Promise((resolve, reject) => {
      gsap.to(this.contactMessage.nativeElement, 0.5, {
        transform: 'rotateY(0deg)',
        borderTop: '2px solid transparent',
        borderBottom: '2px solid transparent',
        maxHeight: 500,
        onComplete: () => {
          resolve('');
        }
      });
    });
  }

  failDelivery() {
    this.isSending = false;
    this.plocket.fall().then(() => {
      return this.openForm();
    }).then(() => {
      setTimeout(() => {
        this.messageFail = false;
      }, 1000);
    });
  }

  async achieveDelivery() {
    
  }

  async onSubmit() {
    if (this.form.invalid || this.isSending || this.isSent) {
      return;
    }

    try {
      await this.minimizeForm();
      await this.plocket.arrive();
      this.shake();
      await this.sendMessage();
      await this.plocket.launch();
      this.closeForm();
    } catch (error) {
      console.error(error);
      this.failDelivery();
    }
  }
}
