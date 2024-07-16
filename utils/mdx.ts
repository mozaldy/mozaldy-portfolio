import strict from "assert/strict";
import axios from "axios";
import matter from "gray-matter";

const GITHUB_API_URL =
  "https://api.github.com/repos/mozaldy/articles/contents/posts";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function getAllPostsFromGitHub() {
  try {
    const response = await axios.get(GITHUB_API_URL, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const posts = await Promise.all(
      response.data.map(async (file: any) => {
        const { data } = await axios.get(file.download_url);
        const { content, data: frontMatters } = matter(data);

        return {
          slug: file.name.replace(".mdx", ""),
          frontMatters,
          content,
        };
      }),
    );

    return posts;
  } catch (error) {
    console.error("Error fetching posts from GitHub:", error);
    return [];
  }
}

export async function getPostContent(slug: string) {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/${slug}.mdx`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { data } = await axios.get(response.data.download_url);
    const { content, data: frontMatter } = matter(data);

    return { frontMatter, content };
  } catch (error) {
    console.error("Error fetching post content:", error);
    return null;
  }
}
