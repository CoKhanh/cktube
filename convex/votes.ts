import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getByVideo = query({
  args: { userID: v.string(), videoID: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("votes")
      .filter((q) => q.and(q.eq(q.field("userID"), args.userID), q.eq(q.field("videoID"), args.videoID))).first()
  },
});

export const getUserUpvoteVideos = query({
  args: { userID: v.id("users") },
  handler: async (ctx, args) => {
    const { userID } = args

    if (!userID) return null

    const votes = await ctx.db
      .query("votes")
      .filter((q) => q.and(q.eq(q.field("userID"), userID), q.eq(q.field("type"), "up-vote"))).collect()

    if (!votes) return null

    const videoPromises = votes.map(async (vote: any) => {
      const video = await ctx.db
        .query("videos")
        .filter((q) => q.eq(q.field("_id"), vote.videoID))
        .first();

      return {
        vote,
        video,
      };
    });

    // Step 3: Resolve all video promises to get video details
    const results = await Promise.all(videoPromises);

    // Step 4: Return the array of votes with associated video information
    return results;

  },
})

export const insert = mutation({
  args: { userID: v.string(), videoID: v.string(), type: v.string() },
  handler: async (ctx, args) => {
    const _id = await ctx.db.insert("votes", { userID: args.userID, videoID: args.videoID, type: args.type });
    return {
      _id,
      userID: args.userID,
      videoID: args.videoID,
      type: args.type,
    };
  },
});

export const update = mutation({
  args: { voteID: v.id("votes"), type: v.string() },
  handler: async (ctx, args) => {
    const { voteID, type } = args
    const vote = ctx.db.get(voteID);

    await ctx.db.patch(voteID, {...vote, type})
  }
})

export const unvote = mutation({
  args: { voteID: v.id("votes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.voteID)
  }
})
