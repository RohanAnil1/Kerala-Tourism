'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { blogPosts } from '@/data/blog';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Clock, Calendar, Tag, ChevronRight } from 'lucide-react';

const categories = ['All', 'Travel Guide', 'Seasonal', 'Food & Culture', 'Festivals'];

export default function BlogPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    let result = blogPosts;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some(t => t.includes(q))
      );
    }
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    return result;
  }, [search, category]);

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative h-64 md:h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920"
          alt="Kerala Blog"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-kerala-green/80 to-kerala-green/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            Travel Stories & Guides
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Local insights, food trails, cultural deep dives, and hidden gems of Kerala
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="container-custom -mt-6 relative z-20 px-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-5 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-kerala-green focus:ring-2 focus:ring-kerala-green/20 outline-none"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  category === cat ? 'bg-kerala-green text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {category === 'All' && !search && (
        <section className="container-custom px-4 py-10">
          <Link href={`/blog/${featuredPost.slug}`} className="block group">
            <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm card-hover">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-kerala-gold text-white text-xs px-3 py-1 rounded-full font-semibold">
                    FEATURED
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-kerala-green text-sm font-semibold">{featuredPost.category}</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {featuredPost.date}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {featuredPost.readTime}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-2xl">{featuredPost.authorAvatar}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{featuredPost.author}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Blog Grid */}
      <section className="container-custom px-4 pb-12">
        <p className="text-gray-500 dark:text-gray-400 mb-6">{filtered.length} article{filtered.length !== 1 ? 's' : ''}</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">📝</p>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No articles found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/blog/${post.slug}`} className="card-hover block bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 text-kerala-green text-xs px-3 py-1 rounded-full font-medium">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-kerala-green transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <span>{post.authorAvatar}</span>
                        <span>{post.author}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
