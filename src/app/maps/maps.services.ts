import { Injectable } from '@angular/core';
import { MapLocations } from './map.locations';

//@Injectable()

declare var google: any;

export class MapsServices {

    mapObj: any;
    mapServiceObj: any;
    public log: any;
    public lat: any;
    public _locations: MapLocations[];
    public keyword: any;
    public typeArray: Array<any>;
    public radius: Number;

    placesNearMe(): any{
        var map = new google.maps.Map("", {});

        var service = new google.maps.places.PlacesService(map);
        return new Promise((resolve,reject)=>{ 
            service.nearbySearch({
            //location: {lat: 17.4484363, lng: 78.38735179999999},
            location: {lat: this.lat, lng: this.log},
            radius: this.radius,
            keyword: this.keyword,
            type: this.typeArray
            }, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    //this._locations = results as MapLocations[];
                    resolve(results);
                }else{
                    reject(status);
                }
            });
        });
    }

    getPlaceDetails(placeID: String): any{
        var placeID = placeID;
        var request = {
            placeId:placeID
        };
        var map = new google.maps.Map("", {});
        var service = new google.maps.places.PlacesService(map);
        return new Promise((resolve, reject)=>{
            service.getDetails(request,(place, status)=>{
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    //console.log(place);
                    resolve(place);
                }else{
                    reject(status);
                }
            })
        });
    }

    mapNavigation(place): any{
        //console.log(this.lat);
        //console.log(this.log);
        window.open("https://www.google.com/maps/dir/?api=1&origin="+this.lat +","+ this.log +"&destination="+place.name+"&destination_place_id="+place.place_id+"&travelmode=driving", '_system');
    }

    showMap(place): any{

        window.open("https://www.google.com/maps/search/?api=1&query="+place.geometry.location.lat() +","+ place.geometry.location.lng() +"&query_place_id="+place.place_id, '_system');
    }
}