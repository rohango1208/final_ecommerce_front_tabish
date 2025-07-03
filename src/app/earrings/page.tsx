//earings page.tsx

"use client";

import { useEffect, useState } from "react";
import { fetchAllProducts } from "@/service/products";
import type { Product } from "@/lib/types";

import { ProductCard } from "@/components/shared/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function EarringsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const loadProducts = async () => {
    try {
      const data = await fetchAllProducts(); // calling backend API
      console.log("Raw data:", data);

      const mappedProducts = data.map((item: any) => ({
        id: item.id,
        name: item.Name,                  // Fix case
        price: item.Price,                // Fix case
        images: [item.ImageURL],          // Convert single image to array
        description: item.Description,    // Fix case
        category: item.Category || "",    // Optional: category if needed
      }));

      console.log("Mapped products:", mappedProducts);
      setProducts(mappedProducts);
    } catch (error) {
      console.error("❌ Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  loadProducts();
}, []);

  return (
    <div className="bg-secondary/20">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold">
            Earrings Collection
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated selection of handcrafted earrings, designed to
            add a touch of elegance to any occasion.
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <p className="text-muted-foreground">{products.length} products</p>
          <div className="flex items-center gap-2">
            <Label htmlFor="sort-by" className="font-bold">Sort by:</Label>
            <Select defaultValue="featured">
              <SelectTrigger id="sort-by" className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-in fade-in slide-in-from-bottom-5 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

