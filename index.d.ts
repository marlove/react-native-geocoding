export default class Geocoder {
    init(apiKey: string): void;
    get isInit(): boolean;
    setApiKey(API_KEY: string): void;
    from(...params): Promise<void>;
    getFromLocation(address: string): Promise<any>;
    getFromLatLng(lat: number, lng: number): Promise<any>;
}