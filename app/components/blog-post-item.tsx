import React from 'react';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import type { PostMetadata } from '~/lib/posts';

type BlogPostItemProps = {
  post: PostMetadata;
  variant?: 'default' | 'homepage';
};

const BlogPostItem: React.FC<BlogPostItemProps> = ({ post, variant = 'default' }) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (variant === 'homepage') {
    return (
      <Link to={`/blog/${post.slug}`} className="group">
        <article>
          <h2 className="text-foreground group-hover:text-primary mb-4 text-xl font-semibold transition-colors">
            {post.title}
          </h2>
          <time
            className="text-muted-foreground mb-2 flex text-xs"
            dateTime={post.date.toISOString()}
          >
            {formattedDate}
          </time>
          <p className="text-muted-foreground mb-4 leading-relaxed">{post.description}</p>
          <ReadArticleButton />
        </article>
      </Link>
    );
  }

  return (
    <article className="grid grid-cols-1 items-start gap-8 md:grid-cols-4">
      {/* Date column */}
      <div className="mt-6 hidden md:col-span-1 md:block">
        <time
          className="text-muted-foreground text-sm leading-relaxed"
          dateTime={post.date.toISOString()}
        >
          {formattedDate}
        </time>
      </div>

      {/* Content column */}
      <div className="group relative md:col-span-3 md:px-4 md:py-6">
        <div className="bg-secondary absolute -inset-x-0 -inset-y-0 z-0 scale-95 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-0 sm:rounded-2xl"></div>
        <Link to={`/blog/${post.slug}`} className="relative z-10">
          <h2 className="text-foreground mb-4 text-2xl font-semibold">{post.title}</h2>
          <time
            className="text-muted-foreground mb-2 flex text-xs md:hidden"
            dateTime={post.date.toISOString()}
          >
            {formattedDate}
          </time>
          <p className="text-muted-foreground pb-6 leading-relaxed">{post.description}</p>
          <ReadArticleButton />
        </Link>
      </div>
    </article>
  );
};

function ReadArticleButton() {
  return (
    <Button asChild variant="link" className="h-auto gap-0 p-0 has-[>svg]:px-0">
      <span className="inline-flex items-center">
        Read article
        <ChevronRight
          size={16}
          className="ml-1 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Button>
  );
}

export default BlogPostItem;
