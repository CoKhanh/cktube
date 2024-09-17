import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("practice").collect();
  }
})

export const getById1 = query({
  args: { id: v.id("practice") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  }
})

export const getById2 = query({
  args: { id: v.id("practice") },
  handler: async (ctx, args) => {
    const practice = await ctx.db
                  .query("practice")
                  .filter((q) => q.eq(q.field("_id"), args.id))
                  .first()

    return practice
  }
})

export const getWIPByUser = query({
  args: { userID: v.id("users") },
  handler: async (ctx, args) => {
    const practices = await ctx.db.query("practice")
                  .filter((q) => q.and(q.eq(q.field("userID"), args.userID), q.eq(q.field("progress"), "WIP")))
                  .collect()

    return practices
  }
})

export const getWIPAndDonePractices = query({
  args: {},
  handler: async (ctx) => {
    const practices = await ctx.db
                    .query("practice")
                    .filter(q => q.or(q.eq(q.field("progress"), "WIP"), q.eq(q.field("progress"), "Delay")))
                    .collect()

    return practices;
  }
})

export const doneProgressWithUserAndTaskData = query({
  args: {},
  handler: async (ctx) => {
    const practices = await ctx.db
                    .query("practice")
                    .filter(q => q.eq(q.field("progress"), "Done"))
                    .order("desc")
                    .collect()

    if (!practices) return null

    const userAndTaskPromises = practices.map(async (practice) => {
      const task = await ctx.db.query("tasks").filter(q => q.eq(q.field("_id"), practice.taskID)).first()
      const user = await ctx.db.query("users").filter(q => q.eq(q.field("_id"), practice.userID)).first()

      return {
        task,
        practice,
        user
      }
    })

    const result = await Promise.all(userAndTaskPromises);

    return result;
  }
})

export const getVotes = query({
  args: {},
  handler: async (ctx, args) => {
    const votes = await ctx.db.query("votes")
                .filter(q => q.eq(q.field("type"), "down-vote"))
                .collect()

    if (!votes) return null

    const voteDataPromises = votes.map(async (vote) => {
      const user = await ctx.db.query("users").filter(q => q.eq(q.field("_id"), vote.userID)).first()
      const video = await ctx.db.query("videos").filter(q => q.eq(q.field("_id"), vote.videoID)).first()

      return {
        vote,
        user,
        video,
      }
    })

    const rs = await Promise.all(voteDataPromises);

    return rs
  }
})

export const insertPractice = mutation({
  args: { userID: v.string(), name: v.string(), progress: v.string(), taskID: v.string() },
  handler: async (ctx, args) => {
    const data = {
      userID: args.userID,
      taskID: args.taskID,
      name: args.name,
      progress: args.progress
    }
    const id = await ctx.db.insert("practice", data);

    return id
  }
})

export const updatePractice = mutation({
  args: {name: v.string(), id: v.id("practice")},
  handler: async (ctx, args) => {
    const { name, id } = args
    const practice = ctx.db.get(id);

    if (!practice) return null

    await ctx.db.patch(id, { ...practice, name })
  }
})

export const deletePractice = mutation({
  args: {id: v.id("practice")},
  handler: async (ctx, args) => {
    const { id } = args
    await ctx.db.delete(id)
  }
})
