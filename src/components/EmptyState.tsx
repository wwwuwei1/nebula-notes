export const EmptyState = ({ title, description }: { title: string; description: string }) => (
  <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-10 text-center text-slate-500">
    <p className="text-base font-semibold">{title}</p>
    <p className="mt-2 text-sm">{description}</p>
  </div>
);

