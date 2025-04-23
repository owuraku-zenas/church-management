"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/members"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname?.startsWith("/members") ? "text-primary" : "text-muted-foreground",
        )}
      >
        Members
      </Link>
      <Link
        href="/events"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname?.startsWith("/events") ? "text-primary" : "text-muted-foreground",
        )}
      >
        Events
      </Link>
      <Link
        href="/attendance"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname?.startsWith("/attendance") ? "text-primary" : "text-muted-foreground",
        )}
      >
        Attendance
      </Link>
      <Link
        href="/departments"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname?.startsWith("/departments") ? "text-primary" : "text-muted-foreground",
        )}
      >
        Departments
      </Link>
      <Link
        href="/cell-groups"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname?.startsWith("/cell-groups") ? "text-primary" : "text-muted-foreground",
        )}
      >
        Cell Groups
      </Link>
      <Link
        href="/reports"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname?.startsWith("/reports") ? "text-primary" : "text-muted-foreground",
        )}
      >
        Reports
      </Link>
    </nav>
  )
}
