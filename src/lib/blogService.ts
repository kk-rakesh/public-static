/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Simple in-memory cache for blog posts
const blogCache = new Map<string, BlogContent>();
const slugToIdCache = new Map<string, string>();
const prefetchingBlogsSet = new Set<string>();

export interface BlogMetadata {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: number;
  author: string;
  description: string;
  date: string;
  featured?: boolean;
}

export interface BlogSection {
  id: string;
  title: string;
  content: string;
  subsections?: Array<{
    type: 'highlight' | 'note' | 'data-table';
    title?: string;
    content?: string;
    items?: Array<{ label: string; value: string }>;
  }>;
}

export interface BlogContent {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: number;
  author: string;
  description: string;
  date: string;
  subtitle: string;
  sections: BlogSection[];
}

/**
 * Fetch all blog metadata from the index file (cached)
 */
let blogsIndexCache: BlogMetadata[] | null = null;

export async function fetchBlogsIndex(): Promise<BlogMetadata[]> {
  if (blogsIndexCache) {
    return blogsIndexCache;
  }
  try {
    const response = await fetch('/blogs/index.json');
    if (!response.ok) {
      throw new Error('Failed to fetch blogs index');
    }
    const data = await response.json();
    blogsIndexCache = data.blogs || [];
    // Build slug→id mapping while we have the index
    for (const blog of (blogsIndexCache as BlogMetadata[])) {
      slugToIdCache.set(blog.slug, blog.id);
    }
    return blogsIndexCache as BlogMetadata[];
  } catch (error) {
    console.error('Error fetching blogs index:', error);
    return [];
  }
}

/**
 * Fetch a specific blog by ID with caching
 */
export async function fetchBlogById(blogId: string): Promise<BlogContent | null> {
  // Check cache first
  if (blogCache.has(blogId)) {
    return blogCache.get(blogId) || null;
  }

  try {
    const response = await fetch(`/blogs/${blogId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch blog with ID: ${blogId}`);
    }
    const data = await response.json();
    // Cache the result
    blogCache.set(blogId, data);
    return data;
  } catch (error) {
    console.error(`Error fetching blog ${blogId}:`, error);
    return null;
  }
}

/**
 * Prefetch a blog by ID in the background (non-blocking)
 */
export function prefetchBlogById(blogId: string): void {
  // Skip if already cached
  if (blogCache.has(blogId)) {
    return;
  }
  // Skip if already prefetching
  if (prefetchingBlogsSet.has(blogId)) {
    return;
  }

  prefetchingBlogsSet.add(blogId);
  // Use requestIdleCallback if available, otherwise use setTimeout
  const idleCallback = (typeof requestIdleCallback !== 'undefined') ? requestIdleCallback : (cb: () => void) => setTimeout(cb, 100);
  idleCallback(() => {
    fetchBlogById(blogId).finally(() => {
      prefetchingBlogsSet.delete(blogId);
    });
  });
}

/**
 * Fetch a specific blog by slug with caching
 */
export async function fetchBlogBySlug(slug: string): Promise<BlogContent | null> {
  // Resolve slug → id, using cache if available
  let blogId = slugToIdCache.get(slug);
  if (!blogId) {
    const blogs = await fetchBlogsIndex();
    const meta = blogs.find((b) => b.slug === slug);
    if (!meta) {
      return null;
    }
    blogId = meta.id;
  }
  return fetchBlogById(blogId);
}

/**
 * Prefetch a blog by slug in the background (non-blocking)
 */
export function prefetchBlogBySlug(slug: string): void {
  const idleCallback = (typeof requestIdleCallback !== 'undefined') ? requestIdleCallback : (cb: () => void) => setTimeout(cb, 100);
  idleCallback(() => {
    fetchBlogBySlug(slug);
  });
}

/**
 * Get featured blogs
 */
export async function fetchFeaturedBlogs(): Promise<BlogMetadata[]> {
  try {
    const blogs = await fetchBlogsIndex();
    return blogs.filter((blog) => blog.featured);
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    return [];
  }
}
