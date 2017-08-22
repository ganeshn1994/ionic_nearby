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
    selector: 'page-fun',
    templateUrl: 'fun.html',
    providers: [
        HttpModule
    ]
})
export class FunPage {

    public funPlaces: MapLocations[];
    private results: Observable<any>;
    public noImage = "assets/images/nopic.png";
    public loadingSpin: any;

    constructor(public navCtrl: NavController,
        private mapsServices: MapsServices,
        private geolocation: Geolocation,
        public loadingCtrl: LoadingController
    ){
        this.mapsServices.keyword = 'shopping mall';
        this.mapsServices.radius = 5000;
        this.mapsServices.typeArray = ['shopping_mall'];
        this.loadingSpin = this.loadingCtrl.create({
            content: 'Please wait...'
        });
    }

    getFunPlacesNearMe(): void{
        let mapApi = this.mapsServices.placesNearMe();
        mapApi.then((results)=>{
            //console.log(results);
            this.funPlaces = results as MapLocations[];
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
            this.getFunPlacesNearMe();
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    pushPage(event, funPlaces): void{
        this.navCtrl.push(ExplorePage, {
            place: funPlaces
        });
    }

    public navigate(funPlace) :any{
        this.mapsServices.mapNavigation(funPlace);
    }
}
