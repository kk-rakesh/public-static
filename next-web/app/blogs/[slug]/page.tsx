import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogContent from "@/components/blog/BlogContent";
import blogsData from "@/data/blogs.json";

interface BlogSection {
  id: string;
  title: string;
  content: string;
}

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
  introduction: string;
  sections: BlogSection[];
}

export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = blogsData.find((b) => b.slug === slug) as Blog | undefined;

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f0] text-black">
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
        <Header />
        <BlogContent blog={blog} />
        <Footer />
      </div>
    </div>
  );
}
