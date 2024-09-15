import { useMutation, useQuery } from "convex/react";
import { useCallback } from "react";
import { ThumbsDown, ThumbsUp, Trash } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { cn } from "@/lib/utils";
import { Id } from "convex/_generated/dataModel";

export interface VoteProps {
  userID: string;
  videoID: string;
}

const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Vote = ({ userID, videoID }: VoteProps) => {
  // const userID = "jn7bn90xccwd5van6nsmjpnw9170nd0s"
  // const videoID = "j977wdgqg55f34yk2vb0fqdpp5704n6n"

  const currentVote = useQuery(api.votes.getByVideo, { userID, videoID });
  const currentVote2 = useQuery(api.votes.getUserUpvoteVideos, { userID: userID as Id<"users"> });
  console.log('currentVote2: ', currentVote2);

  const mutationInsertVote = useMutation(api.votes.insert)
  const mutationUnvote = useMutation(api.votes.unvote)
  const mutationUpdateVote = useMutation(api.votes.update)

  const onClickUpvote = useCallback(debounce(() => {
    if (!currentVote) {
      mutationInsertVote({
        userID,
        videoID,
        type: "up-vote"
      })
    } else if (currentVote.type === "down-vote") {
      const voteID = currentVote._id
      mutationUpdateVote({
        voteID,
        type: "up-vote"
      })
    } else {
      const voteID = currentVote._id
      mutationUnvote({ voteID })
    }
  }, 200), [currentVote])

  const onClickDownVote = useCallback(debounce(() => {
    if (!currentVote) {
      mutationInsertVote({
        userID,
        videoID,
        type: "down-vote"
      })
    } else if (currentVote.type === "up-vote") {
      const voteID = currentVote._id
      mutationUpdateVote({
        voteID,
        type: "down-vote"
      })
    } else {
      const voteID = currentVote._id
      mutationUnvote({ voteID })
    }
  }, 200), [currentVote])

  return (
    <div className="flex gap-2 items-center">
      <ThumbsUp className={cn("hover:cursor-pointer", currentVote && currentVote.type === "up-vote" && "text-red-600")} onClick={onClickUpvote} />
      <ThumbsDown className={cn("hover:cursor-pointer", currentVote && currentVote.type === "down-vote" && "text-red-600")} onClick={onClickDownVote} />
    </div>
  )
}

export default Vote;
