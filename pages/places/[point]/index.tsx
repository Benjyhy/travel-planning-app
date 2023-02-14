import React from 'react'
import { useRouter } from 'next/router'
import PlacesTypesTab from '../../../components/PlacesTypesTab'
import SetLocation from '../../../components/SetLocation'

const Point = () => {
   const router = useRouter()
   const { point } = router.query

   return (
      <>
         <SetLocation point={point} />
      </>
   )
}

export default Point
