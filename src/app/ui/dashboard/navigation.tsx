"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  CheckSquare, 
  Calendar, 
  Star, 
  Clock,
  Archive,
  Settings,
  PlusCircle
} from 'lucide-react';

const SideNavigation = () => {
  const pathname = usePathname();

  const navItems = [
    { 
      name: 'All Tasks', 
      icon: <CheckSquare className="w-5 h-5" />, 
      path: '/dashboard',
      count: 12
    },
    { 
      name: 'Today', 
      icon: <Calendar className="w-5 h-5" />, 
      path: '/dashboard/today',
      count: 5
    },
    { 
      name: 'Important', 
      icon: <Star className="w-5 h-5" />, 
      path: '/dashboard/important',
      count: 3
    },
    { 
      name: 'Upcoming', 
      icon: <Clock className="w-5 h-5" />, 
      path: '/dashboard/upcoming',
      count: 8
    },
    { 
      name: 'Archived', 
      icon: <Archive className="w-5 h-5" />, 
      path: '/dashboard/archived',
      count: 24
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 w-64 border-r border-slate-200">
      {/* Header */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-slate-800">2Do</h2>
        <button className="mt-6 flex items-center gap-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <PlusCircle className="w-5 h-5" />
          <span>New Task</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    isActive 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {item.count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <Link 
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default SideNavigation;