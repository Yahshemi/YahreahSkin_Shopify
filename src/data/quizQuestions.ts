import { QuizQuestion, SkinConcern, QuizResult, Product } from '../types';
import { PRODUCTS } from './products';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'concern',
    step: 1,
    title: 'What is your primary skin concern today?',
    subtitle: 'We look past surface symptoms to understand what your skin needs both internally and topically.',
    options: [
      {
        id: 'aging',
        label: 'Aging, Fine Lines & Loss of Firmness',
        description: 'Noticeable sagging, lost elasticity, or expression lines.',
        iconName: 'Sparkles',
        concernWeight: { 'Aging & Fine Lines': 5, 'Elasticity & Firmness': 4 },
      },
      {
        id: 'dullness',
        label: 'Dullness, Lack of Glow & Uneven Tone',
        description: 'Skin looks tired, lacks radiance, or has stubborn dark spots.',
        iconName: 'Sun',
        concernWeight: { 'Dullness & Radiance': 5, 'Dryness & Dehydration': 3 },
      },
      {
        id: 'barrier',
        label: 'Sensitivity, Redness & Weak Barrier',
        description: 'Reactive skin, stinging sensations, flushness, or eczema-prone areas.',
        iconName: 'ShieldAlert',
        concernWeight: { 'Skin Barrier & Redness': 5, 'Dryness & Dehydration': 3 },
      },
      {
        id: 'dryness',
        label: 'Dryness, Flakiness & Dehydration',
        description: 'Tight skin texture, flaking patches, or fine dehydration wrinkles.',
        iconName: 'Droplets',
        concernWeight: { 'Dryness & Dehydration': 5, 'Skin Barrier & Redness': 3 },
      },
      {
        id: 'acne',
        label: 'Blemishes, Breakouts & Hormonal Swells',
        description: 'Frequent clogged pores, hormonal jawline spots, or excess sebum.',
        iconName: 'Zap',
        concernWeight: { 'Acne & Blemishes': 5, 'Dullness & Radiance': 2 },
      },
    ],
  },
  {
    id: 'skinType',
    step: 2,
    title: 'How would you describe your skin type?',
    subtitle: 'Understanding your lipid mantle helps us choose the exact balance of serums and oils.',
    options: [
      {
        id: 'dry',
        label: 'Dry to Very Dry',
        description: 'Feels tight throughout the day, absorbs creams quickly.',
      },
      {
        id: 'combination',
        label: 'Combination',
        description: 'Oily T-zone (forehead/nose) with dry or normal cheeks.',
      },
      {
        id: 'sensitive',
        label: 'Sensitive & Reactive',
        description: 'Flushes easily, reacts negatively to heavy fragrances or strong acids.',
      },
      {
        id: 'oily',
        label: 'Oily & Blemish-Prone',
        description: 'Slight shine within hours of cleansing, visible pores.',
      },
      {
        id: 'balanced',
        label: 'Balanced & Normal',
        description: 'Rarely feels overly dry or greasy.',
      },
    ],
  },
  {
    id: 'lifestyle',
    step: 3,
    title: 'Which lifestyle factor affects your daily routine most?',
    subtitle: 'Internal oxidative stress directly manifests as skin inflammation and collagen degradation.',
    options: [
      {
        id: 'stress',
        label: 'High Daily Stress / Sleep Variance',
        description: 'Elevated cortisol depletes trace minerals and causes dullness.',
      },
      {
        id: 'sun',
        label: 'Sun & Outdoor Exposure',
        description: 'UV exposure accelerates photo-aging and breaks down dermal collagen.',
      },
      {
        id: 'diet',
        label: 'Low Water Intake / Coffee & Diet Strain',
        description: 'Inadequate intracellular hydration causes flakiness and fine lines.',
      },
      {
        id: 'city',
        label: 'Urban Pollution & Air Quality',
        description: 'Free radicals damage the skin barrier and cause premature discoloration.',
      },
    ],
  },
  {
    id: 'focus',
    step: 4,
    title: 'How do you prefer to approach your transformation?',
    subtitle: 'Our core philosophy is "As Within, So Without" — dual inside-and-out synergy.',
    options: [
      {
        id: 'synergy',
        label: 'Complete Dual Synergy (Supplement + Topical)',
        description: 'Address root cellular causes inside while soothing & protecting outside.',
        preferredType: 'bundle',
      },
      {
        id: 'inside_first',
        label: 'Inside First (Cellular Nutrition & Minerals)',
        description: 'Focus on collagen, gut-skin axis, and cellular mineral replenishment.',
        preferredType: 'inside',
      },
      {
        id: 'outside_first',
        label: 'Outside First (Topical Serums & Lipid Creams)',
        description: 'Focus on topical lipid barrier repair, niacinamide, and gentle cleansing.',
        preferredType: 'outside',
      },
    ],
  },
];

