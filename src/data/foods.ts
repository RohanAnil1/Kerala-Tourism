// Kerala Traditional Foods Data

export interface Food {
  id: string;
  slug: string;
  name: string;
  malayalamName: string;
  category: FoodCategory;
  description: string;
  longDescription: string;
  origin: string;
  ingredients: string[];
  servingStyle: string;
  taste: string[];
  bestPlacesToTry: string[];
  image: string;
  vegetarian: boolean;
  spiceLevel: 'mild' | 'medium' | 'hot' | 'very-hot';
  popularIn: string[];
  bestSeasonToTry: string;
  featured: boolean;
}

export type FoodCategory = 'main-course' | 'snacks' | 'breakfast' | 'desserts' | 'beverages' | 'festive';

// Verified Kerala food images
const FOOD_IMG = {
  sadya: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800',
  dosa: 'https://images.unsplash.com/photo-1694756332969-f4e8b3f97fcb?w=800',
  idiyappam: 'https://images.unsplash.com/photo-1626074353756-3456f18e8362?w=800',
  puttu: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800',
  appam: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800',
  biryani: 'https://images.unsplash.com/photo-1563379091339-03b47b0a3c47?w=800',
  fishCurry: 'https://images.unsplash.com/photo-1626074351824-691b7bfc15cd?w=800',
  coconut: 'https://images.unsplash.com/photo-1447279506476-3faec8071eee?w=800',
  banana: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800',
  spices: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800',
  coffee: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
  payasam: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=800',
  sambar: 'https://images.unsplash.com/photo-1626074353429-c22e5fa87cbc?w=800',
  curry: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
  rice: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800',
  sweets: 'https://images.unsplash.com/photo-1606312617954-9b478c5c8f44?w=800',
};

