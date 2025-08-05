import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import { resolve } from 'path';
import { glob } from 'glob';
import { parse } from 'marked';
import z from 'zod/v4';

const MdAttributes = z.object({
  title: z.string(),
  date: z.date(),
  description: z.string(),
});

const PostMetadataSchema = z.object({
  ...MdAttributes.shape,
  slug: z.string(),
  path: z.string(),
});

const IndividualPostSchema = z.object({
  content: z.any(),
  meta: PostMetadataSchema,
});

export type PostMetadata = z.infer<typeof PostMetadataSchema>;
export type IndividualPost = z.infer<typeof IndividualPostSchema>;

export const paths = ['content/blog'];

export const listMdFiles = (paths: string[]): Promise<string[][]> => {
  const allFilesPromises = paths.map(async (path: string) => {
    return glob(resolve(process.cwd(), path, '**', '*.md'));
  });

  return Promise.all(allFilesPromises);
};

export const getFileContent = (path: string) => readFile(path, { encoding: 'utf-8' });

export const getMdAttributes = (content: string) => {
  const { data: attributes } = matter(content);

  return MdAttributes.parse(attributes);
};

const getMdPath = async (postId: string): Promise<string | null> => {
  const mdPaths = await listMdFiles(paths);
  const flatMdPaths = mdPaths.flat();

  const foundPath = flatMdPaths.find((path) => path.includes(`${postId}.md`));

  if (!foundPath) {
    return null;
  }

  return resolve(process.cwd(), foundPath);
};

const compileMd = async (mdContent: string) => {
  const { content } = matter(mdContent);

  // Transform relative asset paths to use the blog assets route
  const transformedContent = content.replace(
    /!\[([^\]]*)\]\(assets\/([^)]+)\)/g,
    '![$1](/blog/assets/$2)',
  );

  const compiled = await parse(transformedContent);

  return String(compiled);
};

export const loadMd = async (postId: string) => {
  const path = await getMdPath(postId);

  if (!path) {
    return null;
  }

  const content = await getFileContent(path);
  const [mdxContent, attributes] = await Promise.all([
    compileMd(content),
    getMdAttributes(content),
  ]);

  const post = IndividualPostSchema.parse({
    content: mdxContent,
    meta: {
      ...attributes,
      slug: path.split('/').pop()?.replace('.md', ''),
      path,
    },
  });

  return post;
};

export const loadAllMd = async (orderBy: 'dateAsc' | 'dateDesc' = 'dateDesc') => {
  const allFiles = await listMdFiles(paths);
  const flatFiles = allFiles.flat();

  const files = flatFiles.map(async (filePath) => {
    const content = await getFileContent(filePath);
    const attributes = getMdAttributes(content);
    const postMetadata = PostMetadataSchema.parse({
      path: filePath,
      slug: filePath.split('/').pop()?.replace('.md', ''),
      ...attributes,
    });
    return postMetadata;
  });

  const posts = await Promise.all(files);

  const safePosts = z.array(PostMetadataSchema).parse(posts);

  const sortedPosts =
    orderBy === 'dateAsc'
      ? safePosts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      : safePosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return sortedPosts;
};

export const getLatestPosts = async (count: number = 2) => {
  const allPosts = await loadAllMd();
  return allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};
