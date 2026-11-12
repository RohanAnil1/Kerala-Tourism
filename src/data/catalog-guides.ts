import destinationReferences from './destination-references.json';
import dishReferences from './dish-references.json';
import { dishKitchenNotes } from './dish-kitchen-notes';
import type { GuideSource } from './guide-types';
import type { Dish } from './gods-own-flavours';

export function getDestinationReferences(slug: string): GuideSource[] {
  return (destinationReferences as Record<string, GuideSource[]>)[slug] || [];
}

export function getDishGuide(dish: Dish) {
  const whereToLook = dish.dishType === 'beverage'
    ? 'Ask a tea shop or restaurant whether it prepares this drink and how it is normally served.'
    : ['snack', 'street-food'].includes(dish.dishType)
      ? 'Look for a kitchen or tea shop that names this preparation, and ask when a fresh batch is available.'
      : ['dessert', 'festive', 'side-dish'].includes(dish.dishType)
        ? 'Ask about the day’s menu or a planned feast; an accompaniment or dessert may need to be ordered in advance.'
        : 'Ask a Kerala kitchen about its version, the portion and the accompaniments. Availability depends on the day’s menu.';
  return {
    kitchenNote: dishKitchenNotes[dish.slug],
    whereToLook,
    sources: (dishReferences as Record<string, GuideSource[]>)[dish.slug] || [],
  };
}
