// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nearbySearch from '../../../services/google/nearbySearch'

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse,
) {
   try {
      const { radius, minprice, maxprice, search, opened } = req.query
      const train_station: Array<any> = await nearbySearch(
         req.query.latLong,
         'train_station',
         radius,
         minprice,
         maxprice,
         search,
         opened,
      )
      const bus_station: Array<any> = await nearbySearch(
         req.query.latLong,
         'bus_station',
         radius,
         minprice,
         maxprice,
         search,
         opened,
      )
      const car_rental: Array<any> = await nearbySearch(
         req.query.latLong,
         'car_rental',
         radius,
         minprice,
         maxprice,
         search,
         opened,
      )
      const taxi_stand: Array<any> = await nearbySearch(
         req.query.latLong,
         'taxi_stand',
         radius,
         minprice,
         maxprice,
         search,
         opened,
      )
      const airport: Array<any> = await nearbySearch(
         req.query.latLong,
         'airport',
         radius,
         minprice,
         maxprice,
         search,
         opened,
      )

      let unSortPlaces: Array<any> = train_station.concat(
         train_station,
         bus_station,
         car_rental,
         taxi_stand,
         airport,
      )

      let places: Array<any> = []

      unSortPlaces.forEach((place: any) => {
         if (!places.find((element: any) => element.name === place.name)) {
            places.push(place)
         }
      })

      res.status(200).json(places)
   } catch (e: any) {
      res.status(400).json({ error: e.message })
   }
}
