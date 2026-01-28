'use client';

import React, { useState } from 'react';
import { Zap, Clock, Target, ChevronDown, ChevronUp, Cpu, GitBranch, Shield, Rocket } from 'lucide-react';

interface AIAcceleratedSectionProps {
  isDarkMode: boolean;
  language: 'es' | 'en';
}

const content = {
  es: {
    sectionTitle: "Desarrollo con AI-Accelerated Workflows",
    headline: "Velocidad de Entrega Acelerada, Calidad Sin Compromisos",
    description: "Arquitecto y entrego sistemas production-grade usando flujos de trabajo asistidos por IA para alcanzar 3-4x la velocidad de desarrollo tradicional. Al integrar código generado por IA con estándares de ingeniería rigurosos, entrego proyectos complejos en días que típicamente requieren semanas.",
    stats: {
      velocity: { value: "3-4x", label: "Velocidad de Entrega", sublabel: "vs desarrollo tradicional" },
      experience: { value: "3+", label: "Años", sublabel: "usando AI diariamente" },
      reduction: { value: "85%", label: "Reducción", sublabel: "en tareas manuales" }
    },
    howIWork: {
      title: "Cómo Trabajo con AI",
      tools: {
        title: "Herramientas AI en Mi Stack",
        items: [
          { name: "Claude Code (CLI)", desc: "Arquitectura y lógica compleja" },
          { name: "Claude API", desc: "Generación y refactorización de código" },
          { name: "GitHub Copilot", desc: "Sugerencias inline y boilerplate" }
        ]
      },
      process: {
        title: "Mi Proceso",
        steps: [
          { icon: "design", title: "Diseño", desc: "Arquitecto el sistema y defino requisitos" },
          { icon: "generate", title: "Genero", desc: "AI acelera la creación de código" },
          { icon: "integrate", title: "Integro", desc: "Reviso, refactorizo y conecto componentes" },
          { icon: "harden", title: "Fortifico", desc: "Seguridad, rendimiento y edge cases" },
          { icon: "deploy", title: "Despliego", desc: "Código production-ready con tests" }
        ]
      },
      benefits: {
        title: "Por Qué Importa",
        items: [
          "Entrega más rápida de MVP para validación",
          "Más tiempo para arquitectura y optimización",
          "Menos boilerplate, más lógica de negocio",
          "Mismos estándares de calidad, timeline acelerado"
        ]
      }
    },
    expandButton: { show: "Ver cómo trabajo con AI", hide: "Ocultar detalles" }
  },
  en: {
    sectionTitle: "AI-Accelerated Development",
    headline: "Accelerated Delivery, Uncompromised Quality",
    description: "I architect and deliver production-grade systems using AI-assisted workflows to achieve 3-4x traditional development velocity. By expertly integrating AI-generated code with rigorous engineering standards, I deliver complex projects in days that typically require weeks.",
    stats: {
      velocity: { value: "3-4x", label: "Delivery Velocity", sublabel: "vs traditional dev" },
      experience: { value: "3+", label: "Years", sublabel: "daily AI usage" },
      reduction: { value: "85%", label: "Reduction", sublabel: "in manual tasks" }
    },
    howIWork: {
      title: "How I Work with AI",
      tools: {
        title: "AI Tools in My Stack",
        items: [
          { name: "Claude Code (CLI)", desc: "Architecture and complex logic" },
          { name: "Claude API", desc: "Code generation and refactoring" },
          { name: "GitHub Copilot", desc: "Inline suggestions and boilerplate" }
        ]
      },
      process: {
        title: "My Process",
        steps: [
          { icon: "design", title: "Design", desc: "I architect the system and define requirements" },
          { icon: "generate", title: "Generate", desc: "AI accelerates code creation" },
          { icon: "integrate", title: "Integrate", desc: "I review, refactor, and connect components" },
          { icon: "harden", title: "Harden", desc: "Security, performance, and edge cases" },
          { icon: "deploy", title: "Deploy", desc: "Production-ready code with tests" }
        ]
      },
      benefits: {
        title: "Why This Matters",
        items: [
          "Faster MVP delivery for client validation",
          "More time for architecture and optimization",
          "Less boilerplate, more business logic focus",
          "Same quality standards, accelerated timeline"
        ]
      }
    },
    expandButton: { show: "See how I work with AI", hide: "Hide details" }
  }
};

