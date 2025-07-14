"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/shared/product-card";
import { Heart } from "lucide-react";
import { getWishlistByUser } from "@/service/wishlist";
import type { Product } from "@/lib/types";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user?.UserID) return;

        const items = await getWishlistByUser(user.UserID);
        setWishlistItems(items);
      } catch (err) {
        console.error("❌ Error loading wishlist", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="bg-secondary/20">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold">Your Wishlist</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            The beautiful pieces you've saved.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading wishlist...</div>
        ) : wishlistItems.length > 0 ? (
        <div className="flex flex-wrap -mx-2">
  {wishlistItems.map((product, index) => {
    const itemCount = wishlistItems.length;

    let basisClass = "basis-full"; // default for 1 item

    if (itemCount === 2) basisClass = "md:basis-1/2";
    else if (itemCount === 3) basisClass = "md:basis-1/3";
    else if (itemCount >= 4) basisClass = "md:basis-1/4";

    return (
      <div
        key={product.ProductID || product.id}
        className={`px-2 mb-6 ${basisClass} animate-in fade-in slide-in-from-bottom-5 duration-500`}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <ProductCard
          product={{
            ...product,
            id: product.ProductID ?? product.id,
            name: product.ProductName ?? product.name,
            price: product.Price ?? product.price,
            images: [product.ImageURL ?? "https://placehold.co/600x600.png"],
          }}
        />
      </div>
    );
  })}
</div>

        ) : (
          <div className="text-center py-16 bg-card rounded-lg shadow-sm">
            <Heart className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground">
              Add your favorite items to your wishlist to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
