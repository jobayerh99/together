"use client"

import { SearchIcon, XIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EVENT_CATEGORIES, type EventCategory } from "@/lib/event-schema"
import { cn } from "cn"

/** Sort orders offered by the toolbar. */
export type EventSort = "date-asc" | "date-desc" | "title-asc"

export const EVENT_SORT_OPTIONS: ReadonlyArray<{ value: EventSort; label: string }> = [
  { value: "date-asc", label: "Date: soonest first" },
  { value: "date-desc", label: "Date: latest first" },
  { value: "title-asc", label: "Title: A–Z" },
]

/** Toolbar state. `category: "all"` means no category filtering. */
export type EventFilterState = {
  query: string
  category: "all" | EventCategory
  sort: EventSort
}

/** State every event matches before any narrowing. */
export const DEFAULT_EVENT_FILTERS: EventFilterState = {
  query: "",
  category: "all",
  sort: "date-asc",
}

const CATEGORY_ITEMS: ReadonlyArray<{ value: string; label: string }> = [
  { value: "all", label: "All Categories" },
  ...EVENT_CATEGORIES.map((category) => ({ value: category, label: category })),
]

interface EventFiltersProps {
  value: EventFilterState
  onChange: (next: EventFilterState) => void
}

/**
 * Search, category, and sort controls for the upcoming-events list.
 * Fully controlled: the parent owns the filter state.
 */
export function EventFilters({ value, onChange }: EventFiltersProps) {
  const hasActiveFilters =
    value.query !== DEFAULT_EVENT_FILTERS.query ||
    value.category !== DEFAULT_EVENT_FILTERS.category ||
    value.sort !== DEFAULT_EVENT_FILTERS.sort

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      {/* Search by title or location */}
      <div className="relative w-full lg:flex-1">
        <SearchIcon
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          value={value.query}
          onChange={(event) => onChange({ ...value, query: event.target.value })}
          placeholder="Search events by title or location..."
          aria-label="Search events by title or location"
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Category filter */}
        <Select
          value={value.category}
          items={CATEGORY_ITEMS}
          onValueChange={(next) => {
            if (next === null) return
            onChange({ ...value, category: next as EventFilterState["category"] })
          }}
        >
          <SelectTrigger aria-label="Filter by category" className="w-[190px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORY_ITEMS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort order */}
        <Select
          value={value.sort}
          items={EVENT_SORT_OPTIONS}
          onValueChange={(next) => {
            if (next === null) return
            onChange({ ...value, sort: next as EventSort })
          }}
        >
          <SelectTrigger aria-label="Sort events" className="w-[190px]">
            <SelectValue placeholder="Sort events" />
          </SelectTrigger>
          <SelectContent>
            {EVENT_SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button
          type="button"
          onClick={() => onChange(DEFAULT_EVENT_FILTERS)}
          disabled={!hasActiveFilters}
          className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
        >
          <XIcon aria-hidden="true" className="size-4" />
          Clear filters
        </button>
      </div>
    </div>
  )
}
