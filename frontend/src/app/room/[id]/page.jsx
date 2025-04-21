"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ZegoCloudRoom from '@/components/VideoCall/ZegoCloudRoom';
import { useUserStore } from '@/stores/store';
import { fetchAndSetUserStore } from '@/lib/fetchAndSetUserStore';
import Image from 'next/image';
import loader from '/public/loader.svg';

const RoomPage = () => {
  const { id } = useParams();
  const { user, update } = useUserStore();
  const [loading, setLoading] = useState(true);

  // Make sure the user is authenticated
  useEffect(() => {
    const initUser = async () => {
      if (!user) {
        await fetchAndSetUserStore(update);
      }
      setLoading(false);
    };
    
    initUser();
  }, [user, update]);

  // Show loading while fetching user data
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <div className="text-center">
          <Image src={loader} alt="Loading" width={80} height={80} />
          <p className="mt-4 text-lg text-white">Preparing your consultation room...</p>
        </div>
      </div>
    );
  }

  return <ZegoCloudRoom roomId={id} />;
};

export default RoomPage;