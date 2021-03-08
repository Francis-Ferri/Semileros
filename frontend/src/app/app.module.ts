import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FilmsComponent } from './components/films/films.component';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { ReportComponent } from './components/report/report.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FilmsComponent,
    FilmCardComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
