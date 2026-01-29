"use client"
import Link from "next/link";
import React, { useMemo, useState } from "react";

type CategoryOption = {
  label: string;
  value: string;
};

type SearchAndFiltersSectionProps = {
  categories?: CategoryOption[];
  onSearch?: (params: {
    query: string;
    category: string;
    minRating: number;
    maxPrice: number;
  }) => void;
};

const SearchAndFiltersSection: React.FC<SearchAndFiltersSectionProps> = ({
  categories = [
    { label: "All Categories", value: "all" },
    { label: "Programming", value: "programming" },
    { label: "Math", value: "math" },
    { label: "English", value: "english" },
    { label: "Science", value: "science" },
  ],
  onSearch,
}) => {
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [minRating, setMinRating] = useState<number>(4);
  const [maxPrice, setMaxPrice] = useState<number>(50);

  const canSubmit = useMemo(() => maxPrice >= 0 && minRating >= 0 && minRating <= 5, [maxPrice, minRating]);

  const handleSubmit = (): void => {
    if (!canSubmit) return;
    onSearch?.({ query: query.trim(), category, minRating, maxPrice });
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-900">Find the right tutor</h2>
          <p className="text-sm text-gray-600">
            Search by subject or tutor name, then narrow down with category, rating, and price.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border bg-gray-50 p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end">
            {/* Query */}
      

            {/* Button */}
            <div className="md:col-span-12">
              <Link href="/tutors"
                type="button"
               
                
                className="mt-2 w-full rounded-xl cursor-pointer bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Search Tutors
              </Link>
            </div>
          </div>

          {/* <p className="mt-3 text-xs text-gray-500">
            Filters are examples—আপনি আপনার API অনুযায়ী values map করতে পারবেন।
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default SearchAndFiltersSection;
