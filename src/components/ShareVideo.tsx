import { useState } from "react";
import { Button } from "./ui/button";
import { getYouTubeVideoId, isValidYoutubeUrl } from "@/lib/utils";
import { getVideo } from "@/lib/youtube"
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

type SharedVideoData = {
  url: string;
}

interface ShareVideoProps {
  refetchVideos: () => Promise<void>;
}

const ShareVideo = ({ refetchVideos }: ShareVideoProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset, watch } = useForm<SharedVideoData>();
  const watchUrlData = watch("url");

  const { toast } = useToast();
  const notificationsMutation = useMutation(api.notifications.insert);

  const onSubmit = handleSubmit(async ({ url }) => {
    const token = localStorage.getItem("token") as string;
    if (!token) {
      toast({
        title: "Oops..!",
        description: "Login to share your video",
        duration: 1500,
      })
      return;
    }

    const verifiedDecoded = jwtDecode(token) as JwtPayload & {
      username: string
    };
    const { username: publisher } = verifiedDecoded;

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

    notificationsMutation({
      url,
      publisher,
      description: `${title}`,
      title: `${publisher} shared a new video`,
    })

    refetchVideos();
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
