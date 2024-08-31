import ShareVideo from "@/components/ShareVideo";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

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
        </div>
      ))}
      <ShareVideo />
    </main>
  );
}
