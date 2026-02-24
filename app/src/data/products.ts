import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    price: 450,
    image: "/images/ashwagandha.png",
    description: "Ancient adaptogenic herb that helps reduce stress and anxiety while boosting energy levels.",
    category: "Supplements",
    benefits: ["Reduces stress & anxiety", "Boosts energy", "Improves sleep quality"],
    recommendedFor: ["Vata", "Kapha"]
  },
  {
    id: "turmeric",
    name: "Turmeric Capsules",
    price: 300,
    image: "/images/turmeric.png",
    description: "Powerful anti-inflammatory spice with curcumin for joint health and immunity.",
    category: "Supplements",
    benefits: ["Anti-inflammatory", "Joint support", "Immune booster"],
    recommendedFor: ["Pitta", "Kapha"]
  },
  {
    id: "triphala",
    name: "Triphala Powder",
    price: 375,
    image: "/images/triphala.png",
    description: "Traditional Ayurvedic blend of three fruits for digestive health and detoxification.",
    category: "Digestive Health",
    benefits: ["Digestive support", "Detoxification", "Eye health"],
    recommendedFor: ["Vata", "Pitta", "Kapha"]
  },
  {
    id: "brahmi",
    name: "Brahmi Oil",
    price: 400,
    image: "/images/brahmi.png",
    description: "Nourishing hair oil that promotes mental clarity and healthy hair growth.",
    category: "Oils",
    benefits: ["Hair growth", "Mental clarity", "Stress relief"],
    recommendedFor: ["Vata", "Pitta"]
  },
  {
    id: "shatavari",
    name: "Shatavari",
    price: 550,
    image: "/images/ashwagandha.png",
    description: "Rejuvenating herb especially beneficial for women's health and hormonal balance.",
    category: "Supplements",
    benefits: ["Hormonal balance", "Reproductive health", "Immunity"],
    recommendedFor: ["Vata", "Pitta"]
  },
  {
    id: "guduchi",
    name: "Guduchi",
    price: 480,
    image: "/images/triphala.png",
    description: "Immunity-boosting herb known as 'Amrita' - the nectar of immortality.",
    category: "Immunity",
    benefits: ["Immune support", "Detoxification", "Fever management"],
    recommendedFor: ["Kapha", "Pitta"]
  },
  {
    id: "neem",
    name: "Neem Capsules",
    price: 320,
    image: "/images/turmeric.png",
    description: "Powerful blood purifier and skin health promoter with antibacterial properties.",
    category: "Skin Health",
    benefits: ["Blood purification", "Skin health", "Antibacterial"],
    recommendedFor: ["Pitta", "Kapha"]
  },
  {
    id: "amla",
    name: "Amla Powder",
    price: 250,
    image: "/images/brahmi.png",
    description: "Vitamin C-rich superfood for hair, skin, and overall vitality.",
    category: "Supplements",
    benefits: ["Rich in Vitamin C", "Hair health", "Anti-aging"],
    recommendedFor: ["Vata", "Pitta", "Kapha"]
  }
];

export const getProductsByDosha = (dosha: string) => {
  return products.filter(p => p.recommendedFor.includes(dosha as 'Vata' | 'Pitta' | 'Kapha'));
};
