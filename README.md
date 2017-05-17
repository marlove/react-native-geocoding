# react-native-geocoding

A geocoding module for [React Native](https://github.com/facebook/react-native) to transform a description of a location (i.e. street address, town name, etc.) into geographic coordinates (i.e. latitude and longitude).

This module uses [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro) and requires an API key for purposes of quota management. Please check [this link](https://developers.google.com/maps/documentation/geocoding/get-api-key) out to obtain your API key.

## Install

```shell
npm install --save react-native-geocoding
```

## Example

```js
import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'); // use a valid API key

Geocoder.getFromLocation("Colosseum").then(
      json => {
        var location = json.results[0].geometry.location;
        alert(location.lat + ", " + location.lng);
      },
      error => {
        alert(error);
      }
    );

Geocoder.getFromLatLng(41.89, 12.49).then(
      json => {
        var address_component = json.results[0].address_components[0];
        alert(address_component.long_name);
      },
      error => {
        alert(error);
      }
    );
```

## Release Notes

See [CHANGELOG.md](https://github.com/marlove/react-native-geocoding/blob/master/CHANGELOG.md)