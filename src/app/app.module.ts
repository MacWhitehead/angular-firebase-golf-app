import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { CurrentGolfGameComponent } from './components/current-golf-game/current-golf-game.component';
import { MaterialModule } from './modules/material.module';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { ViewGamesTableComponent } from './components/view-games-table/view-games-table.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CreateGameComponent,
    CurrentGolfGameComponent,
    TopNavbarComponent,
    ViewGamesTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
