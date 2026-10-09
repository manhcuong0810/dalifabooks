// Layout CMS: Sidebar + Topbar + Breadcrumb — SYS-01
// Theo đặc tả: Desktop 1440px; tablet 1024px; mobile dùng drawer
export default function CmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar — sẽ implement ở SYS-01 */}
      <aside className="w-60 shrink-0 border-r border-gray-200 bg-white">
        <nav aria-label="CMS navigation">
          <p className="p-4 font-semibold text-gray-900">DalifaBooks CMS</p>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 shrink-0 border-b border-gray-200 bg-white px-6 flex items-center">
          <span className="text-sm text-gray-500">Topbar</span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
