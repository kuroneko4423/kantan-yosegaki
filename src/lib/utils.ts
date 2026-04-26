import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function formatJapaneseDate(value: string | Date): string {
  const d = typeof value === "string" ? new Date(value) : value;
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

export function daysUntil(value: string | Date): number {
  const d = typeof value === "string" ? new Date(value) : value;
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.ceil((d.getTime() - now.getTime()) / oneDay);
}
