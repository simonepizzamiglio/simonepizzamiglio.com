import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', './routes/about.tsx'),
  route('projects', './routes/projects.tsx'),
  ...prefix('blog', [
    index('./routes/blog.tsx'),
    route(':postId', './routes/blog-post.tsx'),
    route('assets/*', './routes/blog.assets.$.tsx'),
  ]),
  route('resume', './routes/resume.tsx'),
] satisfies RouteConfig;
