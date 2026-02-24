import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What is Ayurveda?",
    answer: "Ayurveda is a traditional system of medicine with historical roots in the Indian subcontinent. It is based on the belief that health and wellness depend on a delicate balance between the mind, body, and spirit. Its main goal is to promote good health, rather than fight disease."
  },
  {
    question: "What are Doshas?",
    answer: "In Ayurveda, the three doshas—Vata, Pitta, and Kapha—are the primary life forces or biological energies found throughout the human body and mind. They govern all physical and mental processes and provide every living being with an individual blueprint for health and fulfillment."
  },
  {
    question: "How accurate is the Dosha quiz?",
    answer: "Our quiz is designed to provide a strong indication of your dominant dosha based on your long-term physical, mental, and emotional tendencies. While it's a great starting point, a full consultation with an Ayurvedic practitioner is recommended for a complete and nuanced diagnosis."
  },
  {
    question: "Is Ayurveda a replacement for modern medicine?",
    answer: "No, Ayurveda should be considered a complementary approach to wellness. It focuses on lifestyle, diet, and natural remedies to maintain balance and prevent illness. Always consult your doctor for any serious health concerns or before making significant changes to your health regimen."
  },
  {
    question: "How long does it take to see results?",
    answer: "Results vary from person to person. Some people notice improvements within a few weeks, while others may take a few months. Consistency is key—following your personalized recommendations regularly will yield the best results."
  },
  {
    question: "Can I balance all three doshas?",
    answer: "Yes! While everyone has a dominant dosha, the goal of Ayurveda is to keep all three doshas in balance. Our personalized recommendations help you achieve this balance through diet, lifestyle, and herbal support."
  }
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-green-600 font-medium mb-4">Got Questions?</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about Ayurveda, doshas, and how AyurWell can help you.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-green-500" />
                  ) : (
                    <Plus className="w-5 h-5 text-green-500" />
                  )}
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 pl-13">
                      <p className="text-gray-600 pl-8">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            Still have questions?{' '}
            <a href="mailto:hello@ayurwell.com" className="text-green-600 font-medium hover:underline">
              Contact our team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
