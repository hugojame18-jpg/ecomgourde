# SUGAR — site e-commerce (démo)

Marque de gourdes réutilisables + pods aromatiques.
Baseline : **« Boire plus. Sans compromis. »**

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion.

## Commandes

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm start
```

```bash
npm run typecheck
```

## Architecture

```
src/
├── app/                        # Routes (App Router)
│   ├── layout.tsx              # Fonts, SEO global, providers, navbar/footer
│   ├── page.tsx                # Landing page (toutes les sections)
│   ├── produit/[slug]/         # Page produit (SSG pour tous les produits)
│   ├── gourdes | pods | bundles
│   ├── comment-ca-marche | faq | abonnement | contact
│   ├── panier | checkout
│   ├── legal/[slug]            # CGV, confidentialité, mentions légales
│   ├── sitemap.ts | robots.ts
│   └── globals.css             # ⭐ DESIGN SYSTEM (couleurs, radius, ombres, typo)
├── data/                       # ⭐ TOUT LE CONTENU MODIFIABLE
│   ├── site.ts                 # Nom de marque, seuils, promo bar, réseaux, stats
│   ├── products.ts             # Catalogue + formules d'abonnement
│   ├── flavors.ts              # Les 7 goûts (couleur, notes, intensité)
│   ├── reviews.ts              # Avis démo + posts UGC
│   └── faq.ts
├── components/
│   ├── ui/                     # Button, Primitives (Price/Rating/Badge/SectionHeading),
│   │                           # QuantitySelector, Faq (FAQItem/FaqList), Reveal
│   ├── layout/                 # Navbar + PromoBar, Footer, Logo, PageHeader
│   ├── cart/                   # CartProvider, CartDrawer (mini-cart), CartPageContent,
│   │                           # CheckoutContent, AddToCartButton, FreeShippingBar
│   ├── product/                # ProductCard, ProductGrid, ProductGallery, ProductDetail,
│   │                           # BundleCard, ReviewCard
│   ├── sections/               # Hero, HowItWorks, Shop, FlavorFinder, Bundles,
│   │                           # Subscription, BeforeAfter, Reviews, Ugc, FaqSection,
│   │                           # FinalCta, NewsletterForm, NewsletterPopup
│   └── visuals/ProductVisual   # Visuels produits vectoriels (placeholders)
└── lib/                        # types.ts, format.ts
```

## Fonctionnalités

- Panier complet : mini-cart latéral animé, page panier, persistance `localStorage`,
  barre de livraison offerte, recommandations « Complète ton panier ».
- Page produit : galerie + zoom, choix de couleur, composition des goûts (3/5/6 pods),
  quantité, sticky add-to-cart mobile, specs, FAQ, avis, produits similaires.
- Abonnement : 3 formules sélectionnables, ajout au panier.
- Conversion : promo bar rotative, popup newsletter (18 s + exit intent desktop),
  badges, économies visualisées, CTA sticky.
- SEO : metadata par page, JSON-LD Organization + Product, sitemap, robots.

## À remplacer avec ton vrai branding

| Quoi | Où |
| --- | --- |
| Nom de marque, baseline, domaine, seuils, réseaux | `src/data/site.ts` |
| Logo | `src/components/layout/Logo.tsx` |
| Couleurs, typo, radius, ombres | `src/app/globals.css` (bloc `@theme`) |
| Polices | `src/app/layout.tsx` (`next/font/google`) |
| Produits, prix, textes, abonnements | `src/data/products.ts` |
| Goûts et couleurs associées | `src/data/flavors.ts` |
| Avis clients (actuellement fictifs) | `src/data/reviews.ts` |
| Vidéos UGC | `ugcPosts[].video` dans `src/data/reviews.ts` |
| FAQ | `src/data/faq.ts` |
| Textes juridiques | `src/app/legal/[slug]/page.tsx` |

### Images produits

Les 4 photos de gourdes sont dans `public/produits/` :
`bottle-lilas.png`, `bottle-noir.png`, `bottle-rose.png`, `bottle-bleu.png`.

Chaque coloris est déclaré dans `bottleColors` (`src/data/products.ts`) avec :
- `hex` : la couleur de la pastille de sélection
- `accent` : le fond exact de la photo (sert de fond de carte, raccord invisible)
- `image` : la photo affichée quand ce coloris est sélectionné

Les 4 pods de la gamme ont aussi une vraie photo — `pod-fruits-rouges.png`, `pod-citron.png`,
`pod-orange.png`, `pod-tropical.png` — issues d'un même visuel découpé automatiquement.
Menthe, Pêche et Pastèque ont été retirées du catalogue faute de photo correspondante
(le site n'affiche que des produits avec une vraie photo). Trois photos non utilisées
(noix de coco, cerise/grenade, myrtille/mûre) attendent dans `public/produits/pods-extra/`
si tu veux les publier comme nouveaux goûts — il suffit d'ajouter l'entrée correspondante
dans `src/data/flavors.ts` et `src/data/products.ts`.

Bundles et accessoires utilisent encore des visuels vectoriels générés.
Pour ajouter une photo à un produit, remplis son tableau `images` :

```ts
images: ["/produits/pod-nouveau-gout.jpg"],
```

`ProductMedia` bascule seul sur `next/image` et la galerie affiche toutes les
images du tableau. Pour un domaine externe, ajoute-le dans `remotePatterns`
(`next.config.ts`).

## Points à brancher avant mise en production

- **Paiement** : `/checkout` est une maquette, aucun champ bancaire n'est collecté.
  Intègre Stripe / Shopify / PayPal à l'étape 3 du formulaire.
- **Newsletter** : `NewsletterForm` ne fait qu'un `setState`. Branche Klaviyo / Brevo.
- **Avis** : contenu de démonstration, clairement signalé sur le site. À remplacer par
  de vrais avis vérifiés avant toute mise en ligne commerciale.
- **Chiffres marketing** (« 38 000 personnes », « −340 bouteilles ») : illustratifs.
- **Textes juridiques** : à faire rédiger/valider.
