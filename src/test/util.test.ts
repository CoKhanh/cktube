import { getYouTubeVideoId, isValidYoutubeUrl } from "../lib/utils"

it("should return true for valid youtube URL", () => {
  const url = "https://www.youtube.com";
  const isValid = isValidYoutubeUrl(url);

  expect(isValid).toEqual(true)
})

it("should return false for invalid youtube URL", () => {
  const url = "https://github.com/";
  const isValid = isValidYoutubeUrl(url);

  expect(isValid).toEqual(false)
})

it("should return valid youtube url and youtube video id", () => {
  const url = "https://www.youtube.com/watch?v=nSj5gHd6XFg";
  const isValid = isValidYoutubeUrl(url);
  const videoId = getYouTubeVideoId(url);

  expect(isValid).toEqual(true);
  expect(videoId).toEqual("nSj5gHd6XFg");
})

it("should return tempty string video id", () => {
  const url = "https://www.youtube.com/watch?v=";
  const videoId = getYouTubeVideoId(url);

  expect(videoId).toEqual("");
})

it("should return null video id", () => {
  const url = "https://www.youtube.com/watch";
  const videoId = getYouTubeVideoId(url);

  expect(videoId).toEqual(null);
})

it("should return null video id - url without https://", () => {
  const url = "youtube.com/watch?v=nSj5gHd6XFg";
  const videoId = getYouTubeVideoId(url);

  expect(videoId).toEqual(null);
})
