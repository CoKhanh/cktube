import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("notifications").order("desc").collect();
  },
});

export const insert = mutation({
  args: { title: v.string(), description: v.string(), url: v.string(), publisher: v.string() },
  handler: async (ctx, args) => {
    const _id = await ctx.db.insert("notifications", { title: args.title, description: args.description, url: args.url, publisher: args.publisher });
    return {
      _id,
      url: args.url,
      title: args.title,
      publisher: args.publisher,
      description: args.description,
    };
  },
});
