'use client';

import { CartContext, useCartState } from '@/hooks/use-cart';
import type { ReactNode } from 'react';

export function CartProvider({ children }: { children: ReactNode }) {
  const cartState = useCartState();
  return (
    <CartContext.Provider value={cartState}>
      {children}
    </CartContext.Provider>
  );
}
