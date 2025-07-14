"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

import { addToWishlist, removeFromWishlist, getWishlistByUser } from "@/service/wishlist"; // 👈 include getWishlistByUser

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();
  const defaultImage = "https://placehold.co/600x600.png";

  const images = Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : [defaultImage];
  const firstImage = images[0];
  const secondImage = images[1];
  const hasMultipleImages = images.length > 1;

  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null;
  const userId = user?.UserID;

  // 👇 Load wishlist status on mount
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!userId) return;

      try {
        const wishlist = await getWishlistByUser(userId);
        const isInWishlist = wishlist.some((item: any) => item.ProductID === product.id);
        setIsWishlisted(isInWishlist);
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    checkWishlistStatus();
  }, [userId, product.id]);

  const handleWishlistClick = async (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  if (!userId) {
    toast({
      title: "Please log in",
      description: "You must be logged in to use the wishlist.",
      variant: "destructive"
    });
    return;
  }

  try {
    console.log(`📦 UserID: ${userId}, ProductID: ${product.id}`);

    if (!isWishlisted) {
      console.log("➡️ Adding to wishlist");
      await addToWishlist(userId, product.id);
      setIsWishlisted(true);
      toast({ title: "❤️ Added to Wishlist", description: product.name });
    } else {
      console.log("❌ Removing from wishlist");
      const response = await removeFromWishlist(userId, product.id);
      console.log("🧾 Remove response:", response);
      setIsWishlisted(false);
      toast({ title: "🗑️ Removed from Wishlist", description: product.name });
    }
  } catch (err) {
    toast({
      title: "❌ Error",
      description: "Failed to update wishlist",
      variant: "destructive"
    });
    console.error("❌ Wishlist error:", err);
  }
};


  return (
    <Link href={`/products/${product.id}`} className="group block outline-none" tabIndex={0}>
      <Card 
        className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 focus-within:shadow-xl focus-within:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          <div className="relative aspect-[1/1.1] w-full">
            <Image
              src={firstImage}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-all duration-500 ease-in-out group-hover:scale-105",
                isHovered && hasMultipleImages ? "opacity-0" : "opacity-100"
              )}
            />

            {hasMultipleImages && secondImage && (
              <Image
                src={secondImage}
                alt={`${product.name} alternate view`}
                fill
                className={cn(
                  "object-cover transition-all duration-500 ease-in-out group-hover:scale-105",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
              />
            )}

            <Button
              size="icon"
              variant="secondary"
              aria-label="Add to wishlist"
              className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
              onClick={handleWishlistClick}
            >
              <Heart className={cn(
                "h-5 w-5 transition-all duration-300", 
                isWishlisted 
                  ? "fill-red-500 text-red-500 scale-110" 
                  : "text-primary"
              )} />
            </Button>
            {product.isNew && <Badge className="absolute top-3 left-3">New</Badge>}
          </div>
          <div className="p-4 text-center">
            <h3 className="font-semibold font-body text-lg leading-tight">{product.name}</h3>
            <p className="text-muted-foreground mt-1 font-body">
              ${typeof product.price === "number" ? product.price.toFixed(2) : "0.00"}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
