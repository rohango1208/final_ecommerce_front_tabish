import Image from "next/image";
import { Gem, Leaf, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold">About RAANI</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the story behind our handcrafted jewelry, where passion meets precision and elegance becomes timeless.
          </p>
        </div>

        {/* Our Journey */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground mb-4">
              RAANI began as a heartfelt dream in a modest home studio — a desire to reimagine jewelry as not just an accessory, but an experience. What started with a single sketch and a handful of tools has grown into a globally adored brand, loved by those who value individuality and craftsmanship.
            </p>
            <p className="text-muted-foreground mb-4">
              Each piece we create is rooted in our belief that jewelry should tell a story — your story. Our collections are inspired by nature’s grace, traditional artistry, and the modern muse — you.
            </p>
            <p className="text-muted-foreground">
              Today, RAANI stands as a symbol of empowerment, beauty, and timeless design. Whether it's a gift or a personal keepsake, every RAANI piece is crafted to make you feel seen, celebrated, and radiant.
            </p>
          </div>
          <div className="animate-in fade-in slide-in-from-right-8 duration-700">
            <Image
              src="https://images.unsplash.com/photo-1635686616203-ff9281969531?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Artisan crafting jewelry"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Our Values</h2>
          <p className="mt-2 text-muted-foreground">Timeless principles that guide our craft and community.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
          <div className="flex flex-col items-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
              <Leaf className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ethical Sourcing</h3>
            <p className="text-muted-foreground">
              We partner with responsible suppliers who share our commitment to sustainability, ensuring every piece reflects care — for people and the planet.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
              <Gem className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Superior Craftsmanship</h3>
            <p className="text-muted-foreground">
              Every detail matters. Our artisans invest skill, soul, and tradition into each creation, making it not just jewelry — but legacy.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
            <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Focused</h3>
            <p className="text-muted-foreground">
              RAANI is more than a brand — it’s a growing family. We celebrate individuality, empower artisans, and connect with customers through shared stories of strength and elegance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
