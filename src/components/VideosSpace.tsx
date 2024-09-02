import React from "react";
import { useEffect, useState } from "react";
import ShareVideo from "./ShareVideo";
import VideoShared from "./VideoShared";

const VideosSpace = () => {
  const [videos, setVideos] = useState([]);

  const allVideos = async () => {
    const response = await fetch("/api/video/all");
    const data = await response.json();
    setVideos(data.videos);
  }

  useEffect(() => {
    const loadData = async () => {
      await allVideos();
    }
    loadData();
  }, [])

  return (
    <div className="relative w-full h-screen pt-24 px-8 gap-6 flex flex-col">
      {videos?.map(({ _id, title, url, publisher }) => (
        <VideoShared key={_id} title={title} url={url} publisher={publisher || "Anonymous"} />
      ))}
      <ShareVideo />
    </div>
  );
}

export default VideosSpace;