export const kerallaFoods: Food[] = [
  {
    id: '1',
    slug: 'kerala-sadya',
    name: 'Kerala Sadya',
    malayalamName: 'സദ്യ',
    category: 'festive',
    description: 'The ultimate Kerala feast — a vegetarian banquet served on banana leaf with 20+ dishes.',
    longDescription: 'Kerala Sadya is the crown jewel of Kerala cuisine, traditionally served during festivals like Onam and Vishu. This elaborate vegetarian feast consists of steamed rice served with 20-30 side dishes including sambar, avial, thoran, olan, pachadi, and various pickles and payasams. The meal is served on a fresh banana leaf and eaten with hands, following traditional customs. Each dish represents the perfect balance of flavors, textures, and nutritional value.',
    origin: 'Ancient Kerala tradition, especially associated with harvest festivals',
    ingredients: ['Rice', 'Various vegetables', 'Coconut', 'Tamarind', 'Curry leaves', 'Mustard seeds', 'Jaggery', 'Ghee'],
    servingStyle: 'Served on banana leaf in specific order and arrangement',
    taste: ['Sweet', 'Sour', 'Spicy', 'Savory', 'Bitter'],
    bestPlacesToTry: ['Traditional Kerala homes during Onam', 'Kayees Rahmathulla Hotel (Kochi)', 'Hotel Saravana Bhavan', 'Paragon Restaurant'],
    image: FOOD_IMG.sadya,
    vegetarian: true,
    spiceLevel: 'medium',
    popularIn: ['All districts', 'Especially during festivals'],
    bestSeasonToTry: 'Onam season (August-September)',
    featured: true,
  },
  {
    id: '2',
    slug: 'appam-with-stew',
    name: 'Appam with Stew',
    malayalamName: 'അപ്പം ഇഷ്ടു',
    category: 'breakfast',
    description: 'Soft, lacy rice pancakes paired with fragrant coconut milk stew.',
    longDescription: 'Appam is a bowl-shaped fermented rice pancake with crispy edges and a soft, fluffy center. Made from fermented rice batter and coconut milk, it\'s traditionally cooked in a special curved pan. The accompanying vegetable or meat stew, made with coconut milk and aromatic spices, creates a perfect harmony of flavors. This breakfast dish is popular among Syrian Christians of Kerala and has become a favorite across the state.',
    origin: 'Malankara Syrian Christian community',
    ingredients: ['Raw rice', 'Cooked rice', 'Coconut', 'Yeast', 'Sugar', 'Vegetables/meat for stew', 'Coconut milk'],
    servingStyle: 'Hot appams with piping hot stew',
    taste: ['Mildly sweet', 'Savory', 'Aromatic'],
    bestPlacesToTry: ['Kayees Rahmathulla (Kochi)', 'Indian Coffee House', 'Hotel Rahmath', 'Local Syrian Christian homes'],
    image: FOOD_IMG.appam,
    vegetarian: false,
    spiceLevel: 'mild',
    popularIn: ['Kottayam', 'Ernakulam', 'Alappuzha'],
    bestSeasonToTry: 'Year-round',
    featured: true,
  },
  {
    id: '3',
    slug: 'puttu-kadala',
    name: 'Puttu & Kadala',
    malayalamName: 'പുട്ട് കടല',
    category: 'breakfast',
    description: 'Steamed rice cylinders with spicy black chickpea curry — Kerala\'s favorite breakfast.',
    longDescription: 'Puttu is a cylindrical steamed rice cake made with ground rice and coconut. Traditionally prepared in a special vessel, the rice flour is layered with fresh coconut and steamed to perfection. Kadala curry (black chickpea curry) is a spicy, tangy accompaniment cooked with roasted coconut, spices, and curry leaves. This combination is the most beloved breakfast in Kerala, enjoyed with ripe bananas and pappadam.',
    origin: 'Traditional Kerala breakfast dish',
    ingredients: ['Rice flour', 'Grated coconut', 'Black chickpeas', 'Onions', 'Spices', 'Coconut oil', 'Curry leaves'],
    servingStyle: 'Hot puttu with kadala curry and banana',
    taste: ['Savory', 'Spicy', 'Mildly sweet from coconut'],
    bestPlacesToTry: ['Dhe Puttu (Kochi)', 'Hotel Rahmath', 'Arya Nivas', 'Local street vendors'],
    image: FOOD_IMG.puttu,
    vegetarian: true,
    spiceLevel: 'medium',
    popularIn: ['All districts'],
    bestSeasonToTry: 'Year-round',
    featured: true,
  },
  {
    id: '4',
    slug: 'kerala-fish-curry',
    name: 'Kerala Fish Curry',
    malayalamName: 'മീൻ കറി',
    category: 'main-course',
    description: 'Tangy, spicy fish curry made with coconut milk and kudampuli — a Kerala coastal specialty.',
    longDescription: 'Kerala Fish Curry is a staple in coastal homes, known for its distinctive sour and spicy flavor. The secret ingredient is kudampuli (Malabar tamarind), which gives the curry its characteristic tanginess. Fresh fish like pearl spot, king fish, or mackerel is cooked in a rich gravy of coconut milk, red chilies, curry leaves, and aromatic spices. This dish represents the coastal culinary heritage of Kerala.',
    origin: 'Coastal Kerala',
    ingredients: ['Fresh fish', 'Coconut milk', 'Kudampuli', 'Red chilies', 'Turmeric', 'Shallots', 'Ginger', 'Curry leaves', 'Coconut oil'],
    servingStyle: 'With steamed rice or kanji (rice porridge)',
    taste: ['Tangy', 'Spicy', 'Rich'],
    bestPlacesToTry: ['Trilogi (Kochi)', 'Fort House Restaurant', 'Oceanos (Kovalam)', 'Local coastal homes'],
    image: FOOD_IMG.fishCurry,
    vegetarian: false,
    spiceLevel: 'hot',
    popularIn: ['Thiruvananthapuram', 'Kollam', 'Alappuzha', 'Ernakulam', 'Kozhikode'],
    bestSeasonToTry: 'Monsoon season (June-September)',
    featured: true,
  },
  {
    id: '5',
    slug: 'thalassery-biryani',
    name: 'Thalassery Biryani',
    malayalamName: 'തലശ്ശേരി ബിരിയാണി',
    category: 'main-course',
    description: 'Aromatic biryani made with kaima rice — a Malabar Muslim delicacy.',
    longDescription: 'Thalassery Biryani is distinct from other Indian biryanis, using short-grain kaima or jeerakasala rice instead of basmati. The rice is cooked separately and then layered with spiced meat (usually chicken or mutton), fried onions, and aromatic spices. The use of fennel seeds, black peppercorns, and ghee gives it a unique flavor profile. It\'s a culinary legacy of the Malabar Muslim community.',
    origin: 'Thalassery, Malabar region',
    ingredients: ['Kaima rice', 'Chicken/mutton', 'Ghee', 'Fried onions', 'Tomatoes', 'Fennel seeds', 'Black pepper', 'Coriander', 'Mint leaves'],
    servingStyle: 'Hot, with raita, pickle, and pappadam',
    taste: ['Aromatic', 'Mildly spiced', 'Rich'],
    bestPlacesToTry: ['Paris Restaurant (Kozhikode)', 'Rahmath Hotel (Kozhikode)', 'Paragon Restaurant', 'Zains Hotel'],
    image: FOOD_IMG.biryani,
    vegetarian: false,
    spiceLevel: 'medium',
    popularIn: ['Kozhikode', 'Kannur', 'Kasaragod'],
    bestSeasonToTry: 'Year-round',
    featured: true,
  },
  {
    id: '6',
    slug: 'masala-dosa',
    name: 'Masala Dosa',
    malayalamName: 'മസാല ദോശ',
    category: 'breakfast',
    description: 'Crispy rice crepe filled with spiced potato masala — a South Indian breakfast icon.',
    longDescription: 'Though originally from Karnataka, Masala Dosa has become an integral part of Kerala breakfast culture. The dosa is made from fermented rice and urad dal batter, spread thin on a hot griddle to create a crispy golden crepe. It\'s filled with a savory potato masala seasoned with mustard seeds, curry leaves, and turmeric. Served with coconut chutney and sambar, it\'s a complete meal.',
    origin: 'South India (adopted widely in Kerala)',
    ingredients: ['Rice', 'Urad dal', 'Potatoes', 'Onions', 'Mustard seeds', 'Curry leaves', 'Turmeric', 'Green chilies'],
    servingStyle: 'Hot and crispy with sambar, coconut chutney, and tomato chutney',
    taste: ['Savory', 'Mildly spiced', 'Crispy'],
    bestPlacesToTry: ['Saravana Bhavan', 'Indian Coffee House', 'Arya Nivas', 'Sree Krishna Bhavan'],
    image: FOOD_IMG.dosa,
    vegetarian: true,
    spiceLevel: 'mild',
    popularIn: ['All districts'],
    bestSeasonToTry: 'Year-round',
    featured: false,
  },
  {
    id: '7',
    slug: 'idiyappam',
    name: 'Idiyappam',
    malayalamName: 'ഇടിയപ്പം',
    category: 'breakfast',
    description: 'Delicate rice noodle nests steamed to perfection — light and healthy.',
    longDescription: 'Idiyappam, also known as string hoppers, are soft rice noodles formed into nest-like spirals and steamed. Made from rice flour dough pressed through a special mold, these delicate noodles are incredibly light and easily digestible. They\'re traditionally served with egg curry, kadala curry, or coconut milk sweetened with jaggery. Popular as both breakfast and dinner.',
    origin: 'Kerala and Tamil Nadu',
    ingredients: ['Rice flour', 'Water', 'Salt', 'Grated coconut'],
    servingStyle: 'With egg curry, kadala curry, or sweetened coconut milk',
    taste: ['Mild', 'Soft', 'Subtle'],
    bestPlacesToTry: ['Hotel Rahmath', 'Arya Nivas', 'Local homes', 'Dhe Puttu'],
    image: FOOD_IMG.idiyappam,
    vegetarian: true,
    spiceLevel: 'mild',
    popularIn: ['Kottayam', 'Ernakulam', 'Pathanamthitta'],
    bestSeasonToTry: 'Year-round',
    featured: false,
  },
  {
    id: '8',
    slug: 'payasam',
    name: 'Payasam',
    malayalamName: 'പായസം',
    category: 'desserts',
    description: 'Sweet, creamy pudding made with milk, jaggery, and various ingredients — Kerala\'s favorite dessert.',
    longDescription: 'Payasam is the quintessential Kerala dessert, prepared in numerous varieties. The most popular are Paal Payasam (made with rice, milk, and sugar), Parippu Payasam (moong dal and jaggery), and Semiya Payasam (vermicelli). Each variety has its unique taste and texture. Payasam is essential in Kerala Sadya and all festive occasions. The slow-cooked version develops a rich, caramelized flavor.',
    origin: 'Ancient Kerala tradition',
    ingredients: ['Rice/vermicelli/dal', 'Milk/coconut milk', 'Jaggery/sugar', 'Cardamom', 'Cashews', 'Raisins', 'Ghee'],
    servingStyle: 'Hot or chilled, in small portions',
    taste: ['Sweet', 'Creamy', 'Aromatic'],
    bestPlacesToTry: ['Kerala Sadya venues', 'Kayees Rahmathulla', 'Aryaas', 'Traditional homes during festivals'],
    image: FOOD_IMG.payasam,
    vegetarian: true,
    spiceLevel: 'mild',
    popularIn: ['All districts'],
    bestSeasonToTry: 'Festival seasons',
    featured: true,
  },
  {
    id: '9',
    slug: 'banana-chips',
    name: 'Banana Chips',
    malayalamName: 'ഉപ്പേരി',
    category: 'snacks',
    description: 'Thin, crispy chips made from raw banana — Kerala\'s most popular snack.',
    longDescription: 'Banana chips are a Kerala specialty, made from thinly sliced raw plantains deep-fried in coconut oil. Available in various flavors - salted, pepper, jaggery-coated, and spicy. The traditional "Nendran" variety of banana is preferred for making these chips. They\'re a staple tea-time snack and a popular gift item for visitors to Kerala.',
    origin: 'Traditional Kerala snack',
    ingredients: ['Raw banana (Nendran)', 'Coconut oil', 'Turmeric', 'Salt'],
    servingStyle: 'As snacks or side dish',
    taste: ['Crispy', 'Savory', 'Slightly sweet'],
    bestPlacesToTry: ['Local markets', 'V.M. Brothers (Kochi)', 'Fresh from roadside vendors', 'Kairali chips'],
    image: FOOD_IMG.banana,
    vegetarian: true,
    spiceLevel: 'mild',
    popularIn: ['All districts'],
    bestSeasonToTry: 'Year-round',
    featured: false,
  },
  {
    id: '10',
    slug: 'karimeen-pollichathu',
    name: 'Karimeen Pollichathu',
    malayalamName: 'കരിമീൻ പൊള്ളിച്ചത്',
    category: 'main-course',
    description: 'Pearl spot fish marinated in spices, wrapped in banana leaf, and grilled to perfection.',
    longDescription: 'Karimeen (Pearl Spot) Pollichathu is a signature dish of Kerala, especially from the backwater regions. Fresh karimeen is marinated with a blend of red chili powder, turmeric, and other spices, then wrapped in banana leaves and pan-fried or grilled. The banana leaf imparts a unique aroma and keeps the fish moist. This dish showcases the perfect marriage of Kerala\'s backwaters and its culinary expertise.',
    origin: 'Backwater regions of Kerala',
    ingredients: ['Pearl spot fish', 'Red chili powder', 'Turmeric', 'Shallots', 'Ginger', 'Garlic', 'Curry leaves', 'Banana leaf', 'Coconut oil'],
    servingStyle: 'Served in banana leaf with steamed rice',
    taste: ['Spicy', 'Smoky', 'Aromatic'],
    bestPlacesToTry: ['Trilogi (Kochi)', 'Coconut Lagoon (Kumarakom)', 'Vivanta by Taj (Kumarakom)', 'Fort House Restaurant'],
    image: FOOD_IMG.fishCurry,
    vegetarian: false,
    spiceLevel: 'hot',
    popularIn: ['Alappuzha', 'Kottayam', 'Ernakulam'],
    bestSeasonToTry: 'Year-round',
    featured: true,
  },
  {
    id: '11',
    slug: 'sulaimani-tea',
    name: 'Sulaimani Tea',
    malayalamName: 'സുലൈമാനി ചായ',
    category: 'beverages',
    description: 'Light, fragrant black tea with lemon — the perfect digestive after a heavy meal.',
    longDescription: 'Sulaimani is a unique Malabar specialty, different from regular tea as it contains no milk. This refreshing lemon tea is made by brewing black tea with spices like cardamom, cloves, and sometimes saffron. A splash of lemon juice adds the finishing touch. It\'s traditionally served after heavy meals, especially biryani, to aid digestion. The name "Sulaimani" is believed to have Arabic origins.',
    origin: 'Malabar Muslim community',
    ingredients: ['Black tea', 'Cardamom', 'Cloves', 'Lemon', 'Sugar', 'Optional: saffron'],
    servingStyle: 'Hot in small cups or glasses',
    taste: ['Refreshing', 'Citrusy', 'Aromatic'],
    bestPlacesToTry: ['Rahmath Hotel (Kozhikode)', 'Paris Restaurant', 'Zains Hotel', 'Local Malabar restaurants'],
    image: FOOD_IMG.coffee,
    vegetarian: true,
    spiceLevel: 'mild',
    popularIn: ['Kozhikode', 'Malappuram', 'Kannur'],
    bestSeasonToTry: 'Year-round',
    featured: false,
  },
  {
    id: '12',
    slug: 'unniyappam',
    name: 'Unniyappam',
    malayalamName: 'ഉണ്ണിയപ്പം',
    category: 'snacks',
    description: 'Sweet, deep-fried rice balls with banana and jaggery — a traditional temple offering.',
    longDescription: 'Unniyappam is a traditional Kerala snack often prepared for festivals and temple offerings. These small, round fritters are made from rice flour, jaggery, ripe banana, and roasted coconut, flavored with cardamom and sesame seeds. Deep-fried in coconut oil, they have a crispy exterior and soft, sweet interior. These bite-sized treats are irresistible and often associated with Onam and Vishu celebrations.',
    origin: 'Temple tradition across Kerala',
    ingredients: ['Rice flour', 'Jaggery', 'Ripe banana', 'Grated coconut', 'Cardamom', 'Sesame seeds', 'Coconut oil'],
    servingStyle: 'Hot or at room temperature',
    taste: ['Sweet', 'Crispy outside, soft inside'],
    bestPlacesToTry: ['Temple festivals', 'Aryaas', 'Kayees Rahmathulla', 'Local sweet shops'],
    image: FOOD_IMG.sweets,
    vegetarian: true,
    spiceLevel: 'mild',
    popularIn: ['All districts'],
    bestSeasonToTry: 'Festival seasons',
    featured: false,
  },
];

export function getFeaturedFoods(): Food[] {
  return kerallaFoods.filter(food => food.featured);
}

export function getFoodsByCategory(category: FoodCategory): Food[] {
  return kerallaFoods.filter(food => food.category === category);
}

export function getFoodBySlug(slug: string): Food | undefined {
  return kerallaFoods.find(food => food.slug === slug);
}

export function getVegetarianFoods(): Food[] {
  return kerallaFoods.filter(food => food.vegetarian);
}

export function getFoodsBySpiceLevel(level: 'mild' | 'medium' | 'hot' | 'very-hot'): Food[] {
  return kerallaFoods.filter(food => food.spiceLevel === level);
}
