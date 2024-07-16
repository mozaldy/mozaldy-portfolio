import { getAllPostsFromGitHub } from "@/utils/mdx";
import { ArticleCards } from "./ui/article-cards";

export async function Articles() {
  const posts = await getAllPostsFromGitHub();
  const processedPosts = posts.map((post) => ({
    title: post.frontMatters.title || "Untitled",
    description: post.frontMatters.excerpt || "No description available",
    date: post.frontMatters.date || "Unknown date",
    link: `/posts/${post.slug}`,
    image: post.frontMatters.image || "/default-image.jpeg",
  }));

  return (
    <div id="articles">
      <h1 className="text-center my-10 md:tracking-wider text-lg md:text-2xl lg:text-4xl">
        My Articles
      </h1>
      <ArticleCards items={processedPosts} />
    </div>
  );
}
