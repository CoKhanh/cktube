import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { getYouTubeVideoId, isValidYoutubeUrl } from "@/lib/utils";
import { getVideo } from "@/lib/youtube"
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";

const ShareVideo = () => {
  const [url, setUrl] = useState<string>('');
  const { toast } = useToast()

  const handleShare = async () => {
    const isYoutubeUrl = isValidYoutubeUrl(url);
    const videoId = getYouTubeVideoId(url);
    if (!isYoutubeUrl || !videoId) {
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

    const token = localStorage.getItem("token") as string;
    const verifiedDecoded = jwtDecode(token) as JwtPayload & {
      username: string
    };
    const { username: publisher } = verifiedDecoded;

    const response = await fetch("/api/video/insert", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, url, publisher }),
    });
    const video = await response.json();
    toast({
      title: "Success",
      description: "You shared new video",
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
