import { Component } from '@angular/core';
import { NavParams, LoadingController, ViewController } from 'ionic-angular';


@Component({
    selector: 'page-explore',
    templateUrl: 'reviews.html'
})

export class ReviewsPage {


    public reviews: any;
    public loadingSpin: any;

    constructor(public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public viewCtrl: ViewController
    ) {
        this.reviews = navParams.get('reviews');
        //console.log(this.reviews);
        this.loadingSpin = this.loadingCtrl.create({
            content: 'Please wait...'
        });
    }


    ngAfterViewInit() {

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}