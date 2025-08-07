import React from 'react';
import { Github, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

type Project = {
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  websiteUrl?: string;
};

type ProjectCardProps = {
  project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">{project.name}</CardTitle>
        <CardDescription className="leading-relaxed">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col gap-4">
        <div className="mb-6 flex flex-wrap gap-2">
          {project.technologies.map((tech, techIndex) => (
            <Badge key={techIndex} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3">
          <Button asChild variant="default" size="sm">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} on GitHub (opens in new tab)`}
            >
              <Github size={16} className="mr-1" aria-hidden="true" />
              Github
            </a>
          </Button>
          {project.websiteUrl && (
            <Button asChild variant="default" size="sm">
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.name} website (opens in new tab)`}
              >
                <Globe size={16} className="mr-1" aria-hidden="true" />
                Website
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
