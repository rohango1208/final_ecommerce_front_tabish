import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2 } from "lucide-react";

import { products } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const cartItems = products.slice(2, 5).map(p => ({ ...p, quantity: 1 })); // Placeholder

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Shopping Cart</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Review your items and proceed to checkout.
          </p>
        </div>
        
        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-card p-4 rounded-lg shadow-sm">
                  <Image src={item.images[0]} alt={item.name} width={100} height={100} className="rounded-md" />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input type="number" value={item.quantity} className="h-8 w-14 text-center" readOnly />
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm h-fit">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-medium">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                  <p className="font-medium">${shipping.toFixed(2)}</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <Button className="w-full mt-6">Proceed to Checkout</Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild>
                <Link href="/earrings">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
