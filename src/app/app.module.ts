import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HamburguerButtonComponent } from './header/svg/hamburguer-button.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { OutlineProfileComponent } from './about/svg/outline-profile/outline-profile.component';
import { LoadingScreenComponent } from './shared/loading-screen/loading-screen.component';
import { BunnyComponent } from './about/svg/bunny/bunny.component';
import { InsectComponent } from './about/svg/insect/insect.component';
import { PirateComponent } from './about/svg/pirate/pirate.component';
import { DiverComponent } from './about/svg/diver/diver.component';
import { PageControllerService } from './shared/services/page-controller.service';
import { PlocketComponent } from './contact/svg/plocket/plocket.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HamburguerButtonComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent,
    OutlineProfileComponent,
    BunnyComponent,
    InsectComponent,
    PirateComponent,
    DiverComponent,
    PlocketComponent,
    LoadingScreenComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-universal-app'}),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    PageControllerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
