import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Heart, Star, Users, Award, TrendingUp, Bell, LogOut, ChevronRight, Play, Clock, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['All', 'Tech & AI', 'Civil Services', 'Life Skills', 'Business', 'Arts', 'Science', 'Finance', 'Mental Wellness'];

const MOCK_MENTORS = [
  { id: 1, name: 'Dr. Ashok Kumar', org: 'Ex-ISRO Scientist', years: 35, expertise: ['Tech & AI', 'Science'], rating: 4.9, students: 1200, bio: 'Former ISRO chief scientist with 35 years in space research. Passionate about inspiring India\'s next generation.', badge: 'Platinum Icon', avatar: 'AK', price: 100 },
  { id: 2, name: 'Col. Sunita Mehta', org: 'Retd. Indian Army', years: 28, expertise: ['Life Skills', 'Civil Services'], rating: 4.8, students: 890, bio: 'Colonel with 28 years of leadership experience. Teaches strategic thinking and mental resilience.', badge: 'Gold Mentor', avatar: 'SM', price: 100 },
  { id: 3, name: 'Prof. Ramesh Iyer', org: 'Ex-IIM Ahmedabad', years: 40, expertise: ['Business', 'Finance'], rating: 4.7, students: 2100, bio: 'Taught at IIM-A for 40 years. Expert in corporate strategy, entrepreneurship, and personal finance.', badge: 'Platinum Icon', avatar: 'RI', price: 100 },
  { id: 4, name: 'Dr. Priya Nambiar', org: 'Retd. Clinical Psychologist', years: 25, expertise: ['Mental Wellness', 'Life Skills'], rating: 5.0, students: 650, bio: 'Former clinical director at NIMHANS. Specializes in stress management and holistic wellness.', badge: 'Gold Mentor', avatar: 'PN', price: 100 },
  { id: 5, name: 'Shri T.N. Seshan', org: 'Ex-IAS Officer', years: 32, expertise: ['Civil Services', 'Life Skills'], rating: 4.9, students: 3200, bio: 'Former senior IAS officer. Guides aspirants on UPSC strategy, ethics, and governance.', badge: 'Platinum Icon', avatar: 'TS', price: 100 },
  { id: 6, name: 'Kavita Rao', org: 'Ex-Bollywood Music Director', years: 45, expertise: ['Arts'], rating: 4.6, students: 420, bio: 'Legendary music director. Teaches Indian classical meets modern production techniques.', badge: 'Silver Guide', avatar: 'KR', price: 100 },
];

const MY_BATCHES = [
  { id: 1, title: 'UPSC Strategy Masterclass', mentor: 'Shri T.N. Seshan', progress: 65, total: 24, completed: 16, category: 'Civil Services' },
  { id: 2, title: 'AI & Machine Learning Fundamentals', mentor: 'Dr. Ashok Kumar', progress: 30, total: 18, completed: 5, category: 'Tech & AI' },
];

const MOOD_EMOJIS = ['😞', '😕', '😐', '😊', '😄'];

