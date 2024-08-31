import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("videos").collect();
  },
});

export const insert = mutation({
  args: { title: v.string(), url: v.string(), description: v.string() },
  handler: async (ctx, args) => {
    const video = await ctx.db.insert("videos", { title: args.title, url: args.url, description: args.description });
    return video;
  },
});
