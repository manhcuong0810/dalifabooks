<style>
/* ===================================================
   DALIFA BOOKS - CMS LIGHT SIDEBAR THEME
   =================================================== */

/* Main sidebar container */
.main-sidebar {
    background: #ffffff !important;
    border-right: 1px solid #e2e8f0 !important;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.03) !important;
}

.left-side {
    background: #ffffff !important;
    border-right: 1px solid #e2e8f0 !important;
}

/* Header & Logo */
.main-header {
    background: #ffffff !important;
    border-bottom: 1px solid #f1f5f9 !important;
    border-right: 1px solid #e2e8f0 !important;
}

.main-header .sidebar-toggle {
    background: #ffffff !important;
    border: 2px solid #e2e8f0 !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08) !important;
}

.main-header .sidebar-toggle svg path {
    stroke: #475569 !important;
}

.main-header .sidebar-toggle:hover {
    background: #f8fafc !important;
    border-color: #cbd5e1 !important;
}

/* Sidebar links general */
.sidebar a {
    color: #334155 !important;
}

/* Sidebar Menu list */
.sidebar-menu {
    background: #ffffff !important;
}

/* Section titles / headers: e.g. "HỆ THỐNG", "BÁN HÀNG" */
.sidebar-menu > li.header,
.sidebar-menu > li.menu-title {
    font-size: 11px !important;
    color: #0068e1 !important;
    background: transparent !important;
    padding: 22px 20px 8px 18px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    text-transform: uppercase !important;
    letter-spacing: 1.2px !important;
    font-weight: 700 !important;
    display: block !important;
    border-top: 1px solid #f1f5f9 !important;
    margin-top: 6px !important;
}

.sidebar-menu > li.header:first-child,
.sidebar-menu > li.menu-title:first-child {
    border-top: none !important;
    margin-top: 0 !important;
}

/* Menu items */
.sidebar-menu > li > a {
    background: #ffffff !important;
    color: #334155 !important;
    font-size: 13.5px !important;
    font-weight: 500 !important;
    padding: 11px 16px !important;
    border-radius: 8px !important;
    margin: 2px 10px !important;
    display: flex !important;
    align-items: center !important;
    transition: all 150ms ease-in-out !important;
}

.sidebar-menu > li > a span {
    flex: 1 !important;
}

.sidebar-menu > li > a span .fa,
.sidebar-menu > li > a > .fa,
.sidebar-menu > li > a i {
    font-size: 15px !important;
    color: #64748b !important;
    width: 20px !important;
    margin-right: 10px !important;
    text-align: center !important;
    transition: color 150ms ease-in-out !important;
}

.sidebar-menu > li > a .fa-angle-left,
.sidebar-menu > li > a .pull-right-container {
    color: #94a3b8 !important;
}

/* Hover on menu item */
.sidebar-menu > li > a:hover,
.sidebar-menu > li.selected > a {
    background: #f1f5f9 !important;
    color: #0068e1 !important;
}

.sidebar-menu > li > a:hover span .fa,
.sidebar-menu > li > a:hover > .fa,
.sidebar-menu > li > a:hover i,
.sidebar-menu > li.selected > a span .fa,
.sidebar-menu > li.selected > a > .fa,
.sidebar-menu > li.selected > a i {
    color: #0068e1 !important;
}

/* Active item */
.sidebar-menu > li.active > a {
    background: #eff6ff !important;
    color: #0068e1 !important;
    font-weight: 600 !important;
    position: relative !important;
}

.sidebar-menu > li.active > a span .fa,
.sidebar-menu > li.active > a > .fa,
.sidebar-menu > li.active > a i {
    color: #0068e1 !important;
}

.sidebar-menu > li.active > a::before {
    content: "" !important;
    display: block !important;
    position: absolute !important;
    left: 0 !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    width: 4px !important;
    height: 22px !important;
    background: #0068e1 !important;
    border-radius: 0 4px 4px 0 !important;
}

/* Treeview Submenu */
.treeview-menu {
    background: #f8fafc !important;
    border-radius: 8px !important;
    margin: 4px 10px 8px 10px !important;
    padding: 6px 0 !important;
    border: 1px solid #f1f5f9 !important;
}

.treeview-menu > li > a {
    background: transparent !important;
    color: #475569 !important;
    font-size: 13px !important;
    padding: 9px 15px 9px 38px !important;
    border-radius: 6px !important;
    margin: 1px 6px !important;
    position: relative !important;
    transition: all 150ms ease-in-out !important;
}

.treeview-menu > li > a::after {
    background: #cbd5e1 !important;
    left: 22px !important;
}

.treeview-menu > li > a:hover {
    background: #f1f5f9 !important;
    color: #0068e1 !important;
}

.treeview-menu > li.active > a {
    background: #e0edff !important;
    color: #0068e1 !important;
    font-weight: 600 !important;
}

.treeview-menu > li.active a span {
    background: transparent !important;
    padding: 0 !important;
}

.treeview-menu > li.active a::before {
    background: #0068e1 !important;
    left: 18px !important;
}

/* Sidebar mini / collapsed mode */
.sidebar-mini.sidebar-collapse .main-sidebar {
    background: #ffffff !important;
}

.sidebar-mini.sidebar-collapse .sidebar-menu > li > a {
    margin: 2px 4px !important;
    text-align: center !important;
    padding: 12px 0 !important;
}

.sidebar-mini.sidebar-collapse .sidebar-menu > li:hover > a > span {
    background: #ffffff !important;
    color: #0068e1 !important;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.08) !important;
    border: 1px solid #e2e8f0 !important;
}

.sidebar-mini.sidebar-collapse .sidebar-menu > li > .treeview-menu {
    background: #ffffff !important;
    box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1) !important;
    border: 1px solid #e2e8f0 !important;
}

/* Custom scrollbar in sidebar */
.sidebar::-webkit-scrollbar {
    width: 5px;
}

.sidebar::-webkit-scrollbar-track {
    background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 4px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
    background: #cbd5e1;
}
</style>
