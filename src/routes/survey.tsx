import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { RioAdobeMark } from '@/components/site/Brand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';


const ratings = ['Excellent', 'Good', 'Average', 'Poor'];

export const Route = createFileRoute('/survey')({
  component: SurveyPage,
});

function SurveyPage() {
  const [formData, setFormData] = useState({
    menuSelection: '',
    foodQuality: '',
    orderQuickness: '',
    staffRating: '',
    portionSize: '',
    pricingValue: '',
    name: '',
    email: '',
    comments: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Survey submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center max-w-md w-full border border-primary/10"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Muchas Gracias!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your feedback is invaluable to us. We appreciate you taking the time to help us improve the Rio Adobe experience.
          </p>
          <a 
            href="/"
            className="inline-block w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-4 rounded-xl transition-all shadow-lg text-center"
          >
            Return Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <RioAdobeMark size={64} />
          </motion.div>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-widest uppercase text-sm"
          >
            Tell us about your visit
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-6 uppercase font-headline tracking-tighter"
          >
            Guest Survey
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
          >
            We strive for excellence in every dish and interaction. Please let us know how we did.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl shadow-primary/5 p-8 md:p-12 border border-primary/5"
        >
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { label: 'Menu Selection', name: 'menuSelection' },
                { label: 'Food Quality', name: 'foodQuality' },
                { label: 'Quickness of Order', name: 'orderQuickness' },
                { label: 'Staff Rating', name: 'staffRating' },
                { label: 'Portion Size', name: 'portionSize' },
                { label: 'Pricing/Value', name: 'pricingValue' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-bold text-gray-900 mb-3 uppercase tracking-widest">{field.label}</label>
                  <select
                    name={field.name}
                    required
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl px-4 py-4 outline-none transition-all appearance-none cursor-pointer text-gray-700"
                  >
                    <option value="">Select a rating</option>
                    {ratings.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <div className="space-y-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-3 uppercase tracking-widest">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl px-4 py-4 outline-none transition-all text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-3 uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl px-4 py-4 outline-none transition-all text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-3 uppercase tracking-widest">Additional Comments</label>
                <textarea
                  name="comments"
                  rows={4}
                  onChange={handleChange}
                  placeholder="Tell us more about your experience..."
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl px-4 py-4 outline-none transition-all text-gray-700 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:opacity-90 text-on-primary font-bold py-5 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 group"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Submit Survey
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
