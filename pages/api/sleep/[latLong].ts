import type { NextApiRequest, NextApiResponse } from 'next'
import nearbySearch from '../../../services/google/nearbySearch'

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse,
) {
   try {
      const { latLong } = req.query
      const { radius, minprice, maxprice, search, opened } = req.query
      const places = await nearbySearch(
         latLong,
         'lodging',
         radius,
         minprice,
         maxprice,
         search,
         opened,
      )
      res.status(200).json(places)
   } catch (e: any) {
      if (e === 500) {
         res.status(500).json({ error: e.message })
      }
   }
}