const AIAcceleratedSection: React.FC<AIAcceleratedSectionProps> = ({ isDarkMode, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = content[language];

  const getProcessIcon = (iconName: string) => {
    const iconProps = { size: 20, className: "text-orange-400" };
    switch (iconName) {
      case 'design': return <Target {...iconProps} />;
      case 'generate': return <Cpu {...iconProps} />;
      case 'integrate': return <GitBranch {...iconProps} />;
      case 'harden': return <Shield {...iconProps} />;
      case 'deploy': return <Rocket {...iconProps} />;
      default: return <Zap {...iconProps} />;
    }
  };

  return (
    <section className={`py-20 px-4 relative z-20 ${isDarkMode ? 'bg-gradient-to-b from-gray-900 via-gray-800/50 to-gray-900' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 mb-6">
            <Zap size={18} className="text-orange-400" />
            <span className="text-orange-400 font-medium text-sm">{t.sectionTitle}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 bg-clip-text text-transparent">
            {t.headline}
          </h2>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.description}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Velocity Card */}
          <div className={`relative p-6 rounded-xl transition-all duration-300 hover:scale-105 group overflow-hidden ${
            isDarkMode
              ? 'bg-gray-800/80 border border-orange-500/20 hover:border-orange-500/50'
              : 'bg-white border border-orange-500/30 hover:border-orange-500/60 shadow-lg hover:shadow-xl'
          }`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-bl-full" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                  <Zap size={24} className="text-white" />
                </div>
                <span className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  {t.stats.velocity.value}
                </span>
              </div>
              <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {t.stats.velocity.label}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.stats.velocity.sublabel}
              </p>
            </div>
          </div>

          {/* Experience Card */}
          <div className={`relative p-6 rounded-xl transition-all duration-300 hover:scale-105 group overflow-hidden ${
            isDarkMode
              ? 'bg-gray-800/80 border border-yellow-500/20 hover:border-yellow-500/50'
              : 'bg-white border border-yellow-500/30 hover:border-yellow-500/60 shadow-lg hover:shadow-xl'
          }`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-yellow-500/10 to-transparent rounded-bl-full" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
                  <Clock size={24} className="text-white" />
                </div>
                <span className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  {t.stats.experience.value}
                </span>
              </div>
              <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {t.stats.experience.label}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.stats.experience.sublabel}
              </p>
            </div>
          </div>

          {/* Reduction Card */}
          <div className={`relative p-6 rounded-xl transition-all duration-300 hover:scale-105 group overflow-hidden ${
            isDarkMode
              ? 'bg-gray-800/80 border border-red-500/20 hover:border-red-500/50'
              : 'bg-white border border-red-500/30 hover:border-red-500/60 shadow-lg hover:shadow-xl'
          }`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-full" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500">
                  <Target size={24} className="text-white" />
                </div>
                <span className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  {t.stats.reduction.value}
                </span>
              </div>
              <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {t.stats.reduction.label}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {t.stats.reduction.sublabel}
              </p>
            </div>
          </div>
        </div>

        {/* Expandable "How I Work with AI" Section */}
        <div className={`rounded-xl overflow-hidden transition-all duration-500 ${
          isDarkMode
            ? 'bg-gray-800/50 border border-gray-700'
            : 'bg-white border border-gray-200 shadow-lg'
        }`}>
          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-full p-6 flex items-center justify-between transition-all duration-300 ${
              isDarkMode
                ? 'hover:bg-gray-700/50'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Cpu size={24} className="text-orange-500" />
              <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {t.howIWork.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {isExpanded ? t.expandButton.hide : t.expandButton.show}
              </span>
              {isExpanded ? (
                <ChevronUp size={20} className="text-orange-500" />
              ) : (
                <ChevronDown size={20} className="text-orange-500" />
              )}
            </div>
          </button>

          {/* Expandable Content */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className={`p-6 pt-0 grid md:grid-cols-3 gap-8 ${isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>

              {/* AI Tools */}
              <div>
                <h4 className="text-orange-400 font-semibold mb-4 flex items-center gap-2">
                  <Cpu size={18} />
                  {t.howIWork.tools.title}
                </h4>
                <ul className="space-y-3">
                  {t.howIWork.tools.items.map((tool, index) => (
                    <li key={index} className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <span className={`font-medium block ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {tool.name}
                      </span>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {tool.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div>
                <h4 className="text-orange-400 font-semibold mb-4 flex items-center gap-2">
                  <GitBranch size={18} />
                  {t.howIWork.process.title}
                </h4>
                <ol className="space-y-3">
                  {t.howIWork.process.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        {getProcessIcon(step.icon)}
                      </div>
                      <div>
                        <span className={`font-medium block ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {step.title}
                        </span>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {step.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-orange-400 font-semibold mb-4 flex items-center gap-2">
                  <Rocket size={18} />
                  {t.howIWork.benefits.title}
                </h4>
                <ul className="space-y-3">
                  {t.howIWork.benefits.items.map((benefit, index) => (
                    <li key={index} className={`flex items-start gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="text-orange-500 mt-1">&#10003;</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAcceleratedSection;
