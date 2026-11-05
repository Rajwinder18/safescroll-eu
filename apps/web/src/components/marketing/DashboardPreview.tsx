export function DashboardPreview() {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#192334]/80 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B7A6FF]">
            Sample dashboard
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">Digital habits at a glance</h3>
        </div>
        <span className="rounded-full bg-[#78E6C1]/15 px-2.5 py-1 text-[11px] font-semibold text-[#78E6C1]">
          Demo data
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Wellbeing', value: '78' },
          { label: 'Screen today', value: '3.2h' },
          { label: 'Mindful', value: '2' },
          { label: 'Goal', value: '64%' },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-white/5 px-3 py-3">
            <div className="text-[11px] text-[#A1A1AA]">{item.label}</div>
            <div className="mt-1 text-xl font-semibold text-white">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-white/5 p-4">
        <div className="mb-3 flex items-center justify-between text-xs text-[#A1A1AA]">
          <span>Weekly screen time</span>
          <span>Sample series</span>
        </div>
        <div className="flex h-28 items-end gap-2">
          {[42, 55, 48, 70, 62, 58, 45].map((h, i) => (
            <div key={i} className="flex flex-1 flex-col justify-end">
              <div
                className="rounded-t-lg bg-gradient-to-t from-[#8B7CF6] to-[#B7A6FF]"
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
