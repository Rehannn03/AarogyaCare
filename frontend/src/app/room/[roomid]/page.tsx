"use client";

// import useConsult from "@/stores/useConsult";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React from "react";
import { v4 as uuid } from "uuid";
import { useUserStore } from "@/stores/store";

const Room = ({ params }: { params: { roomid: string } }) => {
  // const { fullName } = useConsult();
  const { user } = useUserStore();
  const roomID = params.roomid;

  let myMeeting: any = async (element: any) => {
    // generate Kit Token
    // get the appID and serverSecret from the environment variables
    const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID!);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      uuid(),
      user?.name || "user" + Date.now(),
      720
    );

    //Works till, But goes Gonk from here

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Shareable link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      maxUsers: 10,
    });
  };

  return (
    <div
      className="w-full h-screen justify-center items-center"
      ref={myMeeting}
    ></div>
  );
};

export default Room;
