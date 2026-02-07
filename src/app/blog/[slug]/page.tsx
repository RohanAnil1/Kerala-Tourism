'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getBlogBySlug, blogPosts } from '@/data/blog';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Heart, Facebook, Twitter } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute top-24 left-4 md:left-8 z-10">
          <Link href="/blog" className="flex items-center gap-2 text-white/80 hover:text-white glass rounded-full px-4 py-2">
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-3xl mx-auto">
            <span className="bg-kerala-green text-white text-sm px-4 py-1 rounded-full">{post.category}</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-2">
                <span className="text-xl">{post.authorAvatar}</span>
                {post.author}
              </span>
              <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map(tag => (
            <span key={tag} className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm px-3 py-1 rounded-full flex items-center gap-1">
              <Tag size={12} /> {tag}
            </span>
          ))}
        </div>

        {/* Article Content */}
        <article className="prose prose-lg prose-green max-w-none">
          {post.content.split('\n').map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={i} className="font-display text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={i} className="font-display text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('- **')) {
              const match = paragraph.match(/- \*\*(.+?)\*\* — (.+)/);
              if (match) {
                return (
                  <div key={i} className="flex items-start gap-2 my-2">
                    <span className="text-kerala-green mt-1">•</span>
                    <span><strong>{match[1]}</strong> — {match[2]}</span>
                  </div>
                );
              }
            }
            if (paragraph.match(/^\d+\. \*\*/)) {
              const match = paragraph.match(/^\d+\. \*\*(.+?)\*\* — (.+)/);
              if (match) {
                return (
                  <div key={i} className="flex items-start gap-3 my-2 ml-4">
                    <strong>{match[1]}</strong>
                    <span className="text-gray-600 dark:text-gray-400">— {match[2]}</span>
                  </div>
                );
              }
              const simpleMatch = paragraph.match(/^\d+\. \*\*(.+?)\*\*/);
              if (simpleMatch) {
                return <div key={i} className="my-1 ml-4"><strong>{simpleMatch[1]}</strong></div>;
              }
            }
            if (paragraph.startsWith('- ')) {
              return (
                <div key={i} className="flex items-start gap-2 my-1 ml-4">
                  <span className="text-kerala-green mt-1">•</span>
                  <span>{paragraph.replace('- ', '')}</span>
                </div>
              );
            }
            if (paragraph.trim() === '') return <div key={i} className="h-4" />;
            return <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed my-4">{paragraph}</p>;
          })}
        </article>

        {/* Share */}
        <div className="mt-12 pt-8 border-t dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Share this article:</span>
            <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
              <Facebook size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600">
              <Twitter size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-700">
              <Share2 size={18} />
            </button>
          </div>
          <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
            <Heart size={20} /> Save
          </button>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedPosts.map(related => (
                <Link key={related.id} href={`/blog/${related.slug}`} className="card-hover block group">
                  <div className="relative h-36 rounded-xl overflow-hidden mb-3">
                    <Image src={related.image} alt={related.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-kerala-green transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">{related.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
