import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '../ui/button';
import { FcGoogle } from "react-icons/fc";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { DialogClose } from '@radix-ui/react-dialog';
import axios from 'axios';
export const Header = () => {

  const [openDailog,setOpenDailog] =useState(false);
  const [isSigned,setSigned]= useState(false);
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
        window.location.reload();
    })
  }
  
  let user=JSON.parse(localStorage.getItem('user'));
  useEffect(()=>{
     user = JSON.parse(localStorage.getItem('user'));
    if(user){
      setSigned(true);
    }
  },[isSigned])

  const userLogout = ()=>{
    googleLogout();
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center md:px-5 px-2 lg:px-8 h-16'>
       <a href="/">
        <img src="./logo.svg" alt="" className='w-full sm:h-24 h-28'/>
        </a>
        <div>
          {isSigned?
            <div className='flex items-center gap-3'>
              <a href="/my-trips">
              <Button className="rounded-full">My Trips</Button>
              </a>
              <a href="/create-trip">
              <Button className="rounded-full">+ Create Trip</Button>
              </a>
              <Popover>
              <PopoverTrigger><img src={user?.picture} className='h-[35px] w-[35px] rounded-full' alt="userProfile" /></PopoverTrigger>
              <PopoverContent className="hover:bg-red-500 hover:text-white cursor-pointer"><h2  onClick={userLogout}>Logout</h2></PopoverContent>
            </Popover>
            </div>:
           <Button  className="hover:bg-green-500" onClick={()=>setOpenDailog(true)}>Sign In</Button>
           }
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

export default Header;
