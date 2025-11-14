export const Loader = ({ label = '加载中...' }: { label?: string }) => (
  <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white/80 px-6 py-4 text-sm text-slate-500 shadow-sm">
    <span className="inline-flex h-3 w-3 animate-ping rounded-full bg-primary-400" />
    {label}
  </div>
);

