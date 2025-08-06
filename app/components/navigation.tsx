import { Link, useLocation } from 'react-router';
import { Github, Linkedin, Twitter, Mail, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Button } from '~/components/ui/button';
import { useState } from 'react';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl px-6 py-4">
        <div className="flex flex-row-reverse items-center justify-between md:flex-row">
          {/* Left side - Navigation Links (Desktop) */}
          <div className="hidden items-center space-x-8 md:flex">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm transition-colors duration-300 hover:text-primary ${
                  isActive(link.path)
                    ? 'underline decoration-primary decoration-2 underline-offset-4'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Menu */}
          <div className="md:hidden">
            <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1"
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-menu"
                  aria-label="Toggle navigation menu"
                >
                  <span className="text-sm">Menu</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isMenuOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48" align="end" id="mobile-menu">
                <div className="flex flex-col space-y-2" role="menu">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-2 py-1 text-sm transition-colors duration-300 hover:text-primary ${
                        isActive(link.path)
                          ? 'underline decoration-primary decoration-2 underline-offset-4'
                          : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Right side - Social Icons */}
          <div className="flex items-center space-x-5">
            <a
              href="https://github.com/simonepizzamiglio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors duration-300 hover:text-primary"
              aria-label="GitHub profile (opens in new tab)"
            >
              <Github size={20} aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/simone-pizzamiglio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors duration-300 hover:text-primary"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              <Linkedin size={20} aria-hidden="true" />
            </a>
            <a
              href="https://twitter.com/simonepizz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors duration-300 hover:text-primary"
              aria-label="Twitter profile (opens in new tab)"
            >
              <Twitter size={20} aria-hidden="true" />
            </a>
            <a
              href="mailto:me@simonepizzamiglio.com"
              className="text-muted-foreground transition-colors duration-300 hover:text-primary"
              aria-label="Email contact"
            >
              <Mail size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
