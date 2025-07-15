import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO",
      company: "TechStart Inc.",
      content: "GTech Solutions transformed our entire digital infrastructure. Their expertise in cloud migration saved us 40% on operational costs while improving our system performance dramatically.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CTO",
      company: "InnovateLab",
      content: "The mobile app they developed exceeded our expectations. The user engagement increased by 300% and the app has been featured in the App Store. Absolutely phenomenal work!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Operations Director",
      company: "Global Healthcare",
      content: "Their cybersecurity audit revealed critical vulnerabilities we weren't aware of. The team implemented comprehensive security measures that gave us peace of mind and regulatory compliance.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Founder",
      company: "EcoTech Solutions",
      content: "From concept to deployment, GTech Solutions delivered a web platform that perfectly captured our vision. Their attention to detail and technical expertise is unmatched.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Lisa Wang",
      position: "Marketing Director",
      company: "RetailPro",
      content: "The e-commerce platform they built increased our online sales by 250%. The seamless integration with our existing systems made the transition effortless.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "James Miller",
      position: "IT Manager",
      company: "FinanceFirst",
      content: "Their DevOps expertise helped us achieve 99.9% uptime. The automated deployment pipeline they set up reduced our release time from days to hours.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face"
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

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-gradient-to-b from-accent/5 to-background" ref={testimonialsRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Quote className="w-4 h-4 mr-2" />
            Client Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What Our Clients
            <span className="text-primary block lg:inline lg:ml-3">Say About Us</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our satisfied clients have to say 
            about working with GTech Solutions.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className={`relative ${isVisible ? 'animate-scale-in animation-delay-300' : 'opacity-0'}`}>
          <div className="max-w-4xl mx-auto">
            
            {/* Main Testimonial */}
            <div className="bg-card border border-border rounded-3xl p-8 lg:p-12 shadow-card">
              <div className="text-center space-y-6">
                
                {/* Quote Icon */}
                <div className="gradient-primary rounded-full p-4 w-16 h-16 mx-auto">
                  <Quote className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Rating */}
                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed font-medium max-w-3xl mx-auto">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full border-2 border-primary/20"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].position} at {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="hover:border-primary hover:text-primary"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {/* Dots */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex
                        ? 'bg-primary'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="hover:border-primary hover:text-primary"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 ${isVisible ? 'animate-fade-in animation-delay-600' : 'opacity-0'}`}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-fade-in animation-delay-900' : 'opacity-0'}`}>
          <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-3xl p-8 lg:p-12 border border-primary/10">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Join Our Happy Clients
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to experience the GTech Solutions difference? Let's discuss how we can help transform your business.
            </p>
            
            <Button variant="cta" size="lg" className="group">
              Get Your Free Consultation
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;