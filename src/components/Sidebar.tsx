
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart, 
  Home, 
  LineChart, 
  Users, 
  Settings, 
  LogOut,
  FileText,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const { user, signOut, isAdmin } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <div className={cn(
        "h-screen bg-sidebar transition-all duration-300 fixed z-50",
        collapsed ? "w-16" : "w-64"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <BarChart className="h-6 w-6 text-brand-teal" />
              <span className="text-white font-bold">ReportHub</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:bg-sidebar-accent"
          >
            {collapsed ? <Menu /> : <X />}
          </Button>
        </div>
        
        <div className="py-4">
          <ul className="space-y-2">
            <SidebarItem 
              to="/" 
              icon={<Home />} 
              text="Início" 
              collapsed={collapsed} 
            />
            <SidebarItem 
              to="/reports" 
              icon={<LineChart />}
              text="Relatórios" 
              collapsed={collapsed} 
            />
            {isAdmin && (
              <>
                <SidebarItem 
                  to="/admin/reports" 
                  icon={<FileText />} 
                  text="Gerenciar Relatórios" 
                  collapsed={collapsed} 
                />
                <SidebarItem 
                  to="/admin/users" 
                  icon={<Users />} 
                  text="Gerenciar Usuários" 
                  collapsed={collapsed} 
                />
                <SidebarItem 
                  to="/admin/settings" 
                  icon={<Settings />}
                  text="Configurações" 
                  collapsed={collapsed} 
                />
              </>
            )}
          </ul>
        </div>
        
        <div className="absolute bottom-0 w-full border-t border-sidebar-border p-4">
          <Button 
            onClick={signOut}
            variant="ghost" 
            className={cn(
              "text-white hover:bg-sidebar-accent w-full justify-start",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5 mr-2" />
            {!collapsed && <span>Sair</span>}
          </Button>
        </div>
      </div>
      
      {/* Main content margin */}
      <div className={cn(
        "transition-all duration-300",
        collapsed ? "ml-16" : "ml-64"
      )}>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  collapsed: boolean;
}

const SidebarItem = ({ to, icon, text, collapsed }: SidebarItemProps) => {
  return (
    <li>
      <Link 
        to={to} 
        className={cn(
          "flex items-center px-4 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors mx-2",
          collapsed && "justify-center px-2"
        )}
      >
        <span className="h-5 w-5 mr-2">{icon}</span>
        {!collapsed && <span>{text}</span>}
      </Link>
    </li>
  );
};

export default Sidebar;
