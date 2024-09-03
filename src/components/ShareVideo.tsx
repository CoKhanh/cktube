import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { getYouTubeVideoId, isValidYoutubeUrl } from "@/lib/utils";
import { getVideo } from "@/lib/youtube"
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import { useForm } from "react-hook-form";

type SharedVideoData = {
  url: string;
}

const ShareVideo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset, watch } = useForm<SharedVideoData>();
  const watchUrlData = watch("url");

  const { toast } = useToast();

  const onSubmit = handleSubmit(async ({ url }) => {
    const isYoutubeUrl = isValidYoutubeUrl(url);
    const videoId = getYouTubeVideoId(url);
    if (!isYoutubeUrl || !videoId) {
      toast({
        title: "Error",
        description: "Invalid YouTube URL"
      })
      return;
    }

    setIsLoading(true);
    const { items = []} = await getVideo(videoId);

    if (!items.length) {
      toast({
        title: "Error",
        description: "Invalid YouTube URL"
      })
      setIsLoading(false);
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
    const data = await response.json();
    const { message } = data;

    toast({
      title: response.status == 200 ? "Success" : "Error",
      description: message,
    })
    setIsLoading(false);
    reset();
  })

  return (
    <div className="sticky bottom-0 w-full bg-white">
      <form className="w-full md:w-1/2 flex flex-col gap-4 m-auto py-4" onSubmit={onSubmit}>
        <Input placeholder="paste youtube video url here" {...register("url")} required disabled={isLoading} />
        <Button type="submit" className="w-full" disabled={watchUrlData?.length === 0 || isLoading}>Share</Button>
      </form>
    </div>
  )
}

export default ShareVideo
