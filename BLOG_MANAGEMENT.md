# Blog Management System

## Overview

The blog system has been refactored to use JSON-based configuration files, allowing you to manage multiple blogs without modifying React components. Each blog has its own JSON file with a date-based ID (YYYY-MM-DD format).

## Directory Structure

```
public/blogs/
├── index.json           # Main index listing all blogs
├── 2025-03-31.json      # Individual blog content file (named with blog ID)
└── [additional blog files]
```

## File Formats

### 1. Blog Index (`public/blogs/index.json`)

This file contains metadata for all blogs. Add an entry for each blog you create.

```json
{
  "blogs": [
    {
      "id": "2025-03-31",
      "title": "Blog Title",
      "slug": "blog-slug",
      "category": "Technical Analysis",
      "readTime": 8,
      "author": "Author Name",
      "description": "Short description of the blog",
      "date": "2025-03-31",
      "featured": true
    }
  ]
}
```

**Fields:**
- `id`: Unique identifier (use date format YYYY-MM-DD)
- `title`: Full blog title
- `slug`: URL-friendly identifier
- `category`: Blog category
- `readTime`: Estimated reading time in minutes
- `author`: Author name or team name
- `description`: Short description for preview
- `date`: Publication date (YYYY-MM-DD)
- `featured`: Boolean flag to mark featured blogs

### 2. Blog Content (`public/blogs/[YYYY-MM-DD].json`)

Individual blog content file named with the blog ID. Supports various section types and subsections.

```json
{
  "id": "2025-03-31",
  "title": "Blog Title",
  "slug": "blog-slug",
  "category": "Technical Analysis",
  "readTime": 8,
  "author": "O4F Research Lab",
  "description": "Description",
  "date": "2025-03-31",
  "subtitle": "A compelling subtitle or introduction",
  "sections": [
    {
      "id": "section-1",
      "title": "1. Section Title",
      "content": "Main content of the section",
      "subsections": [
        {
          "type": "highlight",
          "title": "Highlight Title",
          "content": "Highlighted content"
        }
      ]
    }
  ]
}
```

**Section Structure:**
- `id`: Unique section identifier
- `title`: Section heading
- `content`: Main section content (supports multi-line with `\n`)
- `subsections`: Optional array of subsections

**Subsection Types:**
1. **highlight**: Displays as a highlighted box
   ```json
   {
     "type": "highlight",
     "title": "Title",
     "content": "Content"
   }
   ```

2. **data-table**: Displays key-value pairs in a table
   ```json
   {
     "type": "data-table",
     "items": [
       { "label": "Label 1", "value": "Value 1" },
       { "label": "Label 2", "value": "Value 2" }
     ]
   }
   ```

3. **note**: Displays as a note/callout box
   ```json
   {
     "type": "note",
     "title": "Note Title",
     "content": "Note content"
   }
   ```

## How to Add a New Blog

### Step 1: Create Blog Content File

Create a new JSON file in `public/blogs/` with the blog ID as filename:
```
public/blogs/2025-04-15.json
```

### Step 2: Add Blog Metadata to Index

Update `public/blogs/index.json` and add an entry:

```json
{
  "blogs": [
    {
      "id": "2025-04-15",
      "title": "Your New Blog Title",
      "slug": "new-blog-slug",
      "category": "Your Category",
      "readTime": 10,
      "author": "Author Name",
      "description": "Brief description of your blog",
      "date": "2025-04-15",
      "featured": false
    }
  ]
}
```

### Step 3: Fill in Blog Content

Add the content structure to your blog JSON file with sections and subsections.

## Utility Functions

The blog system exports several utility functions in `src/lib/blogService.ts`:

```typescript
// Fetch all blog metadata
await fetchBlogsIndex(): Promise<BlogMetadata[]>

// Fetch specific blog by ID
await fetchBlogById(blogId: string): Promise<BlogContent | null>

// Fetch blog by slug
await fetchBlogBySlug(slug: string): Promise<BlogContent | null>

// Get featured blogs
await fetchFeaturedBlogs(): Promise<BlogMetadata[]>
```

## Component Integration

### Blogs Component
- Automatically fetches and displays all blogs from the index
- Shows blog cards with metadata
- Handles loading and error states
- Navigates to individual blog when clicked

### BlogPage Component
- Dynamically renders blog content based on blog ID
- Supports multiple subsection types
- Renders sections and subsections dynamically
- Includes loading state handling

## Usage Example

To navigate to a blog:
```typescript
// In your component
onNavigate(`blog-2025-03-31`); // Navigate to blog by ID
```

The blog ID format used for navigation: `blog-{YYYY-MM-DD}`

## Adding Multiple Blogs (Bulk Operations)

To add multiple blogs:

1. Create individual JSON files for each blog in `public/blogs/`
2. Add corresponding entries to `public/blogs/index.json`
3. All blogs will be automatically fetched and displayed

## Tips

- Use the date format (YYYY-MM-DD) consistently for blog IDs to maintain organization
- The `slug` field should be unique and URL-friendly
- Keep blog descriptions concise (1-2 sentences) for the preview
- Use `\n` in content for line breaks in JSON
- Set `featured: true` for blogs you want to highlight
- The system handles errors gracefully with fallback states
