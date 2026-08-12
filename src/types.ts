export type CategoryType = 'all' | 'inside' | 'outside' | 'bundles';

export type SkinConcern = 
  | 'Aging & Fine Lines'
  | 'Dullness & Radiance'
  | 'Skin Barrier & Redness'
  | 'Dryness & Dehydration'
  | 'Acne & Blemishes'
  | 'Elasticity & Firmness';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  type: 'inside' | 'outside' | 'bundle';
  categoryName: string;
  price: number;
  subscriptionPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  secondaryImage?: string;
  badge?: string;
  concerns: SkinConcern[];
  description: string;
  keyIngredients: string[];
  fullIngredients: string;
  howToUse: string;
  insideBenefit?: string;
  outsideBenefit?: string;
  volumeOrCount: string;
  isBestseller?: boolean;
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionId: string;
}

export interface QuizOption {
  id: string;
  label: string;
  description?: string;
  iconName?: string;
  concernWeight?: Partial<Record<SkinConcern, number>>;
  preferredType?: 'inside' | 'outside' | 'bundle';
}

export interface QuizQuestion {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  options: QuizOption[];
}

export interface QuizResult {
  primaryConcern: SkinConcern;
  secondaryConcern?: SkinConcern;
  skinType: string;
  recommendedBundle: Product;
  recommendedInsideProduct: Product;
  recommendedOutsideProduct: Product;
  routineTitle: string;
  routineDescription: string;
  personalizedTips: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  isSubscription: boolean;
  frequencyDays?: number;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  content: string;
  concernAddressed: SkinConcern;
  productUsed: string;
  userAvatar?: string;
}