const badgeStyle = (b) => {
  if (b === 'Platinum Icon') return 'badge-platinum';
  if (b === 'Gold Mentor') return 'badge-gold';
  if (b === 'Silver Guide') return 'badge-silver';
  return 'badge-bronze';
};

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('discover');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [mood, setMood] = useState(null);
  const [moodLogged, setMoodLogged] = useState(false);

  const filtered = MOCK_MENTORS.filter(m =>
    (category === 'All' || m.expertise.some(e => e.includes(category.split(' ')[0]))) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.bio.toLowerCase().includes(search.toLowerCase()))
  );

  const tabs = [
    { id: 'discover', label: 'Discover Mentors', icon: '🔍' },
    { id: 'mylearning', label: 'My Learning', icon: '📚' },
    { id: 'sahayak', label: 'Sahayak Wellness', icon: '💚' },
  ];

  const NavBar = () => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(15,23,42,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 22 }}>🌱</span>
        <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 20, background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vridhi</span>
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: activeTab === t.id ? 'rgba(37,99,235,0.2)' : 'transparent', color: activeTab === t.id ? '#60a5fa' : '#94a3b8', cursor: 'pointer', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="avatar" style={{ width: 36, height: 36, fontSize: 14 }}>{user?.first_name?.[0] || 'S'}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{user?.first_name || 'Student'}</div>
            <div style={{ fontSize: 11, color: '#64748b' }}>Student</div>
          </div>
        </div>
        <button onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 8 }}><LogOut size={18} /></button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', paddingTop: 64 }}>
      <NavBar />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 32px' }}>
        {/* Welcome banner */}
        <div className="glass" style={{ padding: 28, marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.1))' }}>
          <div>
            <h2 style={{ fontFamily: 'Poppins', fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Welcome back, {user?.first_name || 'Learner'} 🎓</h2>
            <p style={{ color: '#94a3b8' }}>Continue your journey — wisdom is just a click away</p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div className="stat-card" style={{ textAlign: 'center', padding: '16px 24px' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#60a5fa' }}>2</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Active Batches</div>
            </div>
            <div className="stat-card" style={{ textAlign: 'center', padding: '16px 24px' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#10B981' }}>47%</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Avg Progress</div>
            </div>
            <div className="stat-card" style={{ textAlign: 'center', padding: '16px 24px' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F59E0B' }}>0</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Certificates</div>
            </div>
          </div>
        </div>

        {/* DISCOVER TAB */}
        {activeTab === 'discover' && (
          <div>
            {/* Search + filter */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
                <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input className="input-field" style={{ paddingLeft: 42 }} placeholder="Search mentors by name or expertise..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', fontSize: 14 }}>
                <Filter size={14} /> Filters
              </button>
            </div>

            <h3 style={{ fontFamily: 'Poppins', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>All Verified Mentors</h3>

            {/* Category chips */}
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 28, paddingBottom: 4 }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)} style={{ padding: '8px 18px', borderRadius: 20, border: `1px solid ${category === cat ? '#2563EB' : 'rgba(255,255,255,0.12)'}`, background: category === cat ? 'rgba(37,99,235,0.2)' : 'transparent', color: category === cat ? '#60a5fa' : '#94a3b8', cursor: 'pointer', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Mentor grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {filtered.map(mentor => (
                <div key={mentor.id} className="glass card-hover" style={{ padding: 24 }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
                    <div className="avatar" style={{ width: 52, height: 52, fontSize: 18, flexShrink: 0 }}>{mentor.avatar}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{mentor.name}</div>
                      <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>{mentor.org} • {mentor.years} yrs</div>
                      <span className={badgeStyle(mentor.badge)}>{mentor.badge}</span>
                    </div>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>{mentor.bio.substring(0, 100)}...</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                    {mentor.expertise.map(e => <span key={e} className="tag" style={{ fontSize: 11 }}>{e}</span>)}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, fontSize: 12, color: '#64748b' }}>
                    <span>⭐ {mentor.rating} rating</span>
                    <span>👥 {mentor.students.toLocaleString()} students</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <button onClick={() => navigate(`/mentor/${mentor.id}`)} className="btn-ghost" style={{ padding: '8px', fontSize: 13 }}>View Profile</button>
                    <button className="btn-primary" style={{ padding: '8px', fontSize: 13 }}>Enroll ₹100</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MY LEARNING TAB */}
        {activeTab === 'mylearning' && (
          <div>
            <h2 style={{ fontFamily: 'Poppins', fontSize: 24, fontWeight: 700, marginBottom: 24 }}>My Learning Journey</h2>
            {MY_BATCHES.map(batch => (
              <div key={batch.id} className="glass" style={{ padding: 28, marginBottom: 16, display: 'flex', gap: 24, alignItems: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, #1E3A8A, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>📚</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 3 }}>{batch.title}</div>
                      <div style={{ color: '#94a3b8', fontSize: 13 }}>with {batch.mentor}</div>
                    </div>
                    <span className="tag">{batch.category}</span>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginBottom: 6 }}>
                      <span>{batch.completed}/{batch.total} lectures completed</span>
                      <span style={{ color: '#60a5fa', fontWeight: 600 }}>{batch.progress}%</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${batch.progress}%` }} /></div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button className="btn-primary" style={{ padding: '10px 20px', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <Play size={14} /> Continue
                  </button>
                </div>
              </div>
            ))}
            <div style={{ textAlign: 'center', padding: '48px 24px', color: '#475569' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Find more courses</div>
              <button onClick={() => setActiveTab('discover')} className="btn-primary" style={{ marginTop: 8 }}>Browse Mentors</button>
            </div>
          </div>
        )}

        {/* SAHAYAK WELLNESS TAB */}
        {activeTab === 'sahayak' && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: 'Poppins', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💚 Sahayak Wellness</h2>
              <p style={{ color: '#94a3b8' }}>Your mental wellbeing matters to us as much as your learning journey</p>
            </div>

            {/* Mood check */}
            <div className="glass" style={{ padding: 32, marginBottom: 24 }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Daily Mood Check-In</h3>
              <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>How are you feeling today?</p>
              {!moodLogged ? (
                <>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                    {MOOD_EMOJIS.map((emoji, i) => (
                      <button key={i} className={`mood-btn ${mood === i ? 'selected' : ''}`} onClick={() => setMood(i)}>{emoji}</button>
                    ))}
                  </div>
                  <button onClick={() => { if (mood !== null) { setMoodLogged(true); } }} disabled={mood === null} className="btn-primary" style={{ opacity: mood === null ? 0.5 : 1 }}>Log Today's Mood</button>
                </>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#10B981', marginBottom: 24 }}>
                  <span style={{ fontSize: 32 }}>{MOOD_EMOJIS[mood]}</span>
                  <div>
                    <div style={{ fontWeight: 700 }}>Mood logged! ✅</div>
                    <div style={{ fontSize: 13, color: '#60a5fa' }}>Thank you for checking in. Keep going! 💪</div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick access cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {[
                { icon: '🧑‍⚕️', title: 'Book a Psychologist', desc: 'Free 15-min check-in with certified counselors', btn: 'Book Session', color: '#2563EB' },
                { icon: '🗣️', title: 'Anonymous Vent Room', desc: 'AI-moderated safe space to express and heal', btn: 'Enter Room', color: '#7c3aed' },
                { icon: '📚', title: 'Resource Library', desc: 'Guides on stress, anxiety, and student wellbeing', btn: 'Explore', color: '#10B981' },
              ].map(card => (
                <div key={card.title} className="glass card-hover" style={{ padding: 28, textAlign: 'center' }}>
                  <div style={{ fontSize: 44, marginBottom: 14 }}>{card.icon}</div>
                  <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: 16 }}>{card.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>{card.desc}</p>
                  <button style={{ background: `rgba(${card.color === '#2563EB' ? '37,99,235' : card.color === '#7c3aed' ? '124,58,237' : '16,185,129'}, 0.2)`, border: `1px solid ${card.color}40`, borderRadius: 10, padding: '10px 20px', color: card.color, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    {card.btn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
