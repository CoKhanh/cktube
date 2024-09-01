import { NextApiRequest, NextApiResponse } from "next";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import allVideos from "./all";
import insert from "./insert";

jest.mock("convex/nextjs", () => ({
  fetchQuery: jest.fn(),
  fetchMutation: jest.fn(),
}));

const mockVideos: any = {
  videos: [
    {
      "_creationTime": 1725086193035.186,
      "_id": "j975k5n5553rsagnmzqhf0trfx6zx0ff",
      "description": "Description",
      "title": "X Men",
      "url": "https://www.youtube.com/watch?v=_aRrpUl6YwU"
    },
    {
      "_creationTime": 1725086193035.1863,
      "_id": "j970b7h53yhntf4yc8tt8szmkn6zw7y3",
      "description": "Description",
      "title": "Deadpool & Wolverine",
      "url": "https://www.youtube.com/watch?v=73_1biulkYk"
    },
  ]
};

it("should return videos in JSON format with status 200", async () => {
  (fetchQuery as jest.Mock).mockResolvedValue(mockVideos);

  // Create mock request and response objects
  const req = {} as NextApiRequest;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as NextApiResponse;
  await allVideos(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ videos: mockVideos });
});

it("should return a 500 status and error message if fetchQuery fails", async () => {
  // Mock fetchQuery to throw an error
  (fetchQuery as jest.Mock).mockRejectedValue(new Error("Database error"));

  // Create mock request and response objects
  const req = {} as NextApiRequest;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as NextApiResponse;

  await allVideos(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch videos" });
});

it("should insert a video and return it with status 200", async () => {
  // Mock fetchMutation to return the inserted video
  const mockVideo = mockVideos.videos[0];
  (fetchMutation as jest.Mock).mockResolvedValue(mockVideo);

  // Create mock request and response objects
  const req = {
    method: 'POST',
    body: {
      title: "X Men",
      url: "https://www.youtube.com/watch?v=_aRrpUl6YwU",
      description: "Description",
    },
  } as unknown as NextApiRequest;
  
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as NextApiResponse;

  await insert(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(mockVideo);
});

it("should return 405 if method is not POST", async () => {
  // Create mock request and response objects with a method other than POST
  const req = {
    method: 'GET',
  } as unknown as NextApiRequest;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as NextApiResponse;

  await insert(req, res);

  expect(res.status).toHaveBeenCalledWith(405);
  expect(res.json).toHaveBeenCalledWith({ message: 'Method Not Allowed' });
});

it("should return a 500 status and error message if fetchMutation fails", async () => {
  // Mock fetchMutation to throw an error
  (fetchMutation as jest.Mock).mockRejectedValue(new Error("Database error"));

  // Create mock request and response objects
  const req = {
    method: 'POST',
    body: {
      title: "X Men",
      url: "https://www.youtube.com/watch?v=_aRrpUl6YwU",
      description: "Description",
    },
  } as unknown as NextApiRequest;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as NextApiResponse;

  await insert(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: "Failed to insert video" });
});

