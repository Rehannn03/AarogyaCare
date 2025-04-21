"use client";

import React, { useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/store';

const ZegoCloudRoom = ({ roomId }) => {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!roomId) {
      router.push('/dashboard');
      return;
    }

    // Function to generate a ZEGO token for authentication
    const generateToken = async (userId, roomId, userName) => {
      // Your Zego Cloud credentials (should be environment variables in production)
      const appID = process.env.NEXT_PUBLIC_ZEGO_APP_ID;
      const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET; 
      
      // If you don't have app ID and secret, use this temporary solution for development 
      // In production, you would generate these tokens on your server
      if (!appID || !serverSecret) {
        console.warn("ZEGO credentials missing - using demo token generation");
        // 1 hour expiry
        const expiry = Math.floor(Date.now() / 1000) + 3600;
        // Demo token only - not secure for production!
        return ZegoUIKitPrebuilt.generateKitTokenForTest(
          parseInt(1234567890), // Demo app ID
          roomId, 
          userId, 
          userName,
          expiry
        );
      }

      // Production token generation
      return ZegoUIKitPrebuilt.generateKitTokenForProduction(
        parseInt(appID),
        serverSecret,
        roomId,
        userId,
        userName
      );
    };

    const startCall = async () => {
      // Generate a unique user ID if not available
      const userId = user?._id || `user-${Math.floor(Math.random() * 10000)}`;
      const userName = user?.name || "Anonymous User";
      
      try {
        const kitToken = await generateToken(userId, roomId, userName);
        
        // Get container element
        const container = document.getElementById('zego-container');
        if (!container) return;

        // Create instance
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        
        // Join the room
        zp.joinRoom({
          container,
          sharedLinks: [
            {
              name: 'Copy Link',
              url: `${window.location.origin}/room/${roomId}`,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          showScreenSharingButton: true,
          showPreJoinView: true,
          turnOnMicrophoneWhenJoining: true,
          turnOnCameraWhenJoining: true,
          showLeavingView: true,
          onLeaveRoom: () => {
            router.push('/dashboard');
          },
          showRoomDetailsButton: true,
        });
      } catch (error) {
        console.error('Error starting Zego call:', error);
      }
    };

    startCall();
  }, [roomId, user, router]);

  return (
    <div 
      id="zego-container" 
      className="w-full h-screen bg-gray-900"
      style={{ minHeight: '100vh' }}
    ></div>
  );
};

export default ZegoCloudRoom;