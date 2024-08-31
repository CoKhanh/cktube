export const getVideo = async (videoId: string) => {
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet`
    );
    const videoInfo = await response.json();
    return videoInfo || null;
  } catch (error) {
    console.error('Error fetching video information:', error);
    return null;
  }
}
