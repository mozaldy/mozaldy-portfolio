import { Octokit } from "@octokit/rest";
import matter from "gray-matter";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

console.log(octokit.rest.rateLimit.get());
interface GitHubContent {
  type: string;
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string;
}

export async function getAllPostsFromGitHub() {
  try {
    const { data } = await octokit.repos.getContent({
      owner: "mozaldy",
      repo: "articles",
      path: "posts",
    });

    if (!Array.isArray(data)) {
      throw new Error("No posts found or unexpected response format");
    }

    const posts = await Promise.all(
      data.map(async (file) => {
        if (file.type !== "file" || !file.name.endsWith(".mdx")) {
          console.warn(
            `Skipping file ${file.name}: Invalid type or extension.`,
          );
          return null;
        }

        try {
          const response = await octokit.repos.getContent({
            owner: "mozaldy",
            repo: "articles",
            path: file.path,
          });

          const fileContent = response.data as GitHubContent;

          if (fileContent && fileContent.content) {
            const rawContent = Buffer.from(
              fileContent.content,
              "base64",
            ).toString("utf-8");
            const { data: frontMatters, content: mdxContent } =
              matter(rawContent);

            let imageUrl = frontMatters.image as string;
            if (imageUrl && !imageUrl.startsWith("http")) {
              imageUrl = `https://raw.githubusercontent.com/mozaldy/articles/main${imageUrl}`;
            }

            return {
              slug: file.name.replace(".mdx", ""),
              frontMatters: {
                ...frontMatters,
              },
              image: imageUrl,
              content: mdxContent,
            };
          }
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
        }

        return null;
      }),
    );

    return posts.filter(
      (post): post is NonNullable<typeof post> => post !== null,
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
