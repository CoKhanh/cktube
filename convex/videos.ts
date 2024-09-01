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
    const _id = await ctx.db.insert("videos", { title: args.title, url: args.url, description: args.description });
    return {
      _id,
      title: args.title,
      description: args.description,
      url: args.url,
    };
  },
});
