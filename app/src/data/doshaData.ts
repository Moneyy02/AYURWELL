import type { DoshaDetails, DoshaType } from '@/types';

export { type DoshaType };

export const doshaDetails: Record<DoshaType, DoshaDetails> = {
  Vata: {
    color: "text-blue-500",
    borderColor: "border-blue-200",
    bgColor: "bg-blue-50",
    image: "/images/Vata.png",
    elements: "Air & Ether",
    content: {
      "Qualities": "Light, Cold, Dry, Rough, Mobile, Subtle, Clear.",
      "Balanced State": "Creative, energetic, and enthusiastic. Possesses a natural ability to express and communicate.",
      "Imbalanced State": "Prone to anxiety, fear, and insomnia. May experience dry skin, constipation, and restlessness.",
      "Balancing Tips": "Maintain a regular routine, stay warm, and consume warm, nourishing, slightly oily foods. Gentle exercise like yoga and tai chi is beneficial."
    },
    description: "You are energetic, creative, and lively. Your challenge is to stay grounded and maintain a routine.",
    lifestyle: [
      "Follow a consistent daily routine.",
      "Eat warm, cooked foods and avoid cold, raw items.",
      "Practice calming activities like meditation or gentle yoga.",
      "Stay warm and avoid cold, windy environments."
    ],
    products: ["Ashwagandha", "Triphala"]
  },
  Pitta: {
    color: "text-amber-500",
    borderColor: "border-amber-200",
    bgColor: "bg-amber-50",
    image: "/images/Pitta.png",
    elements: "Fire & Water",
    content: {
      "Qualities": "Hot, Sharp, Light, Liquid, Spreading, Oily.",
      "Balanced State": "Intelligent, focused, and a strong leader. Possesses a sharp wit and a good appetite.",
      "Imbalanced State": "Can become irritable, angry, and judgmental. Prone to inflammation, skin rashes, and acidity.",
      "Balancing Tips": "Stay cool and avoid excessive heat. Favor sweet, bitter, and astringent foods. Practice moderation in all activities and cultivate patience."
    },
    description: "You are intelligent, focused, and a natural leader. Your goal is to manage your intensity and stay cool.",
    lifestyle: [
      "Avoid excessive heat and sun exposure.",
      "Incorporate cooling foods like cucumber, mint, and cilantro into your diet.",
      "Practice moderation and avoid overworking.",
      "Engage in calming activities like swimming or walking in nature."
    ],
    products: ["Turmeric Capsules", "Neem Capsules"]
  },
  Kapha: {
    color: "text-emerald-500",
    borderColor: "border-emerald-200",
    bgColor: "bg-emerald-50",
    image: "/images/Kapha.png",
    elements: "Earth & Water",
    content: {
      "Qualities": "Heavy, Slow, Cool, Oily, Smooth, Dense, Stable.",
      "Balanced State": "Calm, loving, and compassionate. Strong stamina and a stable, grounded personality.",
      "Imbalanced State": "May experience sluggishness, weight gain, and congestion. Can be prone to possessiveness and resistance to change.",
      "Balancing Tips": "Seek regular stimulation and exercise. Eat light, dry, and warm foods with pungent, bitter, and astringent tastes. Avoid heavy, oily foods and daytime naps."
    },
    description: "You are calm, loving, and grounded. Your key is to stay active and seek new experiences.",
    lifestyle: [
      "Engage in vigorous, regular exercise.",
      "Eat light, warm, and spicy foods.",
      "Avoid heavy, oily, and cold foods, especially dairy.",
      "Wake up early and avoid daytime naps."
    ],
    products: ["Triphala Powder", "Guduchi"]
  }
};

export const dietCharts: Record<DoshaType, Record<string, { B: string; L: string; D: string }>> = {
  Vata: {
    Monday: { B: "Warm oatmeal with cinnamon", L: "Mung bean soup with basmati rice", D: "Baked sweet potato with ghee" },
    Tuesday: { B: "Scrambled eggs with avocado", L: "Chicken and vegetable stew", D: "Creamy tomato soup" },
    Wednesday: { B: "Rice pudding with cardamom", L: "Lentil shepherd's pie", D: "Steamed asparagus and carrots" },
    Thursday: { B: "Warm almond milk with dates", L: "Quinoa with roasted root vegetables", D: "Pumpkin soup" },
    Friday: { B: "Cooked apples with cloves", L: "Salmon with lemon and dill", D: "Pasta with a creamy sauce" },
    Saturday: { B: "Buckwheat porridge", L: "Hearty beef and barley soup", D: "Kitchari (mung beans and rice)" },
    Sunday: { B: "Warm smoothie with ginger", L: "Shepherd's pie with sweet potato topping", D: "Simple vegetable broth" }
  },
  Pitta: {
    Monday: { B: "Apple and pear slices", L: "Chickpea salad with cucumber", D: "Steamed vegetables with rice" },
    Tuesday: { B: "Toast with coconut oil", L: "Black bean burgers on lettuce", D: "Lentil soup" },
    Wednesday: { B: "Date and fig smoothie", L: "Quinoa salad with mint", D: "Zucchini noodles with a light sauce" },
    Thursday: { B: "Oatmeal with sweet berries", L: "Turkey wraps with plenty of greens", D: "Steamed broccoli and cauliflower" },
    Friday: { B: "Fresh mango slices", L: "Sushi with avocado and cucumber", D: "Mung dahl with cilantro" },
    Saturday: { B: "Rice flakes porridge", L: "Cooling cucumber and avocado soup", D: "Baked fish with herbs" },
    Sunday: { B: "Coconut yogurt with granola", L: "Large green salad with sunflower seeds", D: "Simple rice and steamed asparagus" }
  },
  Kapha: {
    Monday: { B: "Stewed apples with cinnamon", L: "Spicy lentil soup", D: "Roasted vegetables with pepper" },
    Tuesday: { B: "Dry toast with honey", L: "Large salad with a light vinaigrette", D: "Steamed greens with ginger" },
    Wednesday: { B: "Hot barley cereal", L: "Quinoa with steamed broccoli", D: "Mung bean soup" },
    Thursday: { B: "Puffed rice with ginger tea", L: "Chicken and vegetable skewers", D: "Baked fish with lemon" },
    Friday: { B: "A piece of fruit (e.g., apple)", L: "Black bean soup with extra spice", D: "Stir-fried vegetables (no oil)" },
    Saturday: { B: "Corn grits with black pepper", L: "Spicy chickpea and tomato stew", D: "Millet with steamed kale" },
    Sunday: { B: "Buckwheat pancakes (no syrup)", L: "Vegetable broth with lots of spices", D: "Grilled vegetables" }
  }
};
