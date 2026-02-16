import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, FileText, Files, Image, ImageIcon, Search, Settings, Users,
  LogOut, Menu, X, Home, ChevronDown, ChevronRight, PenSquare,
} from "lucide-react";
import logo from "@/assets/logo.png";

interface NavItem {
  label: string;
  path?: string;
  icon: React.ElementType;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  {
    label: "Posts", icon: FileText, children: [
      { label: "All Posts", path: "/admin/blogs" },
      { label: "Add New", path: "/admin/blogs/new" },
      { label: "Categories", path: "/admin/categories" },
      { label: "Tags", path: "/admin/tags" },
    ],
  },
  {
    label: "Pages", icon: Files, children: [
      { label: "All Pages", path: "/admin/pages" },
      { label: "Add New", path: "/admin/pages/new" },
    ],
  },
  { label: "Media Library", path: "/admin/media", icon: ImageIcon },
  { label: "Gallery", path: "/admin/gallery", icon: Image },
  { label: "SEO Settings", path: "/admin/seo", icon: Search },
  { label: "Site Settings", path: "/admin/settings", icon: Settings },
  { label: "Users", path: "/admin/users", icon: Users },
];

const AdminLayout = ({ children, title }: { children: ReactNode; title?: string }) => {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["Posts", "Pages"]);

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (item: NavItem) =>
    item.children?.some((c) => location.pathname === c.path || location.pathname.startsWith(c.path + "/"));

  const pageTitle = title || (() => {
    for (const item of navItems) {
      if (item.path && isActive(item.path)) return item.label;
      if (item.children) {
        const child = item.children.find((c) => isActive(c.path) || location.pathname.startsWith(c.path + "/"));
        if (child) return child.label;
      }
    }
    return "Admin";
  })();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* WordPress-style Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[220px] bg-sidebar text-sidebar-foreground flex flex-col transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-sidebar-border shrink-0">
          <Link to="/admin" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <span className="font-heading font-bold text-sm truncate">CMS</span>
          </Link>
          <button className="lg:hidden p-1" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Draft button */}
        <div className="px-3 py-3 border-b border-sidebar-border">
          <Link
            to="/admin/blogs/new"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-sidebar-primary text-sidebar-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <PenSquare className="h-4 w-4" /> New Post
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`w-full flex items-center justify-between px-4 py-2 text-[13px] font-medium transition-colors ${
                      isParentActive(item) ? "text-sidebar-primary-foreground bg-sidebar-accent" : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </span>
                    {expandedMenus.includes(item.label) ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </button>
                  {expandedMenus.includes(item.label) && (
                    <div className="bg-sidebar-accent/30">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setSidebarOpen(false)}
                          className={`block pl-11 pr-4 py-1.5 text-[12px] transition-colors ${
                            isActive(child.path) || location.pathname.startsWith(child.path + "/")
                              ? "text-sidebar-primary-foreground font-semibold"
                              : "text-sidebar-foreground/60 hover:text-sidebar-foreground/90"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path!}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-2 text-[13px] font-medium transition-colors ${
                    isActive(item.path!) ? "text-sidebar-primary-foreground bg-sidebar-accent" : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50"
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-sidebar-border p-3 space-y-1 shrink-0">
          <Link to="/" className="flex items-center gap-2 px-3 py-1.5 rounded text-[12px] hover:bg-sidebar-accent text-sidebar-foreground/60">
            <Home className="h-3.5 w-3.5" /> View Site
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-1.5 rounded text-[12px] hover:bg-sidebar-accent text-sidebar-foreground/60 w-full text-left">
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
          <p className="text-[11px] text-sidebar-foreground/40 px-3 truncate">{user?.email}</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-3 shrink-0">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-heading font-semibold text-lg truncate">{pageTitle}</h1>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
