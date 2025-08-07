import { loadMd } from '~/lib/posts';
import DOMPurify from 'isomorphic-dompurify';
import type { Route } from './+types/post';

export const loader = async ({ params }: Route.ComponentProps) => {
  try {
    if (!params.postId) {
      throw new Response('Not Found', { status: 404 });
    }

    const post = await loadMd(params.postId);

    if (!post) {
      throw new Response('Not Found', { status: 404 });
    }
    return post;
  } catch {
    throw new Response('Not Found', { status: 404 });
  }
};

const BlogPost = ({ loaderData }: Route.ComponentProps) => {
  const post = loaderData;
  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <>
      <title>{post.meta.title}</title>
      <meta property="og:title" content={post.meta.title} />
      <meta name="description" content={post.meta.description} />
      {/* The rest of your route content... */}
      <article className="prose prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground max-w-none break-words">
        <time className="text-primary text-sm" dateTime={post.meta.date.toISOString()}>
          {post.meta.date.toLocaleDateString()}
        </time>
        <h1 className="mb-4 mt-4 text-4xl font-bold">{post.meta.title}</h1>
        <p className="text-foreground text-2xl">
          {post.meta.description.endsWith('.')
            ? post.meta.description
            : `${post.meta.description}.`}
        </p>
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </article>
    </>
  );
};

export default BlogPost;
