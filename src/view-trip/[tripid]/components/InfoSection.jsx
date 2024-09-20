import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BsFillSendFill } from "react-icons/bs";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import axios from 'axios';

const InfoSection = (trip) => {

    const [photoUrl,setPhotoUrl]= useState();
    useEffect(()=>{
        trip&&GetPlacePhoto();
    },[trip]);
    const GetPlacePhoto= async() => {
        const data={
            textQuery:trip.trip.userSelection?.location.label
        }
        const result = await GetPlaceDetails(data).then(res=>{
            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',res.data.places[0].photos[2].name);
            setPhotoUrl(PhotoUrl);
        })
    }

  return (

    <div>
        <img src={photoUrl} className='h-[340px] w-full object-cover rounded-xl' alt="" />

        <div className='flex justify-between items-center' >
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip.trip.userSelection?.location.label}</h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200
                    rounded-full text-gray-500 md:text-base sm:text-xs '> 📅 {trip?.trip?.userSelection?.noOfDays}</h2>
                    <h2 className='p-1 px-3 bg-gray-200
                    rounded-full text-gray-500 md:text-base sm:text-xs '>💰 {trip?.trip?.userSelection?.budget}</h2>
                    <h2 className='p-1 px-3 bg-gray-200
                    // rounded-full text-gray-500 md:text-base sm:text-xs '>👫 No Of Traveler:{trip?.trip?.userSelection?.people}</h2>
                </div>
                </div>
                <Button className='w-12 h-12'><BsFillSendFill /></Button>
            
        </div>
    </div>
  )
}

export default InfoSection