import React, { useEffect, useState } from 'react';
import { ArrowRight, Code, TrendingUp, Share2, Target, Palette, Mail, Search, Globe, Layout, BarChart, Send, CheckCircle, ExternalLink } from 'lucide-react';
import ThreeScene from '../components/ThreeScene';
import { personalInfo, services, projects, skills } from '../mock';
import { toast } from '../hooks/use-toast';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

const iconMap = {
  Code,
  TrendingUp,
  Share2,
  Target,
  Palette,
  Mail,
  Search,
  Globe,
  Layout,
  BarChart
};

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Initialize animations on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (frontend only for now)
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0B0B1A] text-white">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ThreeScene />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-[#0B0B1A] z-5" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <div className="fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
              Hi, I'm {personalInfo.name}
            </h1>
            <p className="text-2xl md:text-4xl font-semibold text-gray-200 mb-4">
              {personalInfo.tagline}
            </p>
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Based in {personalInfo.location} • 1+ Years of Experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToProjects}
                className="px-8 py-6 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-lg font-medium text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105"
              >
                Explore My Work
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                onClick={scrollToContact}
                variant="outline"
                className="px-8 py-6 border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 rounded-lg font-medium text-lg transition-all duration-300 hover:scale-105"
              >
                Let's Work Together
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <Card className="bg-gradient-to-br from-[#14142A]/80 to-[#14142A]/40 border-purple-500/30 backdrop-blur-lg shadow-2xl shadow-purple-500/20">
              <CardContent className="p-8 md:p-12">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                  {personalInfo.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">8+</div>
                    <div className="text-sm text-gray-400">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">350+</div>
                    <div className="text-sm text-gray-400">Leads Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">70%</div>
                    <div className="text-sm text-gray-400">Avg Traffic Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
                    <div className="text-sm text-gray-400">Client Satisfaction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gradient-to-b from-transparent to-[#14142A]/30">
        <div className="max-w-7xl mx-auto">
          <div className="fade-in text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Services
            </h2>
            <p className="text-gray-400 text-lg">Comprehensive digital solutions to grow your business</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <div
                  key={service.id}
                  className="fade-in group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="h-full bg-gradient-to-br from-[#14142A]/90 to-[#14142A]/50 border-purple-500/20 hover:border-purple-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-2 cursor-pointer overflow-hidden">
                    <CardContent className="p-6">
                      <div className="mb-4 inline-block p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                        {Icon && <Icon size={32} className="text-purple-400" />}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="space-y-2">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                            <CheckCircle size={16} className="text-purple-400" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="fade-in text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg">Real results for real businesses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full bg-gradient-to-br from-[#14142A]/90 to-[#14142A]/50 border-purple-500/20 hover:border-purple-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14142A] to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-white">{project.name}</h3>
                      <a
                        href={`https://${project.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                    <div className="text-sm text-purple-400 mb-4">{project.category}</div>
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Problem</div>
                        <div className="text-sm text-gray-400">{project.problem}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Strategy</div>
                        <div className="text-sm text-gray-400">{project.strategy}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Result</div>
                        <div className="text-sm text-purple-300 font-medium">{project.result}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-purple-500/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{project.metrics.traffic}</div>
                        <div className="text-xs text-gray-500">Traffic</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{project.metrics.leads}</div>
                        <div className="text-xs text-gray-500">Leads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{project.metrics.engagement}</div>
                        <div className="text-xs text-gray-500">Engagement</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gradient-to-b from-[#14142A]/30 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="fade-in text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => {
              const Icon = iconMap[skill.icon];
              return (
                <div
                  key={skill.name}
                  className="fade-in group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="bg-gradient-to-br from-[#14142A]/90 to-[#14142A]/50 border-purple-500/20 hover:border-purple-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-2 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 inline-block p-4 bg-purple-500/20 rounded-full group-hover:bg-purple-500/30 transition-colors">
                        {Icon && <Icon size={28} className="text-purple-400" />}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{skill.name}</h3>
                      <div className="text-2xl font-bold text-purple-400">{skill.level}%</div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="fade-in text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Build & Grow Your Brand
            </h2>
            <p className="text-gray-400 text-lg">Ready to take your business to the next level?</p>
          </div>

          <Card className="bg-gradient-to-br from-[#14142A]/80 to-[#14142A]/40 border-purple-500/30 backdrop-blur-lg shadow-2xl shadow-purple-500/20">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#14142A]/50 border-purple-500/30 focus:border-purple-500 text-white placeholder-gray-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#14142A]/50 border-purple-500/30 focus:border-purple-500 text-white placeholder-gray-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#14142A]/50 border-purple-500/30 focus:border-purple-500 text-white placeholder-gray-500 min-h-32"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-6 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-lg font-medium text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2" size={20} />
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-purple-500/20 text-center space-y-2">
                <div className="text-gray-400">
                  <span className="font-medium text-white">Phone:</span> {personalInfo.phone}
                </div>
                <div className="text-gray-400">
                  <span className="font-medium text-white">Email:</span> {personalInfo.email}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2025 {personalInfo.name}. All rights reserved.</p>
          <p className="text-sm mt-2">Built with passion for digital growth</p>
        </div>
      </footer>

      <style>{`
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .fade-in.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
