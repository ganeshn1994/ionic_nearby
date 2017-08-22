import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { CinemaPage } from '../pages/cinema/cinema';
import { FunPage } from '../pages/fun/fun';
import {  FoodPage } from '../pages/food/food';
import { TabsPage } from '../pages/tabs/tabs';
import { ExplorePage } from '../pages/explore/explore';
import { ReviewsPage } from '../pages/reviews/reviews';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MapsServices } from './maps/maps.services';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    CinemaPage,
    FunPage,
    FoodPage,
    TabsPage,
    ExplorePage,
    ReviewsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CinemaPage,
    FunPage,
    FoodPage,
    TabsPage,
    ExplorePage,
    ReviewsPage
  ],
  providers: [
    MapsServices,
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
