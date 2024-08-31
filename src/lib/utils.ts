import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getYouTubeVideoId(url: string) {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get('v');
}
