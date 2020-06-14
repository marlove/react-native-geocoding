declare module 'react-native-geocoding' {
    export default class Geocoder {
        static init(apiKey: string, options: Object): void;
        static isInit(): boolean;
        static setApiKey(API_KEY: string): void;
        static from(...params: any[]): Promise<void>;
        static getFromLocation(address: string): Promise<any>;
        static getFromLatLng(lat: number, lng: number): Promise<any>;
    }
}
