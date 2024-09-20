import React, { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '../components/ui/input.jsx';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/components/constants/options.jsx';
import { Button } from '@/components/ui/button.jsx';
import { toast } from 'sonner';
import { chatSession } from '../service/AIModal.jsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig.jsx';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { DialogClose } from '@radix-ui/react-dialog';


  

const index = () => {
    const [place,setPlace]= useState();
    const [openDailog,setOpenDailog] =useState(false);
    const [formData,setFormData] = useState([]);
    const [loading,setLoading] = useState(false);
    const router = useNavigate();

    const handleInputChange = (name,value)=>{
        setFormData({
            ...formData,
            [name]:value
        })
    };
    const login=useGoogleLogin({
        onSuccess:(res)=>{GetUserProfile(res)},
        onError:(err)=>console.log(err)
    });

    const GetUserProfile=(tokenInfo)=>{
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
            headers:{
                Authorization:`Bearer ${tokenInfo.access_token}`,
                Accept:"Application/json"
            }
        }).then((res)=>{
            localStorage.setItem('user',JSON.stringify(res.data));
            setOpenDailog(false);
            onGenerateTrip();
        })
    }

    const SaveAiTrip = async(TripData)=>{

        setLoading(true);

        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();
        await setDoc(doc(db, "AITrips", docId), {
            userSelection:formData,
            tripData:JSON.parse(TripData),
            userEmail:user?.email,
            id:docId
          });
          setLoading(false);
          router('/view-trip/'+docId);
    }

    const onGenerateTrip= async ()=>{
        const user = localStorage.getItem('user');
        if(!user){
            setOpenDailog(true);
            return;
        }

        if(!formData?.location||!formData?.budget||!formData?.people){
            toast("Please fill all details");
            return;
        }
        if(formData?.noOfDays>8){
            toast("Please enter trip days less than 8 days.");
            return;
        }
        setLoading(true);
        const FINAL_PROMPT= AI_PROMPT
        .replace('{location}',formData?.location.label)
        .replace('{totaldays}',formData?.noOfDays)
        .replace('{people}',formData?.people)
        .replace("{budget}",formData?.budget)
        .replace('{totaldays}',formData?.noOfDays);
        
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        setLoading(false);
        SaveAiTrip(result?.response?.text());
    }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-56 px-5 mt-10 '>
        <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
        <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itineary based on yout preferences.</p>

        <div className='mt-20 flex flex-col gap-10'>
            <div>
                <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
                <GooglePlacesAutocomplete
                    apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                    selectProps={{
                        place,
                        onChange:(e)=>{setPlace(e); handleInputChange('location',e)}
                    }}
                />
            </div>
                
            <div>
                <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                <Input placeholder={'Ex.3'} type="number"
                  onChange={(e)=>handleInputChange('noOfDays',e.target.value)}/>
            </div>
        </div>

        {/* //Select Budget Section */}
        <div>
            <h2 className='text-xl my-3 font-medium '>What is your Budget?</h2>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-9 justify-center' >
               { SelectBudgetOptions.map((item,index)=>(
                <div key={index}
                    onClick={()=>handleInputChange('budget',item.title)}
                    className={`hover:shadow-lg m-5 min-w-48 border-2 p-3 rounded-md
                    ${formData?.budget==item.title&&'shadow-lg && border-black'}`}>
                    <h2 className='text-4xl '>{item.icon}</h2>
                    <h2 className='text-xl font-semibold mx-2 mt-1'>{item.title}</h2>
                    <p className='text-sm mx-2'>{item.desc}</p>
                </div>
               ))}
                </div>    
        </div>
        {/* //Select Accompany */}
        <div>
            <h2 className='text-xl my-3 font-medium '>Who Are accomping with?</h2>
            <div className='gap-9  grid grid-cols-2 lg:grid-cols-3' >
               { SelectTravelesList.map((item,index)=>(
                <div key={index}
                    onClick={()=>handleInputChange('people',item.people)}
                    className={`hover:shadow-lg m-5 min-w-48 border-2 p-3 rounded-md
                        ${formData?.people==item.people&&'shadow-lg && border-black'}`
                    }>
                    <h2 className='text-4xl '>{item.icon}</h2>
                    <h2 className='text-xl font-semibold mx-2 mt-1'>{item.title}</h2>
                    <p className='text-sm mx-2'>{item.desc}</p>
                </div>
               ))}
                </div>    
        </div>
        <div className='relative mb-20'>     
                <Button className="absolute right-2" disabled={loading} onClick={onGenerateTrip}>{loading? <AiOutlineLoading3Quarters className='w-7 h-7 animate-spin'/> :
                "Generate Trip"}</Button>
        </div>
        
        <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src='/logo.svg' alt='Logo' />
              <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
              <p>Sign in to App with Google authentication securely.</p>
              <Button onClick={login} className="w-full mt-5 align-middle gap-4">
                <FcGoogle className='h-7 w-7' /> Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>

          {/* The "X" button is part of DialogClose and will close the dialog when clicked */}
          <DialogClose asChild>
            <Button className='absolute right-4 top-4 hover:bg-black hover:text-red-600'>X</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>


    </div>

  )
}

export default index