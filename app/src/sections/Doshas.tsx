import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Wind, Flame, Droplets } from 'lucide-react';
import { doshaDetails, type DoshaType } from '@/data/doshaData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const doshaIcons = {
  Vata: Wind,
  Pitta: Flame,
  Kapha: Droplets,
};

const doshaColors: Record<DoshaType, { bg: string; border: string; text: string; gradient: string }> = {
  Vata: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
  },
  Pitta: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-600',
    gradient: 'from-amber-500 to-orange-500',
  },
  Kapha: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-600',
    gradient: 'from-emerald-500 to-teal-500',
  },
};

export default function Doshas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedDosha, setSelectedDosha] = useState<DoshaType | null>(null);

  const doshaKeys: DoshaType[] = ['Vata', 'Pitta', 'Kapha'];

  return (
    <section id="doshas" className="py-20 lg:py-32 bg-gradient-to-b from-green-50 to-emerald-50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-green-600 font-medium mb-4">The Three Doshas</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-900 mb-6">
            Understanding Your Constitution
          </h2>
          <p className="text-gray-600 text-lg">
            The doshas are the three fundamental energies that govern our inner and outer environments: Vata, Pitta, and Kapha. Click on a card to learn more.
          </p>
        </motion.div>

        {/* Dosha Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {doshaKeys.map((dosha, index) => {
            const details = doshaDetails[dosha];
            const colors = doshaColors[dosha];
            const Icon = doshaIcons[dosha];

            return (
              <motion.div
                key={dosha}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onClick={() => setSelectedDosha(dosha)}
                className={`group cursor-pointer relative overflow-hidden rounded-3xl ${colors.bg} border-2 ${colors.border} p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${colors.text}`} />
                </div>

                {/* Image */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-full opacity-20 blur-xl`} />
                  <img
                    src={details.image}
                    alt={`${dosha} Dosha`}
                    className="relative w-32 h-32 mx-auto rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>
                    {dosha}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{details.elements}</p>
                  <p className="text-gray-600">
                    {dosha === 'Vata' && 'The energy of movement. Creative, energetic, and lively.'}
                    {dosha === 'Pitta' && 'The energy of digestion. Intelligent, focused, and driven.'}
                    {dosha === 'Kapha' && 'The energy of structure. Calm, loving, and grounded.'}
                  </p>
                </div>

                {/* Hover Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className={`text-sm font-medium ${colors.text}`}>Click to explore →</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid sm:grid-cols-3 gap-6"
        >
          {doshaKeys.map((dosha) => (
            <div key={`summary-${dosha}`} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
              <img
                src={doshaDetails[dosha].image}
                alt={dosha}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{dosha}</p>
                <p className="text-sm text-gray-500">{doshaDetails[dosha].elements}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dosha Detail Modal */}
      <Dialog open={!!selectedDosha} onOpenChange={() => setSelectedDosha(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <AnimatePresence>
            {selectedDosha && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-4">
                    <img
                      src={doshaDetails[selectedDosha].image}
                      alt={selectedDosha}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div>
                      <h2 className={`text-3xl font-bold ${doshaColors[selectedDosha].text}`}>
                        {selectedDosha}
                      </h2>
                      <p className="text-gray-500">{doshaDetails[selectedDosha].elements}</p>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="mt-6 space-y-6">
                  {Object.entries(doshaDetails[selectedDosha].content).map(([key, value]) => (
                    <div key={key} className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-bold text-green-800 mb-2">{key}</h4>
                      <p className="text-gray-600">{value}</p>
                    </div>
                  ))}

                  <div className="p-4 bg-green-50 rounded-xl">
                    <h4 className="font-bold text-green-800 mb-3">Lifestyle Recommendations</h4>
                    <ul className="space-y-2">
                      {doshaDetails[selectedDosha].lifestyle.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <span className="text-green-500 mt-1">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
