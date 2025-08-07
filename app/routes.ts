import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', './routes/about.tsx'),
  route('projects', './routes/projects.tsx'),
  ...prefix('blog', [
    index('./routes/blog/blog.tsx'),
    route(':postId', './routes/blog/post.tsx'),
    route('assets/*', './routes/blog/assets.$.tsx'),
  ]),
  route('resume', './routes/resume.ts'),
  route('action/set-theme', './routes/action/set-theme.ts'),
] satisfies RouteConfig;
