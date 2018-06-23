declare module 'react-native-geocoding' {
    export default class Geocoder {
        init(apiKey: string, options: Object): void;
        isInit(): boolean;
        setApiKey(API_KEY: string): void;
        from(...params: any[]): Promise<void>;
        getFromLocation(address: string): Promise<any>;
        getFromLatLng(lat: number, lng: number): Promise<any>;
    }
}
