import Discovery from '@/components/editorial/Discovery';
import { allDishes } from '@/data/gods-own-flavours';

export const dynamic = 'force-dynamic';

export default function FlavoursPage() {
  return <Discovery title="A place at the table." label="KERALA, THROUGH ITS KITCHENS" description="Breakfasts worth waking up for. Curries with a story. Feasts made for sharing. Come hungry, come curious." items={allDishes.map(dish => ({ id: dish.id, title: dish.name, description: dish.description, image: dish.image, photoSubject: `dishes/${dish.slug}`, href: `/gods-own-flavours/${dish.slug}`, label: `${dish.category === 'veg' ? 'Vegetarian' : 'Non-vegetarian'} / ${dish.origin}`, facts: [dish.dishType.replace('-', ' '), `${dish.spiceLevel} spice`, `Preparation ${dish.prepTime}`], search: `${dish.name} ${dish.description} ${dish.origin} ${dish.malayalamName}`, filters: { diet: dish.category, course: dish.dishType, spice: dish.spiceLevel }, featured: dish.featured }))} filters={[{ key: 'diet', label: 'Diet', options: [{ value: 'veg', label: 'Vegetarian' }, { value: 'non-veg', label: 'Non-vegetarian' }] }, { key: 'course', label: 'Courses', options: Array.from(new Set(allDishes.map(dish => dish.dishType))).map(value => ({ value, label: value.replace('-', ' ') })) }, { key: 'spice', label: 'Spice', options: ['mild','medium','hot','very-hot'].map(value => ({ value, label: value.replace('-', ' ') })) }]} footer="Recipes vary between kitchens. Always confirm ingredients and dietary requirements with your host."/>;
}
