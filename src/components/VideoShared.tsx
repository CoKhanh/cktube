import React from "react";
import ReactPlayer from "react-player";
import Link from "next/link";

export interface VideoSharedProps {
  url: string;
  title: string;
  publisher: string;
}

const VideoShared = ({ url, title, publisher }: VideoSharedProps) => {
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
        <Link href={url} target="_blank" className="text-blue-500">{url}</Link>
      </div>
    </div>
  )
}

export default VideoShared;