export function calculateQuizResult(answers: Record<string, string>): QuizResult {
  const chosenConcernId = answers.concern || 'aging';
  const chosenSkinType = answers.skinType || 'combination';

  let primaryConcern: SkinConcern = 'Aging & Fine Lines';
  if (chosenConcernId === 'dullness') primaryConcern = 'Dullness & Radiance';
  if (chosenConcernId === 'barrier') primaryConcern = 'Skin Barrier & Redness';
  if (chosenConcernId === 'dryness') primaryConcern = 'Dryness & Dehydration';
  if (chosenConcernId === 'acne') primaryConcern = 'Acne & Blemishes';

  let recommendedBundle: Product;
  let recommendedInsideProduct: Product;
  let recommendedOutsideProduct: Product;
  let routineTitle = '';
  let routineDescription = '';
  let personalizedTips: string[] = [];

  if (primaryConcern === 'Skin Barrier & Redness' || chosenConcernId === 'barrier') {
    recommendedBundle = PRODUCTS.find((p) => p.id === 'yahreah-barrier-restoration-bundle')!;
    recommendedInsideProduct = PRODUCTS.find((p) => p.id === 'yahreah-bio-trace-minerals')!;
    recommendedOutsideProduct = PRODUCTS.find((p) => p.id === 'yahreah-ceramide-barrier-cream')!;
    routineTitle = 'The Barrier Calm & Mineral Protocol';
    routineDescription = 'Formulated to extinguish inflammation from within while creating a rich biomimetic ceramide shield on the surface.';
    personalizedTips = [
      'Take 15 trace mineral drops in room temperature water each morning to restore cellular electrolyte balance.',
      'Press (do not rub) the Ceramide Barrier Cream onto damp skin immediately after cleansing to trap hydration.',
      'Avoid harsh mechanical exfoliants while your barrier recalibrates over the next 21 days.',
    ];
  } else if (primaryConcern === 'Acne & Blemishes' || chosenConcernId === 'acne') {
    recommendedBundle = PRODUCTS.find((p) => p.id === 'yahreah-as-within-as-without-system')!;
    recommendedInsideProduct = PRODUCTS.find((p) => p.id === 'yahreah-hormonal-balance-capsules')!;
    recommendedOutsideProduct = PRODUCTS.find((p) => p.id === 'yahreah-clarifying-botanical-cleanser')!;
    routineTitle = 'The Gut-Skin Clear Complexion System';
    routineDescription = 'Harmonizes gut micro-flora and internal hormone clearance while gently purifying pores without stripping natural lipids.';
    personalizedTips = [
      'Take Gut-Skin Harmony Capsules daily with a balanced meal to support liver hormone detoxification.',
      'Use lukewarm water when cleansing with the Gentle Mineral Wash — hot water triggers rebound sebum production.',
      'Incorporate 8-10 glasses of mineralized water daily to assist cellular toxin clearance.',
    ];
  } else if (primaryConcern === 'Dullness & Radiance' || chosenConcernId === 'dullness') {
    recommendedBundle = PRODUCTS.find((p) => p.id === 'yahreah-as-within-as-without-system')!;
    recommendedInsideProduct = PRODUCTS.find((p) => p.id === 'yahreah-bio-trace-minerals')!;
    recommendedOutsideProduct = PRODUCTS.find((p) => p.id === 'yahreah-radiance-elixir-serum')!;
    routineTitle = 'The Luminary Radiance Cellular Protocol';
    routineDescription = 'Energizes intracellular micro-circulation with 72+ trace minerals while illuminating surface dullness with 5% Niacinamide & Squalane.';
    personalizedTips = [
      'Mix 1 scoop Marine Collagen + 10 mineral drops into morning smoothie for amplified bio-availability.',
      'Apply Luminary Serum twice daily to targeted areas of discoloration or shadow.',
      'Incorporate a gentle 60-second facial massage during serum application to stimulate lymphatic drainage.',
    ];
  } else {
    // Default / Aging & Fine Lines
    recommendedBundle = PRODUCTS.find((p) => p.id === 'yahreah-as-within-as-without-system')!;
    recommendedInsideProduct = PRODUCTS.find((p) => p.id === 'yahreah-cellular-collagen')!;
    recommendedOutsideProduct = PRODUCTS.find((p) => p.id === 'yahreah-radiance-elixir-serum')!;
    routineTitle = 'The Dermal Rebuild Cellular Protocol';
    routineDescription = 'Stimulates deep fibroblast collagen synthesis with wild marine peptides while locking in surface moisture with lipid squalane.';
    personalizedTips = [
      'Consistency is key: Consume 1 scoop Marine Collagen daily for 30 consecutive days to observe increased dermal density.',
      'Layer Squalane Luminary Serum morning and night under your moisturizer.',
      'Pair your collagen intake with vitamin C-rich foods or berries to optimize collagen cross-linking.',
    ];
  }

  return {
    primaryConcern,
    skinType: chosenSkinType,
    recommendedBundle,
    recommendedInsideProduct,
    recommendedOutsideProduct,
    routineTitle,
    routineDescription,
    personalizedTips,
  };
}
