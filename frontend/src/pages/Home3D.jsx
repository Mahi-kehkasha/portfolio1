import React from 'react';
import SceneManager from '../components/3d/SceneManager';
import Navigation from '../components/overlay/Navigation';
import { personalInfo, services, projects, skills } from '../mock';
import { ArrowRight, Send, Mail, Phone, Code, TrendingUp, Share2, Target, Palette, Server } from 'lucide-react';

const iconMap = { Code, TrendingUp, Share2, Target, Palette, Server };

const Home3D = () => {
  return (
    <div className="relative w-full bg-[#0B0B1A]">
      {/* Fixed 3D Canvas Background */}
      <SceneManager />
      
      {/* Fixed Navigation */}
      <Navigation />
      
      {/* Scrollable Content Sections */}
      <div className="relative z-10">
        {/* SECTION 1: HERO */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-5xl">
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Hi, I'm {personalInfo.name}
            </h1>
            <p className="text-2xl md:text-4xl font-semibold text-white mb-4">
              {personalInfo.tagline}
            </p>
            <p className="text-lg md:text-xl text-gray-400 mb-8">
              {personalInfo.location} • {personalInfo.experience}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-full font-medium text-lg shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Explore Work <ArrowRight size={20} />
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105"
              >
                Let's Connect
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: ABOUT */}
        <section id="about" className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="bg-black/30 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 md:p-12">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
                {personalInfo.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-500/10 rounded-2xl p-6 border border-purple-500/20">
                  <div className="text-3xl font-bold text-purple-400 mb-2">Primary</div>
                  <div className="text-lg text-gray-300">{personalInfo.primarySkill}</div>
                </div>
                <div className="bg-purple-500/10 rounded-2xl p-6 border border-purple-500/20">
                  <div className="text-3xl font-bold text-purple-400 mb-2">Secondary</div>
                  <div className="text-lg text-gray-300">{personalInfo.secondarySkill}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SERVICES */}
        <section id="services" className="min-h-[150vh] flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-6xl w-full">
            <h2 className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = iconMap[service.icon === 'browser' ? 'Code' : service.icon === 'graph' ? 'TrendingUp' : service.icon === 'network' ? 'Share2' : service.icon === 'target' ? 'Target' : service.icon === 'palette' ? 'Palette' : 'Server'];
                return (
                  <div
                    key={service.id}
                    className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    <div className="mb-4 inline-block p-3 bg-purple-500/20 rounded-lg">
                      {Icon && <Icon size={32} style={{ color: service.color }} />}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                    <p className="text-gray-400 text-sm">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: PROJECTS */}
        <section id="projects" className="min-h-[150vh] flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-6xl w-full">
            <h2 className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/60 transition-all duration-300 hover:scale-105"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                  <div className="text-sm text-purple-400 mb-4">{project.category}</div>
                  <div className="space-y-2 mb-4 text-left">
                    <div className="text-xs text-gray-500">Problem</div>
                    <div className="text-sm text-gray-400">{project.problem}</div>
                    <div className="text-xs text-gray-500 mt-2">Strategy</div>
                    <div className="text-sm text-gray-400">{project.strategy}</div>
                    <div className="text-xs text-gray-500 mt-2">Result</div>
                    <div className="text-sm text-purple-300 font-medium">{project.result}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-purple-500/20">
                    <div className="text-center">
                      <div className="text-xl font-bold" style={{ color: project.color }}>
                        {project.metrics.traffic}
                      </div>
                      <div className="text-xs text-gray-500">Traffic</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold" style={{ color: project.color }}>
                        {project.metrics.leads}
                      </div>
                      <div className="text-xs text-gray-500">Leads</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold" style={{ color: project.color }}>
                        {project.metrics.conversion}
                      </div>
                      <div className="text-xs text-gray-500">Conversion</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: SKILLS */}
        <section id="skills" className="min-h-[150vh] flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-5xl w-full">
            <h2 className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/60 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-lg font-bold text-white mb-2">{skill.name}</div>
                  <div className="text-3xl font-bold text-purple-400">{skill.level}%</div>
                  <div className="text-xs text-gray-500 mt-2">
                    {skill.category === 'dev' ? 'Development' : 'Marketing'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: CONTACT */}
        <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-2xl w-full">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Build & Grow Your Brand
            </h2>
            <p className="text-gray-400 text-lg mb-12">Ready to create something amazing together?</p>
            
            <div className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8">
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-black/50 border border-purple-500/30 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-black/50 border border-purple-500/30 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
                />
                <textarea
                  placeholder="Tell me about your project..."
                  rows="4"
                  className="w-full bg-black/50 border border-purple-500/30 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-xl font-medium text-lg shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Send Message <Send size={20} />
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-purple-500/20 space-y-3">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Phone size={18} className="text-purple-400" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Mail size={18} className="text-purple-400" />
                  <span>{personalInfo.email}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Spacing */}
        <div className="h-20" />
      </div>

      {/* Scroll Indicator - Only visible on hero */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <div className="text-purple-400 text-sm font-medium">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-purple-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home3D;
