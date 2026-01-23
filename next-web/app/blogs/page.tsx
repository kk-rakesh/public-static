import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import blogsData from "@/data/blogs.json";

interface Blog {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  thumbnailTitle: string;
  thumbnailCategory: string;
  tags: string[];
  date: string;
  readTime: string;
  author: string;
  category: string;
  subcategory: string;
}

export default function BlogsPage() {
  const blogs: Blog[] = blogsData;

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f0] text-black">
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
        <Header />

        <main className="py-8 lg:py-16">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">All Blogs</h1>
          <div className="border-b border-gray-300 mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group">
      <article className="flex flex-col">
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 mb-4 group-hover:shadow-lg transition-shadow">
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <h3 className="text-xl font-semibold text-gray-800 leading-tight">
              {blog.thumbnailTitle}
            </h3>
            <span className="text-xs font-semibold tracking-wider text-gray-600">
              {blog.thumbnailCategory}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold leading-tight mb-2 group-hover:text-brand-green transition-colors">
          {blog.title}
        </h2>

        {/* Date and Read Time */}
        <p className="text-sm text-text-gray">
          {blog.date}, {blog.readTime}
        </p>
      </article>
    </Link>
  );
}
