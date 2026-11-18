"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getInitials } from "@/lib/utils"
import { protectedNavItems, type NavbarUser } from "./nav-items"

interface UserMenuProps {
  user: NavbarUser
  /**
   * Called when the Logout button is pressed. Authentication is added later;
   * pass Better Auth's signOut (plus toast + redirect) here at that point.
   */
  onLogout?: () => void | Promise<void>
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (!onLogout || isLoggingOut) return
    setIsLoggingOut(true)
    try {
      await onLogout()
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <TooltipProvider delay={200}>
          <Tooltip>
            <TooltipTrigger
              aria-label={`Open profile menu for ${user.name}`}
              className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              render={<DropdownMenuTrigger />}
            >
              <Avatar>
                {user.image ? <AvatarImage src={user.image} alt="" /> : null}
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="bottom">{user.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent align="end" sideOffset={8} className="w-60">
          <DropdownMenuLabel className="flex flex-col gap-0.5">
            <span className="truncate text-sm font-semibold">
              {user.name}
            </span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              {user.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {protectedNavItems.map(({ href, label, icon: Icon }) => (
            <DropdownMenuItem key={href} render={<Link href={href} />}>
              <Icon />
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="outline"
        onClick={handleLogout}
        disabled={isLoggingOut}
        aria-label="Log out"
      >
        <LogOut />
        Logout
      </Button>
    </div>
  )
}
