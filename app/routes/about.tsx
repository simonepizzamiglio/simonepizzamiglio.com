import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import type { Route } from './+types/about';
import { getYOE, getYearsAndMonths } from '~/lib/dates';

type WorkExperience = {
  company: string;
  companyUrl: string | null;
  location: string;
  startDate: string;
  endDate: string | null;
  roles: {
    title: string;
    startDate?: string;
    endDate?: string | null;
    achievements: string[];
  }[];
};

type SkillsGroup = 'programming-languages' | 'technologies' | 'cloud-platforms' | 'databases';

const workExperience: WorkExperience[] = [
  {
    company: 'DNA.inc',
    companyUrl: 'https://www.dna.inc/',
    location: 'Amsterdam, Netherlands · Remote',
    startDate: 'Nov 2024',
    endDate: null,
    roles: [
      {
        title: 'Senior Web Engineer',
        achievements: ['Improving performance and architecture of apps serving millions of users'],
      },
    ],
  },
  {
    company: 'Bobsled',
    companyUrl: 'https://bobsled.com/',
    location: 'Anywhere · Remote',
    startDate: 'Apr 2022',
    endDate: 'Jul 2024',
    roles: [
      {
        title: 'Senior Software Engineer',
        startDate: 'Dec 2023',
        endDate: 'Jul 2024',
        achievements: [
          'Contributed across the full stack as needed, including the API product, leading to faster feature development',
          'Added analytics, monitoring, and alerts to enhance responsiveness to operational incidents',
          'Enhanced Typescript support in the E2E repository, facilitating easier contributions from other engineers',
        ],
      },
      {
        title: 'Software Engineer',
        startDate: 'Apr 2022',
        endDate: 'Nov 2023',
        achievements: [
          'Architected and implemented an Authentication and User management system to ensure compliance with SOC2 by enforcing strict role-based access control',
          'Led the architecture and development of a data grid component for displaying customer buckets and data warehouses',
          'Introduced a snapshot system to optimize UI data grid component rendering, reducing rendering time from seconds to milliseconds',
          'Developed a caching and pagination system to handle large datasets efficiently, scaling to millions of objects',
          'Mentored junior engineers and participated in hiring assessments',
        ],
      },
    ],
  },
  {
    company: 'Treatwell',
    companyUrl: 'https://www.treatwell.co.uk/partners/',
    location: 'Milan, Italy · Remote',
    startDate: 'Apr 2020',
    endDate: 'Mar 2022',
    roles: [
      {
        title: 'Frontend Engineer',
        achievements: [
          'Improved Electron app performance by optimizing data computation, reducing sign-in to first page display time by 4x',
          'Assisted in refactoring codebase to communicate with printer models, easing future support for diverse models',
          'Coordinated and contributed to the development of an internal custom UI design system',
          'Created an interactive dashboard from scratch to help beauty brands track partner performance metrics',
        ],
      },
    ],
  },
  {
    company: 'ParkHere',
    companyUrl: 'https://park-here.eu/',
    location: 'Munich, Germany · Remote',
    startDate: 'Apr 2019',
    endDate: 'Mar 2020',
    roles: [
      {
        title: 'Junior Frontend Engineer',
        achievements: [
          'Maintained and enhanced an analytics web app to enable companies to monitor parking metrics for their employees',
          'Developed a React-Native mobile application from the ground up to facilitate booking of parking slots',
        ],
      },
    ],
  },
  {
    company: 'Self-Employed',
    companyUrl: null,
    location: 'Udine, Italy',
    startDate: 'Jul 2017',
    endDate: 'Jun 2019',
    roles: [
      {
        title: 'Web Developer',
        achievements: [
          'Assisted web agencies and startups in building websites and web applications',
        ],
      },
    ],
  },
  {
    company: 'Freelancer.com',
    companyUrl: 'https://www.freelancer.com/',
    location: 'Sydney, Australia · On-site',
    startDate: 'Nov 2016',
    endDate: 'May 2017',
    roles: [
      {
        title: 'Frontend Developer Intern',
        achievements: [
          'Revamped and A/B tested the job posting page with the Product Design Lead, increasing successful postings by 5%',
          'Applied SMACSS principles to organize CSS effectively, ensuring maintainability and usability across the entire team',
          'Implemented responsive web design patterns to ensure compatibility across browsers, platforms, and devices',
        ],
      },
    ],
  },
];

