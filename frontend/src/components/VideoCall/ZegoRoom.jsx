"use client";

import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

export default function ZegoRoom({ roomId, user }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Generate a kit token for ZEGO Cloud
    const userId = user?._id || Date.now().toString();
    const userName = user?.name || "User";
    
    // Create a token (using the test token generation for simplicity)
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID), // App ID
      process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET, // Server Secret
      roomId, 
      userId,
      userName,
      Date.now() + 3600000 // Expiration time: current time + 1 hour
    );
    
    // Create ZEGO UI Kit instance
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    
    // Join the room
    zc.joinRoom({
      container: containerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
      showPreJoinView: true,
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showLeavingView: true,
      showUserList: true,
      maxUsers: 2,
      layout: "Grid",
      showLayoutButton: true,
      onLeaveRoom: () => {
        // If the user is the doctor, redirect to the appointments page
        if (user?.role === 'doctor') {
          window.location.href = '/dashboard/doctor/appointments';
        } else {
          // If the user is a patient, redirect to the appointments page
          window.location.href = '/dashboard/my-appointments';
        }
        window.location.href = '/';
      }
    });
    
  }, [roomId, user]);
  
  return <div ref={containerRef} className="h-full w-full" />;
}