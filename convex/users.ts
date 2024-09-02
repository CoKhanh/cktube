import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const insert = mutation({
  args: { username: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const _id = await ctx.db.insert("users", { username: args.username, password: args.password });
    return _id;
  },
});

export const find = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), args.username)).first();

    return user;
  }
})
