import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { YOUTUBE_DOMAIN } from "../../constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYouTubeVideoId(url: string) {
  try {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  } catch (e) {
    return null;
  }
}

export function isValidYoutubeUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname.includes(YOUTUBE_DOMAIN);
  } catch (e) {
    return false;
  }
}

export function generateRandomString(length: number = 8): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export const normalizeCreationDate = (creationTime: number) => {
  const date = new Date(creationTime);
  const localDate = date.toLocaleDateString('vi-VN');
  const localTime = date.toLocaleTimeString('vi-VN');

  return `${localDate} ${localTime}`;
}