const skills: { [key in SkillsGroup]: string[] } = {
  'programming-languages': ['Javascript', 'TypeScript', 'HTML', 'CSS'],
  technologies: [
    'React',
    'Remix',
    'Next.js',
    'Redux',
    'React Query',
    'GraphQL',
    'Zod',
    'Tailwind CSS',
    'Styled-components',
    'MUI',
    'Storybook',
    'Cypress',
    'Playwright',
    'React-testing-library',
    'Jest',
    'Vitest',
    'Node.js',
    'Firebase',
    'Electron',
  ],
  'cloud-platforms': ['Google Cloud Platform'],
  databases: ['Firestore'],
};

export const loader = () => {
  return {
    yoe: getYOE(2016, 10),
  };
};

const About = ({ loaderData }: Route.ComponentProps) => {
  const { yoe } = loaderData;

  return (
    <div className="flex flex-col gap-y-16">
      {/* Introduction Section */}
      <section>
        <h1 className="mb-8 text-4xl font-bold">About Me</h1>
        <div className="text-muted-foreground flex max-w-none flex-col gap-y-6 leading-relaxed">
          <p>
            <b>Senior Frontend Engineer</b> with {yoe} years of experience, specializing in React
            and TypeScript for the past {yoe - 3}. I am a passionate product builder who truly
            enjoys creating meaningful user experiences, shipping real products, and making
            customers happy.
          </p>
          <p>
            I have worked in a variety of settings, including large corporations, fast-growing
            startups, digital agencies, and freelance projects. These diverse experiences have made
            me flexible and adaptable, and I am comfortable working in uncertain or evolving
            environments where figuring things out is part of the job.
          </p>
          <p>
            My core strength lies in frontend development, but I also have experience contributing
            to full stack projects. I am confident in leading and building web applications that are
            performant, reusable, and easy to maintain. I bring strong critical thinking and
            problem-solving skills to every project, and I work well in collaborative teams with
            open communication and a focus on quality.
          </p>
          <p>
            I am always learning and keep myself up to date with the latest technologies and best
            practices to build better software and stay ahead in the field.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-3xl font-bold">Skills</h2>
        <div className="flex flex-col gap-4">
          {Object.entries(skills).map(([group, skillList]) => (
            <div key={group}>
              <h3 className="mb-2 font-semibold capitalize">{group.replace('-', ' ')}</h3>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <span key={skill} className="bg-muted rounded px-2 py-1 text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-3xl font-bold">Work Experience</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="bg-primary absolute bottom-0 left-[0.5px] top-2 w-px" />

          {workExperience.map((company, companyIndex) => (
            <div key={companyIndex} className="relative pb-12 pl-8 last:pb-0">
              {/* Timeline dot */}
              <div className="border-background bg-primary absolute left-0 top-2 h-4 w-4 -translate-x-1/2 transform rounded-full border-4" />

              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                  <div className="text-muted-foreground mb-1 text-sm">
                    {company.startDate} - {company.endDate || 'Present'}
                  </div>
                  <div className="text-foreground mb-1 font-semibold">
                    {company.companyUrl ? (
                      <Link to={company.companyUrl} className="underline" target="_blank">
                        {company.company}
                      </Link>
                    ) : (
                      company.company
                    )}
                  </div>
                  <div className="text-muted-foreground mb-1 text-sm">{company.location}</div>
                </div>

                <div className="space-y-6 md:col-span-2">
                  {company.roles.map((role, roleIndex) => {
                    const startDate = role.startDate || company.startDate;
                    const endDate = role.endDate || company.endDate;
                    const duration = getYearsAndMonths(startDate, endDate);
                    return (
                      <div
                        key={roleIndex}
                        // className={roleIndex > 0 ? "border-t border-border pt-6" : ""}
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <h3 className="text-foreground text-xl font-semibold">{role.title}</h3>
                          <span className="text-muted-foreground text-sm">• {duration}</span>
                        </div>
                        <ul className="space-y-2">
                          {role.achievements.map((achievement, achievementIndex) => (
                            <li
                              key={achievementIndex}
                              className="text-muted-foreground flex items-start leading-relaxed"
                            >
                              <span className="text-primary mr-3 flex-shrink-0">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Button asChild className="mr-auto">
        <Link to="/resume" target="_blank">
          Download Resume
        </Link>
      </Button>
    </div>
  );
};

export default About;
