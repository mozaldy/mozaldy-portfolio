import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Markdown from "markdown-to-jsx";
import { FaHome } from "react-icons/fa";

const postsDir = path.join(process.cwd(), "posts");

export async function generateStaticParams() {
  const files = fs.readdirSync(postsDir);
  return files.map((file) => ({
    params: {
      slug: file.replace(/\.mdx$/, ""),
    },
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const fullPath = path.join(postsDir, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content); // Serialize the MDX content

  return (
    <>
      <Link href="/">
        <button className="px-5 py-2 rounded-full bg-slate-200 text-slate-950">
          <FaHome />
        </button>
      </Link>
      <Markdown>{content}</Markdown>
    </>
  );
}
