import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Filter } from "lucide-react";
import portfolioProjects from "@/assets/portfolio-projects.png";

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const projectsRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Web Development", "Mobile Apps", "E-commerce", "Healthcare", "Fintech"];

  const projects = [
    {
      id: 1,
      title: "HealthTech Dashboard",
      category: "Healthcare",
      description: "A comprehensive healthcare management system with patient records, appointments, and analytics.",
      image: portfolioProjects,
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      demoUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "E-commerce Platform",
      category: "E-commerce",
      description: "Modern e-commerce solution with advanced inventory management and payment processing.",
      image: portfolioProjects,
      technologies: ["Next.js", "Stripe", "MongoDB", "Vercel"],
      demoUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 3,
      title: "Banking Mobile App",
      category: "Fintech",
      description: "Secure mobile banking application with biometric authentication and real-time transactions.",
      image: portfolioProjects,
      technologies: ["React Native", "Node.js", "MySQL", "AWS"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 4,
      title: "SaaS Analytics Platform",
      category: "Web Development",
      description: "Business intelligence platform providing real-time analytics and customizable dashboards.",
      image: portfolioProjects,
      technologies: ["Vue.js", "Python", "Redis", "Docker"],
      demoUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 5,
      title: "Food Delivery App",
      category: "Mobile Apps",
      description: "Full-featured food delivery application with real-time tracking and payment integration.",
      image: portfolioProjects,
      technologies: ["Flutter", "Firebase", "Google Maps", "Stripe"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 6,
      title: "Corporate Website",
      category: "Web Development",
      description: "Professional corporate website with CMS integration and SEO optimization.",
      image: portfolioProjects,
      technologies: ["WordPress", "PHP", "MySQL", "CloudFlare"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <section id="projects" className="py-20 lg:py-32 bg-background" ref={projectsRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Github className="w-4 h-4 mr-2" />
            Our Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Successful Projects We've
            <span className="text-primary block lg:inline lg:ml-3">Delivered</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of successful projects across various industries. 
            Each project showcases our expertise and commitment to delivering exceptional results.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`mb-12 ${isVisible ? 'animate-slide-up animation-delay-300' : 'opacity-0'}`}>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="hover:border-primary hover:text-primary"
              >
                <Filter className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`group bg-card border border-border rounded-2xl overflow-hidden hover-lift transition-all duration-300 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Featured Badge */}
                {project.featured && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <Button size="sm" variant="secondary" className="bg-background/90 hover:bg-background">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-background/90 hover:bg-background">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 hover:border-primary hover:text-primary"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Demo
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 hover:border-primary hover:text-primary"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Source
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Projects */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Github className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground">Try selecting a different category</p>
          </div>
        )}

        {/* CTA Section */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-fade-in animation-delay-800' : 'opacity-0'}`}>
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 lg:p-12 border border-primary/10">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's bring your ideas to life. Our team is ready to help you build something amazing.
            </p>
            
            <Button variant="cta" size="lg" className="group">
              Start Your Project
              <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;