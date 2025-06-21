import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gem, Leaf, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/product-card";
import { products } from "@/lib/placeholder-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1611652022417-a52137e757c5?q=80&w=1920&h=1080&auto=format&fit=crop"
            alt="Elegant earrings on a minimalist background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 p-4 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            Discover Your Style
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto font-body font-light">
            Your Destination for Handcrafted Elegance
          </p>
          <Button
            asChild
            className="mt-8 rounded-full px-8 py-6 text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
          >
            <Link href="/earrings">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured Collection
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              Explore our hand-picked selection of best-selling designs, each
              with its own unique story.
            </p>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-1">
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-14" />
            <CarouselNext className="mr-14" />
          </Carousel>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Promise</h2>
            <p className="mt-2 text-muted-foreground">
              Elegance, Quality, and Care in Every Piece
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            <div className="flex flex-col items-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Sustainably Sourced
              </h3>
              <p className="text-muted-foreground">
                We use ethically sourced, high-quality materials to ensure
                beauty and responsibility go hand-in-hand.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <Gem className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Artisan Crafted
              </h3>
              <p className="text-muted-foreground">
                Each pair of earrings is meticulously handcrafted by skilled
                artisans, making every piece unique.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Lasting Quality
              </h3>
              <p className="text-muted-foreground">
                Our commitment to quality means your favorite pieces are
                designed to be cherished for years to come.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
