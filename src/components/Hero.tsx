import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import heroTech from "@/assets/hero-tech.png";

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const animatedTexts = [
    "Innovative IT Solutions",
    "Digital Transformation",
    "Future-Ready Systems"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % animatedTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    "24/7 Expert Support",
    "Cutting-Edge Technology",
    "Proven Track Record"
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float blur-xl"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-primary/5 rounded-full animate-float animation-delay-2000 blur-xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className={`space-y-4 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Trusted by 500+ Companies
              </div>
              
              <h1 className="text-4xl sm:text-4xl lg:text-3xl mb-[100px] xl:text-7xl font-bold leading-tight">
                <span className="text-foreground">Your Partner in</span>
                <br />
                <span className="text-shimmer block h-[20vh] ">
                  {animatedTexts[currentText]}
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Transforming businesses through innovative technology solutions. 
                We deliver scalable, secure, and cutting-edge IT services that drive growth and success.
              </p>
            </div>

            {/* Features List */}
            <div className="flex flex-wrap gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => scrollToSection("#contact")}
                className="group"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => scrollToSection("#services")}
                className="group hover:border-primary hover:text-primary"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Our Services
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className={`relative ${isVisible ? 'animate-scale-in animation-delay-500' : 'opacity-0'}`}>
            <div className="relative z-10">
              <img
                src={heroTech}
                alt="GTech Solutions - IT Services"
                className="w-full h-auto max-w-lg mx-auto animate-float"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full animate-bounce-in animation-delay-1000"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/30 rounded-full animate-bounce-in animation-delay-1500"></div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent rounded-full scale-150 blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-ping"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;