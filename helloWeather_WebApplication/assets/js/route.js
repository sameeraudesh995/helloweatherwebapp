'use strict';

import {updateWeather, error404} from "./app.js";
const defaultLoaction = "#/weather?lat=51.5073219&lon=-0.1276474"

const currentLocation = function() {
    window.navigator.geolocation.getCurrentPosition(res => {
      const { latitude, longitude } = res.coords;

      updateWeather(`lat=${latitude}`, `lon=${longitude}`);
    }, err => {
        window.location.hash = defaultLoaction;
    });
  };
  
/**
 * 
 * @param {string} query 
 * 
 */

const searchedLoaction = query => updateWeather(...query.split("&"));


const routes = new Map([
    ["/current-location", currentLocation],
    ["/weather", searchedLoaction]
]);

const checkHash = function () {
    const requestURL = window.location.hash.slice(1);

   const [router, query] = requestURL.includes ? requestURL.split("?") : [requestURL];

   routes.get(route) ? routes.get(route)(query) : error404();


}

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function () {
    if (!this.window.location.hash) {
        this.window.location.hash = "#/current-location";
    }else{
        checkHash();
    }
});