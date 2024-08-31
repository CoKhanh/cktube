import ShareVideo from "@/components/ShareVideo";
import { useEffect, useState } from "react";
import ReactPlayer from 'react-player'

export default function Home() {
  const [videos, setVideos] = useState([]);

  const allVideos = async () => {
    const response = await fetch("/api/video/all");
    const data = await response.json(); // Parse the response as JSON
    setVideos(data.videos);
  }

  useEffect(() => {
    const loadData = async () => {
      await allVideos();
    }
    loadData();
  }, [])

  return (
    <main>
      {videos?.map(({ _id, title, url }) => (
        <div key={_id}>
          <p>{title}</p>
          <a>{url}</a>
          <ReactPlayer url={url} controls />
        </div>
      ))}
      <ShareVideo />
    </main>
  );
}
