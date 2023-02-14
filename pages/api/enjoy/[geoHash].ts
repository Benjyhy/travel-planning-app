// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getEventsByGeoPoint from '../../../services/ticket_master'

type Data = {
   name: string | string[]
}

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse,
) {
   try {
      const { q } = req.query
      // @ts-ignore
      const events = await getEventsByGeoPoint(req.query.geoHash, q)
      if (!events) {
         res.status(400).json({ message: 'event not found' })
      }
      res.status(200).json(events)
   } catch (e) {
      // @ts-ignore
      res.status(500).json({ e })
   }
}
