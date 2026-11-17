import { videoFor, type VideoFamily } from "@/lib/video-slots";
import { SectionLabel } from "@/components/ui/SectionLabel";

const LABELS: Record<VideoFamily, string> = {
  walkthrough: "Walkthrough",
  flyover: "Aerial flyover",
};

// Renders nothing until a video for this subject has been committed.
export default function VideoSlots({
  slug,
  subjectName,
  fallbackPoster,
}: {
  slug: string;
  subjectName: string;
  fallbackPoster?: string;
}) {
  const videos = (["walkthrough", "flyover"] as const)
    .map((family) => ({ family, video: videoFor(slug, family, fallbackPoster) }))
    .filter((v): v is { family: VideoFamily; video: { src: string; poster: string | undefined } } => v.video !== null);

  if (videos.length === 0) return null;

  return (
    <section className="mt-28" aria-label={`Videos of ${subjectName}`}>
      <SectionLabel as="h2">See The Work</SectionLabel>
      <div className={`mt-8 grid gap-6 ${videos.length > 1 ? "md:grid-cols-2" : ""}`}>
        {videos.map(({ family, video }) => (
          <figure key={family} className="border border-bone/10 bg-surface">
            <video
              controls
              playsInline
              preload="metadata"
              poster={video.poster}
              className="aspect-video w-full bg-ground"
            >
              <source src={video.src} type="video/mp4" />
            </video>
            <figcaption className="p-4 font-display text-xs uppercase tracking-[0.25em] text-bone/70">
              {LABELS[family]} — {subjectName}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
