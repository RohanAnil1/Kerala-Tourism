import Discovery from '@/components/editorial/Discovery';
import { festivalEvents } from '@/data/festivals';

export const dynamic = 'force-dynamic';

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
export default function EventsPage() {
  return <Discovery title="When a place comes together." label="FESTIVALS & GATHERINGS" description="Rituals, performances, and celebrations woven into the year. Open a festival guide for its story, venue and a thoughtful way to visit." items={festivalEvents.map(event => ({ id: event.id, href: `/events/${event.slug}`, title: event.name, description: event.summary, image: event.image, photoSubject: `events/${event.id}`, label: `${event.dateLabel} / ${event.district}`, facts: [event.guide.venue, event.category.replace('-', ' ')], search: `${event.name} ${event.summary} ${event.district} ${event.guide.venue}`, filters: { month: event.months.map(String), district: event.district }, featured: false }))} filters={[{ key: 'month', label: 'Months', options: months.map((label,index) => ({ value: String(index+1), label })) }, { key: 'district', label: 'Districts', options: Array.from(new Set(festivalEvents.map(event => event.district))).map(value => ({ value, label: value })) }]} footer="Seasons are a planning guide, not a confirmed future-year schedule. Each festival guide includes its venue, traditions, visiting notes and dated source references. Confirm the annual programme before travelling."/>;
}
