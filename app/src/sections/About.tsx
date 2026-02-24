import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Leaf, Sparkles, Target } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Holistic Approach',
    description: 'We treat the whole person—mind, body, and spirit—not just symptoms.',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    icon: Leaf,
    title: 'Natural Remedies',
    description: 'Harness the power of nature with time-tested herbal solutions.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Sparkles,
    title: 'Personalized Care',
    description: 'Every individual is unique. Get recommendations tailored to your dosha.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Target,
    title: 'Preventive Health',
    description: 'Focus on maintaining balance to prevent illness before it starts.',
    color: 'bg-blue-100 text-blue-600',
  },
];

const steps = [
  {
    number: '01',
    title: 'Discover Your Dosha',
    description: 'Take our quick, curated quiz to identify your unique mind-body constitution.',
  },
  {
    number: '02',
    title: 'Get Your Plan',
    description: 'Receive a personalized diet chart and lifestyle tips tailored to bring you into balance.',
  },
  {
    number: '03',
    title: 'Live in Harmony',
    description: 'Apply this ancient wisdom to your modern life for lasting health and vitality.',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 lg:py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-green-600 font-medium mb-4">About Ayurveda</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-900 mb-6">
            Ancient Wisdom for Modern Wellness
          </h2>
          <p className="text-gray-600 text-lg">
            Ayurveda is a 5,000-year-old system of natural healing from India. It teaches that health is a state of vibrant balance between our environment, body, mind, and spirit.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="inline-block text-green-600 font-medium mb-4">Our Philosophy</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">
              Mind-Body Connection
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We believe in the core Ayurvedic principle that the mind and body are intrinsically linked. Our philosophy is built on the pillars of "food as medicine," prevention over cure, and honoring the unique needs of every individual.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We aim to empower you with knowledge, not just information. By understanding your unique constitution, you can make informed choices that support your health and well-being every day.
            </p>
          </motion.div>

          {/* Right - Steps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <span className="inline-block text-green-600 font-medium mb-2">How It Works</span>
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-transparent hover:from-green-100 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  {step.number}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
