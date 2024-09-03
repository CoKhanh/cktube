/**
 * @jest-environment node
 */


it("should return a list of videos with status 200", async () => {
  const response = await fetch("http://localhost:3000/api/video/all");
  const data = await response.json();

  expect(data).toHaveProperty("videos");
  expect(Array.isArray(data.videos)).toBe(true);

  const videos = data.videos;
  if (videos.length > 0) {
    const video = videos[0];
    expect(video).toHaveProperty("_id");
    expect(video).toHaveProperty("title");
    expect(video).toHaveProperty("description");
    expect(video).toHaveProperty("url");
  }
})

it("should return a video object with status 200", async () => {
  const sampleVideo = {
    title: "Sample Video",
    description: "Description",
    url: "https://www.youtube.com/watch?v=nSj5gHd6XFg",
    publisher: "tester"
  }
  const response = await fetch("http://localhost:3000/api/video/insert", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sampleVideo),
  });

  const data = await response.json();
  const { message, video } = data;

  expect(response.status).toBe(200);
  expect(data).toHaveProperty("video");
  expect(data).toHaveProperty("message");
  expect(message).toEqual("Shared new video successfully");

  expect(video).toHaveProperty("_id");
  expect(video.title).toEqual(sampleVideo.title);
  expect(video.description).toEqual(sampleVideo.description);
  expect(video.url).toEqual(sampleVideo.url);
})
