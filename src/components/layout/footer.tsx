import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Handcrafted elegance for the modern soul.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12.5 12c0-2.5-1.5-5-5-5-3.5 0-5 2.5-5 5 0 2.5 1.5 5 5 5 1.5 0 2.5-1 3-2.5-1.5.5-2.5 0-3-1 0-1.5 1.5-3.5 3-3.5 2 0 3 1.5 3 3.5 0 2-1 4-2.5 4.5-1.5.5-2.5-1.5-2.5-3S11 9.5 12.5 9.5s2.5 1.5 2.5 3.5c0 2.5-1.5 6-6.5 6-4.5 0-7-4-7-7.5C1.5 7 4.5 3 9.5 3s7.5 3 7.5 6c0 1.5-1.5 3.5-1.5 3.5s1 2 1 3c0 2-2 3-3 3-1.5 0-3-1-3-2.5 0-1 1-2.5 1-2.5z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><Link href="/earrings" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Earrings</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">New Arrivals</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Best Sellers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Story</Link></li>
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">Craftsmanship</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe for exclusive offers and stories.
              </p>
              <form className="flex w-full max-w-sm">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none focus:ring-primary focus:border-primary"
                />
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Ethereal Earrings. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
