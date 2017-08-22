import { Component, OnInit, NgZone, AfterViewInit  } from '@angular/core';
import { NgForOf, AsyncPipe  } from '@angular/common';
import { NavController, LoadingController } from 'ionic-angular';
import { MapsServices } from '../../app/maps/maps.services';
import { HttpModule } from '@angular/http';
import { MapLocations } from '../../app/maps/map.locations';
import { Geolocation } from '@ionic-native/geolocation';

import { ExplorePage } from "../explore/explore";

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'page-food',
    templateUrl: 'food.html',
    providers: [
      HttpModule
    ]
})
export class FoodPage {

    public restaurants: MapLocations[];
    private results: Observable<any>;
    public noImage = "assets/images/nopic.png";
    public loadingSpin: any;

    constructor(public navCtrl: NavController,
        private mapsServices: MapsServices,
        private geolocation: Geolocation,
        public loadingCtrl: LoadingController
    ){
        this.mapsServices.keyword = 'food';
        this.mapsServices.radius = 500;
        this.mapsServices.typeArray = ['restaurant','cafe','bar'];
        this.loadingSpin = this.loadingCtrl.create({
            content: 'Please wait...'
        });
    }

    getRestaurantsNearMe(): void{
        let mapApi = this.mapsServices.placesNearMe();
        mapApi.then((results)=>{
            //console.log(results);
            this.restaurants = results as MapLocations[];
            this.loadingSpin.dismiss();
        }).catch((error)=>{
            this.loadingSpin.dismiss();
        });
    }

    ngAfterViewInit() {
        this.geolocation.getCurrentPosition().then((resp) => {
            //console.log(resp.coords);
            this.mapsServices.lat = Number(resp.coords.latitude.toString());
            this.mapsServices.log = Number(resp.coords.longitude.toString());
            this.loadingSpin.present();
            this.getRestaurantsNearMe();
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }


    pushPage(event, restaurant): void{
        this.navCtrl.push(ExplorePage, {
            place: restaurant
        });
    }

    public navigate(rest) :any{
        this.mapsServices.mapNavigation(rest);
    }
}