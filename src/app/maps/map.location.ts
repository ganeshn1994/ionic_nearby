export class MapLocation {
    geometry: {
        location:{
            lng:()=>{ false},
            lat:()=>{ false}
        },
        viewport:{}
    };
    address_components: Array<any>;
    icon: String;
    adr_address: String;
    formatted_address: String;
    formatted_phone_number: String;
    international_phone_number: String;
    opening_hours: Object;
    reviews: Array<any>;
    website: String;
    id: String;
    name: String;
    url: String;
    utc_offset: Number;
    scope: String;
    photos: Array<any>;
    place_id: String;
    rating: Number;
    reference: String;
    types: Array<any>;
    vicinity: String;
}