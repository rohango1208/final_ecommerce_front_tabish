//product-card.tsx

"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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
  : ["https://placehold.co/600x600.png"];
  const firstImage = images[0] || defaultImage;
const secondImage = images[1];
const hasMultipleImages = images.length > 1;


  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);
    toast({
      title: newWishlistState ? "Added to Wishlist" : "Removed from Wishlist",
      description: product.name,
    });
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
