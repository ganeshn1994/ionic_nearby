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
    selector: 'page-cinema',
    templateUrl: 'cinema.html',
    providers: [
        HttpModule
    ]
})
export class CinemaPage {

    public cinemas: MapLocations[];
    private results: Observable<any>;
    public noImage = "assets/images/nopic.png";
    public loadingSpin: any;

    constructor(public navCtrl: NavController,
        private mapsServices: MapsServices,
        private geolocation: Geolocation,
        public loadingCtrl: LoadingController
    ) {
        this.mapsServices.keyword = 'movie+cinema';
        this.mapsServices.radius = 3000;
        this.mapsServices.typeArray = ['movie_theater'];
        this.loadingSpin = this.loadingCtrl.create({
            content: 'Please wait...'
        });
    }

    getCinemasNearMe(): void{
        let mapApi = this.mapsServices.placesNearMe();
        mapApi.then((results)=>{
            //console.log(results);
            this.cinemas = results as MapLocations[];
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
            this.getCinemasNearMe();
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    pushPage(event, cinemas): void{
        this.navCtrl.push(ExplorePage, {
            place: cinemas
        });
    }

    public navigate(cinema) :any{
        this.mapsServices.mapNavigation(cinema);
    }

}
