import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, LogOut, MessageSquare, Calendar, Mail, User, Star } from 'lucide-react';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<{ contacts: any[], newsletters: string[], surveys: any[] }>({
    contacts: [],
    newsletters: [],
    surveys: []
  });
  const [activeTab, setActiveTab] = useState<'contacts' | 'surveys' | 'newsletter'>('contacts');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/data');
      if (response.ok) {
        const json = await response.json();
        setData(json);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md border border-primary/5"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 text-primary">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black text-center text-gray-900 mb-8 uppercase font-headline">Admin Portal</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-widest">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl px-4 py-4 outline-none transition-all"
                placeholder="Admin username"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-widest">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl px-4 py-4 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-primary hover:opacity-90 text-on-primary font-bold py-5 rounded-xl transition-all shadow-lg uppercase tracking-widest text-xs"
            >
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase font-headline">Dashboard</h1>
            <p className="text-on-surface-variant mt-2 font-medium">Manage your restaurant data</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-border rounded-xl font-bold text-on-surface-variant hover:bg-gray-50 transition-all uppercase text-[10px] tracking-widest"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-12 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'contacts', icon: MessageSquare, label: 'Contact Messages' },
            { id: 'surveys', icon: Star, label: 'Guest Surveys' },
            { id: 'newsletter', icon: Mail, label: 'Newsletter Subs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold whitespace-nowrap transition-all uppercase text-[10px] tracking-widest ${
                activeTab === tab.id 
                ? 'bg-primary text-on-primary shadow-xl shadow-primary/20' 
                : 'bg-white text-on-surface-variant border border-border hover:bg-gray-50'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8">
          {activeTab === 'contacts' && (
            <div className="space-y-6">
              {data.contacts.length === 0 ? (
                <EmptyState icon={MessageSquare} label="No contact messages yet" />
              ) : (
                data.contacts.map((contact, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className="bg-white p-8 rounded-3xl border border-border shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                          <User size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{contact.name}</h3>
                          <p className="text-on-surface-variant font-medium text-sm">{contact.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant/40 font-bold text-[10px] uppercase tracking-widest">
                        <Calendar size={14} />
                        {new Date(contact.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl">
                      <p className="text-gray-700 leading-relaxed italic">"{contact.message}"</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {activeTab === 'surveys' && (
            <div className="space-y-6">
              {data.surveys.length === 0 ? (
                <EmptyState icon={Star} label="No surveys submitted yet" />
              ) : (
                data.surveys.map((survey, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className="bg-white p-8 rounded-3xl border border-border shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                          <Star size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{survey.name}</h3>
                          <p className="text-on-surface-variant font-medium text-sm">{survey.email}</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-gray-50 rounded-lg text-on-surface-variant/40 text-[10px] font-bold flex items-center gap-2 uppercase tracking-widest">
                        <Calendar size={14} />
                        {new Date(survey.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                      {[
                        { label: 'Menu', value: survey.menuSelection },
                        { label: 'Food', value: survey.foodQuality },
                        { label: 'Speed', value: survey.orderQuickness },
                        { label: 'Staff', value: survey.staffRating },
                        { label: 'Portion', value: survey.portionSize },
                        { label: 'Value', value: survey.pricingValue },
                      ].map((item) => (
                        <div key={item.label} className="bg-gray-50 p-4 rounded-xl text-center">
                          <p className="text-[10px] uppercase font-black text-on-surface-variant/40 mb-1 tracking-tighter">{item.label}</p>
                          <p className={`text-xs font-bold ${
                            item.value === 'Excellent' ? 'text-green-600' : 
                            item.value === 'Good' ? 'text-blue-600' :
                            item.value === 'Average' ? 'text-amber-600' : 'text-red-600'
                          }`}>{item.value}</p>
                        </div>
                      ))}
                    </div>

                    {survey.comments && (
                      <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                        <p className="text-primary font-medium leading-relaxed italic text-sm">"{survey.comments}"</p>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          )}

          {activeTab === 'newsletter' && (
            <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
              <div className="p-8 border-b border-border">
                <h2 className="text-xl font-bold text-gray-900 uppercase font-headline">Subscription List</h2>
                <p className="text-on-surface-variant text-sm mt-1">Total subscribers: {data.newsletters.length}</p>
              </div>
              <div className="divide-y divide-border">
                {data.newsletters.length === 0 ? (
                  <div className="p-12 text-center text-on-surface-variant font-bold">No subscribers yet</div>
                ) : (
                  data.newsletters.map((email, i) => (
                    <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                          <Mail size={18} />
                        </div>
                        <span className="font-bold text-gray-700">{email}</span>
                      </div>
                      <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Export</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const EmptyState = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="bg-white rounded-3xl border-2 border-dashed border-border p-20 flex flex-col items-center justify-center text-center">
    <Icon size={48} className="text-gray-200 mb-6" />
    <p className="text-xl font-bold text-gray-300 uppercase font-headline tracking-tight">{label}</p>
  </div>
);
