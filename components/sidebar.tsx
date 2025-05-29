"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Map, Info, Users, Settings, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const menuItems = [
    { id: "map", label: "Map", icon: Map, href: "/map" },
    { id: "about", label: "About Us", icon: Info, href: "/about" },
    { id: "users", label: "Users", icon: Users, href: "/users" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ]

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-blue-600 dark:bg-blue-800 text-white shadow-lg z-40">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Navigation</h2>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href ? "bg-blue-700 dark:bg-blue-900" : "hover:bg-blue-700 dark:hover:bg-blue-900"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Theme Toggle */}
        <div className="mt-8 pt-6 border-t border-blue-500">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Theme</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-white hover:bg-blue-700 dark:hover:bg-blue-900"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
