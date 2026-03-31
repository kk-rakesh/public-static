/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
 * Fetch all blog metadata from the index file
 */
export async function fetchBlogsIndex(): Promise<BlogMetadata[]> {
  try {
    const response = await fetch('/blogs/index.json');
    if (!response.ok) {
      throw new Error('Failed to fetch blogs index');
    }
    const data = await response.json();
    return data.blogs || [];
  } catch (error) {
    console.error('Error fetching blogs index:', error);
    return [];
  }
}

/**
 * Fetch a specific blog by ID
 */
export async function fetchBlogById(blogId: string): Promise<BlogContent | null> {
  try {
    const response = await fetch(`/blogs/${blogId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch blog with ID: ${blogId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching blog ${blogId}:`, error);
    return null;
  }
}

/**
 * Fetch a specific blog by slug
 */
export async function fetchBlogBySlug(slug: string): Promise<BlogContent | null> {
  try {
    const blogs = await fetchBlogsIndex();
    const blogMeta = blogs.find((blog) => blog.slug === slug);
    if (!blogMeta) {
      return null;
    }
    return fetchBlogById(blogMeta.id);
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    return null;
  }
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
