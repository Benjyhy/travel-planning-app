import Head from 'next/head'
import React from 'react'
import { useState, useEffect } from 'react'
import { PositionConfigState } from '../../../../models/states/positionConfigState';
import { server } from '../../../../config'
import TravelItemsList from '../../../../components/TravelItemsList'
import axios from 'axios'
import { useRouter } from 'next/router'
import getTitle from '../../../../services/getTitle'
import { useSelector } from 'react-redux'
import { MainAppState } from '../../../../models/states'
import { ParsedUrlQuery } from 'querystring'
import PlacesTypesTab from '../../../../components/PlacesTypesTab'
import Link from 'next/link'
import Filter from '../../../../components/Filter'

const Types = () => {
   const [places, setPlaces] = useState([])
   const [filterValue, setFilterValue] = useState({
      radius: '',
      minprice: '',
      maxprice: '',
      q: '',
   })
   const handleChange = (event) => {
      const value = event.target.value

      setFilterValue({
         ...filterValue,
         [event.target.name]: value,
      })
   }

   const router = useRouter()
   const { type, point }: ParsedUrlQuery = router.query

   const config: PositionConfigState = useSelector((state: MainAppState) =>
      point == 'from' ? state.from : state.to,
   )

   const getTitleType = () => {
      let title: string
      type ? (title = getTitle(type.toString())) : (title = 'unknown')
      return title
   }

   const getPlaces = async () => {
      const url = `${server}/api/${type}/${config.geoPoint}?radius=${filterValue.radius}&search=${filterValue.q}&minprice=${filterValue.minprice}&maxprice=${filterValue.maxprice}`
      const res = await axios.get(url)
      setPlaces(res.data)
   }

   useEffect(() => {
      getPlaces()
   }, [type, config])

   return (
      <>
         <Head>
            <title>{getTitleType()}</title>
            <meta name="description" content="Draw your path" />
         </Head>
         <PlacesTypesTab point={point} />
         <div className="flex flex-col">
            <Filter
               getPlaces={getPlaces}
               setPlaces={setPlaces}
               places={places}
               filterValue={filterValue}
               handleChange={handleChange}
            />
            <Link href={'/places'}>
               <a
                  className="
                        rounded 
                        bg-emerald-500 
                        flex-1 
                        text-slate-50 
                        font-bold
                        my-5
                        p-2
                        text-center 
                        hover:bg-emerald-400 
                        transition-colors
                        w-fit
                        self-end
                    "
               >
                  Validate my locations
               </a>
            </Link>
            <div>
               <h1 className="text-3xl font-bold text-slate-700 text-center mb-5">
                  Discover {getTitleType()}
               </h1>
               <div data-testid="own-loc" className="hidden">
                  {config.geoPoint}
               </div>
               <TravelItemsList travelItems={places} />
            </div>
         </div>
      </>
   )
}

export default Types
