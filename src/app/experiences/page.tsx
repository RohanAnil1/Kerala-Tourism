import Discovery from '@/components/editorial/Discovery';
import { experiences } from '@/data/experiences';

export const dynamic = 'force-dynamic';

export default function ExperiencesPage() {
  const categories = Array.from(new Set(experiences.map(item => item.category)));
  return <Discovery title="Be part of the place." label="THE KERALA COLLECTION / EXPERIENCES" description="A morning on the water. A walk through tea country. A seat at a performance. Discover the moments between the landmarks." items={experiences.map(item => ({ id: item.id, title: item.title, description: item.description, image: item.images[0], photoSubject: `experiences/${item.slug}`, href: `/experiences/${item.slug}`, label: `${item.category} / ${item.location}`, facts: [item.duration, item.costEstimate], search: `${item.title} ${item.description} ${item.location}`, filters: { category: item.category, difficulty: item.difficulty }, featured: item.featured }))} filters={[{ key: 'category', label: 'Experiences', options: categories.map(value => ({ value, label: value.charAt(0).toUpperCase() + value.slice(1) })) }, { key: 'difficulty', label: 'Difficulty', options: ['easy', 'moderate', 'challenging'].map(value => ({ value, label: value.charAt(0).toUpperCase() + value.slice(1) })) }]} footer="Open an on-site guide for the setting, a suggested day and practical questions to confirm. Programmes, permissions, prices and inclusions depend on the chosen provider."/>;
}
