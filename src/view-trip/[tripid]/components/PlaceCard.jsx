import React, { useEffect, useState } from 'react';
import { FaMapLocation } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

const PlaceCard = ({place}) => {

  const [photoUrl,setPhotoUrl]= useState();
    useEffect(()=>{
        place&&GetPlacePhoto();
    },[place]);
    const GetPlacePhoto= async() => {
        const data={
            textQuery:place.placeName
        }
        const result = await GetPlaceDetails(data).then(res=>{
            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',res.data.places[0].photos[1].name);
            setPhotoUrl(PhotoUrl);
        })
    }

    const placeDetails = JSON.stringify(place.placeDetails);
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank' >
        
        <div className='shadow-md rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
            <img src={photoUrl?photoUrl:'/placeholder.jpg'} alt=""  className='w-[130px] h-[130px] rounded-xl object-cover'/>
            <div>
                <h2 className='font-bold text-lg'>{place.placeName}</h2>
                <p className='text-sm text-gray-500'>{ placeDetails.length>100?placeDetails.substring(0,100)+"..." : placeDetails}</p>
                <h2 className='mt-2'>🕙 {place.timeTravel}</h2>

                <Button><FaMapLocation /></Button>
            </div>
        </div>
    </Link>
  )
}

export default PlaceCard