import axios from 'axios'

const rootURL = 'https://app.ticketmaster.com/discovery/v2/'
const getEventsByGeoPoint = async (geoHash: any, q: any) => {
   if (!geoHash)
      throw new Error('getEventsByGeoPoint needs a string as a parameter')
   try {
      const res = await axios.get(
         `${rootURL}events.json?apikey=${process.env.API_KEY_TICKET_MASTER}&geoPoint=${geoHash}`,
      )
      const search = await axios.get(
         `${rootURL}events.json?apikey=${process.env.API_KEY_TICKET_MASTER}&geoPoint=${geoHash}&keyword=${q}`,
      )
      // const rad = await axios.get(
      //     `${rootURL}events.json?apikey=${process.env.API_KEY_TICKET_MASTER}&geoPoint=${geoHash}&radius=${radius}`
      // );
      // const town = await axios.get(
      //     `${rootURL}events.json?apikey=${process.env.API_KEY_TICKET_MASTER}&geoPoint=${geoHash}&city=${city}`
      // );

      if (q) {
         return search.data._embedded
      }
      // if (radius) {
      //     return rad.data._embedded.events;
      // }
      // if (city) {
      //     return town.data._embedded.events;
      // }
      return res.data._embedded
   } catch (error) {
      return `ERROR : getEventsByGeoPoint : ${error}`
   }
}

export default getEventsByGeoPoint
