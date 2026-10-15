"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "@/lib/auth-client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, UserIcon } from "lucide-react"

const avatarsizes = (size = "md") => {
  const map = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }
  return map[size] || map.md
}

const getUserDetails = (name, email) => {
  if (name) {
    return name
      .split("")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (email) {
    return email.slice(0, 2).toUpperCase()
  }

  return "U"
}

const formatMemberSince = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}

export const UserButton = ({
  user,
  showBadge = false,
  badgeText = "Pro",
  badgeVariant = "default",
  size = "md",
  showEmail = true,
  showMemberSince = true,
  onProfile,
  onBilling,
  onSettings,
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const safeUser = user || {}

  if (!user) return null

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => router.push("/sign-in"),
        },
      })
    } catch (err) {
      console.error("logout err", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full focus:outline-none">
        <div className={`relative ${avatarsizes(size)} rounded-full p-0 hover:bg-accent`}>
          <Avatar className={avatarsizes(size)}>
            <AvatarImage src={safeUser.image || ""} alt={safeUser.name || "user avatar"} />
            <AvatarFallback className="bg-primary text-primary-foreground font-medium">
              {getUserDetails(safeUser.name, safeUser.email)}
            </AvatarFallback>
          </Avatar>

          {showBadge && (
            <Badge
              variant={badgeVariant}
              className="absolute -bottom-1 -right-1 h-5 px-1 text-xs"
            >
              {badgeText}
            </Badge>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.image || ""} alt={user.name || "user avatar"} />
                  <AvatarFallback className="bg-primary text-primary-foreground font-medium text-lg">
                    {getUserDetails(user.name, user.email)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                  {showEmail && user.email && (
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  )}
                  {showBadge && (
                    <Badge variant={badgeVariant} className="w-fit">
                      {badgeText}
                    </Badge>
                  )}
                </div>
              </div>

              {showMemberSince && (
                <p className="text-xs text-muted-foreground">Member since {formatMemberSince(user.createdAt)}</p>
              )}
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {onProfile && (
          <DropdownMenuItem onClick={onProfile} className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
        )}

        {onBilling && (
          <DropdownMenuItem onClick={onBilling} className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            Billing
          </DropdownMenuItem>
        )}

        {onSettings && (
          <DropdownMenuItem onClick={onSettings} className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoading}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isLoading ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { UserButton as userButton }
