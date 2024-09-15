import React, { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";
import Vote from "./Vote";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";

export interface VideoSharedProps {
  url: string;
  title: string;
  publisher: string;
  date: string;
  videoID: string;
}

const VideoShared = ({ url, title, publisher, date, videoID }: VideoSharedProps) => {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const verifiedDecoded = jwtDecode(token) as JwtPayload & {
        username: string
      };
      const { userId } = verifiedDecoded;
      setUserID(userId)
    }
  })

  return (
    <div className="w-full lg:m-auto flex flex-col md:flex-row gap-2">
      <div className="w-full">
        <ReactPlayer url={url} controls width={"100%"} />
      </div>
      <div className="w-full">
        <p className="text-2xl text-red-500 font-semibold">{title}</p>
        <p>
          <span className="font-semibold">Shared by: </span>
          {publisher}
        </p>
        <p>
          <span className="font-semibold">Date: </span>
          {date}
        </p>
        {userID && (
          <Vote userID={userID} videoID={videoID} />
        )}
        <Link href={url} target="_blank" className="text-blue-500">{url}</Link>
      </div>
    </div>
  )
}

export default VideoShared;
