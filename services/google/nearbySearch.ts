import axios from 'axios'

const nearbySearch = async (
   latLong: any,
   type: string,
   radius: any,
   minprice: any,
   maxprice: any,
   search: any,
   opened: any,
) => {
   if (!latLong)
      throw new Error('nearbySearch needs at least a location as parameter')

   try {
      const res = await axios.get(
         `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLong}&rankby=distance&type=${type}&key=${process.env.API_KEY_GOOGLE}`,
      )
      const rad = await axios.get(
         `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLong}&radius=${radius}&type=${type}&key=${process.env.API_KEY_GOOGLE}`,
      )
      const minpric = await axios.get(
         `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLong}&radius=1500&type=${type}&key=${process.env.API_KEY_GOOGLE}&minprice=${minprice}`,
      )
      const maxpric = await axios.get(
         `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLong}&radius=1500&type=${type}&key=${process.env.API_KEY_GOOGLE}&maxprice=${maxprice}`,
      )
      const q = await axios.get(
         `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLong}&type=${type}&radius=15000&key=${process.env.API_KEY_GOOGLE}&keyword=${search}`,
      )
      const open = await axios.get(
         `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLong}&radius=1500&type=${type}&key=${process.env.API_KEY_GOOGLE}&opennow`,
      )
      if (radius) {
         return rad.data.results
      } else if (minprice) {
         return minpric.data.results
      } else if (maxprice) {
         return maxpric.data.results
      } else if (search) {
         return q.data.results
      } else if (opened) {
         return open.data.results
      }
      return res.data.results
   } catch (error) {
      console.error(`ERROR : nearbySearch ${type} : ${error}`)
      return []
   }
}

export default nearbySearch
