import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Star, Award, ArrowRight, Play, CheckCircle, ChevronDown, Sparkles, Globe, Heart } from 'lucide-react';

const stats = [
  { label: 'Verified Mentors', value: '2,400+', icon: '👨‍🏫' },
  { label: 'Hours of Content', value: '18,000+', icon: '⏱️' },
  { label: 'Success Stories', value: '12,000+', icon: '🏆' },
  { label: 'Categories', value: '50+', icon: '📚' },
];

const testimonials = [
  {
    name: 'Ritu Sharma',
    role: 'Student, B.Tech CSE',
    text: 'Learning from Mr. Verma — a retired IIT professor — transformed my approach to problem-solving. No textbook can replace 35 years of real experience.',
    avatar: 'RS',
    stars: 5,
  },
  {
    name: 'Col. Arun Kapoor (Retd.)',
    role: 'Mentor, Leadership & Strategy',
    text: 'Vridhi gave me a new purpose after retirement. Teaching young minds and learning about AI from them in return — it\'s the most fulfilling chapter of my life.',
    avatar: 'AK',
    stars: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Student, Civil Services Aspirant',
    text: 'The mentor who guided me had actually cracked UPSC 30 years ago. Her insights on current affairs and essay writing were priceless.',
    avatar: 'PN',
    stars: 5,
  },
];

const features = [
  { icon: '🧠', title: 'Real-World Wisdom', desc: 'Learn from professionals who\'ve lived the challenges you\'re preparing to face.' },
  { icon: '🔄', title: 'Reverse Mentoring', desc: 'Students teach mentors modern digital skills — a true two-way exchange of knowledge.' },
  { icon: '💚', title: 'Mental Wellness', desc: 'Sahayak module provides psychologist access, mood tracking, and anonymous vent rooms.' },
  { icon: '📜', title: 'Industry Certificates', desc: 'Earn verified certificates signed by professionals for real project work.' },
  { icon: '🤖', title: 'AI-Powered Matching', desc: 'Smart algorithm pairs you with the perfect mentor based on your goals and learning style.' },
  { icon: '🎙️', title: 'Voice-First Access', desc: 'Senior-friendly voice navigation makes the platform accessible for every mentor.' },
];

