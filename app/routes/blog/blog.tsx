import { loadAllMd } from '~/lib/posts';
import BlogPostItem from '../../components/blog-post-item';
import type { Route } from './+types/blog';

export function meta() {
  return [
    { title: 'Blog - simonepizzamiglio.com' },
    { name: 'description', content: 'Thoughts, stories and ideas.' },
  ];
}

export async function loader() {
  const posts = await loadAllMd();
  return posts;
}

const Blog = ({ loaderData }: Route.ComponentProps) => {
  const posts = loaderData;

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">Blog</h1>
      <p className="mb-12 leading-relaxed text-muted-foreground">
        This is my little corner of the internet where I share my thoughts and experiences on
        various topics, from technical challenges I've encountered to interesting things I've
        learned along the way. Consider this my digital notebook where I document whatever comes to
        mind about stuff I've worked on or experienced.
      </p>
      <div className="space-y-8">
        {posts.map((post, index) => (
          <BlogPostItem key={index} post={post} />
        ))}
      </div>
    </>
  );
};

export default Blog;
