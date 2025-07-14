"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  getCartByUser,
  updateCartItem,
  removeFromCart,
} from "@/service/cart";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Get user info (add console)
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};
  const userId = user?.UserID || user?.id;
  console.log("🧾 Logged in user:", user);
  console.log("🧾 User ID:", userId);

  useEffect(() => {
    const loadCart = async () => {
      if (!userId) {
        console.warn("❌ No userId found");
        return;
      }

      try {
        console.log("📦 Fetching cart for userId:", userId);
        const items = await getCartByUser(userId);
        console.log("✅ Cart items fetched from API:", items);
        setCartItems(items);
      } catch (err) {
        console.error("❌ Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [userId]);

  // 🔁 Quantity change
  const handleUpdateQuantity = async (productId: number, newQty: number) => {
    if (newQty < 1) return;
    try {
      console.log("🔁 Updating quantity:", { productId, newQty });
      await updateCartItem(userId, productId, newQty);
      setCartItems((prev) =>
        prev.map((item) =>
          item.ProductID === productId ? { ...item, Quantity: newQty } : item
        )
      );
    } catch (err) {
      console.error("❌ Failed to update quantity", err);
    }
  };

  // 🗑 Remove from cart
  const handleRemoveItem = async (productId: number) => {
    try {
      console.log("🗑 Removing product:", productId);
      await removeFromCart(userId, productId);
      setCartItems((prev) =>
        prev.filter((item) => item.ProductID !== productId)
      );
    } catch (err) {
      console.error("❌ Failed to remove item", err);
    }
  };

  // 🧮 Totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.Price * item.Quantity,
    0
  );
  const shipping = 5.0;
  const total = subtotal + shipping;

  console.log("🛒 Final cartItems in UI:", cartItems);

  if (loading) return <p className="text-center py-20">Loading cart...</p>;

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
              {cartItems.map((item) => (
                <div
                  key={item.ProductID}
                  className="flex items-center gap-4 bg-card p-4 rounded-lg shadow-sm"
                >
                  <Image
                    src={item.ImageURL}
                    alt={item.ProductName}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.ProductName}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.Price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleUpdateQuantity(item.ProductID, item.Quantity - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.Quantity}
                      className="h-8 w-14 text-center"
                      readOnly
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleUpdateQuantity(item.ProductID, item.Quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-semibold w-20 text-right">
                    ${(item.Price * item.Quantity).toFixed(2)}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveItem(item.ProductID)}
                  >
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