const categories = ['Tech & AI', 'Civil Services', 'Life Skills', 'Business', 'Arts & Culture', 'Mental Wellness', 'Science', 'Finance'];

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4000);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => { clearInterval(interval); window.removeEventListener('scroll', handleScroll); };
  }, []);

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1a1f3a 50%, #0f172a 100%)' }} className="min-h-screen">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/10 shadow-2xl' : ''}`}
        style={{ padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #1E3A8A, #7c3aed)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🌱</div>
          <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 22, background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vridhi</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} className="btn-ghost" style={{ padding: '10px 20px', fontSize: 14 }}>Sign In</button>
          <button onClick={() => navigate('/signup')} className="btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>Get Started</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 40, paddingRight: 40, position: 'relative', overflow: 'hidden' }}>
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: -100, left: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 50, right: -100, width: 400, height: 400, background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 20, padding: '8px 16px', marginBottom: 24 }}>
              <Sparkles size={14} color="#F59E0B" />
              <span style={{ color: '#F59E0B', fontSize: 13, fontWeight: 600 }}>Where Experience Meets Ambition</span>
            </div>
            <h1 style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.1, marginBottom: 24, fontFamily: 'Poppins' }}>
              Learn from <span style={{ background: 'linear-gradient(135deg, #F59E0B, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Decades</span>
              <br />of Real <span style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Wisdom</span>
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Vridhi connects you with verified retired professionals who share lifetime expertise. Go beyond textbooks — learn from people who've actually done it.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/signup?role=student')} className="btn-primary" style={{ fontSize: 16, padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
                I'm a Student <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate('/signup?role=mentor')} className="btn-secondary" style={{ fontSize: 16, padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
                I'm a Mentor <ArrowRight size={18} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: 24, marginTop: 40 }}>
              {['No credit card required', 'Free for students', 'Verified mentors only'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle size={14} color="#10B981" />
                  <span style={{ color: '#64748b', fontSize: 13 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero cards visual */}
          <div style={{ position: 'relative', height: 480 }}>
            {/* Featured mentor card */}
            <div className="glass card-hover animate-float" style={{ position: 'absolute', top: 20, right: 0, width: 300, padding: 24 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16 }}>
                <div className="avatar" style={{ width: 56, height: 56, fontSize: 20, flexShrink: 0 }}>AK</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>Dr. Ashok Kumar</div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>Ex-ISRO Scientist • 35 yrs exp</div>
                  <span className="badge-gold" style={{ marginTop: 6, display: 'inline-block' }}>Gold Mentor ⭐</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {['Aerospace', 'Robotics', 'STEM'].map(t => <span key={t} className="tag" style={{ fontSize: 11 }}>{t}</span>)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8', fontSize: 13 }}>
                <span>⭐ 4.9 (284 reviews)</span>
                <span>👥 1,200 students</span>
              </div>
            </div>

            {/* Stats mini card */}
            <div className="glass" style={{ position: 'absolute', bottom: 80, left: 0, padding: '16px 20px', display: 'flex', gap: 20 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#60a5fa' }}>2.4K</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>Mentors</div>
              </div>
              <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#10B981' }}>12K</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>Students</div>
              </div>
              <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#F59E0B' }}>98%</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>Satisfaction</div>
              </div>
            </div>

            {/* Live session badge */}
            <div className="glass" style={{ position: 'absolute', top: 160, left: 20, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Live Session in Progress</span>
            </div>

            {/* Mood tracker pill */}
            <div className="glass" style={{ position: 'absolute', bottom: 20, right: 20, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>💚</span>
              <div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Sahayak Wellness</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Daily check-in ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '60px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {stats.map(s => (
            <div key={s.label} className="stat-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'Poppins', background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 4 }}>{s.value}</div>
              <div style={{ color: '#64748b', fontSize: 14 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DUAL CTA SPLIT SECTION */}
      <section style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 42, fontWeight: 800, fontFamily: 'Poppins', marginBottom: 16 }}>Choose Your Path</h2>
            <p style={{ color: '#94a3b8', fontSize: 18 }}>Two journeys, one purpose — mutual growth across generations</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {/* Student card */}
            <div className="card-hover" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(99,102,241,0.1))', border: '1px solid rgba(37,99,235,0.3)', borderRadius: 24, padding: 48, cursor: 'pointer' }} onClick={() => navigate('/signup?role=student')}>
              <div style={{ fontSize: 56, marginBottom: 24 }}>🎓</div>
              <h3 style={{ fontSize: 28, fontWeight: 700, fontFamily: 'Poppins', marginBottom: 12 }}>For Students</h3>
              <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>Connect with verified experts, enroll in experience-backed courses, track your growth, and build a portfolio of real-world achievements.</p>
              <ul style={{ listStyle: 'none', marginBottom: 36 }}>
                {['Access 2,400+ verified mentors', 'Learn at ₹100 per batch', 'Earn professional certificates', 'Mental wellness support (Sahayak)', 'Earn scholarship points via Reverse Mentoring'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, color: '#cbd5e1', fontSize: 14 }}>
                    <CheckCircle size={16} color="#10B981" style={{ flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
              <button className="btn-primary" style={{ width: '100%', fontSize: 16, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                Join as Student <ArrowRight size={18} />
              </button>
            </div>

            {/* Mentor card */}
            <div className="card-hover" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(239,68,68,0.08))', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 24, padding: 48, cursor: 'pointer' }} onClick={() => navigate('/signup?role=mentor')}>
              <div style={{ fontSize: 56, marginBottom: 24 }}>🏅</div>
              <h3 style={{ fontSize: 28, fontWeight: 700, fontFamily: 'Poppins', marginBottom: 12 }}>For Mentors</h3>
              <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>Share decades of expertise, stay digitally engaged, earn income, and leave a lasting legacy for the next generation.</p>
              <ul style={{ listStyle: 'none', marginBottom: 36 }}>
                {['Create batches & earn 70% revenue', 'Verify credentials once — stay forever', 'Host live sessions with WebRTC', 'Earn karma points & mentor badges', 'Post legacy projects for real impact'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, color: '#cbd5e1', fontSize: 14 }}>
                    <CheckCircle size={16} color="#F59E0B" style={{ flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
              <button className="btn-secondary" style={{ width: '100%', fontSize: 16, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                Become a Mentor <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '60px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, fontFamily: 'Poppins', marginBottom: 16 }}>Explore Categories</h2>
          <p style={{ color: '#94a3b8', marginBottom: 40 }}>50+ domains covered by real-world experts</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => navigate('/signup?role=student')} className="btn-ghost" style={{ padding: '10px 20px', fontSize: 14 }}>{cat}</button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 40px', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 42, fontWeight: 800, fontFamily: 'Poppins', marginBottom: 16 }}>Why Vridhi is Different</h2>
            <p style={{ color: '#94a3b8', fontSize: 18 }}>Built with empathy, accessibility, and genuine human connection</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {features.map(f => (
              <div key={f.title} className="glass card-hover" style={{ padding: 32 }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Poppins', marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: 14 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 42, fontWeight: 800, fontFamily: 'Poppins', marginBottom: 48 }}>What Our Community Says</h2>
          <div className="glass" style={{ padding: 48, minHeight: 240 }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>"</div>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: '#cbd5e1', marginBottom: 32 }}>{testimonials[activeTestimonial].text}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div className="avatar" style={{ width: 48, height: 48, fontSize: 16 }}>{testimonials[activeTestimonial].avatar}</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700 }}>{testimonials[activeTestimonial].name}</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>{testimonials[activeTestimonial].role}</div>
              </div>
              <div style={{ marginLeft: 8 }}>{'⭐'.repeat(testimonials[activeTestimonial].stars)}</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? 24 : 8, height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', background: i === activeTestimonial ? '#2563EB' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s ease' }} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section style={{ padding: '80px 40px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: 48, fontWeight: 800, fontFamily: 'Poppins', marginBottom: 20 }}>
            Ready to <span style={{ background: 'linear-gradient(135deg, #F59E0B, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Grow</span>?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 18, marginBottom: 40 }}>Join thousands of students and mentors building meaningful connections every day.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button onClick={() => navigate('/signup?role=student')} className="btn-primary" style={{ fontSize: 16, padding: '16px 40px' }}>Start Learning Free</button>
            <button onClick={() => navigate('/signup?role=mentor')} className="btn-secondary" style={{ fontSize: 16, padding: '16px 40px' }}>Share Your Wisdom</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 40px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>🌱</span>
          <span style={{ fontFamily: 'Poppins', fontWeight: 700, color: '#60a5fa' }}>Vridhi</span>
          <span style={{ color: '#475569', fontSize: 13 }}>— Where Experience Meets Ambition</span>
        </div>
        <div style={{ color: '#475569', fontSize: 13 }}>© 2026 Vridhi. Built with ❤️ for India</div>
      </footer>
    </div>
  );
}
