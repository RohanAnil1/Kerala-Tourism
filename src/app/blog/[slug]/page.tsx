import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { blogRedirects, getBlogBySlug } from '@/data/blog';
import { editorialStories } from '@/data/editorial';
import { PageIntro, Photo, Eyebrow, TextLink } from '@/components/editorial/Primitives';

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  if (Object.hasOwn(blogRedirects, params.slug)) permanentRedirect(`/blog/${blogRedirects[params.slug]}`);
  const post = getBlogBySlug(params.slug);
  if (!post) notFound();
  const blocks = post.content.split('\n\n');
  return <><PageIntro label={`${post.category} / ${post.readTime}`} title={post.title} description={post.excerpt}/><div className="wrap"><Photo src={post.image} subjectKey={`stories/${post.slug}`} alt={post.title} className="aspect-[16/7]" priority sizes="100vw"/></div><article className="article-body"><Eyebrow>{post.author} · {post.date}</Eyebrow>{blocks.map((block,index) => {
    if (block.startsWith('## ')) { const [heading,...lines] = block.split('\n'); return <section key={index}><h2>{heading.replace(/^## /,'')}</h2>{lines.length > 0 && (lines[0].startsWith('- ') ? <ul>{lines.map((line,i) => <li key={i}>{line.replace(/^- /,'')}</li>)}</ul> : <p>{lines.join(' ')}</p>)}</section>; }
    if (block.startsWith('- ')) return <ul key={index}>{block.split('\n').map((line,i) => <li key={i}>{line.replace(/^- /,'')}</li>)}</ul>;
    return <p key={index}>{block}</p>;
  })}{post.sourceUrl && <div className="mt-10"><a href={post.sourceUrl} target="_blank" rel="noreferrer" className="text-link">Read the source reference ↗</a></div>}<div className="mt-14"><TextLink href="/blog">Back to the journal</TextLink></div></article><section className="wrap pb-24"><h2 className="mb-10">Keep the story going.</h2><div className="story-grid">{editorialStories.filter(story => story.slug !== post.slug).map(story => <Link key={story.slug} href={`/blog/${story.slug}`} className="story-card"><Photo src={story.image} alt={story.title} className="story-photo"/><h3>{story.title}</h3><p>{story.excerpt}</p></Link>)}</div></section></>;
}
