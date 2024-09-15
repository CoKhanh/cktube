import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { api } from "../../../convex/_generated/api"
import { useQuery } from "convex/react";
import { Id } from "convex/_generated/dataModel";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import VideoShared from "@/components/VideoShared";
import { normalizeCreationDate } from "@/lib/utils";

const Liked = () => {
  const router = useRouter();
  const [userID, setUserID] = useState("");
  const likedVideos = useQuery(api.votes.getUserUpvoteVideos, { userID: userID as Id<"users"> })

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/")
    }

    const verifiedDecoded = jwtDecode(token as string) as JwtPayload;
    const { userId } = verifiedDecoded;

    setUserID(userId)
  }, [])

  return (
    <div className="relative w-full h-screen pt-20 md:pt-24 px-4 md:px-8 gap-6 flex flex-col">
      {likedVideos?.map(({ video }: any) => (
        <VideoShared
          key={video._id}
          videoID={video._id}
          title={video.title}
          url={video.url}
          publisher={video.publisher || "Anonymous"}
          date={normalizeCreationDate(video._creationTime)}
        />
      ))}
    </div>
  )
}

export default Liked
