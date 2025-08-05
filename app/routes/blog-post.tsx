import { loadMd } from '~/lib/posts';
import type { Route } from './+types/blog-post';
import DOMPurify from 'isomorphic-dompurify';

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
      <article className="prose max-w-none break-words prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground">
        <time className="text-sm text-primary" dateTime={post.meta.date.toISOString()}>
          {post.meta.date.toLocaleDateString()}
        </time>
        <h1 className="mt-4 mb-4 text-4xl font-bold">{post.meta.title}</h1>
        <p className="text-2xl text-foreground">
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
