import { NavLink as RouterNavLink } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface SidebarNavLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

const SidebarNavLink = ({ to, icon: Icon, label }: SidebarNavLinkProps) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }`
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </RouterNavLink>
  );
};

export default SidebarNavLink;
