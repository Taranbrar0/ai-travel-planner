import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import Hotels from './components/Hotels';
import PlaceToVisit from './components/PlaceToVisit';
import Footer from './components/Footer';
const index = () => {


    const {tripId} = useParams();
    const [trip,setTrip]=useState([]);
    
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId]);
    
    const GetTripData =async () =>{
        const docRef = doc(db,'AITrips',tripId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            setTrip(docSnap.data());
        }else{
            console.log("no document found");
            toast("No such trip Found!");
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* Information Section */}
            <InfoSection trip={trip}/>
        {/* Recoomeded Hotels */}
            <Hotels trip={trip}/>
        {/* Daily plans */}
        <PlaceToVisit trip={trip} />
        {/* Footer */}
        <Footer trip={trip}/>
    </div>
  )
}

export default index