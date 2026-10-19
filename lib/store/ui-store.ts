"use client";

import { create } from "zustand";

interface UIState {
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()((set, get) => ({
  mobileNavOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  sidebarCollapsed: false,
  toggleSidebar: () =>
    set({ sidebarCollapsed: !get().sidebarCollapsed }),
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
}));
