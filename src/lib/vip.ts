"use client";

import { useCallback, useSyncExternalStore } from "react";

const VIP_EVENT = "atelier:vip-change";
const PARAM_KEYS = ["para", "marca", "restaurante", "vip"] as const;

export function sanitizeVipName(raw: string | null | undefined): string {
  if (!raw) return "";
  return raw
    .replace(/[<>"{}|\\^`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 48);
}

export function readVipFromLocation(): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  for (const key of PARAM_KEYS) {
    const val = sanitizeVipName(params.get(key));
    if (val) return val;
  }
  return "";
}

export function setVipRestaurantName(name: string) {
  if (typeof window === "undefined") return;
  const clean = sanitizeVipName(name);
  const url = new URL(window.location.href);
  PARAM_KEYS.forEach((k) => url.searchParams.delete(k));
  if (clean) {
    url.searchParams.set("para", clean);
  }
  window.history.replaceState(null, "", url.toString());
  window.dispatchEvent(new CustomEvent<{ name: string }>(VIP_EVENT, { detail: { name: clean } }));
}

function subscribeVip(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(VIP_EVENT, onStoreChange);
  window.addEventListener("popstate", onStoreChange);
  return () => {
    window.removeEventListener(VIP_EVENT, onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
  };
}

function getServerVipSnapshot(): string {
  return "";
}

export function useVipRestaurant(): [string, (name: string) => void] {
  const vipName = useSyncExternalStore(subscribeVip, readVipFromLocation, getServerVipSnapshot);

  const updateVip = useCallback((name: string) => {
    setVipRestaurantName(name);
  }, []);

  return [vipName, updateVip];
}
