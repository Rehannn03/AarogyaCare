'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Home,
  Users,
  MessageSquare,
  Calendar,
  FileText,
  Settings,
  Menu,
  LogOut,
  User,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const SidebarItem = ({ icon, label, href, active,Classname="" }) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white ',
        active ? 'bg-sidebar-accent text-white' : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50',Classname
      )}
    >
      <div className="w-5 h-5">{icon}</div>
      <span>{label}</span>
      {active && <ChevronRight className="ml-auto h-4 w-4" />}
    </Link>
  );
};

const DashboardLayout = ({ children }) => {
    const user ={
        role: 'patient',
    }
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getDoctorMenuItems = () => [
    { icon: <Home size={20} />, label: 'Dashboard', href: '/dietician' },
    { icon: <Users size={20} />, label: 'Patients', href: '/dietician/doctor/patients' },
    { icon: <FileText size={20} />, label: 'Diet Plans', href: '/dietician/doctor/diet-plans' },
    { icon: <MessageSquare size={20} />, label: 'Messages', href: '/dietician/doctor/messages' },
    { icon: <Calendar size={20} />, label: 'Appointments', href: '/dietician/doctor/appointments' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', href: '/dietician/doctor/analytics' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/dietician/doctor/settings' },
  ];

  const getPatientMenuItems = () => [
    { icon: <Home size={20} />, label: 'Dashboard', href: '/dietician' },
    { icon: <User size={20} />, label: 'My Profile', href: '/dietician/patient/profile' },
    { icon: <FileText size={20} />, label: 'My Diet Plan', href: '/dietician/patient/diet-plans' },
    { icon: <MessageSquare size={20} />, label: 'Messages', href: '/dietician/patient/messages' },
    { icon: <Calendar size={20} />, label: 'Appointments', href: '/dietician/patient/appointments' },
    { icon: <BarChart3 size={20} />, label: 'My Progress', href: '/dietician/patient/progress' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/dietician/patient/settings' },
  ];

  const getAdminMenuItems = () => [
    { icon: <Home size={20} />, label: 'Dashboard', href: '/dashboard' },
    { icon: <Users size={20} />, label: 'Manage Users', href: '/users' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/settings' },
  ];

  const getMenuItems = () => {
    if (!user) return [];
    switch (user.role) {
      case 'doctor':
        return getDoctorMenuItems();
      case 'patient':
        return getPatientMenuItems();
      case 'admin':
        return getAdminMenuItems();
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-blue-500 border-r">
        <div className="p-4 border-b border-sidebar-border">
        <Image 
      src="/ArogayaCareLogo.svg" 
      width={1000} height={1000} 
      alt="Logo" 
      className="w-[200px] sm:w-[180px] md:w-[160px] lg:w-[140px] xl:w-[200px] h-auto object-cover"
    /> 
          <p className="text-md text-center text-sidebar-foreground/80">Nutrition Management</p>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={pathname === item.href}
              className="hover:bg-blue-500/50 hover:text-white"
            />
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback className="bg-sidebar-accent text-white">
                {user?.name?.substring(0, 2).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white truncate max-w-[120px]">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/80 capitalize">{user?.role}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start text-white border-sidebar-border hover:bg-sidebar-accent bg-red-500 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4 " />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetContent
        side="left"
            className="bg-blue-500 border-r p-0 w-64 data-[state=open]:animate-slide-in-left data-[state=closed]:animate-slide-out-left transition-all duration-300 ease-in-out"
>
          <div className="p-4 border-b border-sidebar-border">
            <h1 className="text-xl font-bold text-white">HealthPathway</h1>
            <p className="text-sm text-sidebar-foreground/80">Nutrition Management</p>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => (
              <div onClick={() => setIsMobileMenuOpen(false)} key={item.href}>
                <SidebarItem
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  active={pathname === item.href}
                />
              </div>
            ))}
          </nav>
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback className="bg-sidebar-accent text-white">
                  {user?.name?.substring(0, 2).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white truncate max-w-[120px]">{user?.name}</p>
                <p className="text-xs text-sidebar-foreground/80 capitalize">{user?.role}</p>
              </div>
            </div>
            <Button
              variant="destructive"
              className="w-full bg-red-600 justify-start text-white border-sidebar-border hover:bg-sidebar-accent hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden bg-white p-4 shadow-sm flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">HealthPathway</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback>
                    {user?.name?.substring(0, 2).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex bg-white p-4 shadow-sm justify-end">
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <div onClick={()=>{console.log("clicked");
              }} variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
                
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback>
                    {user?.name?.substring(0, 2).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer hover:bg-slate-300 rounded-md">Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer hover:bg-slate-300 rounded-md">Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-slate-300 rounded-md">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
