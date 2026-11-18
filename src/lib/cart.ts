"use client";

import { useCallback, useSyncExternalStore } from "react";

export interface CartItem {
  id: string;
  name: string;
  size?: string;
  priceChf: number;
  qty: number;
}

const CART_EVENT = "danino:cart-change";

let cartState: CartItem[] = [];

function emitCartChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CART_EVENT));
}

export function addCartItem(item: Omit<CartItem, "qty">) {
  const key = `${item.id}::${item.size ?? ""}`;
  const existingIdx = cartState.findIndex((c) => `${c.id}::${c.size ?? ""}` === key);
  if (existingIdx >= 0) {
    cartState = cartState.map((c, idx) => (idx === existingIdx ? { ...c, qty: c.qty + 1 } : c));
  } else {
    cartState = [...cartState, { ...item, qty: 1 }];
  }
  emitCartChange();
}

export function removeCartItem(id: string, size?: string) {
  const key = `${id}::${size ?? ""}`;
  const existing = cartState.find((c) => `${c.id}::${c.size ?? ""}` === key);
  if (!existing) return;
  if (existing.qty > 1) {
    cartState = cartState.map((c) =>
      `${c.id}::${c.size ?? ""}` === key ? { ...c, qty: c.qty - 1 } : c,
    );
  } else {
    cartState = cartState.filter((c) => `${c.id}::${c.size ?? ""}` !== key);
  }
  emitCartChange();
}

export function clearCart() {
  cartState = [];
  emitCartChange();
}

function subscribeCart(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CART_EVENT, onStoreChange);
  return () => window.removeEventListener(CART_EVENT, onStoreChange);
}

function getClientCartSnapshot(): CartItem[] {
  return cartState;
}

const EMPTY_CART: CartItem[] = [];
function getServerCartSnapshot(): CartItem[] {
  return EMPTY_CART;
}

export function useTakeAwayCart() {
  const items = useSyncExternalStore(subscribeCart, getClientCartSnapshot, getServerCartSnapshot);

  const totalItems = items.reduce((acc, item) => acc + item.qty, 0);
  const totalChf = items.reduce((acc, item) => acc + item.priceChf * item.qty, 0);

  const summaryString = items
    .map((i) => `${i.qty}× ${i.name}${i.size ? ` (${i.size})` : ""} [CHF ${(i.priceChf * i.qty).toFixed(2)}]`)
    .join(", ");

  const add = useCallback((item: Omit<CartItem, "qty">) => addCartItem(item), []);
  const remove = useCallback((id: string, size?: string) => removeCartItem(id, size), []);
  const clear = useCallback(() => clearCart(), []);

  return {
    items,
    totalItems,
    totalChf,
    summaryString,
    add,
    remove,
    clear,
  };
}
