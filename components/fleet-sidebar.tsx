"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useMemo } from "react";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";

export function FleetSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Parse existing query params
  const currentMakes = searchParams.get("make")?.split(",") || [];
  const currentTypes = searchParams.get("type")?.split(",") || [];
  const currentTransmission = searchParams.get("transmission") || "";

  const activeCount = useMemo(
    () => currentMakes.length + currentTypes.length + (currentTransmission ? 1 : 0),
    [currentMakes, currentTypes, currentTransmission],
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const toggleArrayFilter = (key: string, value: string, currentSelections: string[]) => {
    let newSelections = [...currentSelections];
    if (newSelections.includes(value)) {
      newSelections = newSelections.filter((item) => item !== value);
    } else {
      newSelections.push(value);
    }
    
    router.push(pathname + "?" + createQueryString(key, newSelections.join(",")));
  };

  const filterContent = (
    <>
      <div>
        <h3 className="font-semibold text-foreground mb-4">Brands</h3>
        <div className="flex flex-col gap-3">
          {["Porsche", "BMW", "Audi", "Mercedes-Benz"].map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={currentMakes.includes(brand)}
                onChange={() => toggleArrayFilter("make", brand, currentMakes)}
                className="w-4 h-4 rounded border-gray-300 text-foreground focus:ring-foreground accent-foreground cursor-pointer"
              />
              <span className="text-sm text-foreground/80 group-hover:text-foreground">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-border/60" />

      <div>
        <h3 className="font-semibold text-foreground mb-4">Car Type</h3>
        <div className="flex flex-col gap-3">
          {["SUV", "Sports", "Sedan", "Luxury"].map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={currentTypes.includes(type)}
                onChange={() => toggleArrayFilter("type", type, currentTypes)}
                className="w-4 h-4 rounded border-gray-300 text-foreground focus:ring-foreground accent-foreground cursor-pointer"
              />
              <span className="text-sm text-foreground/80 group-hover:text-foreground">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-border/60" />

      <div>
        <h3 className="font-semibold text-foreground mb-4">Transmission</h3>
        <div className="flex flex-col gap-3">
          {["Automatic", "Manual"].map((trans) => (
            <label key={trans} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="transmission"
                checked={currentTransmission === trans}
                onChange={() => router.push(pathname + "?" + createQueryString("transmission", trans))}
                className="w-4 h-4 text-foreground focus:ring-foreground accent-foreground cursor-pointer"
              />
              <span className="text-sm text-foreground/80 group-hover:text-foreground">{trans}</span>
            </label>
          ))}
          <button 
            type="button" 
            onClick={() => router.push(pathname + "?" + createQueryString("transmission", ""))}
            className="text-xs text-muted-foreground hover:text-foreground text-left mt-1"
          >
            Clear Transmission
          </button>
        </div>
      </div>
      
      <div className="h-px w-full bg-border/60" />

      <button 
        type="button"
        onClick={() => router.push(pathname)}
        className="w-full py-2 bg-secondary/50 hover:bg-secondary text-sm font-medium rounded-lg transition-colors border border-border"
      >
        Clear All Filters
      </button>
    </>
  );

  return (
    <>
      <div className="flex md:hidden w-full">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-between w-full bg-card border border-border/60 rounded-[1.25rem] px-5 py-3 text-sm font-medium text-foreground"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal size={16} />
            Filters
            {activeCount > 0 && (
              <span className="bg-foreground text-background text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {activeCount}
              </span>
            )}
          </span>
          {mobileOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-8 bg-card p-5 border border-border/60 rounded-[1.25rem] md:hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Filters</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close filters"
            >
              <X size={18} />
            </button>
          </div>
          {filterContent}
        </div>
      )}

      <aside className="hidden md:flex md:w-64 shrink-0 flex-col gap-8 bg-card p-6 border border-border/60 rounded-[1.25rem] sticky top-24 h-fit">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Filters</span>
          {activeCount > 0 && (
            <span className="bg-foreground text-background text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {activeCount}
            </span>
          )}
        </div>
        {filterContent}
      </aside>
    </>
  );
}
