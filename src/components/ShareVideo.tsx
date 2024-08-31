import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { getYouTubeVideoId } from "@/lib/utils";
import { getVideo } from "@/lib/youtube"
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

const ShareVideo = () => {
  const [url, setUrl] = useState<string>('');
  const { toast } = useToast()

  const handleShare = async () => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) {
      toast({
        title: "Error",
        description: "Invalid YouTube URL"
      })
      return;
    }

    const { items = []} = await getVideo(videoId);

    if (!items.length) {
      toast({
        title: "Error",
        description: "Invalid YouTube URL"
      })
      return;
    }

    const { snippet } = items[0];
    const { title, description } = snippet;

    const response = await fetch("/api/video/insert", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, url }),
    });
    const video = await response.json();
    toast({
      title: "Success",
      description: "You shared new video",
      type: "background"
    })
  };

  const handleChangeUrlInput = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    setUrl(val ?? "");
  }

  return (
    <>
      <Input placeholder="paste youtube video url here" onChange={handleChangeUrlInput} />
      <Button onClick={handleShare}>Share</Button>
    </>
  )
}

export default ShareVideo
