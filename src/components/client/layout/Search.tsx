"use client";

import { forwardRef, useEffect, useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { sections } from "@/lib/client/searchData";

const Search = forwardRef<HTMLInputElement>((_, ref) => {
  const { t } = useTranslation();
  const [isMac, setIsMac] = useState(false);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsMac(navigator.userAgent.includes("Mac"));
  }, []);

  // Filter sections and items based on query
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const matches: {
      sectionId: string;
      sectionLabel: string;
      itemId: string;
      itemLabel: string;
    }[] = [];

    sections.forEach((section) => {
      // Check if section label matches
      if (section.label.toLowerCase().includes(q)) {
        section.items.forEach((item) => {
          matches.push({
            sectionId: section.id,
            sectionLabel: section.label,
            itemId: item.id,
            itemLabel: item.label,
          });
        });
      } else {
        // Check individual items
        section.items.forEach((item) => {
          if (item.label.toLowerCase().includes(q)) {
            matches.push({
              sectionId: section.id,
              sectionLabel: section.label,
              itemId: item.id,
              itemLabel: item.label,
            });
          }
        });
      }
    });

    return matches;
  }, [query]);

  const handleResultClick = (itemId: string) => {
    // Dispatch the same event used by the sidebar for navigation
    const event = new CustomEvent("sidebar:navigate", {
      detail: { sectionId: itemId },
    });
    window.dispatchEvent(event);
    setQuery("");
    setIsFocused(false);
  };

  // Highlight matching text in results
  const highlightMatch = (text: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query.trim()})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-primary/30 text-inherit rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  const showDropdown = isFocused && query.trim().length > 0;

  return (
    <div className="relative">
      <label className="input input-ghost bg-base-300">
        <FaSearch />
        <input
          ref={ref}
          type="search"
          className="grow"
          placeholder={t("search.placeholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        />
        <kbd className="kbd kbd-sm">{isMac ? "⌘" : "Ctrl"}</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </label>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-base-200 rounded-lg shadow-lg border border-base-300 max-h-64 overflow-y-auto z-50">
          {results.length > 0 ? (
            <ul className="menu menu-sm p-2">
              {results.map((result, index) => (
                <li key={`${result.sectionId}-${result.itemId}-${index}`}>
                  <button
                    onClick={() => handleResultClick(result.itemId)}
                    className="flex flex-col items-start"
                  >
                    <span className="text-xs text-base-content/50">
                      {highlightMatch(result.sectionLabel)}
                    </span>
                    <span>{highlightMatch(result.itemLabel)}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-base-content/50">
              {t("search.noResults")}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

Search.displayName = "Search";

export default Search;
