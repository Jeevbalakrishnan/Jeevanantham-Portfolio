export function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute left-[-12%] top-[-10%] h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="absolute right-[-8%] top-[6%] h-96 w-96 rounded-full bg-violet-500/18 blur-[140px]" />
      <div className="absolute bottom-[-14%] left-[30%] h-[26rem] w-[26rem] rounded-full bg-cyan-500/10 blur-[160px]" />
      <div className="absolute left-[8%] top-[18%] h-2 w-2 rounded-full bg-blue-300/70 shadow-[0_0_18px_rgba(147,197,253,0.8)]" />
      <div className="absolute right-[18%] top-[14%] h-1.5 w-1.5 rounded-full bg-violet-300/80 shadow-[0_0_16px_rgba(196,181,253,0.85)]" />
      <div className="absolute right-[28%] top-[42%] h-1.5 w-1.5 rounded-full bg-sky-300/80 shadow-[0_0_16px_rgba(125,211,252,0.85)]" />
      <div className="absolute left-[22%] bottom-[26%] h-1 w-1 rounded-full bg-blue-200/70 shadow-[0_0_14px_rgba(191,219,254,0.8)]" />
    </div>
  );
}
