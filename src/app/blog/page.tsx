import Discovery from '@/components/editorial/Discovery';
import { blogPosts } from '@/data/blog';

export default function BlogPage() {
  return <Discovery title="Notes from a slower world." label="THE KERALA JOURNAL" description="Stories to bring you closer. Practical notes to help you wander. A little inspiration for the road ahead." items={blogPosts.map(post => ({ id: post.id, title: post.title, description: post.excerpt, image: post.image, photoSubject: `stories/${post.slug}`, href: `/blog/${post.slug}`, label: post.category, facts: [post.readTime, post.author], search: `${post.title} ${post.excerpt} ${post.tags.join(' ')}`, filters: { category: post.category }, featured: post.id.startsWith('editorial-') }))} filters={[{ key: 'category', label: 'Stories', options: Array.from(new Set(blogPosts.map(post => post.category))).map(value => ({ value, label: value })) }]}/>;
}
