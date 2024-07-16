import matter from "gray-matter";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { FaHome } from "react-icons/fa";
import rehypeHighlight from "rehype-highlight";
import { getPostContent } from "@/utils/mdx";

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
