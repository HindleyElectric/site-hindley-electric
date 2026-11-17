import { existsSync } from "node:fs";
import path from "node:path";

// Video-slot contract: a walkthrough or flyover goes live by committing
// public/videos/<subject-slug>/walkthrough.mp4 (or flyover.mp4) plus its
// poster-<family>.jpg. Both checks run at build time, so the next deploy shows
// the section with no code change. Nothing renders while the file is absent.
export type VideoFamily = "walkthrough" | "flyover";

const videosDir = (...parts: string[]) => path.join(process.cwd(), "public", "videos", ...parts);

export const hasVideo = (slug: string, file: string) => existsSync(videosDir(slug, file));

export function videoFor(slug: string, family: VideoFamily, fallbackPoster?: string) {
  if (!hasVideo(slug, `${family}.mp4`)) return null;
  const poster = hasVideo(slug, `poster-${family}.jpg`)
    ? `/videos/${slug}/poster-${family}.jpg`
    : fallbackPoster;
  return { src: `/videos/${slug}/${family}.mp4`, poster };
}
