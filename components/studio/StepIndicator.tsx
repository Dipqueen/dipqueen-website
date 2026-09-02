const STANDAARD_STAPPEN = ["Categorie", "Product", "Patroon", "Resultaat"];

export default function StepIndicator({
  actief,
  labels = STANDAARD_STAPPEN,
}: {
  actief: number;
  labels?: string[];
}) {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-3 mb-14 flex-wrap">
      {labels.map((label, i) => {
        const nr = i + 1;
        const status = nr < actief ? "gehad" : nr === actief ? "nu" : "nog";
        return (
          <div key={label} className="flex items-center gap-2 md:gap-3">
            <div
              className={
                "flex items-center gap-2 text-xs tracking-[0.08em] uppercase " +
                (status === "nog" ? "text-pearl/35" : "text-pearl")
              }
            >
              <span
                className={
                  "w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 " +
                  (status === "nu"
                    ? "bg-bronze text-pearl"
                    : status === "gehad"
                    ? "bg-pearl/25 text-pearl"
                    : "border border-pearl/25 text-pearl/40")
                }
              >
                {nr}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </div>
            {nr < labels.length && <span className="w-6 md:w-10 h-px bg-pearl/20" />}
          </div>
        );
      })}
    </div>
  );
}
