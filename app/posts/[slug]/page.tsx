import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { FaHome } from "react-icons/fa";
import rehypeHighlight from "rehype-highlight";

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

  return (
    <>
      <Link href="/">
        <button className="px-5 py-2 font-semibold rounded-full bg-slate-200 text-slate-950">
          <FaHome />
        </button>
      </Link>
      <div className="my-10 px-2 prose prose-pre:bg-slate-950 prose-headings:text-slate-200 prose-p:text-slate-100">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              rehypePlugins: [rehypeHighlight],
            },
          }}
        />
      </div>
    </>
  );
}
