import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Briefcase, Calendar, DollarSign, Users, X } from 'lucide-react';

interface JobsProps {
  id?: string;
}

const Jobs: React.FC<JobsProps> = ({ id }) => {
  const [jobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      posted: "2 days ago",
      description: "We're looking for a senior frontend developer to join our team and help build amazing user experiences.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "UI/UX design skills", "Team leadership experience"]
    },
    {
      id: 2,
      title: "Backend Developer",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      posted: "1 week ago",
      description: "Join our backend team to develop scalable APIs and microservices that power our applications.",
      requirements: ["Node.js & Python", "Database design", "API development", "Cloud platforms (AWS/Azure)"]
    },
    {
      id: 3,
      title: "QA Automation Engineer",
      department: "Quality Assurance",
      location: "Remote",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      posted: "3 days ago",
      description: "Help us maintain high quality standards through automated testing and quality assurance processes.",
      requirements: ["Test automation frameworks", "Selenium/Cypress", "CI/CD pipelines", "Bug tracking systems"]
    },
    {
      id: 4,
      title: "IT Support Specialist",
      department: "IT Support",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$60,000 - $80,000",
      posted: "5 days ago",
      description: "Provide technical support and troubleshooting for our clients' IT infrastructure and systems.",
      requirements: ["Technical troubleshooting", "Hardware/software support", "Network administration", "Customer service skills"]
    },
    {
      id: 5,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$130,000 - $160,000",
      posted: "1 day ago",
      description: "Build and maintain our CI/CD pipelines and cloud infrastructure for optimal performance.",
      requirements: ["Docker & Kubernetes", "CI/CD tools", "Cloud infrastructure", "Infrastructure as Code"]
    },
    {
      id: 6,
      title: "UI/UX Designer",
      department: "Design",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$85,000 - $115,000",
      posted: "1 week ago",
      description: "Design intuitive and beautiful user interfaces for our web and mobile applications.",
      requirements: ["Figma/Adobe Creative Suite", "User research", "Prototyping", "Design systems"]
    }
  ]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: ''
  });

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

  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDepartment) {
      filtered = filtered.filter(job => job.department === selectedDepartment);
    }

    if (selectedLocation) {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, selectedDepartment, selectedLocation, jobs]);

  const departments = [...new Set(jobs.map(job => job.department))];
  const locations = [...new Set(jobs.map(job => job.location))];

  const handleApply = (job: any) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Application submitted for ${selectedJob.title}!`);
    setShowApplicationModal(false);
    setApplicationData({
      name: '',
      email: '',
      phone: '',
      resume: '',
      coverLetter: ''
    });
  };

  return (
    <section id={id} ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Join Our Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover exciting career opportunities and be part of a dynamic team that's shaping the future of technology
          </p>
        </div>

        {/* Job Filters */}
        <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 mb-12 shadow-lg animate-on-scroll">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0B6D76] focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0B6D76] focus:border-transparent dark:bg-gray-800 dark:text-white"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0B6D76] focus:border-transparent dark:bg-gray-800 dark:text-white"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDepartment('');
                setSelectedLocation('');
              }}
              className="bg-[#0B6D76] text-white px-6 py-3 rounded-xl hover:bg-[#0A5A63] transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid gap-6">
          {filteredJobs.map((job, index) => (
            <div 
              key={job.id}
              className="animate-on-scroll bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {job.title}
                    </h3>
                    <span className="bg-[#0B6D76] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {job.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-300 mb-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{job.posted}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, reqIndex) => (
                      <span 
                        key={reqIndex}
                        className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 lg:mt-0 lg:ml-8">
                  <button
                    onClick={() => handleApply(job)}
                    className="bg-[#0B6D76] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#0A5A63] transition-all duration-300 transform hover:scale-105 w-full lg:w-auto"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
          </div>
        )}

        {/* Application Modal */}
        {showApplicationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Apply for {selectedJob?.title}
                </h3>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={applicationData.name}
                    onChange={(e) => setApplicationData({...applicationData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0B6D76] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={applicationData.email}
                    onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0B6D76] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={applicationData.phone}
                    onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0B6D76] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resume/CV (URL or brief description)
                  </label>
                  <input
                    type="text"
                    required
                    value={applicationData.resume}
                    onChange={(e) => setApplicationData({...applicationData, resume: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0B6D76] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={applicationData.coverLetter}
                    onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0B6D76] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowApplicationModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-[#0B6D76] text-white rounded-xl hover:bg-[#0A5A63] transition-all duration-300"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;