/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Blog pages — lazy-loaded as a separate chunk so the homepage
 * doesn't ship the article renderer.
 */

import { useState, useEffect } from 'react';
import { m, useScroll, useSpring } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Clock, User } from 'lucide-react';
import {
  fetchBlogBySlug, fetchBlogsIndex, prefetchBlogBySlug, type BlogContent,
} from './lib/blogService';
import { Navbar, Footer, Insights, Headline } from './App';

function BlogPage({ slug, onBack }: { slug: string; onBack: () => void }) {
  const [blog, setBlog] = useState<BlogContent | null>(null);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try { setBlog(await fetchBlogBySlug(slug)); }
      finally { setLoading(false); }
    })();
  }, [slug]);

  if (loading) {
    return <div className="pt-40 pb-32 container-x min-h-screen"><div className="muted">Loading…</div></div>;
  }
  if (!blog) {
    return (
      <div className="pt-40 pb-32 container-x min-h-screen">
        <button onClick={onBack} className="inline-flex items-center gap-2 muted hover:text-foreground transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to home
        </button>
        <p className="display text-4xl mt-8">Article not found.</p>
      </div>
    );
  }

  const renderSub = (sub: any, idx: number) => {
    switch (sub.type) {
      case 'highlight':
        return (
          <div key={idx} className="panel rounded-2xl p-6">
            <h4 className="text-primary font-medium mb-2">{sub.title}</h4>
            <p className="muted text-sm leading-relaxed">{sub.content}</p>
          </div>
        );
      case 'data-table':
        return (
          <div key={idx} className="panel rounded-2xl p-7 space-y-5 md:col-span-2">
            {sub.items?.map((it: any, i: number) => (
              <div key={i} className={`flex justify-between items-start gap-8 ${i < sub.items.length - 1 ? 'border-b border-border pb-5' : ''}`}>
                <span className="muted shrink-0">{it.label}</span>
                <span className={`text-right mono ${i === 0 ? 'text-primary' : i === 1 ? 'text-secondary' : 'text-foreground'}`}>{it.value}</span>
              </div>
            ))}
          </div>
        );
      case 'note':
        return (
          <div key={idx} className="rounded-2xl p-6 border border-primary/25 bg-primary/5 md:col-span-2">
            <p className="text-primary font-medium mb-2 display-italic font-display">{sub.title}</p>
            <p className="muted text-sm leading-relaxed">{sub.content}</p>
          </div>
        );
      case 'quote':
        return (
          <div key={idx} className="md:col-span-2 text-center py-8 px-4">
            <p className="display text-2xl md:text-3xl text-foreground leading-snug balance">“{sub.content}”</p>
          </div>
        );
      case 'list':
        return (
          <div key={idx} className="panel rounded-2xl p-6">
            <h4 className="text-primary font-medium mb-4">{sub.title}</h4>
            <ul className="space-y-3">
              {sub.items?.map((it: any, i: number) => (
                <li key={i} className="flex gap-3 text-sm muted leading-relaxed">
                  <span className="text-secondary mt-1.5 w-1 h-1 rounded-full bg-secondary shrink-0" />
                  <span>{it.label}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      default: return null;
    }
  };

  return (
    <>
      <m.div className="fixed top-16 md:top-20 inset-x-0 h-px bg-primary origin-left z-40" style={{ scaleX: progress }} />
      <m.article
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="pt-32 md:pt-40 pb-24 container-x max-w-3xl"
      >
        <button onClick={onBack} className="inline-flex items-center gap-2 muted hover:text-foreground transition-colors mb-12 group text-sm">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to home
        </button>

        <div className="flex flex-wrap items-center gap-4 eyebrow mb-7">
          <span className="panel px-3 py-1 rounded-full">{blog.category}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {blog.readTime} min</span>
          <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {blog.author}</span>
        </div>

        <Headline as="h1" text={blog.title} className="display text-[clamp(2.2rem,6vw,4rem)]" />
        {blog.subtitle && <p className="lead text-xl mt-6 display-italic font-display">{blog.subtitle}</p>}

        <div className="mt-14 space-y-14">
          {blog.sections.map((section) => (
            <section key={section.id} className="space-y-5">
              <h2 className="display text-3xl">{section.title}</h2>
              <p className="lead text-lg leading-relaxed whitespace-pre-line">{section.content}</p>
              {section.subsections && (
                <div className="grid md:grid-cols-2 gap-5 mt-7">
                  {section.subsections.map((sub, i) => renderSub(sub, i))}
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-border">
          <button onClick={onBack} className="btn btn-ghost rounded-full px-6 py-3 inline-flex items-center gap-2 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </button>
        </div>
      </m.article>
    </>
  );
}

export function BlogsPage() {
  const navigate = useNavigate();
  useEffect(() => { (async () => { (await fetchBlogsIndex()).forEach((b) => prefetchBlogBySlug(b.slug)); })(); }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-10">
        <Insights onOpenBlog={(slug) => navigate({ to: `/blogs/${slug}` })} />
      </main>
      <Footer />
    </div>
  );
}

export function BlogDetailsPage({ slug }: { slug: string }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <BlogPage slug={slug} onBack={() => navigate({ to: '/' })} />
      </main>
      <Footer />
    </div>
  );
}
