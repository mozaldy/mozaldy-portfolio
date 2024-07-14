import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDir = path.join(process.cwd(), "posts");

export function getPostSlugs() {
  return fs.readdirSync(postDir);
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postDir, `${slug}`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { data, content };
}

export function getAllPosts(): { slug: string; frontMatters: any }[] {
  const slugs = getPostSlugs();

  const posts = slugs.map((slug) => {
    const { data } = getPostBySlug(slug);
    return {
      slug: slug.replace(/\.mdx/, ""),
      frontMatters: data,
    };
  });
  return posts;
}
