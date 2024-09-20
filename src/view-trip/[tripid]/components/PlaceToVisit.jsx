import React from 'react'
import PlaceCard from './PlaceCard'

const PlaceToVisit = ({trip}) => {
  return (
    <div>
        <h2 className='font-bold text-lg'>Place to Visit</h2>
   
        <div>
           {trip?.tripData?.itinerary.map((item,index)=>(
                <div className='mt-5'>
                <h2 className='font-meduim text-lg'>{item.day}</h2>
                <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-5' >

                    {item?.plan?.map((place,index)=>(
                        
                        <div>
                            <PlaceCard place={place} />
                        </div>
                    ))}
                   
                </div>
            </div>
           ))} 
        </div>

    </div>
  )
}

export default PlaceToVisit