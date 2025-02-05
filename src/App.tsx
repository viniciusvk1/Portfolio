import React, { useEffect, useState, useRef } from 'react';
import {
  Code,
  Terminal,
  Cpu,
  Globe,
  Layers,
  Database,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  LineChart,
  Bot,
  Menu,
  X,
  Coffee,
  Boxes,
  FileCode,
  Atom,
  Binary,
  Copy,
  Check,
  Heart
} from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedStates, setCopiedStates] = useState({
    email: false,
    phone: false
  });
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleCopy = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [type]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [type]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      Object.entries(sectionsRef.current).forEach(([key, section]) => {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    sectionsRef.current[sectionId]?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-500 animate-pulse">
          <Terminal className="w-12 h-12 sm:w-16 sm:h-16 animate-spin-slow" />
          <p className="mt-4 font-mono text-sm sm:text-base">Inicializando...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'home', icon: <Terminal />, title: 'Home' },
    { id: 'projects', icon: <Layers />, title: 'Projetos' },
    { id: 'skills', icon: <Cpu />, title: 'Skills' },
    { id: 'contact', icon: <Mail />, title: 'Contato' }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono">
      <div className="fixed inset-0 bg-grid opacity-10"></div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center text-black"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 h-screen w-16 sm:w-24 bg-black/50 backdrop-blur-lg border-r border-cyan-500/20 flex-col items-center py-8 sm:py-12 z-40 hidden lg:flex">
        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-cyan-500 flex items-center justify-center mb-12 sm:mb-16 animate-pulse">
          <Code className="w-5 h-5 sm:w-7 sm:h-7 text-black" />
        </div>
        
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="menu-item group mb-6 sm:mb-8"
          >
            <div className={`w-10 h-10 sm:w-14 sm:h-14 mb-2 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-cyan-500/20 ${
              activeSection === item.id ? 'bg-cyan-500 text-black' : ''
            }`}>
              <div className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
            </div>
            <span className="menu-title text-xs sm:text-sm text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.title}
            </span>
          </button>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <nav className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-30 lg:hidden transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-6 sm:space-y-10">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center space-x-4 p-4 sm:p-6 w-64 sm:w-72 rounded-lg transition-all duration-300 ${
                activeSection === item.id ? 'bg-cyan-500 text-black' : 'hover:bg-cyan-500/20'
              }`}
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8">{item.icon}</div>
              <span className="text-lg sm:text-xl">{item.title}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content Sections */}
      <main className="lg:ml-16 sm:lg:ml-24">
        {/* Home Section */}
        <section 
          ref={el => sectionsRef.current['home'] = el}
          className="min-h-screen flex items-center px-4 sm:px-6 lg:px-16"
        >
          <div className="max-w-5xl mx-auto">
            <div className="glitch-wrapper mb-4 sm:mb-6">
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-8 glitch" data-text="TECH INNOVATOR">
                TECH INNOVATOR
              </h1>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-cyan-500 mb-6 sm:mb-10 typewriter">
              Vinicius Almeida ✦ Full Stack Developer
            </h2>
            <p className="text-base sm:text-lg lg:text-2xl leading-relaxed mb-8 sm:mb-14 text-gray-400 max-w-3xl">
              Criando experiências digitais na interseção entre design e tecnologia. 
              Especializado em construir aplicações escaláveis com tecnologias de ponta.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
              <a href="https://github.com/viniciusvk1" target="_blank" rel="noopener noreferrer" 
                className="cyber-button group w-full sm:w-auto text-base sm:text-lg">
                <Github className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                <span>GitHub</span>
                <div className="cyber-button-glitch"></div>
              </a>
              <a href="https://www.linkedin.com/in/viniciusalmeida1711/" target="_blank" rel="noopener noreferrer" 
                className="cyber-button group w-full sm:w-auto text-base sm:text-lg">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                <span>LinkedIn</span>
                <div className="cyber-button-glitch"></div>
              </a>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          ref={el => sectionsRef.current['projects'] = el}
          className="min-h-screen px-4 sm:px-6 lg:px-16 py-16 sm:py-24 flex flex-col justify-center"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 sm:mb-16 text-cyan-500">Projetos em Destaque</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {projects.map((project, index) => (
                <div key={index} className="project-card group">
                  <div className="relative overflow-hidden rounded-xl bg-gray-900 p-6 sm:p-8 hover:bg-gray-800 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-cyan-500">{project.title}</h3>
                    <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm bg-cyan-500/20 text-cyan-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cyber-button group inline-flex items-center text-base sm:text-lg px-4 sm:px-6 py-2"
                    >
                      <span>Ver Projeto</span>
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      <div className="cyber-button-glitch"></div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section 
          ref={el => sectionsRef.current['skills'] = el}
          className="min-h-screen px-4 sm:px-6 lg:px-16 py-16 sm:py-24 flex flex-col justify-center"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 sm:mb-16 text-cyan-500">Arsenal Técnico</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
              {skills.map((skill, index) => (
                <div key={index} 
                  className="skill-card p-6 sm:p-8 rounded-xl bg-gray-900 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-cyan-500 mb-4 sm:mb-6">
                    {React.cloneElement(skill.icon, { className: "w-10 h-10 sm:w-12 sm:h-12" })}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{skill.title}</h3>
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed">{skill.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 sm:mt-24">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8">
                {techStack.map((tech, index) => (
                  <div key={index} 
                    className="tech-card group flex flex-col items-center p-4 sm:p-6 rounded-xl bg-gray-900 hover:bg-gray-800 transition-all duration-300">
                    <div className="text-cyan-500 mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform">
                      {React.cloneElement(tech.icon, { className: "w-8 h-8 sm:w-12 sm:h-12" })}
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-gray-300 group-hover:text-cyan-500 transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          ref={el => sectionsRef.current['contact'] = el}
          className="min-h-screen px-4 sm:px-6 lg:px-16 py-16 sm:py-24 flex flex-col justify-center"
        >
          <div className="max-w-3xl mx-auto w-full text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-cyan-500">
              Inicializar Conexão
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 text-gray-400 leading-relaxed">
              Pronto para colaborar no seu próximo projeto? Vamos criar algo extraordinário juntos.
            </p>
            
            {/* Contact Information */}
            <div className="mb-8 sm:mb-12 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="text-base sm:text-lg text-gray-300">
                  <span className="text-cyan-500">Email:</span> viniciusalmeida.vk1@gmail.com
                </div>
                <button
                  onClick={() => handleCopy('viniciusalmeida.vk1@gmail.com', 'email')}
                  className="copy-button p-2 rounded-lg hover:bg-gray-800 transition-colors group"
                  title="Copy email"
                >
                  {copiedStates.email ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 group-hover:scale-110 transition-transform" />
                  )}
                </button>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="text-base sm:text-lg text-gray-300">
                  <span className="text-cyan-500">Telefone:</span> +55 (011) 99576-2272
                </div>
                <button
                  onClick={() => handleCopy('+55 (011) 99576-2272', 'phone')}
                  className="copy-button p-2 rounded-lg hover:bg-gray-800 transition-colors group"
                  title="Copy phone"
                >
                  {copiedStates.phone ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 group-hover:scale-110 transition-transform" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              <a href="mailto:viniciusalmeida.vk1@gmail.com" 
                className="cyber-button group inline-flex items-center justify-center text-base sm:text-lg px-6 sm:px-10 w-full sm:w-auto">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                <span>Email</span>
                <div className="cyber-button-glitch"></div>
              </a>
              
              <a href="https://wa.me/5511995762272" 
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button group inline-flex items-center justify-center text-base sm:text-lg px-6 sm:px-10 w-full sm:w-auto">
                <svg 
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-3" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp</span>
                <div className="cyber-button-glitch"></div>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 sm:px-6 lg:px-16 py-12 sm:py-16 border-t border-cyan-500/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="flex items-center space-x-2 text-gray-400 text-sm sm:text-base">
                <Code className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
                <span>com</span>
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
                <span>por Vinicius Almeida © 2025</span>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-500 max-w-2xl px-4">
                Projetado no Figma e codificado no VS Code. Construído com React, TypeScript 
                e Tailwind CSS, com animações personalizadas e efeitos.
              </p>

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                <span className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></div>
                  Disponível para projetos
                </span>
                <span className="hidden sm:inline">•</span>
                <span>Localização: São Paulo, BR</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

const projects = [
  {
    title: "YYYY",
    description: "YYYY",
    technologies: ["React", "React", "React", "React"],
    link: "https://github.com"
  },
  {
    title: "BBBB",
    description: "BBBB",
    technologies: ["React", "React", "React", "React"],
    link: "https://github.com"
  },
  {
    title: "AAAA",
    description: "AAAA",
    technologies: ["React", "React", "React", "React"],
    link: "https://github.com"
  },
  {
    title: "XXXX",
    description: "XXXX",
    technologies: ["React", "React", "React", "React"],
    link: "https://github.com"
  }
];

const skills = [
  {
    title: "Arquitetura de Frontend",
    description: "Construindo interfaces de usuário escaláveis e performáticas com frameworks e ferramentas modernas.",
    icon: <Globe className="w-8 h-8" />
  },
  {
    title: "Sistemas de Backend",
    description: "Projetando arquiteturas de servidor robustas e APIs com foco em escalabilidade",
    icon: <Database className="w-8 h-8" />
  },
  {
    title: "Análise de Dados",
    description: "Transformando dados brutos em insights valiosos por meio de técnicas de estatística e visualização de dados",
    icon: <LineChart className="w-8 h-8" />
  },
  {
    title: "Automação RPA",
    description: "Automatizando processos repetitivos para maior eficiência operacional.",
    icon: <Bot className="w-8 h-8" />
  }
];

const techStack = [
  {
    name: "Java",
    icon: <Coffee className="w-8 h-8" />
  },
  {
    name: "Spring",
    icon: <Boxes className="w-8 h-8" />
  },
  {
    name: "TypeScript",
    icon: <FileCode className="w-8 h-8" />
  },
  {
    name: "React",
    icon: <Atom className="w-8 h-8" />
  },
  {
    name: "SQL",
    icon: <Database className="w-8 h-8" />
  },
  {
    name: "Python",
    icon: <Binary className="w-8 h-8" />
  }
];

export default App;