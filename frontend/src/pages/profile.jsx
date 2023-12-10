import { Avatar, Typography, Button } from "@material-tailwind/react";
import { useParams } from 'react-router-dom';
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "../widgets/layout";
import React, { useState } from 'react';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import './profile.css';
import profileImage from '../img/team-5.png';
import backgroundImageUrl from '../img/background-3.png';
import sendNotif, { sendNotification } from "../Components/SendNotif";

import TherapistData from "../FindTherapist/dummydata";


export function Profile() {
  const { id } = useParams();
  const data= TherapistData[id];
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleErr, setScheduleErr] = useState('');

const handleScheduled = dateTime => {
  // sendNotification(Patient_Address, dateTime);
  setIsScheduling(true);
  setScheduleErr('');
  console.log('scheduled: ', dateTime);
  const unixTimestamp = dateTime.getTime();










  
  scheduleMeeting();
};

const scheduleMeeting = () => {
  

}

function timeSlotValidator(slotTime) {
  const eveningTime = new Date(
    slotTime.getFullYear(),
    slotTime.getMonth(),
    slotTime.getDate(),
    18,
    0,
    0
  );
  //the logic for checking for the scheduled timeslot goes here
  const isValid = slotTime.getTime() > eveningTime.getTime();
  return isValid;
}

  return (
    <>
      <section className="relative block h-[50vh]">
        <div style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }} className="bg-profile-background absolute top-0 h-full w-full bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>
      <section className="relative bg-white py-16">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
          <div className="container mx-auto">
            <div className="flex flex-row justify-evenly">
            <div className="flex flex-col justify-evenly">
              <div className="relative flex gap-6 items-start">
                <div className="-mt-20 w-40 aspect-square">
                  <Avatar
                    src={data.image}
                    alt="Profile picture"
                    variant="circular"
                    className="h-auto w-auto"
                    sx={{borderRadius: '50%'}}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <Typography variant="h4" color="blue-gray">
                    {data.name}
                  </Typography>
                  <Typography variant="paragraph" color="gray" className="!mt-0 font-normal">{data.patients_consulted }+ patients</Typography>
                </div>
              </div>
              <div className="-mt-4 container space-y-2">
              <div className="flex items-center gap-2">
                <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                 {data.clinic_address}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                 practicing since {data.experience} years
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {data.expertise}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                {/* <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500" /> */}
                <Typography className="font-medium text-blue-gray-500">
                  {data.about}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                {/* <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500" /> */}
                <Typography className="font-medium text-blue-gray-500">
                  Consultation Fee : {data.consultation_fee} $
                </Typography>
              </div>
            </div>
            <div className="mb-10 py-6 lg:w-5/6">
              {/* <div className="flex w-full flex-col items-start ">
                <Typography className="mb-6 font-normal text-blue-gray-500">
              {data.about}
                </Typography>
              </div> */}
    </div>
            </div>
            <div className="flex w-full flex-col justify-evenly">

            <div className="mt-10 mb-10 flex lg:flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
                <Button className="bg-gray-900 w-fit lg:ml-auto">Book Now</Button>
              </div>
            <DayTimePicker timeSlotSizeMinutes={60} onConfirm={handleScheduled} timeSlotValidator={timeSlotValidator}
            err={scheduleErr}/>
            </div>
            </div>
            
            
          </div>


        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>

    </>
  );
  
}

export default Profile;
