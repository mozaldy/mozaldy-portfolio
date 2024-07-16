import { Octokit } from "@octokit/rest";
import matter from "gray-matter";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { FaHome } from "react-icons/fa";
import rehypeHighlight from "rehype-highlight";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function getPostContent(slug: string) {
  try {
    const response = await octokit.repos.getContent({
      owner: "mozaldy",
      repo: "articles",
      path: `posts/${slug}.mdx`,
    });

    if ("content" in response.data) {
      const rawContent = Buffer.from(response.data.content, "base64").toString(
        "utf-8",
      );
      const { data: frontMatter, content } = matter(rawContent);
      return { frontMatter, content };
    } else {
      throw new Error("Content not found");
    }
  } catch (error) {
    console.error("Error fetching post content:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const { data } = await octokit.repos.getContent({
      owner: "mozaldy",
      repo: "articles",
      path: "posts",
    });

    if (Array.isArray(data)) {
      return data
        .filter((file) => file.type === "file" && file.name.endsWith(".mdx"))
        .map((file) => ({
          slug: file.name.replace(/\.mdx$/, ""),
        }));
    }
  } catch (error) {
    console.error("Error generating static params:", error);
  }
  return [];
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const postData = await getPostContent(slug);

  if (!postData) {
    return <div>Post not found</div>;
  }

  const { frontMatter, content } = postData;

  return (
    <>
      <Link href="/">
        <button className="px-5 py-2 font-semibold rounded-full bg-slate-200 text-slate-950">
          <FaHome />
        </button>
      </Link>
      <article className="my-10 px-2 prose prose-pre:bg-slate-950 prose-headings:text-slate-200 prose-p:text-slate-100">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              rehypePlugins: [rehypeHighlight],
            },
          }}
        />
      </article>
    </>
  );
}
