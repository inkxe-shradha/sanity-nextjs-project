'use client';
import { ALL_CATEGORIES_QUERYResult } from '@/sanity.types';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import FilterLabel from './FilterLabel';
import { Input } from '../ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { COLORS, MATERIALS, SORT_OPTIONS } from '@/lib/constants/filter';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';


interface ProductFiltersProps {
    categories: ALL_CATEGORIES_QUERYResult;
}


const ProductFilters = ({ categories }: ProductFiltersProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();


    const currentSearch = searchParams.get("q") ?? "";
    const currentCategory = searchParams.get("category") ?? "";
    const currentColor = searchParams.get("color") ?? "";
    const currentMaterial = searchParams.get("material") ?? "";
    const currentSort = searchParams.get("sort") ?? "name";
    const urlMinPrice = Number(searchParams.get("minPrice")) || 0;
    const urlMaxPrice = Number(searchParams.get("maxPrice")) || 5000;
    const currentInStock = searchParams.get("inStock") === "true";

    const [priceRange, setPriceRange] = React.useState<[number, number]>([urlMinPrice, urlMaxPrice]);

    // * sync local state when URL changes
    React.useEffect(() => {
        setPriceRange([urlMinPrice, urlMaxPrice]);
    }, [urlMinPrice, urlMaxPrice]);


    //  * Check which filters are active
    const isSearchActive = !!currentSearch;
    const isCategoryActive = !!currentCategory;
    const isColorActive = !!currentColor;
    const isMaterialActive = !!currentMaterial;
    const isPriceActive = urlMinPrice > 0 || urlMaxPrice < 5000;
    const isInStockActive = currentInStock;

    // * Set active filter values
    const hasActiveFilters = isSearchActive || isCategoryActive || isColorActive || isMaterialActive || isPriceActive || isInStockActive;

    // * Count the active filters 
    const activeFilterCount = [
        isSearchActive,
        isCategoryActive,
        isColorActive,
        isMaterialActive,
        isPriceActive,
        isInStockActive
    ].filter(Boolean).length;
    /**
     * * Update the URL search params
     * @param updates - An object containing the search params to update.
     * If a value is null, empty string, or zero, the param will be removed.
     */

    const updateParams = useCallback((updates: Record<string, string | number | null>) => {
        // Implementation for updating params will go here
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {

            if (value === null || value === '' || value === 0) {
                params.delete(key);
            } else params.set(key, String(value));
        })
        router.push(`?${params.toString()}`, { scroll: false });
    }, [router, searchParams]);

    /**
     * * Handle search form submission
     * @param e Form control event
     */

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("search") as string;
        updateParams({ q: query || null });
    }

    /**
     * * Clear all active filters and reset to default state
     */
    const handleClearFilters = () => {
        router.push('/', { scroll: false });
    }


    /**
     * * Clear a single filter based on its key
     * @param key - The key of the filter to clear
     */
    const clearSingleFilter = (key: string) => {
        if (key === "price") {
            updateParams({ minPrice: null, maxPrice: null });
        } else {
            updateParams({ [key]: null });
        }
    };



    return (
        <div className="space-y-6 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            {/* Clear Filters - Show at top when active */}
            {hasActiveFilters && (
                <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-950">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                            {activeFilterCount}{" "}
                            {activeFilterCount === 1 ? "filter" : "filters"} applied
                        </span>
                    </div>
                    <Button
                        size="sm"
                        onClick={handleClearFilters}
                        className="w-full bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
                    >
                        <X className="mr-2 h-4 w-4" />
                        Clear All Filters
                    </Button>
                </div>
            )}

            {/* Search */}
            <div>
                <FilterLabel isActive={isSearchActive} filterKey="search" clearSingleFilter={clearSingleFilter}>
                    Search
                </FilterLabel>
                <form onSubmit={handleSearchSubmit} className="flex gap-2">
                    <Input
                        type='search'
                        name="search"
                        placeholder="Search products..."
                        defaultValue={currentSearch}
                        className={`flex-1 ${isSearchActive
                            ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                            : ""
                            }`}
                    />
                    <Button type="submit" size="sm">
                        Search
                    </Button>
                </form>
            </div>

            {/* Category */}
            <div>
                <FilterLabel isActive={isCategoryActive} filterKey="category" clearSingleFilter={clearSingleFilter}>
                    Category
                </FilterLabel>
                <Select
                    value={currentCategory || "all"}
                    onValueChange={(value) =>
                        updateParams({ category: value === "all" ? null : value })
                    }
                >
                    <SelectTrigger
                        className={
                            isCategoryActive
                                ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                                : ""
                        }
                    >
                        <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                            <SelectItem key={category._id} value={category.slug ?? ""}>
                                {category.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>


            {/* Color */}
            <div>
                <FilterLabel isActive={isColorActive} filterKey="color" clearSingleFilter={clearSingleFilter}>
                    Color
                </FilterLabel>
                <Select
                    value={currentColor || "all"}
                    onValueChange={(value) =>
                        updateParams({ color: value === "all" ? null : value })
                    }
                >
                    <SelectTrigger
                        className={
                            isColorActive
                                ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                                : ""
                        }
                    >
                        <SelectValue placeholder="All Colors" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Colors</SelectItem>
                        {COLORS.map((color) => (
                            <SelectItem key={color.value} value={color.value}>
                                {color.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Material */}
            <div>
                <FilterLabel isActive={isMaterialActive} filterKey="material" clearSingleFilter={clearSingleFilter}>
                    Material
                </FilterLabel>
                <Select
                    value={currentMaterial || "all"}
                    onValueChange={(value) =>
                        updateParams({ material: value === "all" ? null : value })
                    }
                >
                    <SelectTrigger
                        className={
                            isMaterialActive
                                ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                                : ""
                        }
                    >
                        <SelectValue placeholder="All Materials" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Materials</SelectItem>
                        {MATERIALS.map((material) => (
                            <SelectItem key={material.value} value={material.value}>
                                {material.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Price Ranger */}
            <div>
                <FilterLabel isActive={isPriceActive} filterKey="price" clearSingleFilter={clearSingleFilter}>
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </FilterLabel>
                <Slider
                    min={0}
                    max={5000}
                    step={100}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    onValueCommit={([min, max]) =>
                        updateParams({
                            minPrice: min > 0 ? min : null,
                            maxPrice: max < 5000 ? max : null,
                        })
                    }
                    className={`mt-4 ${isPriceActive ? "**:[[role=slider]]:border-amber-500 **:[[role=slider]]:ring-amber-500" : ""}`}
                />
            </div>

            {/* In Stock Only */}
            <div>
                <label className="flex cursor-pointer items-center gap-3">
                    <input
                        type="checkbox"
                        checked={currentInStock}
                        onChange={(e) =>
                            updateParams({ inStock: e.target.checked ? "true" : null })
                        }
                        className="h-5 w-5 rounded border-zinc-300 text-amber-500 focus:ring-amber-500 dark:border-zinc-600 dark:bg-zinc-800"
                    />
                    <span
                        className={`text-sm font-medium ${isInStockActive
                            ? "text-zinc-900 dark:text-zinc-100"
                            : "text-zinc-700 dark:text-zinc-300"
                            }`}
                    >
                        Show only in-stock
                        {isInStockActive && (
                            <Badge className="ml-2 h-5 bg-amber-500 px-1.5 text-xs text-white hover:bg-amber-500">
                                Active
                            </Badge>
                        )}
                    </span>
                </label>
            </div>

            {/* Sorting */}
            <div>
                <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Sort By
                </span>
                <Select
                    value={currentSort}
                    onValueChange={(value) => updateParams({ sort: value })}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {SORT_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default ProductFilters