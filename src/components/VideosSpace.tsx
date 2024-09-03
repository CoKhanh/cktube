import React from "react";
import { useEffect, useState } from "react";
import ShareVideo from "./ShareVideo";
import VideoShared from "./VideoShared";

const normalizeCreationDate = (creationTime: number) => {
  const date = new Date(creationTime);
  const localDate = date.toLocaleDateString('vi-VN', { timeZone: 'UTC' });
  const localTime = date.toLocaleTimeString('vi-VN', { timeZone: 'UTC' });

  return `${localDate} ${localTime}`;
}

const VideosSpace = () => {
  const [videos, setVideos] = useState([]);

  const allVideos = async () => {
    const response = await fetch("/api/video/all");
    const data = await response.json();
    console.log('data: ', data);
    setVideos(data.videos.reverse());
  }

  useEffect(() => {
    allVideos();
  }, [])

  return (
    <div className="relative w-full h-screen pt-20 md:pt-24 px-4 md:px-8 gap-6 flex flex-col">
      {videos?.map(({ _id, title, url, publisher, _creationTime }) => (
        <VideoShared
          key={_id}
          title={title}
          url={url}
          publisher={publisher || "Anonymous"}
          date={normalizeCreationDate(_creationTime)}
        />
      ))}
      <ShareVideo refetchVideos={allVideos} />
    </div>
  );
}

export default VideosSpace;
