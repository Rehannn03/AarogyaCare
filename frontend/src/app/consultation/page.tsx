"use client";

import useConsult from "@/stores/useConsult";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { SquareActivity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/store";
import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore";

export default function Home() {
  const { fullName, setFullName } = useConsult();
  const [roomID, setRoomID] = useState("");
  const router = useRouter();
  const { user, update } = useUserStore();

  useEffect(() => {
    if (!user) {
      fetchAndSetUserStore(update);
    }
    
    // Clear the name on component mount
    setFullName("");
  }, []);

  // Generate a unique room ID
  const generateNewRoom = () => {
    const newRoomId = uuid();
    router.push(`/room/${newRoomId}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
      <div className="max-w-screen-lg px-6 py-12 md:py-16 flex flex-col items-center">
        {/* SquareActivity component */}
        <SquareActivity width={200} height={200} className="text-blue-400" />

        {/* Title and Subtitle */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mt-8">
          Healthcare Video Consultations
        </h1>
        <h2 className="text-xl md:text-2xl text-center mb-4">
          Connect with your doctor from anywhere
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg text-center text-gray-300 mb-8">
          Get professional medical advice through secure video calls
        </p>

        {/* Join options based on user status */}
        <div className="w-full max-w-md mx-auto">
          {user ? (
            <div className="space-y-6">
              <div className="bg-gray-700/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Join by Room ID</h3>
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    type="text"
                    value={roomID}
                    onChange={(e) => setRoomID(e.target.value)}
                    className="border rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 w-full text-gray-800 placeholder-gray-500"
                    placeholder="Enter room ID to join"
                  />
                  <Button
                    onClick={() => {
                      if (roomID) {
                        router.push(`/room/${roomID}`);
                      }
                    }}
                    disabled={!roomID}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Join Room
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 py-6 px-8 text-lg"
                  onClick={generateNewRoom}
                >
                  Create New Consultation Room
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-700/50 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Sign in Required</h3>
              <p className="mb-4">You need to sign in to start or join a consultation</p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push('/login')}
              >
                Sign In
              </Button>
            </div>
          )}
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gray-700/50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Secure</h3>
            <p className="text-gray-300">End-to-end encrypted video calls for your privacy</p>
          </div>
          <div className="bg-gray-700/50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Simple</h3>
            <p className="text-gray-300">No downloads required, works right in your browser</p>
          </div>
          <div className="bg-gray-700/50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Reliable</h3>
            <p className="text-gray-300">Stable connection for uninterrupted consultations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
