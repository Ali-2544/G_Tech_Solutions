import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Code, Cloud, Shield, Smartphone, Database, 
  Headphones, ArrowRight, CheckCircle 
} from "lucide-react";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

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

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom web applications built with modern frameworks and technologies.",
      features: ["React & Next.js", "E-commerce Solutions", "Progressive Web Apps", "API Integration"],
      price: "Starting from $5,000"
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services for modern businesses.",
      features: ["AWS & Azure", "Cloud Migration", "DevOps Automation", "Microservices"],
      price: "Starting from $3,000"
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your digital assets.",
      features: ["Security Audits", "Penetration Testing", "Compliance", "24/7 Monitoring"],
      price: "Starting from $4,000"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      features: ["React Native", "Flutter", "iOS & Android", "App Store Optimization"],
      price: "Starting from $8,000"
    },
    {
      icon: Database,
      title: "Data Analytics",
      description: "Transform your data into actionable insights with advanced analytics.",
      features: ["Business Intelligence", "Data Visualization", "Machine Learning", "Real-time Analytics"],
      price: "Starting from $6,000"
    },
    {
      icon: Headphones,
      title: "IT Consultancy",
      description: "Strategic IT guidance to align technology with your business goals.",
      features: ["Digital Strategy", "Technology Roadmap", "System Architecture", "Process Optimization"],
      price: "Starting from $2,000"
    }
  ];

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-32 bg-background" ref={servicesRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Code className="w-4 h-4 mr-2" />
            Our Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Comprehensive IT Solutions for
            <span className="text-primary block lg:inline lg:ml-3">Every Business Need</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From web development to cloud solutions, we provide end-to-end IT services 
            that drive innovation and accelerate your business growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className={`group bg-card border border-border rounded-2xl p-8 hover-lift transition-all duration-300 ${
                  isVisible ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="gradient-primary rounded-xl p-3 w-14 h-14 mb-6 group-hover:shadow-glow transition-all duration-300">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="pt-4 border-t border-border">
                    <div className="text-primary font-semibold mb-4">
                      {service.price}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                      onClick={scrollToContact}
                    >
                      Get Quote
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-fade-in animation-delay-800' : 'opacity-0'}`}>
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 lg:p-12 border border-primary/10">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every business is unique. Let us create a tailored IT solution that perfectly fits your requirements and budget.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="cta" 
                size="lg"
                onClick={scrollToContact}
                className="group"
              >
                Discuss Your Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="hover:border-primary hover:text-primary"
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;