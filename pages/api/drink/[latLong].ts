// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nearbySearch from '../../../services/google/nearbySearch'

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse,
) {
   try {
      const { radius, minprice, maxprice, search, opened } = req.query
      const places = await nearbySearch(
         req.query.latLong,
         'bar',
         radius,
         minprice,
         maxprice,
         search,
         opened,
      )
      res.status(200).json(places)
   } catch (e: any) {
      res.status(400).json({ error: e.message })
   }
}
