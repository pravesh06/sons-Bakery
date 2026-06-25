import { Cake, GalleryItem, Testimonial } from './types';

export const cakesData: Cake[] = [
  {
    id: 'red-velvet',
    name: 'Red Velvet',
    price: 499,
    description: 'A timeless classic with cocoa-infused sponge and luscious cream cheese frosting.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS75CRFacJUghZeFTbBSIL0V8jSDQXWNPH_KmWSj6wU-JVOhD4qy8BEJrcD-Q4ngMoTFuYi9Xea3PyhXCTuCEwRBDyw9-35VzD__NzSXHRrdWReQF9H8fDgWDti_5KIA4WM1a9_i_ISyxWMxQu23j6F4YYBTjTmjdlDucCmz4cqgmgpUULFJMOIm83eM2rk7XCtLwpAzLWhU1qgsw92iO6YgHVMyKsa1igvoUDYLzKoY_h9eru_zUPBTtD7vxCyw8KQnSn37EmtX0',
    badge: 'Bestseller',
    ingredients: ['Dutch Cocoa Powder', 'Organic Flour', 'Buttermilk', 'Premium Cream Cheese', 'Natural Madagascar Vanilla'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    nutritionalInfo: {
      calories: 340,
      protein: '5g',
      carbs: '42g',
      fat: '16g',
    }
  },
  {
    id: 'chocolate-truffle',
    name: 'Chocolate Truffle',
    price: 499,
    description: "Deep Belgian chocolate ganache layered with moist devil's food sponge.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASljtL_-aQ6NbpLHVur7ZRKW4ErCCQSqOBX3ioCYoUyHp9KFSVSWly6QO9Qi9WglbqKBl_2SHttX9XxuSla7wXw9S6xtQRHM-o_vHxRr23tr1nHrzC5qjn_M3xAoOZFeNBY23I6tQtUC5HxBDFNDolL6IHuYn6qX_VZdPnokIP_9ekbdMUPifORROLqT54zSFcfzAiDe-0XBMBrWLRa2nT-hN3S3ovweyKyHMjuYmYYKIbImbT0WuWlK8d9BUHYJ14bL9lhu1IBS8',
    ingredients: ['70% Dark Belgian Chocolate', 'Fresh Whipping Cream', 'Espresso Extract', 'Cocoa Nibs', 'Brown Butter'],
    allergens: ['Dairy', 'Gluten', 'Soy'],
    nutritionalInfo: {
      calories: 410,
      protein: '6g',
      carbs: '38g',
      fat: '26g',
    }
  },
  {
    id: 'mango-delight',
    name: 'Mango Delight',
    price: 499,
    description: 'Fresh Alphonso mangoes blended into a light, airy whipped cream delight.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYSKLqMqz4VgeWarIVMR8E-EvhQ0SRWK6ArUUIjwMzJiSJY-NVFgwFcwNT3DRpQPdt97BvumNGB_KxPKl4iBl1-I02SLhyd8hJdtav56U5RkKaNUihd6s0aATBlh07ND3QBD-JKihNPD1YlWydU9FGkKJeJ5nae-6FYP2cPKi_bGuOELtsdkVl-7IlGkyDX9dDHadVxcgxlMIX4hduHAF9b3G9RhWnd9PQU4B0I4Rhf1KJofVpkrF6Zcd-BSC1quCQQRao6moTbCY',
    ingredients: ['Handpicked Alphonso Mangoes', 'Light Dairy Whipped Cream', 'Chiffon Sponge', 'Agar-Agar', 'Organic Cane Sugar'],
    allergens: ['Dairy', 'Gluten'],
    nutritionalInfo: {
      calories: 280,
      protein: '4g',
      carbs: '36g',
      fat: '11g',
    }
  },
  {
    id: 'black-forest',
    name: 'Black Forest',
    price: 499,
    description: 'Traditional German recipe with dark cherries and fresh whipped cream.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiWW6ZH_wO-lbw8x9N_MzwjrtD2xWZK02BUZdj8m_XEYw3XTKprrjRjsMd9q_2Cem77GedWjjdp07Mn6EnnKuKqUsSBVGazvIONU4kxsTdaDKYzdlK6jYF-EOYlZM6kNZ9_4ttj9UZKMPfQpf3ZpymRH_gUIo37lUoZKpVxoWlho-xgW7gdPHd_8fswZAGr_XEnwNz-xT5T0v6kXHwSr7qN5nAIikz4czmFgg-jFJud3a1mQ2bMMgE37qDzDqjQnzVOaYOxQGIG7E',
    ingredients: ['Dark Morello Cherries', 'Kirschwasser Syrup', 'Shaved Dark Chocolate', 'Fresh Cream', 'Chocolate Chiffon'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    nutritionalInfo: {
      calories: 320,
      protein: '5g',
      carbs: '40g',
      fat: '15g',
    }
  },
  {
    id: 'butterscotch-dream',
    name: 'Butterscotch Dream',
    price: 499,
    description: 'Crunchy caramel pralines combined with smooth brown butter sponge.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdpguk4yOip1yxrFY7Jyp7-GcBi6Js6lsgBe896jzQ8bSv8cdsX0ZFIuIqkYn1h-0B815UKCUY1pc-fBLEtGTu_6lsHF4qgVOPIS1yfueWOODRFJuVzPRIrGvmmB9smGaWL4iPuV365wZU77UtvriXyitQ96sKT_nd9PtkI309FHn8EplHCcnGSdtbGKejm2dj7UljLpHGxxNTvqF46WL07kk9_4evh7-AqgfNEr11_uMLXjXb7x89F9YPlaaOwA0fEEUy-YoBlPc',
    ingredients: ['Home-made Butterscotch Sauce', 'Roasted Almond Praline', 'Brown Butter Cake', 'Caramelized Whipped Icing'],
    allergens: ['Dairy', 'Gluten', 'Tree Nuts'],
    nutritionalInfo: {
      calories: 370,
      protein: '4.5g',
      carbs: '45g',
      fat: '18g',
    }
  },
  {
    id: 'strawberry-bliss',
    name: 'Strawberry Bliss',
    price: 499,
    description: 'Light seasonal strawberries whipped into a divine cloud of sponge.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGSI764-Yvm32evsRyoSPqJGnJMulUGv2ezlwt5wjqDThtLMpXBoTr9Zuqc9nKSDqmtD4HNPzkctYfiVR9gva6aAwlgOirbpG2lBF8NlFruCUirKvxO1yKP_4vOtGhI4KDcNJuNjG1HUEO5KElks291fOlVKgQLPNufLsBDwgU1rLI5Ul3IOsJzUCq8Kj0k0z0MvqMcOu3dE4Q6OQjrAU5f9M0KssT5LbhFZrPaI5kf9dqESu5fgGRjJclSM8IG-Um2i-eC9NDDtw',
    badge: 'Seasonal',
    ingredients: ['Fresh Organic Strawberries', 'Strawberry Puree Infusion', 'Mascarpone Whipped Icing', 'Soft Sponge Cake'],
    allergens: ['Dairy', 'Gluten'],
    nutritionalInfo: {
      calories: 290,
      protein: '4g',
      carbs: '37g',
      fat: '12g',
    }
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'g-wedding',
    title: 'The Pearl Cascade Wedding',
    category: 'Wedding Cakes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCKA09netXPT9gldLCO7PhXoZPsrni5TxFYI4krtJ3Fopr8ZXcFy8alAFTAMiH6WHKvfEz6XhZqsTgnkXOjzuXqTSyvPqMbP1HYu9jb0zHl5s08ihoCeZecVwqXYr6ybPdGx-guToi0dCH-d655RRSkIY7qnnfuria8ivJqUPvxyxv_4ng58Tmy-fZloMkmJxqzkozt3BW74mQ642wVfDL-qdG3JW8AjENduMH8_CMWAbYnjAXblmPlBfVeAsCpp2kgggCvIFYqVE',
    description: 'A masterpiece 3-tier celebration cake featuring cascading white sugar roses, hand-rolled pearls, and delicate lace textures.'
  },
  {
    id: 'g-cupcakes',
    title: 'Artisanal Petit Fours',
    category: 'Cupcakes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7SkkcCg8QR4yC5_iQfNXgwk-N8wIXWa-SKqD2QquFCDop3rYJQwEr6FCA689JfSerz_DlgARtBMmtCSpeP4wJvaf_PibwvkHnfxHzDKKllavb5bd_Ygz8TrgTdVFXhN8Zj4VttG_GUXHKEl_hHWFQgXQyKik1I_XI7y7CPLUV7cxq7wbUmQPfoS5TEV33NUgxaTpP0MjtaLJp1c66NnAX-0IixvbcFBzPMs4BAygZdUrxIxihq5vuE3izZsyKUjP9RKlqfA9QvPU',
    description: 'High-end selection of moist cupcakes topped with salted caramel buttercream, edible silver leaf, and gourmet micro-sprinkles.'
  },
  {
    id: 'g-bread',
    title: 'Sourdough Country Loaf',
    category: 'Artisan Breads',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvPy_vrAqprsC2ctMXBGtzqxISsCi4TQpBx2-d7JTFk6Rg7Xht49OeJtVeepeAoqXdLkG_meP88FxWPRyFv6C7eszkr11B6qT0iVnB0Ew2Itk3XJRLmXeUDuKOtAdlJKIMD5kF3m5o3pq5KcHNEV0ZbV4volTDmb4OPagrDs7Jj8Ts8EO5ng2p6_fJf7h3qtR0I8GcVPHf2AQrueTI5lSfwoqcjxi-VQfpCffQqHGRUCCXCDlcdGG3RMp59WbteazkDqIiA061Huo',
    description: 'Wild yeast sourdough, fermented over 36 hours. Crusted with stone-milled wheat flour for a rich, deeply satisfying golden crunch.'
  },
  {
    id: 'g-geometric',
    title: 'Contemporary Marble Geometric',
    category: 'Modern Design',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_dgvk6qYvCXhfAXX3R3dCwvFZvj-ZFsLDElxXtWidSRa2c9fzTyIph-_xGegq6oEEVh2juKO3obomYw2lQMaWODYckqohToIkTQvuz1WSN658AJssFomiyEoOcq7DZAh_tPobh_ytKvsG_E99Rkx-aakC0iUyvWHUdJE4ydx5_0blyzGS3kvv1P0KLieO5yYsoxhNasvA7clkumKQvmQ0lUt6TjVsMGk7dPWCNWpxcRvq-rRtE8aT9yBV1uPsge1gG21iBOgQwa0',
    description: 'Sharp-edge modern cake with a customized marble mirror glaze, chocolate structural ribbons, and a sleek contemporary silhouette.'
  },
  {
    id: 'g-macarons',
    title: 'Chroma Macarons',
    category: 'French Macarons',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBV4_fiqdA0F8pRR8DoCaSRjez60EkOkGJzUNyzMRevzbKe5grRaAL0HPILwfbvBYB73CyYcqesf-zNQeMYw2DmFFP1WP5QcauqOJGOj7RPnvBPn3Weu_2XnbQcM4WTnvU9EtxSvXpqwV47QC6u3RUtraXRXm2e6muKsT4VYhruJBu-fGk83GRtrABb0M84TVSMlCYm7JY0HM68pc__zHT0U39qSsH5o_zmO-DOfPC52PuqR0y6msIefEk7aPMdo5Vkh9Bx9Q3buzw',
    description: 'Crispy almond shells filled with custom French-style chocolate ganaches, tart lemon curd, and salted lavender caramel.'
  },
  {
    id: 'g-interior',
    title: 'The Artisanal Boutique',
    category: 'Sons Boutique',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD18yG6zobtDr41N60j7mssSrPxMuamUGlaX8mwllgmrm7eBQYZSNifMZrAfDuCx9Dew1uXa2-3FPSqsVGdDdAmyAZ7L_ybOcoyrCwSHJwXbdk3iShRpYqVSE8R7zOQkbQIPLBUaLVBTubRo2aj1JGU7hqz8-wnOugwfGT49RjepvushxLyvnzlKf2LujWJr_cfLsIiNP2zCd-gfQgRbCpeoTBXv-8tmSOYR81PE_Rps9eKpITF0nUt6WsAsnalBLhr6l43MzsSQAs',
    description: 'Step into a world of absolute refinement. Our design gallery and bakery showroom feature premium warm wood fixtures and historic accents.'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 't-1',
    name: 'Priya S.',
    text: "The Red Velvet cake was a masterpiece. I've never tasted frosting so balanced. Sons Bakery is now my only choice for family celebrations.",
    rating: 5,
    avatarColor: 'bg-primary-container text-on-primary-container',
    initials: 'PS'
  },
  {
    id: 't-2',
    name: 'Rahul M.',
    text: "Ordered a custom design for my son's first birthday and it exceeded all expectations. Not just beautiful, but incredibly delicious.",
    rating: 5,
    avatarColor: 'bg-surface-variant text-on-surface-variant',
    initials: 'RM'
  },
  {
    id: 't-3',
    name: 'Anjali K.',
    text: "Artisanal excellence indeed. The Mango Delight is seasonal magic. You can taste the freshness in every single bite.",
    rating: 5,
    avatarColor: 'bg-surface-container-high text-primary',
    initials: 'AK'
  }
];
