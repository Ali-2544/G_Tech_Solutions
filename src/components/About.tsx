import React, { useEffect, useRef } from 'react';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

interface AboutProps {
  id?: string;
}

const About: React.FC<AboutProps> = ({ id }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About GTech Solutions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We are a leading IT services company dedicated to helping businesses thrive in the digital age through innovative technology solutions and expert consultancy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-on-scroll">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Transforming Businesses Through Technology
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              With over a decade of experience in the IT industry, GTech Solutions has been at the forefront of digital transformation, helping companies of all sizes leverage technology to achieve their business goals.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Our team of skilled professionals combines technical expertise with business acumen to deliver solutions that not only meet your current needs but also scale with your future growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-[#0B6D76] text-white px-6 py-3 rounded-full text-sm font-semibold">
                10+ Years Experience
              </div>
              <div className="bg-[#0B6D76] text-white px-6 py-3 rounded-full text-sm font-semibold">
                500+ Projects Completed
              </div>
              <div className="bg-[#0B6D76] text-white px-6 py-3 rounded-full text-sm font-semibold">
                99% Client Satisfaction
              </div>
            </div>
          </div>
          <div className="animate-on-scroll">
            <div className="bg-gradient-to-br from-[#0B6D76] to-[#0A5A63] rounded-2xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-6">Our Mission</h4>
              <p className="text-lg mb-6">
                To empower businesses with cutting-edge technology solutions that drive innovation, efficiency, and growth in an increasingly digital world.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm opacity-90">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm opacity-90">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm opacity-90">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm opacity-90">Secure</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Target,
              title: "Our Vision",
              description: "To be the leading IT solutions provider, recognized for innovation and excellence."
            },
            {
              icon: Users,
              title: "Expert Team",
              description: "Skilled professionals with diverse expertise in cutting-edge technologies."
            },
            {
              icon: Award,
              title: "Quality Assurance",
              description: "Rigorous testing and quality control processes ensure superior results."
            },
            {
              icon: TrendingUp,
              title: "Growth Focus",
              description: "Solutions designed to scale with your business and adapt to market changes."
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className="animate-on-scroll bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-[#0B6D76] rounded-lg flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;