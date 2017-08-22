import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavParams, LoadingController, Slides, ModalController  } from 'ionic-angular';
import { MapsServices } from '../../app/maps/maps.services';
import { MapLocation } from '../../app/maps/map.location';

import { ReviewsPage } from "../reviews/reviews";

declare var google: any;

@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html'
})

export class ExplorePage{

    @ViewChild(Slides) slides: Slides;
    @ViewChild('mapdiv') mapElement: ElementRef;

    public map: any;

    public place : any;
    public distance : any;
    public durations : any;
    public hasImages = false;
    public noImage = "assets/images/nopic.png";
    public placeDetails: MapLocation;
    public loadingSpin: any;
    constructor(public navParams: NavParams,
        public loadingCtrl: LoadingController,
        private mapsServices: MapsServices,
        public modalCtrl: ModalController
    ){
        this.place = navParams.get('place');
        this.loadingSpin = this.loadingCtrl.create({
            content: 'Please wait...'
        });
    }

    public getPlaceDetails(placeID: String) : any{
        this.mapsServices.getPlaceDetails(placeID).then((resp)=>{
            this.placeDetails = resp as MapLocation;
            this.hasImages = this.placeDetails.photos ? true: false;
            this.distanceMatrix();
            this.addMapToExplore();
        });
    }

    public distanceMatrix(): any{
        var service = new google.maps.DistanceMatrixService();
        var origin = new google.maps.LatLng(this.mapsServices.lat, this.mapsServices.log);
        var destination  = new google.maps.LatLng(this.placeDetails.geometry.location.lat(), this.placeDetails.geometry.location.lng());
        service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: 'DRIVING',
            avoidHighways: true,
            avoidTolls: false,
        }, (response, status)=>{
            //console.log(response.rows[0].elements[0].duration);
            this.distance = response.rows[0].elements[0].distance;
            this.durations = response.rows[0].elements[0].duration;
            //console.log("++++++++++++++++++++++++++++++");
            this.loadingSpin.dismiss();
        });
    }

    ngAfterViewInit() {
        this.loadingSpin.present();
        this.getPlaceDetails(this.place.place_id);
    }

    public showReviews(): any{
        //console.log(reviews);
        let modal = this.modalCtrl.create(ReviewsPage,{reviews: this.placeDetails.reviews});
        modal.present();
    }

    public addMapToExplore(): any{
        if(this.placeDetails.geometry.location.lng()){
            let lnglat = {
                lat: this.placeDetails.geometry.location.lat(),
                lng: this.placeDetails.geometry.location.lng(),
            };
            let MapTypeId = google.maps.MapTypeId;
            //console.log(lnglat);
            this.map = new google.maps.Map(this.mapElement.nativeElement, {
                zoom: 20,
                center: lnglat,
                mapTypeId: MapTypeId.ROADMAP
            });

            let marker = new google.maps.Marker({
                position: lnglat,
                map: this.map,
                title: this.placeDetails.name
            });
        }
    }

    public navigate(place) :any{
        this.mapsServices.mapNavigation(place);
    }

    public showMap(place) : any{
        this.mapsServices.showMap(place);
    }
}