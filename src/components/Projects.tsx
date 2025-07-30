import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, FolderOpen } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = useSelector((state: RootState) => state.projects.projects);

  return (
    <section id="projects" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
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

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No projects available</h3>
            <p className="text-muted-foreground">Check back soon for our latest projects!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.name}
                    </CardTitle>
                    <Badge variant="secondary">Featured</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {project.description}
                  </CardDescription>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 hover:border-primary hover:text-primary">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Demo
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 hover:border-primary hover:text-primary">
                      <Github className="w-4 h-4 mr-2" />
                      Source
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 lg:p-12 border border-primary/10">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's bring your ideas to life. Our team is ready to help you build something amazing.
            </p>
            
            <Button variant="default" size="lg" className="group">
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