//products(id) page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Star } from "lucide-react";

import type { Product } from "@/lib/types";
import { fetchProductById } from "@/service/products";
import { useCart } from "@/hooks/use-cart";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/shared/product-card";
import { fetchAllProducts } from "@/service/products";

function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const params = useParams();
  const { id } = params;
  const { addToCart } = useCart();

  useEffect(() => {
    if (typeof id !== "string") return;

    const loadProduct = async () => {
      setLoading(true);
      try {
        const productData = await fetchProductById(id);
        if (!productData) {
          notFound();
          return;
        }
        setProduct(productData);

        // Fetch related products (e.g., from the same category, excluding the current one)
        const allProducts = await fetchAllProducts();
        const related = allProducts
          .filter(
            (p) => p.category === productData.category && p.id !== productData.id
          )
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (error) {
        console.error("Failed to fetch product", error);
        // Handle error state, maybe show a toast
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading || !product) {
    return <ProductPageSkeleton />;
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const images = Array.isArray(product.images) ? product.images : [];

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square w-full relative overflow-hidden rounded-lg shadow-lg">
               {images.length > 0 && (
                <Image
                    src={images[activeImage]}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-300"
                />
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`aspect-square relative rounded-md overflow-hidden transition-all duration-200 ${
                    index === activeImage
                      ? "ring-2 ring-primary ring-offset-2"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 text-muted-foreground fill-muted" />
              </div>
              <span className="text-muted-foreground text-sm">(14 reviews)</span>
            </div>
            <p className="text-3xl font-semibold mt-4">${product.price.toFixed(2)}</p>
            <Separator className="my-6" />
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
            <Separator className="my-6" />

            {/* Actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" className="flex-grow" onClick={handleAddToCart}>
                <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

       {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-secondary/20 py-16 md:py-24">
            <div className="container mx-auto px-4">
                 <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">You Might Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

function ProductPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        <div className="flex flex-col gap-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="grid grid-cols-4 gap-2">
            <Skeleton className="aspect-square rounded-md" />
            <Skeleton className="aspect-square rounded-md" />
            <Skeleton className="aspect-square rounded-md" />
            <Skeleton className="aspect-square rounded-md" />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-8 w-1/3" />
          <Separator className="my-6" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <Separator className="my-6" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 flex-grow" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
