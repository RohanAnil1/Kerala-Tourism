'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts } from '@/data/blog';
import { Search, Clock, Calendar, Tag, ArrowRight, BookOpen, Sparkles, TrendingUp, Filter, X } from 'lucide-react';

const readingSortOptions = [
  { id: 'latest', label: 'Latest First' },
  { id: 'oldest', label: 'Oldest First' },
  { id: 'quick', label: 'Quick Reads' },
  { id: 'long', label: 'Deep Dives' },
];

function getReadMinutes(readTime: string): number {
  const match = readTime.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [activeTag, setActiveTag] = useState<string>('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = useMemo(() => {
    const all = Array.from(new Set(blogPosts.map((p) => p.category)));
    return ['All', ...all];
  }, []);

  const popularTags = useMemo(() => {
    const counts = new Map<string, number>();
    blogPosts.forEach((post) => {
      post.tags.forEach((tag) => {
        counts.set(tag, (counts.get(tag) || 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));
  }, []);

  const filtered = useMemo(() => {
    let result = blogPosts;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category !== 'All') {
      result = result.filter((p) => p.category === category);
    }

    if (activeTag) {
      result = result.filter((p) => p.tags.includes(activeTag));
    }

    if (sortBy === 'latest') {
      result = [...result].sort((a, b) => +new Date(b.date) - +new Date(a.date));
    } else if (sortBy === 'oldest') {
      result = [...result].sort((a, b) => +new Date(a.date) - +new Date(b.date));
    } else if (sortBy === 'quick') {
      result = [...result].sort((a, b) => getReadMinutes(a.readTime) - getReadMinutes(b.readTime));
    } else if (sortBy === 'long') {
      result = [...result].sort((a, b) => getReadMinutes(b.readTime) - getReadMinutes(a.readTime));
    }

    return result;
  }, [search, category, activeTag, sortBy]);

  const featured = useMemo(() => filtered.filter((p) => p.featured), [filtered]);
  const heroPost = featured[0] ?? filtered[0];
  const spotlightPosts = filtered.filter((p) => p.id !== heroPost?.id).slice(0, 3);
  const gridPosts = filtered.filter((p) => p.id !== heroPost?.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 overflow-x-clip">
      <section className="relative h-[58vh] min-h-[500px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920"
          alt="Kerala Blog"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-50/95 dark:to-gray-950/95" />
        <div className="absolute top-24 -left-12 w-56 h-56 rounded-full bg-kerala-gold/20 blur-3xl" />
        <div className="absolute bottom-10 -right-10 w-72 h-72 rounded-full bg-kerala-lagoon/20 blur-3xl" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-white text-sm font-medium">
              <BookOpen size={14} /> Kerala Editorial Journal
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-5">
              Stories That Make
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-kerala-gold to-orange-300">
                You Want To Travel
              </span>
            </h1>
            <p className="text-white/75 text-lg md:text-xl max-w-2xl">
              Deep travel guides, food narratives, and culture-first writing for explorers planning Kerala with intention.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {[
              { label: 'Published Articles', value: `${blogPosts.length}+` },
              { label: 'Featured Deep Dives', value: `${blogPosts.filter((p) => p.featured).length}` },
              { label: 'Average Read Length', value: '8 min' },
              { label: 'Curated Themes', value: `${categories.length - 1}` },
            ].map((metric) => (
              <div key={metric.label} className="glass rounded-2xl px-4 py-3 border border-white/15">
                <p className="text-white font-semibold text-xl">{metric.value}</p>
                <p className="text-white/65 text-xs mt-1">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="sticky top-20 z-30 border-y border-gray-200/70 dark:border-gray-800/70 bg-white/85 dark:bg-gray-900/80 backdrop-blur-2xl">
        <div className="container-custom px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles, themes, destinations..."
                className="w-full pl-12 pr-10 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:border-kerala-green focus:ring-2 focus:ring-kerala-green/20 outline-none"
            />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
          </div>

            <div className="hidden lg:flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    category === cat
                      ? 'bg-kerala-green text-white shadow-lg shadow-kerala-green/20'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <TrendingUp size={16} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 outline-none"
              >
                {readingSortOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setMobileFiltersOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <Filter size={16} /> Filters
            </button>
          </div>

          <AnimatePresence>
            {mobileFiltersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-3 pt-3 border-t border-gray-200 dark:border-gray-800"
              >
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${
                        category === cat
                          ? 'bg-kerala-green text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 outline-none"
                >
                  {readingSortOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTag('')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                !activeTag
                  ? 'bg-kerala-gold text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
              }`}
            >
              All Tags
            </button>
            {popularTags.slice(0, 8).map(({ tag, count }) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeTag === tag
                    ? 'bg-kerala-green text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                #{tag} <span className="opacity-70">({count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-custom px-4 py-10 md:py-14">
        {heroPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid xl:grid-cols-[1.55fr_1fr] gap-6"
          >
            <Link href={`/blog/${heroPost.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-3xl min-h-[440px] bg-gray-900">
                <Image
                  src={heroPost.image}
                  alt={heroPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-white text-xs font-semibold">
                  <Sparkles size={12} /> Editor&apos;s Pick
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="inline-flex items-center gap-1 rounded-full bg-kerala-gold text-white px-3 py-1 text-xs font-semibold mb-4">
                    {heroPost.category}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight max-w-2xl mb-3">
                    {heroPost.title}
                  </h2>
                  <p className="text-white/75 max-w-2xl mb-5">{heroPost.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(heroPost.date)}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {heroPost.readTime}</span>
                    <span className="flex items-center gap-2"><span>{heroPost.authorAvatar}</span>{heroPost.author}</span>
                  </div>
                </div>
              </div>
            </Link>

            <div className="space-y-4">
              {spotlightPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200/70 dark:border-gray-800/70 hover:shadow-elevated transition-all duration-300">
                    <div className="flex gap-4">
                      <div className="relative w-28 h-24 rounded-xl overflow-hidden shrink-0">
                        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-kerala-green font-semibold mb-1">{post.category}</p>
                        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-kerala-green transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{post.excerpt}</p>
                        <div className="mt-2 text-xs text-gray-400">{post.readTime}</div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}

              <div className="rounded-2xl bg-gradient-to-br from-kerala-green to-emerald-700 p-5 text-white">
                <p className="text-sm opacity-80">Weekly Dispatch</p>
                <h3 className="font-display text-2xl font-bold mt-1">Get Kerala Stories In Your Inbox</h3>
                <p className="text-sm opacity-80 mt-2">Travel ideas, local festival calendars, and editor picks every week.</p>
                <div className="mt-4 flex gap-2">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="flex-1 min-w-0 rounded-xl px-3 py-2 text-sm text-gray-900 outline-none"
                  />
                  <button className="rounded-xl bg-white text-kerala-green px-4 py-2 text-sm font-semibold">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      <section className="container-custom px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
            <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> article{filtered.length !== 1 ? 's' : ''} curated for you
          </p>
          {(search || category !== 'All' || activeTag) && (
            <button
              onClick={() => {
                setSearch('');
                setCategory('All');
                setActiveTag('');
              }}
              className="text-sm text-kerala-green dark:text-emerald-400 font-semibold hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-6xl mb-4">🧭</p>
            <h3 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100 mb-2">No matching stories found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Try a broader keyword, change category, or clear tag filter.</p>
            <button
              onClick={() => {
                setSearch('');
                setCategory('All');
                setActiveTag('');
              }}
              className="btn-primary"
            >
              Show all stories
            </button>
          </div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {gridPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ delay: i * 0.03, duration: 0.35 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block rounded-3xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-gray-800/70 hover:shadow-elevated-lg transition-all duration-300 h-full">
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="rounded-full bg-white/90 dark:bg-gray-900/90 px-3 py-1 text-xs text-kerala-green font-semibold">
                          {post.category}
                        </span>
                        {post.featured && (
                          <span className="rounded-full bg-kerala-gold px-3 py-1 text-xs text-white font-semibold">Featured</span>
                        )}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col h-[calc(100%-13rem)]">
                      <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-kerala-green transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                      <div className="mt-auto">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(post.date)}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>{post.authorAvatar}</span>
                            <span>{post.author}</span>
                          </div>
                          <span className="inline-flex items-center gap-1 text-sm font-semibold text-kerala-green group-hover:gap-2 transition-all">
                            Read <ArrowRight size={14} />
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-1 text-[11px] rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-1 text-gray-500 dark:text-gray-400">
                              <Tag size={10} /> {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <section className="px-4 pb-20">
        <div className="container-custom rounded-3xl border border-gray-200/70 dark:border-gray-800/70 bg-white dark:bg-gray-900 p-8 md:p-10">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div>
              <p className="text-sm text-kerala-green font-semibold mb-2">Contribute</p>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Have a Kerala Story to Share?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                We welcome narratives from travelers, photographers, local guides, and culture researchers. Help others discover Kerala through real voices.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button className="btn-primary">Submit a Story</button>
              <button className="btn-secondary">Editorial Guidelines</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
