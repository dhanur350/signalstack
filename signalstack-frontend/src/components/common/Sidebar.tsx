'use client';

import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: ROUTES.dashboard, label: 'Dashboard' },
    { href: ROUTES.employees, label: 'Employees' },
    { href: ROUTES.analytics, label: 'Analytics' },
    { href: ROUTES.aiInsights, label: 'AI Insights' },
    { href: ROUTES.settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-gray-800 dark:bg-gray-900 text-white p-4 flex flex-col">
      <div className="text-2xl font-bold mb-6">HR System</div>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.href} className="mb-2">
              <Link
                href={item.href}
                className={cn(
                  "block py-2 px-3 rounded-md hover:bg-gray-700",
                  pathname === item.href ? "bg-gray-700 text-indigo-400" : "text-gray-300"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
