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

      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-20 px-4 bg-neural-dark"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text">
            Our Technology
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Neural Networks",
                description: "Advanced deep learning architectures for pattern recognition and prediction",
                icon: "🧠"
              },
              {
                title: "Symbolic Reasoning",
                description: "Logical inference engines for structured knowledge processing",
                icon: "🔍"
              },
              {
                title: "Hybrid Integration",
                description: "Seamless combination of neural and symbolic approaches",
                icon: "⚡"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="glass p-6 rounded-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
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

      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-900" id="team">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">The Team</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6">
              <img
                src="https://ui-avatars.com/api/?name=Ufuk+Topcu&background=0D8ABC&color=fff&size=128"
                alt="Ufuk Topcu"
                className="w-32 h-32 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold">Ufuk Topcu</h3>
              <p className="text-gray-400">Principal Investigator</p>
            </div>
            {/* Team Member 2 */}
            <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6">
              <img
                src="https://ui-avatars.com/api/?name=Alvaro+Valesquez&background=0D8ABC&color=fff&size=128"
                alt="Alvaro Valesquez"
                className="w-32 h-32 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold">Alvaro Valesquez</h3>
              <p className="text-gray-400">DARPA EEI Sponsor</p>
            </div>
            {/* Team Member 3 */}
            <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6">
              <img
                src="https://ui-avatars.com/api/?name=Atlas+Wang&background=0D8ABC&color=fff&size=128"
                alt="Atlas Wang"
                className="w-32 h-32 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold">Atlas Wang</h3>
              <p className="text-gray-400">Academic Partner</p>
            </div>
            {/* Team Member 4 */}
            <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6">
              <img
                src="https://ui-avatars.com/api/?name=Yunhao+Yang&background=0D8ABC&color=fff&size=128"
                alt="Yunhao Yang"
                className="w-32 h-32 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold">Yunhao Yang</h3>
              <p className="text-gray-400">Research Intern</p>
            </div>
            {/* Team Member 5 */}
            <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6">
              <img
                src="https://ui-avatars.com/api/?name=Neel+Bhatt&background=0D8ABC&color=fff&size=128"
                alt="Neel Bhatt"
                className="w-32 h-32 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold">Neel Bhatt</h3>
              <p className="text-gray-400">Research Scientist</p>
            </div>
            {/* Team Member 6 */}
            <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6">
              <img
                src="https://ui-avatars.com/api/?name=Christian+Ellis&background=0D8ABC&color=fff&size=128"
                alt="Christian Ellis"
                className="w-32 h-32 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold">Christian Ellis</h3>
              <p className="text-gray-400">Product Manager</p>
            </div>
          </div>
        </div>
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