export default function SingleProjectLoading() {
  return (
    <>
      {/* Hero shimmer */}
      <div
        className="w-full flex flex-col justify-end"
        style={{
          minHeight: "50vh",
          background: "linear-gradient(160deg, var(--deep), #06241A)",
          paddingTop: "68px",
        }}
      >
        <div className="section-wrap pb-12 pt-8 flex flex-col gap-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <div className="shimmer h-2 w-14 rounded" style={{ background: "rgba(255,255,255,0.07)" }} />
            <div className="shimmer h-2 w-2 rounded" style={{ background: "rgba(255,255,255,0.04)" }} />
            <div className="shimmer h-2 w-16 rounded" style={{ background: "rgba(255,255,255,0.07)" }} />
          </div>
          {/* Badges */}
          <div className="flex items-center gap-3">
            <div className="shimmer h-6 w-20 rounded" style={{ background: "rgba(255,255,255,0.07)" }} />
            <div className="shimmer h-6 w-16 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>
          {/* Title */}
          <div className="shimmer h-10 w-3/4 rounded-lg" style={{ background: "rgba(255,255,255,0.07)" }} />
          <div className="shimmer h-10 w-1/2 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }} />
          {/* Summary */}
          <div className="shimmer h-4 w-full max-w-lg rounded mt-1" style={{ background: "rgba(255,255,255,0.05)" }} />
          <div className="shimmer h-4 w-5/6 max-w-md rounded" style={{ background: "rgba(255,255,255,0.04)" }} />
        </div>
      </div>

      {/* Content + sidebar shimmer */}
      <div className="section-wrap py-[68px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">

          {/* Article shimmer */}
          <div className="flex flex-col gap-4">
            <div className="shimmer h-6 w-48 rounded-lg mt-4" style={{ background: "var(--warm2)" }} />
            {[100, 92, 88, 96, 80, 94, 78, 100, 86].map((w, i) => (
              <div
                key={i}
                className="shimmer h-4 rounded"
                style={{ width: `${w}%`, background: "var(--warm2)" }}
              />
            ))}
            <div
              className="shimmer rounded-[6px] h-20 w-full mt-4"
              style={{ background: "var(--warm2)" }}
            />
            <div className="shimmer h-6 w-40 rounded-lg mt-4" style={{ background: "var(--warm2)" }} />
            {[100, 90, 85, 95].map((w, i) => (
              <div
                key={i}
                className="shimmer h-4 rounded"
                style={{ width: `${w}%`, background: "var(--warm2)" }}
              />
            ))}
          </div>

          {/* Sidebar shimmer */}
          <div className="flex flex-col gap-5">
            {/* Funding card */}
            <div className="rounded-[16px] p-6" style={{ background: "var(--warm)", border: "1px solid var(--border)" }}>
              <div className="shimmer h-5 w-36 rounded mb-4" style={{ background: "var(--warm2)" }} />
              <div className="flex justify-between mb-2">
                <div className="shimmer h-3 w-24 rounded" style={{ background: "var(--warm2)" }} />
                <div className="shimmer h-3 w-10 rounded" style={{ background: "var(--warm2)" }} />
              </div>
              <div className="shimmer h-[7px] w-full rounded-full mb-4" style={{ background: "var(--warm2)" }} />
              <div className="shimmer h-11 w-full rounded-[7px]" style={{ background: "var(--warm2)" }} />
            </div>

            {/* Details card */}
            <div className="rounded-[16px] p-6" style={{ background: "#fff", border: "1px solid var(--border)" }}>
              <div className="shimmer h-5 w-32 rounded mb-4" style={{ background: "var(--warm2)" }} />
              {[3, 3, 3, 3].map((_, i) => (
                <div key={i} className="flex flex-col gap-[3px] mb-4">
                  <div className="shimmer h-2 w-20 rounded" style={{ background: "var(--warm2)" }} />
                  <div className="shimmer h-4 w-32 rounded" style={{ background: "var(--warm2)" }} />
                </div>
              ))}
            </div>

            {/* Manager card */}
            <div className="rounded-[16px] p-6" style={{ background: "var(--ink)", border: "1px solid rgba(168,230,216,0.07)" }}>
              <div className="shimmer h-2 w-24 rounded mb-4" style={{ background: "rgba(255,255,255,0.06)" }} />
              <div className="flex items-center gap-3">
                <div className="shimmer w-11 h-11 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
                <div className="flex flex-col gap-2">
                  <div className="shimmer h-3 w-28 rounded" style={{ background: "rgba(255,255,255,0.07)" }} />
                  <div className="shimmer h-2 w-20 rounded" style={{ background: "rgba(255,255,255,0.04)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}