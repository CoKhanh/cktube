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

  expect(response.status).toBe(200);
  expect(data).toHaveProperty("_id");
  expect(data.title).toEqual(sampleVideo.title);
  expect(data.description).toEqual(sampleVideo.description);
  expect(data.url).toEqual(sampleVideo.url);
})
