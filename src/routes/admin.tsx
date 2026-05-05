import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { LogOut, MessageSquare, Calendar, Mail, User, Star } from 'lucide-react';
import { RioAdobeMark } from '@/components/site/Brand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

type ContactRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};
type SurveyRow = {
  id: string;
  name: string;
  email: string;
  menu_selection: string | null;
  food_quality: string | null;
  order_quickness: string | null;
  staff_rating: string | null;
  portion_size: string | null;
  pricing_value: string | null;
  comments: string | null;
  created_at: string;
};
type NewsletterRow = { id: string; email: string; created_at: string };

function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [surveys, setSurveys] = useState<SurveyRow[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterRow[]>([]);
  const [activeTab, setActiveTab] = useState<'contacts' | 'surveys' | 'newsletter'>('contacts');

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const checkAdmin = useCallback(async () => {
    if (!session?.user) {
      setIsAdmin(false);
      return;
    }
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .eq('role', 'admin')
      .maybeSingle();
    setIsAdmin(!!data);
  }, [session]);

  useEffect(() => { checkAdmin(); }, [checkAdmin]);

  const fetchData = useCallback(async () => {
    const [c, s, n] = await Promise.all([
      supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
      supabase.from('guest_surveys').select('*').order('created_at', { ascending: false }),
      supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false }),
    ]);
    if (c.data) setContacts(c.data as ContactRow[]);
    if (s.data) setSurveys(s.data as SurveyRow[]);
    if (n.data) setNewsletters(n.data as NewsletterRow[]);
  }, []);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin, fetchData]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (error) toast.error(error.message);
      else toast.success('Account created. Signing you in…');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
    }
    setAuthLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center bg-surface">Loading…</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md border border-primary/5"
        >
          <div className="flex justify-center mb-8"><RioAdobeMark size={64} /></div>
          <h1 className="text-3xl font-black text-center text-gray-900 mb-2 uppercase font-headline">Admin Portal</h1>
          <p className="text-center text-xs text-on-surface-variant uppercase tracking-widest mb-8">
            {mode === 'signin' ? 'Sign in to view dashboard' : 'Create the first admin account'}
          </p>
          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-widest">Email</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl px-4 py-4 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-widest">Password</label>
              <input
                type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl px-4 py-4 outline-none transition-all"
              />
            </div>
            <button type="submit" disabled={authLoading}
              className="w-full bg-primary hover:opacity-90 text-on-primary font-bold py-5 rounded-xl transition-all shadow-lg uppercase tracking-widest text-xs disabled:opacity-60">
              {authLoading ? 'Working…' : (mode === 'signin' ? 'Sign In' : 'Create Account')}
            </button>
            <button type="button" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="w-full text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary">
              {mode === 'signin' ? 'No account yet? Create one →' : '← Back to sign in'}
            </button>
          </form>
          <p className="mt-6 text-[10px] text-center text-on-surface-variant/60 uppercase tracking-widest">
            The first account becomes admin automatically.
          </p>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md text-center border border-border">
          <h1 className="font-headline text-2xl font-black uppercase text-gray-900 mb-3">Access Denied</h1>
          <p className="text-sm text-on-surface-variant mb-6">Your account is not an admin.</p>
          <button onClick={handleSignOut} className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold uppercase text-xs tracking-widest">Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex flex-col items-start gap-2">
            <RioAdobeMark size={48} />
            <h1 className="text-4xl font-black text-gray-900 uppercase font-headline">Dashboard</h1>
            <p className="text-on-surface-variant mt-1 font-medium italic text-xs uppercase tracking-widest opacity-50">
              Live · {session.user.email}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchData}
              className="px-6 py-3 bg-white border border-border rounded-xl font-bold text-primary hover:bg-gray-50 transition-all uppercase text-[10px] tracking-widest">
              Refresh
            </button>
            <button onClick={handleSignOut}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-border rounded-xl font-bold text-on-surface-variant hover:bg-gray-50 transition-all uppercase text-[10px] tracking-widest">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-12 overflow-x-auto pb-2">
          {[
            { id: 'contacts' as const, icon: MessageSquare, label: `Contact (${contacts.length})` },
            { id: 'surveys' as const, icon: Star, label: `Surveys (${surveys.length})` },
            { id: 'newsletter' as const, icon: Mail, label: `Newsletter (${newsletters.length})` },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold whitespace-nowrap transition-all uppercase text-[10px] tracking-widest ${
                activeTab === tab.id ? 'bg-primary text-on-primary shadow-xl shadow-primary/20'
                : 'bg-white text-on-surface-variant border border-border hover:bg-gray-50'
              }`}>
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'contacts' && (
          <div className="space-y-6">
            {contacts.length === 0 ? <Empty icon={MessageSquare} label="No contact messages yet" /> :
              contacts.map((c) => (
                <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-8 rounded-3xl border border-border shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary"><User size={24} /></div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{c.name}</h3>
                        <p className="text-on-surface-variant font-medium text-sm">{c.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant/40 font-bold text-[10px] uppercase tracking-widest">
                      <Calendar size={14} /> {new Date(c.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <p className="text-gray-700 leading-relaxed italic">"{c.message}"</p>
                  </div>
                </motion.div>
              ))}
          </div>
        )}

        {activeTab === 'surveys' && (
          <div className="space-y-6">
            {surveys.length === 0 ? <Empty icon={Star} label="No surveys submitted yet" /> :
              surveys.map((s) => (
                <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-8 rounded-3xl border border-border shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500"><Star size={24} /></div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{s.name}</h3>
                        <p className="text-on-surface-variant font-medium text-sm">{s.email}</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-gray-50 rounded-lg text-on-surface-variant/40 text-[10px] font-bold flex items-center gap-2 uppercase tracking-widest">
                      <Calendar size={14} /> {new Date(s.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    {[
                      { label: 'Menu', value: s.menu_selection },
                      { label: 'Food', value: s.food_quality },
                      { label: 'Speed', value: s.order_quickness },
                      { label: 'Staff', value: s.staff_rating },
                      { label: 'Portion', value: s.portion_size },
                      { label: 'Value', value: s.pricing_value },
                    ].map((item) => (
                      <div key={item.label} className="bg-gray-50 p-4 rounded-xl text-center">
                        <p className="text-[10px] uppercase font-black text-on-surface-variant/40 mb-1">{item.label}</p>
                        <p className={`text-xs font-bold ${
                          item.value === 'Excellent' ? 'text-green-600' :
                          item.value === 'Good' ? 'text-blue-600' :
                          item.value === 'Average' ? 'text-amber-600' :
                          item.value === 'Poor' ? 'text-red-600' : 'text-gray-400'
                        }`}>{item.value || '—'}</p>
                      </div>
                    ))}
                  </div>
                  {s.comments && (
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                      <p className="text-primary font-medium leading-relaxed italic text-sm">"{s.comments}"</p>
                    </div>
                  )}
                </motion.div>
              ))}
          </div>
        )}

        {activeTab === 'newsletter' && (
          <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-8 border-b border-border">
              <h2 className="text-xl font-bold text-gray-900 uppercase font-headline">Subscriber List</h2>
              <p className="text-on-surface-variant text-sm mt-1">Total: {newsletters.length}</p>
            </div>
            <div className="divide-y divide-border">
              {newsletters.length === 0 ? (
                <div className="p-12 text-center text-on-surface-variant font-bold">No subscribers yet</div>
              ) : newsletters.map((n) => (
                <div key={n.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500"><Mail size={18} /></div>
                    <span className="font-bold text-gray-700">{n.email}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/50">
                    {new Date(n.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Empty = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="bg-white rounded-3xl border-2 border-dashed border-border p-20 flex flex-col items-center justify-center text-center">
    <Icon size={48} className="text-gray-200 mb-6" />
    <p className="text-xl font-bold text-gray-300 uppercase font-headline tracking-tight">{label}</p>
  </div>
);
