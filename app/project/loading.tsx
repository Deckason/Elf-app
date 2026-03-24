export default function ProjectsLoading() {
  return (
    <>
      {/* Banner shimmer */}
      <div
        className="w-full flex flex-col items-center justify-center gap-4"
        style={{
          minHeight: "38vh",
          background: "linear-gradient(160deg, var(--deep), var(--ink))",
          paddingTop: "68px",
        }}
      >
        <div className="shimmer h-3 w-28 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
        <div className="shimmer h-8 w-72 rounded-lg mt-2" style={{ background: "rgba(255,255,255,0.07)" }} />
        <div className="shimmer h-8 w-52 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }} />
      </div>

      {/* Stats bar shimmer */}
      <div style={{ background: "var(--deep)", borderBottom: "1px solid rgba(52,211,153,0.09)" }}>
        <div className="section-wrap py-5">
          <div className="flex gap-8">
            {[80, 60, 100, 70].map((w, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="shimmer h-6 w-10 rounded" style={{ background: "rgba(255,255,255,0.07)" }} />
                <div className={`shimmer h-3 w-${w === 80 ? "20" : w === 60 ? "16" : w === 100 ? "24" : "18"} rounded`}
                  style={{ background: "rgba(255,255,255,0.05)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-wrap py-16 pb-24">
        {/* Featured shimmer */}
        <div className="mb-4 flex items-center gap-3">
          <div className="shimmer h-px w-6" style={{ background: "var(--border)" }} />
          <div className="shimmer h-2 w-28 rounded" style={{ background: "var(--border)" }} />
        </div>
        <div
          className="grid grid-cols-1 lg:grid-cols-2 rounded-[20px] overflow-hidden mb-14"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="shimmer min-h-[300px]" style={{ background: "var(--warm2)" }} />
          <div className="p-10 flex flex-col gap-4">
            <div className="shimmer h-7 w-4/5 rounded-lg" style={{ background: "var(--warm2)" }} />
            <div className="shimmer h-7 w-3/5 rounded-lg" style={{ background: "var(--warm2)" }} />
            <div className="shimmer h-4 w-full rounded mt-2" style={{ background: "var(--warm2)" }} />
            <div className="shimmer h-4 w-5/6 rounded" style={{ background: "var(--warm2)" }} />
            <div className="shimmer h-4 w-4/6 rounded" style={{ background: "var(--warm2)" }} />
            <div className="shimmer h-[6px] w-full rounded-full mt-4" style={{ background: "var(--warm2)" }} />
            <div className="flex items-center gap-3 mt-2">
              <div className="shimmer w-9 h-9 rounded-full" style={{ background: "var(--warm2)" }} />
              <div className="flex flex-col gap-1">
                <div className="shimmer h-3 w-24 rounded" style={{ background: "var(--warm2)" }} />
                <div className="shimmer h-2 w-16 rounded" style={{ background: "var(--warm2)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Filter pills shimmer */}
        <div className="flex gap-3 mb-10">
          {[60, 72, 90, 100, 80].map((w, i) => (
            <div
              key={i}
              className="shimmer h-8 rounded-full"
              style={{ width: `${w}px`, background: "var(--warm2)" }}
            />
          ))}
        </div>

        {/* Card grid shimmer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[16px] overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="shimmer h-[168px]" style={{ background: "var(--warm2)" }} />
              <div className="p-5 flex flex-col gap-3">
                <div className="shimmer h-2 w-24 rounded" style={{ background: "var(--warm2)" }} />
                <div className="shimmer h-5 w-full rounded-lg" style={{ background: "var(--warm2)" }} />
                <div className="shimmer h-5 w-4/5 rounded-lg" style={{ background: "var(--warm2)" }} />
                <div className="shimmer h-3 w-full rounded mt-1" style={{ background: "var(--warm2)" }} />
                <div className="shimmer h-3 w-5/6 rounded" style={{ background: "var(--warm2)" }} />
                <div className="shimmer h-[5px] w-full rounded-full mt-2" style={{ background: "var(--warm2)" }} />
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <div className="shimmer w-7 h-7 rounded-full" style={{ background: "var(--warm2)" }} />
                    <div className="shimmer h-3 w-16 rounded" style={{ background: "var(--warm2)" }} />
                  </div>
                  <div className="shimmer h-2 w-20 rounded" style={{ background: "var(--warm2)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}