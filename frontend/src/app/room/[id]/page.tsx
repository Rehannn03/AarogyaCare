"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useUserStore } from '@/stores/store';
import { fetchAndSetUserStore } from '@/lib/fetchAndSetUserStore';
import Image from 'next/image';
import loader from '/public/loader.svg';
import dynamic from 'next/dynamic';

// Client component with zego integration
const ZegoRoomComponent = dynamic(
  () => import('@/components/VideoCall/ZegoRoom'),
  { ssr: false } // This component won't be rendered on the server
);

export default function RoomPage() {
  const { id } = useParams();
  const { user, update } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [clientLoaded, setClientLoaded] = useState(false);

  // Check if we're on the client
  useEffect(() => {
    setClientLoaded(true);
  }, []);

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

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Required</h2>
          <p className="mb-6 text-gray-700">You need to be logged in to join a video consultation.</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="p-3 bg-gray-800 text-white flex justify-between items-center">
        <h1 className="text-lg font-semibold">Video Consultation</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Room: {id}</span>
          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="text-xs bg-gray-700 hover:bg-gray-600 py-1 px-2 rounded"
            title="Copy room link"
          >
            Copy Link
          </button>
        </div>
      </div>

      <div className="flex-1 bg-gray-900">
        {clientLoaded && <ZegoRoomComponent roomId={id} user={user} />}
      </div>
    </div>
  );
}