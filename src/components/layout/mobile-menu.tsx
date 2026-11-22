"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogIn, LogOut, Menu } from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Button,
  buttonVariants,
} from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "cn"
import { getInitials } from "@/lib/utils"
import { BrandLogo, BrandName } from "./brand"
import { mainNavItems, protectedNavItems, type NavItem, type NavbarUser } from "./nav-items"
import { ThemeToggle } from "./theme-toggle"

const sheetLinkClass =
  "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

function SheetNavLink({ item, active }: { item: NavItem; active: boolean }) {
  const { href, label, icon: Icon } = item
  return (
    <SheetClose
      render={
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={cn(sheetLinkClass, active && "bg-accent text-primary")}
        />
      }
    >
      <Icon />
      {label}
    </SheetClose>
  )
}

interface MobileMenuProps {
  user?: NavbarUser | null
  onLogout?: () => void | Promise<void>
  className?: string
}

export function MobileMenu({ user, onLogout, className }: MobileMenuProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (!onLogout || isLoggingOut) return
    setIsLoggingOut(true)
    try {
      await onLogout()
      setOpen(false)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            className={className}
          />
        }
      >
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[85%] gap-0 p-0 sm:max-w-sm"
      >
        <SheetHeader className="border-b border-border px-4 py-4 pr-12">
          <SheetTitle className="flex items-center gap-2.5">
            <BrandLogo />
            <BrandName />
          </SheetTitle>
        </SheetHeader>

        <nav
          aria-label="Mobile navigation"
          className="flex flex-col gap-1 p-3"
        >
          {mainNavItems.map((item) => (
            <SheetNavLink
              key={item.href}
              item={item}
              active={pathname === item.href}
            />
          ))}
          {user
            ? protectedNavItems.map((item) => (
              <SheetNavLink
                key={item.href}
                item={item}
                active={pathname === item.href}
              />
            ))
            : null}
        </nav>

        <div className="mt-auto space-y-3 border-t border-border p-3">
          {user ? (
            <>
              <div className="flex items-center gap-3 px-1">
                <Avatar>
                  {user.image ? (
                    <AvatarImage src={user.image} alt="" />
                  ) : null}
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full justify-center gap-1.5"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut />
                Logout
              </Button>
            </>
          ) : (
            <SheetClose
              nativeButton={false}
              render={
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ className: "w-full justify-center" }),
                  )}
                />
              }
            >
              <LogIn />
              Login
            </SheetClose>
          )}
          <ThemeToggle variant="item" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
