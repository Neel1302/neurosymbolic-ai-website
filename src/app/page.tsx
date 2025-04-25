'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Navigation } from '@/components/Navigation';

export default function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true });
  const [solutionsRef, solutionsInView] = useInView({ triggerOnce: true });

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neural-dark to-black/50 z-0" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Neurosymbolic Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Bridging the gap between neural networks and symbolic reasoning to create truly intelligent systems
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-neural-primary rounded-lg hover:bg-neural-secondary transition-colors">
              Learn More
            </button>
            <button className="px-6 py-3 glass rounded-lg hover:bg-white/10 transition-colors">
              Contact Us
            </button>
          </div>
        </motion.div>
      </section>

      {/* Solutions Section */}
      <section 
        ref={solutionsRef}
        className="py-20 px-4 bg-black"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={solutionsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text">
            Solutions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Enterprise AI",
                description: "Custom AI solutions for complex business challenges",
                code: "const solution = new EnterpriseAI();"
              },
              {
                title: "Research & Development",
                description: "Pushing the boundaries of AI capabilities",
                code: "class Research extends Innovation {"
              }
            ].map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={solutionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="glass p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                <p className="text-gray-300 mb-4">{solution.description}</p>
                <pre className="font-mono text-sm">
                  <code>{solution.code}</code>
                </pre>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-neural-dark border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2024 Neurosymbolic Intelligence
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
} 