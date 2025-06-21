import { ProductCard } from "@/components/shared/product-card";
import { products } from "@/lib/placeholder-data";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const wishlistItems = products.slice(0, 3); // Placeholder

  return (
    <div className="bg-secondary/20">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold">Your Wishlist</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            The beautiful pieces you've saved.
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {wishlistItems.map((product, index) => (
              <div
                key={product.id}
                className="animate-in fade-in slide-in-from-bottom-5 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
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
