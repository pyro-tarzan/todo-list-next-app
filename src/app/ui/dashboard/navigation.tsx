"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  CheckSquare, 
  Calendar, 
  Star, 
  Clock,
  Archive,
  Settings
} from 'lucide-react';

import styles from "@/app/ui/dashboard/navigation.module.scss"

const SideNavigation = () => {
	const pathname = usePathname();

	const navItems = [
		{ 
			name: 'All Tasks', 
			icon: <CheckSquare className="w-5 h-5" />, 
			path: '/dashboard',
		},
		{ 
			name: 'Today', 
			icon: <Calendar className="w-5 h-5" />, 
			path: '/dashboard/today',
		},
		{ 
			name: 'Important', 
			icon: <Star className="w-5 h-5" />, 
			path: '/dashboard/important',
		},
		{ 
			name: 'Upcoming', 
			icon: <Clock className="w-5 h-5" />, 
			path: '/dashboard/upcoming',
		},
		{ 
			name: 'Archived', 
			icon: <Archive className="w-5 h-5" />, 
			path: '/dashboard/archived',
		}
	];

	return (
		<div className={`flex flex-col ${styles.navigation}`}>
		{/* Header */}
		<div className="p-6">
			<Link
			href="/"
			passHref
			>
			<Image 
				src="/images/apple-touch-icon.png"
				alt="ToDo Logo"
				width={180}
				height={180}
				priority
				style={{cursor: "pointer", objectFit: "cover", height: "100px", borderRadius: "10px"}}
			/>
			</Link>
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
						? styles.isActive 
						: styles.idle
					}`}
					>
					<div className="flex items-center gap-3">
						{item.icon}
						<span className="font-medium">{item.name}</span>
					</div>
					</Link>
				</li>
				);
			})}
			</ul>
		</nav>

		{/* Footer */}
		<div className={`p-4 ${styles.borderT}  border-slate-200`}>
			<Link 
			href="/dashboard/settings"
			className={`flex items-center gap-3 px-4 py-3 rounded-lg ${styles.bgHover} transition-colors`}
			>
			<Settings className="w-5 h-5" />
			<span className="font-medium">Settings</span>
			</Link>
		</div>
		</div>
	);
};

export default SideNavigation;