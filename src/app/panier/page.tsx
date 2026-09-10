import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata: Metadata = {
  title: "Panier",
  description: "Ton panier.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartPageContent />;
}
