export function SectionLabel({
  children,
  as: Tag = "span",
}: {
  children: string;
  /** Use "h2" when the label is the only heading of its section, so headings never skip a level. */
  as?: "span" | "h2";
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-red" aria-hidden />
      <Tag className="font-display text-xs uppercase tracking-[0.3em] text-red">{children}</Tag>
    </div>
  );
}
