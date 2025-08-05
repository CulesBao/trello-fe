<template>
  <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 max-w-screen-2xl items-center">
      <div class="mr-4 hidden md:flex">
        <a class="mr-6 flex items-center space-x-2" href="/">
          <img src="@/assets/trello_logo.png" alt="Logo" class="h-8 w-8" />
          <span class="hidden font-bold sm:inline-block">
            Trello
          </span>
        </a>
      </div>

      <div class="flex flex-1 items-center justify-between space-x-2 md:justify-center">
        <div class="w-full flex-1 md:w-auto md:flex-none">
          <Combobox by="label">
            <ComboboxAnchor>
              <div class="relative w-full max-w-sm items-center">
                <ComboboxInput class="pl-9" :display-value="(val) => val?.label ?? ''" placeholder="Search" />
                  <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                    <Search class="size-4 text-muted-foreground" />
                  </span>
              </div>
            </ComboboxAnchor>
          </Combobox>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <!-- User menu -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="relative h-8 w-8 rounded-full hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              data-testid="user-avatar-button"
              aria-label="User menu"
              type="button"
            >
              <Avatar class="h-8 w-8 pointer-events-none">
                <AvatarImage src="/placeholder-avatar.jpg" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User class="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard class="mr-2 h-4 w-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings class="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Keyboard class="mr-2 h-4 w-4" />
                <span>Keyboard shortcuts</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem>
              <LogOut class="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {
  Search,
  User,
  Settings,
  CreditCard,
  Keyboard,
  LogOut
} from 'lucide-vue-next'
import { Combobox, ComboboxAnchor, ComboboxInput } from '@/components/ui/combobox'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
</script>
