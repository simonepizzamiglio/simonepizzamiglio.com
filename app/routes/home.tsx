import type { Route } from './+types/home';
import ProjectCard from '~/components/project-card';
import BlogPostItem from '~/components/blog-post-item';
import { projects } from '../data/projects';
import { getLatestPosts } from '~/lib/posts';

export const loader = async () => {
  const blogPosts = await getLatestPosts(2);
  return { blogPosts };
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const { blogPosts } = loaderData;

  return (
    <div className="grid gap-16">
      {/* Hero Section */}
      <section>
        <h1 className="mb-8 text-6xl font-bold"> Hey 👋 I&apos;m Simone</h1>
        <p className="leading-relaxed text-muted-foreground">
          I&apos;m a software engineer from Italy 🇮🇹 specializing in frontend development. I have a
          strong passion for building products and turning ideas into reality. Throughout my career
          career I&apos;ve had the opportunity to work across digital agencies, enterprises,
          startups, and as a freelancer. This is my digital home where I share my thoughts and
          projects.
        </p>
      </section>

      {/* Projects Section */}
      <section>
        <h2 className="mb-8 text-3xl font-semibold md:text-4xl">Recent open-source projects</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section>
        <h2 className="mb-8 text-3xl font-semibold md:text-4xl">
          Thoughts on software development
        </h2>

        <div className="flex flex-col gap-6">
          {blogPosts.map((post) => (
            <BlogPostItem key={post.slug} post={post} variant="homepage" />
          ))}
        </div>
      </section>
    </div>
  );
}
