export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">Overview</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Sách", value: "0", color: "bg-sky-100 text-sky-700" },
          { label: "Đơn hàng", value: "0", color: "bg-emerald-100 text-emerald-700" },
          { label: "Khách hàng", value: "0", color: "bg-violet-100 text-violet-700" },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${item.color}`}>{item.label}</div>
            <div className="mt-4 text-2xl font-semibold text-slate-900">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
