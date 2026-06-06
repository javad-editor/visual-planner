# Architecture Principles & Guidelines

## 1. Core Philosophy
* **Atomic Modularity:** Build from the smallest units up. No monolithic screens. A screen should simply be a composition of small, purely functional UI components and a single state wrapper.
* **Zero-Spaghetti Rule:** UI components do not fetch data. Store actions handle logic. Screens connect the two.
* **Mobile-First Performance:** Avoid unnecessary re-renders. Use `React.memo`, `useMemo`, and `useCallback` strategically, especially for lists (FlatList) and timeline views.

## 2. UI & Styling (NativeWind / Tailwind)
* **Tailwind Exclusivity:** All styling must be handled via NativeWind. Absolutely no inline styles (`style={{...}}`) or legacy CSS frameworks (e.g., Bootstrap) are permitted.
* **Component-Level Styling:** Use `className` for all layouts, spacing, and typography. 
* **RTL First:** Always use logical properties for layout. Use `start` and `end` instead of `left` and `right` (e.g., `ml-*` becomes `ms-*` for margin-start, `pl-*` becomes `ps-*` for padding-start) to ensure native RTL flipping.

## 3. Localization & Formatting
* **Right-to-Left (RTL) Standard:** The UI must perfectly mirror for RTL languages (like Persian/Arabic). Tooltips, absolute positioning, and directional icons must be tested in RTL mode.
* **Number Formatting:** All numeric values, specifically currencies or premium pricing, must be formatted with localized comma separators (e.g., displaying `63,000` strictly, never `63000`). Use native `Intl.NumberFormat` for consistency.

## 4. State Management (Zustand)
* **Slice Pattern:** The store must be broken into logical slices (e.g., `useScheduleStore`, `useAuthStore`). Do not put all state into one massive store.
* **Selective Selectors:** Always use selectors when extracting state in components to prevent unnecessary re-renders: 
  * *Good:* `const activeTask = useScheduleStore((state) => state.activeTask)`
  * *Bad:* `const { activeTask } = useScheduleStore()`

## 5. Backend (Firebase)
* **Service Isolation:** All Firebase logic (auth, firestore calls) must live inside `/src/services/firebase`. Components should never import Firebase SDK directly.