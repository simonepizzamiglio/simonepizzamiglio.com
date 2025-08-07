import { projects } from '../data/projects';
import ProjectCard from '../components/project-card';

const Projects = () => {
  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">Projects</h1>
      <p className="text-muted-foreground mb-12 leading-relaxed">
        In my free time, which is not much, I explore new technologies by building projects.
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </>
  );
};

export default Projects;
