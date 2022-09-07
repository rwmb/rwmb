import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TweenMax, TweenLite } from 'gsap';

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
      transition('good <=> bad', animate(200))
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
    // setTimeout(() => {
    //   this.startDelivery().then(() => {
    //     this.sending().then(() => {
    //       return this.sending();
    //     }).then(() => {
    //       this.achieveDelivery();
    //     }).catch(() => {
    //       this.failDelivery();
    //     });
    //   });
    // }, 5000);

    // setTimeout(() => {
    //   this.isSent = true;
    // this.messageFail = true;
    // }, 10000);

    // this.hideForm();
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

  sendMessage() {
    this.isSending = true;
    this.subscription = this.contactMsgSvc.sendMessage(this.form.value)
      .subscribe((res: {success: boolean, error: string}) => {
        console.log(res);
        this.isSending = false;
        if (!res.success) {
          return this.messageFail = true;
        }
        this.title = 'great!';
        this.messageFail = false;
        this.isSent = true;
      }, err => {
        return this.messageFail = true;
      });
  }

  sending(): Promise<string> {
    return this.plocket.shake().then(() => {
      if (this.messageFail) {
        return Promise.reject('');
      } else if (this.isSent) {
        return Promise.resolve('');
      }
      return this.sending();
    });
  }

  startDelivery(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.minimizeForm().then(() => {
        this.plocket.arrive().then(() => {
          resolve('');
        });
      });
    });
  }

  hideForm(): Promise<string> {
    return new Promise((resolve, reject) => {
      TweenLite.to(this.contactMessage.nativeElement, 0.5, {
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
      TweenLite.to(this.contactMessage.nativeElement, 0.5, {
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
      TweenLite.to(this.contactMessage.nativeElement, 0.5, {
        maxHeight: 0,
        onComplete: () => {
          resolve('');
        }
      });
    });
  }

  openForm(): Promise<string> {
    return new Promise((resolve, reject) => {
      TweenLite.to(this.contactMessage.nativeElement, 0.5, {
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

  achieveDelivery() {
    this.plocket.launch().then(() => {
      this.closeForm();
    });
  }

  async onSubmit() {
    if (this.form.invalid || this.isSending || this.isSent) {
      return;
    }
    
    this.sendMessage();

    try {
      await this.startDelivery();
      await this.sending();
      await this.achieveDelivery();
    } catch (error) {
      this.failDelivery();
    }
  }
}
