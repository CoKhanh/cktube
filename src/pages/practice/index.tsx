import { Id } from "convex/_generated/dataModel";
import { api } from "../../../convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const Practice = () => {
  const practices = useQuery(api.practice.get);
  // console.log('practices: ', practices);

  const id = "jx757n23ax43wxepbcnpxhh1dh70t6c7" as Id<"practice">
  const practice1 = useQuery(api.practice.getById1, {id})
  // console.log('practice1: ', practice1);

  const practice2 = useQuery(api.practice.getById2, {id})
  // console.log('practice2: ', practice2);

  const userID = "jn7f9cypmtnbeknn0qgspn21j970tvdx" as Id<"users">
  const wipByUser = useQuery(api.practice.getWIPByUser, {userID})
  // console.log('wipByUser: ', wipByUser);

  const wipAndDelayPractices = useQuery(api.practice.getWIPAndDonePractices);
  // console.log('wipAndDelayPractices: ', wipAndDelayPractices);

  const donePractice = useQuery(api.practice.doneProgressWithUserAndTaskData);
  // console.log('donePractice: ', donePractice);

  const votes = useQuery(api.practice.getVotes);
  // console.log('votes: ', votes);

  const mutationPractice = useMutation(api.practice.insertPractice);
  const mutationUpdatePractice = useMutation(api.practice.updatePractice);
  const mutationDeletePractice = useMutation(api.practice.deletePractice);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Button onClick={() => mutationDeletePractice({
        id: "jx7dw73c9bdj80x203rwpkhp4170xxav" as Id<"practice">
      })}>Click</Button>
    </div>
  )
}

export default Practice
