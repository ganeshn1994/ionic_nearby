This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).


### Google Map Service
1. use location services to get near by pleaces like resturents and cinemas

```bash
import { MapLocations } from '../../app/maps/map.locations';
import { Geolocation } from '@ionic-native/geolocation';
import { MapsServices } from '../../app/maps/maps.services';



//constructor
constructor(public navCtrl: NavController,
    private mapsServices: MapsServices,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController
){
    this.mapsServices.keyword = 'food'; // please refer google map api for the list of keywords
    this.mapsServices.radius = 500;
    this.mapsServices.typeArray = ['restaurant','cafe','bar'];
    this.loadingSpin = this.loadingCtrl.create({
        content: 'Please wait...'
    });
}

//example function to get lat and lng and set to our class
getGeoLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
        //console.log(resp.coords);
        this.mapsServices.lat = Number(resp.coords.latitude.toString());
        this.mapsServices.log = Number(resp.coords.longitude.toString());
        this.loadingSpin.present();
        this.getRestaurantsNearMe(); // example function to get data
    }).catch((error) => {
        console.log('Error getting location', error);
    });
}

// example function to get list of places
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

```




### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myTabs tabs
```

Then, to run it, cd into `myTabs` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

