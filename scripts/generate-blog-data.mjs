import fs from 'fs';

const districts = [
  { name: 'Thiruvananthapuram', slug: 'thiruvananthapuram', topics: ['Thiruvananthapuram', 'Padmanabhaswamy Temple', 'Kovalam', 'Varkala', 'Napier Museum'] },
  { name: 'Kollam', slug: 'kollam', topics: ['Kollam', 'Ashtamudi Lake', 'Jatayu Earth\'s Center', 'Thenmala', 'Sasthamkotta Lake'] },
  { name: 'Pathanamthitta', slug: 'pathanamthitta', topics: ['Pathanamthitta district', 'Sabarimala', 'Aranmula', 'Gavi, Kerala', 'Konni'] },
  { name: 'Alappuzha', slug: 'alappuzha', topics: ['Alappuzha', 'Kuttanad', 'Nehru Trophy Boat Race', 'Punnamada Lake', 'Ambalappuzha Sree Krishna Temple'] },
  { name: 'Kottayam', slug: 'kottayam', topics: ['Kottayam', 'Kumarakom', 'Vagamon', 'Ilaveezhapoonchira', 'Vaikom Mahadeva Temple'] },
  { name: 'Idukki', slug: 'idukki', topics: ['Idukki district', 'Munnar', 'Idukki Dam', 'Eravikulam National Park', 'Anamudi'] },
  { name: 'Ernakulam', slug: 'ernakulam', topics: ['Ernakulam district', 'Kochi', 'Fort Kochi', 'Mattancherry', 'Cherai Beach'] },
  { name: 'Thrissur', slug: 'thrissur', topics: ['Thrissur', 'Thrissur Pooram', 'Athirappilly Falls', 'Guruvayur Temple', 'Kerala Kalamandalam'] },
  { name: 'Palakkad', slug: 'palakkad', topics: ['Palakkad district', 'Palakkad Fort', 'Silent Valley National Park', 'Malampuzha Dam', 'Nelliyampathy'] },
  { name: 'Malappuram', slug: 'malappuram', topics: ['Malappuram district', 'Nilambur', 'Teak Museum', 'Kottakkunnu', 'Kadalundi Bird Sanctuary'] },
  { name: 'Kozhikode', slug: 'kozhikode', topics: ['Kozhikode', 'Kappad', 'Beypore', 'SM Street', 'Kozhikode Beach'] },
  { name: 'Wayanad', slug: 'wayanad', topics: ['Wayanad district', 'Edakkal Caves', 'Banasura Sagar Dam', 'Chembra Peak', 'Wayanad Wildlife Sanctuary'] },
  { name: 'Kannur', slug: 'kannur', topics: ['Kannur', 'St. Angelo Fort', 'Muzhappilangad', 'Payyambalam Beach', 'Theyyam'] },
  { name: 'Kasaragod', slug: 'kasaragod', topics: ['Kasaragod', 'Bekal Fort', 'Chandragiri Fort, Kerala', 'Ananthapura Lake Temple', 'Ranipuram'] },
];

const categoryByIndex = ['Travel Guide', 'Heritage', 'Nature', 'Food & Culture', 'Seasonal'];

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function searchTitle(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=5&format=json&origin=*`;
  const res = await fetch(url);
  const data = await res.json();
  const hits = data?.query?.search || [];
  return hits[0]?.title || query;
}

async function getSummaryByTitle(title) {
  const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
  if (!res.ok) return null;
  const data = await res.json();
  if (!data?.extract) return null;
  return data;
}

async function getTopicSummary(query) {
  let summary = await getSummaryByTitle(query);
  if (summary) return summary;

  const foundTitle = await searchTitle(query + ' Kerala');
  summary = await getSummaryByTitle(foundTitle);
  if (summary) return summary;

  const fallbackTitle = await searchTitle(query);
  summary = await getSummaryByTitle(fallbackTitle);
  return summary;
}

function toPost({ id, district, topic, idx, summary, date, featured }) {
  const title = `${summary.title} in ${district.name}: What Travelers Should Know`;
  const excerptRaw = summary.extract.split('. ').slice(0, 2).join('. ').trim();
  const excerpt = excerptRaw.length > 220 ? `${excerptRaw.slice(0, 217)}...` : excerptRaw;

  const img = summary.thumbnail?.source
    ? summary.thumbnail.source.replace(/^http:/, 'https:')
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Kerala_backwaters_view.jpg/1280px-Kerala_backwaters_view.jpg';

  const tags = [
    district.slug,
    'kerala',
    slugify(topic).split('-')[0] || 'travel',
    'wikipedia-source',
  ];

  const content = [
    `## Overview`,
    summary.extract,
    ``,
    `## Why It Matters For Trip Planning`,
    `This article is sourced from Wikipedia and helps travelers understand the context, history, and current significance of ${summary.title} in ${district.name}.`,
    ``,
    `## Quick Notes`,
    `- District: ${district.name}`,
    `- Topic: ${summary.title}`,
    `- Source URL: ${summary.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(summary.title.replace(/\s+/g, '_'))}`}`,
  ].join('\n');

  return {
    id: String(id),
    slug: `${district.slug}-${slugify(summary.title)}`,
    title,
    excerpt,
    content,
    author: 'Kerala Research Desk',
    authorAvatar: '???',
    date,
    readTime: `${Math.max(4, Math.min(12, Math.round(summary.extract.length / 220)))} min read`,
    category: categoryByIndex[idx % categoryByIndex.length],
    tags,
    image: img,
    featured,
    sourceUrl: summary.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(summary.title.replace(/\s+/g, '_'))}`,
    district: district.name,
  };
}

function formatTs(posts) {
  return `import { BlogPost } from '@/types';\n\nexport const blogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};\n\nexport function getBlogBySlug(slug: string): BlogPost | undefined {\n  return blogPosts.find((b) => b.slug === slug);\n}\n\nexport function getFeaturedBlogs(): BlogPost[] {\n  return blogPosts.filter((b) => b.featured);\n}\n`;
}

(async () => {
  const posts = [];
  let id = 1;
  const start = new Date('2026-03-20');

  for (const district of districts) {
    for (let i = 0; i < 5; i += 1) {
      const topic = district.topics[i];
      const summary = await getTopicSummary(topic);
      if (!summary) continue;

      const dateObj = new Date(start);
      dateObj.setDate(start.getDate() - id);
      const date = dateObj.toISOString().slice(0, 10);

      posts.push(toPost({
        id,
        district,
        topic,
        idx: i,
        summary,
        date,
        featured: i === 0 && id <= 14,
      }));
      id += 1;
    }
  }

  fs.writeFileSync('src/data/blog.ts', formatTs(posts), 'utf8');
  console.log(`Generated ${posts.length} web-sourced blog posts.`);
})();
