import { GeoLocation } from '../models/GeoLocation'

let loc: GeoLocation
if (typeof window !== 'undefined') {
   window.navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude.toFixed(5)
      let long = position.coords.longitude.toFixed(5)
      loc = { lat, long }
   })
}

const getYourLocation = () => {
   return loc
}

export default getYourLocation
