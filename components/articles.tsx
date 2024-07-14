import { getAllPosts } from "@/utils/mdx";
import { HoverEffect } from "./ui/card-hover-effect";

export async function Articles() {
  const posts = getAllPosts();

  const processedPosts = posts.map((post) => ({
    title: post.frontMatters.title || "Untitled",
    description: post.frontMatters.excerpt || "No description available",
    date: post.frontMatters.date || "Unknown date", // Use date from frontMatters
    link: `/posts/${post.slug}`, // Construct the link using the slug
    image: post.frontMatters.image || "/default-image.jpeg", // Use image from frontMatters
  }));

  console.log(processedPosts);
  return (
    <div className="max-w-5xl mx-auto px-8">
      <h1 className="text-center md:tracking-wider mb-4 text-lg md:text-2xl lg:text-4xl">
        My Articles
      </h1>
      <HoverEffect items={processedPosts} />
    </div>
  );
}
