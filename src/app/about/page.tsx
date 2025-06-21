import Image from "next/image";
import { Gem, Leaf, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold">About RAANI</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the story behind our handcrafted jewelry, where passion for artistry and commitment to quality shine in every piece.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground mb-4">
              RAANI was born from a simple idea: to create beautiful, high-quality earrings that are both timeless and accessible. What started as a small passion project in a home studio has blossomed into a brand beloved by customers worldwide.
            </p>
            <p className="text-muted-foreground">
              We believe that jewelry is more than just an accessory; it's a form of self-expression. Our designs are inspired by nature, art, and the stories of the strong, elegant individuals who wear them.
            </p>
          </div>
          <div className="animate-in fade-in slide-in-from-right-8 duration-700">
            <Image
              src="https://images.unsplash.com/photo-1596525793393-a2d5e2380387?q=80&w=600&h=400&auto=format&fit=crop"
              alt="Artisan crafting jewelry"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Our Values</h2>
          <p className="mt-2 text-muted-foreground">The principles that guide our craft.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            <div className="flex flex-col items-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Ethical Sourcing
              </h3>
              <p className="text-muted-foreground">
                We are committed to using materials from responsible suppliers who share our dedication to sustainability and ethical practices.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <Gem className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Superior Craftsmanship
              </h3>
              <p className="text-muted-foreground">
                Our skilled artisans pour their hearts into every piece, ensuring meticulous attention to detail and exceptional quality.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Community Focused
              </h3>
              <p className="text-muted-foreground">
                We strive to build a community that celebrates individuality, creativity, and the shared love of beautiful things.
              </p>
            </div>
          </div>
      </div>
    </div>
  );
}
