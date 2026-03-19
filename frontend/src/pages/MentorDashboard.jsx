import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, TrendingUp, Star, DollarSign, Play, Upload, Award, LogOut, Edit, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const MOCK_BATCHES = [
  { id: 1, title: 'Strategic Leadership from the Battlefield', category: 'Life Skills', students: 48, max: 60, price: 100, rating: 4.9, status: 'active', progress: 65 },
  { id: 2, title: 'UPSC Interview Preparation', category: 'Civil Services', students: 32, max: 50, price: 100, rating: 4.8, status: 'active', progress: 40 },
  { id: 3, title: 'Principled Decision-Making in Crisis', category: 'Life Skills', students: 0, max: 40, price: 100, rating: null, status: 'draft', progress: 0 },
];

const CATEGORIES = ['Technology & AI', 'Civil Services', 'Life Skills', 'Business & Finance', 'Arts & Culture', 'Mental Wellness', 'Science & Research', 'Education'];

export default function MentorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('batches');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBatch, setNewBatch] = useState({ title: '', description: '', category: '', price: 100, max_students: 40, duration_weeks: 8 });

  const tabs = [
    { id: 'batches', label: 'My Batches', icon: '📚' },
    { id: 'impact', label: 'Impact Dashboard', icon: '📊' },
    { id: 'live', label: 'Live Sessions', icon: '🔴' },
  ];

  const handleCreateBatch = (e) => {
    e.preventDefault();
    if (!newBatch.title || !newBatch.category) { toast.error('Fill in all required fields'); return; }
    toast.success(`Batch "${newBatch.title}" created successfully!`);
    setShowCreateModal(false);
    setNewBatch({ title: '', description: '', category: '', price: 100, max_students: 40, duration_weeks: 8 });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      {/* Top Nav */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(15,23,42,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 22 }}>🌱</span>
          <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 20, background: 'linear-gradient(135deg, #F59E0B, #ef8c00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vridhi</span>
          <span style={{ color: '#64748b', fontSize: 13, marginLeft: 4 }}>Mentor Studio</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: activeTab === t.id ? 'rgba(245,158,11,0.2)' : 'transparent', color: activeTab === t.id ? '#F59E0B' : '#94a3b8', cursor: 'pointer', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="badge-gold">{user?.badge_level || 'Gold Mentor'}</span>
          <div className="avatar" style={{ width: 36, height: 36, fontSize: 14 }}>{user?.first_name?.[0] || 'M'}</div>
          <button onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><LogOut size={18} /></button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px 32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: 'Poppins', fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Welcome, {user?.first_name || 'Mentor'} 🏅</h1>
            <p style={{ color: '#94a3b8' }}>Your wisdom is shaping the next generation of leaders</p>
          </div>
          <button onClick={() => setShowCreateModal(true)} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Plus size={18} /> Create New Batch
          </button>
        </div>

        {/* BATCHES TAB */}
        {activeTab === 'batches' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
              {[
                { label: 'Total Students', value: '80', icon: '👥', color: '#60a5fa' },
                { label: 'Active Batches', value: '2', icon: '📚', color: '#F59E0B' },
                { label: 'Avg Rating', value: '4.85', icon: '⭐', color: '#10B981' },
              ].map(s => (
                <div key={s.label} className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ fontSize: 36 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                    <div style={{ color: '#64748b', fontSize: 13 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Your Batches</h3>
            {MOCK_BATCHES.map(batch => (
              <div key={batch.id} className="glass" style={{ padding: 24, marginBottom: 16, display: 'flex', gap: 20, alignItems: 'center' }}>
                <div style={{ width: 54, height: 54, borderRadius: 14, background: batch.status === 'draft' ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg, #d97706, #F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                  {batch.status === 'draft' ? '📝' : '📚'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{batch.title}</div>
                      <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>{batch.category} • ₹{batch.price}/student</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      {batch.status === 'draft' ? <span className="status-pending">Draft</span> : <span className="status-approved">Active</span>}
                      {batch.rating && <span style={{ fontSize: 13, color: '#F59E0B' }}>⭐ {batch.rating}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#64748b', marginBottom: 8 }}>
                    <span>👥 {batch.students}/{batch.max} students</span>
                    <span>💰 ₹{batch.students * batch.price} earned</span>
                  </div>
                  {batch.status === 'active' && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginBottom: 4 }}>
                        <span>Course progress</span><span style={{ color: '#60a5fa' }}>{batch.progress}%</span>
                      </div>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: `${batch.progress}%` }} /></div>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
                  <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Edit size={14} /> Manage
                  </button>
                  {batch.status === 'active' && (
                    <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Play size={14} /> Go Live
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 24 }}>
              <div className="glass" style={{ padding: 28, textAlign: 'center', cursor: 'pointer', border: '2px dashed rgba(245,158,11,0.3)' }} onClick={() => setShowCreateModal(true)}>
                <Plus size={32} style={{ margin: '0 auto 12px', color: '#F59E0B' }} />
                <div style={{ fontWeight: 700, color: '#F59E0B', marginBottom: 6 }}>Create New Batch</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>Share a new topic with the world</div>
              </div>
              <div className="glass" style={{ padding: 28, textAlign: 'center', cursor: 'pointer', border: '2px dashed rgba(124,58,237,0.3)' }}>
                <span style={{ fontSize: 32, display: 'block', marginBottom: 12 }}>🏛️</span>
                <div style={{ fontWeight: 700, color: '#a78bfa', marginBottom: 6 }}>Post Legacy Project</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>Real-world challenges for students</div>
              </div>
            </div>
          </div>
        )}

        {/* IMPACT TAB */}
        {activeTab === 'impact' && (
          <div>
            <h2 style={{ fontFamily: 'Poppins', fontSize: 26, fontWeight: 800, marginBottom: 28 }}>Your Impact Dashboard 📊</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
              {[
                { label: 'Students Taught', value: '80', icon: '👥', color: '#60a5fa', sub: 'Lifetime' },
                { label: 'Hours Contributed', value: '240', icon: '⏱️', color: '#10B981', sub: 'Teaching time' },
                { label: 'Total Earned', value: '₹5,600', icon: '💰', color: '#F59E0B', sub: 'This month' },
                { label: 'Karma Points', value: user?.karma_points || 450, icon: '✨', color: '#a78bfa', sub: 'All time' },
              ].map(s => (
                <div key={s.label} className="stat-card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: s.color, marginBottom: 4, fontFamily: 'Poppins' }}>{s.value}</div>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
                  <div style={{ color: '#64748b', fontSize: 12 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Badge progression */}
            <div className="glass" style={{ padding: 32, marginBottom: 24 }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Badge Progression</h3>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                {['Bronze Sage', 'Silver Guide', 'Gold Mentor', 'Platinum Icon'].map((b, i) => (
                  <React.Fragment key={b}>
                    <div style={{ textAlign: 'center', opacity: i <= 2 ? 1 : 0.4 }}>
                      <div style={{ fontSize: 32, marginBottom: 6 }}>{['🥉', '🥈', '🥇', '💎'][i]}</div>
                      <span className={['badge-bronze', 'badge-silver', 'badge-gold', 'badge-platinum'][i]}>{b}</span>
                      {i === 2 && <div style={{ fontSize: 11, color: '#F59E0B', marginTop: 6, fontWeight: 600 }}>← You are here</div>}
                    </div>
                    {i < 3 && <div style={{ flex: 1, height: 2, background: i < 2 ? 'linear-gradient(90deg, #F59E0B, #10B981)' : 'rgba(255,255,255,0.1)' }} />}
                  </React.Fragment>
                ))}
              </div>
              <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 16 }}>Teach 50 more students to reach <strong style={{ color: '#a78bfa' }}>Platinum Icon</strong> status!</p>
            </div>

            {/* Earnings */}
            <div className="glass" style={{ padding: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 style={{ fontWeight: 700, fontSize: 18 }}>Earnings Overview</h3>
                <button className="btn-secondary" style={{ padding: '8px 18px', fontSize: 13 }}>Withdraw</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                {[
                  { label: 'Total Revenue', amount: '₹8,000', sub: 'From 80 students' },
                  { label: 'Your Share (70%)', amount: '₹5,600', sub: 'Available to withdraw' },
                  { label: 'Platform Fee (30%)', amount: '₹2,400', sub: 'Keeps Vridhi free' },
                ].map(e => (
                  <div key={e.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20 }}>
                    <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>{e.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#F59E0B', marginBottom: 4 }}>{e.amount}</div>
                    <div style={{ color: '#475569', fontSize: 12 }}>{e.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LIVE SESSIONS TAB */}
        {activeTab === 'live' && (
          <div>
            <h2 style={{ fontFamily: 'Poppins', fontSize: 26, fontWeight: 800, marginBottom: 28 }}>Live Session Studio 🔴</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div className="glass" style={{ padding: 40, textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(239,68,68,0.2)', border: '2px solid rgba(239,68,68,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', animation: 'pulse 2s infinite' }}>
                  <Play size={32} color="#ef4444" />
                </div>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 22, marginBottom: 10 }}>Start Live Session</h3>
                <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>Go live instantly with WebRTC video + screen share for your enrolled students</p>
                <button onClick={() => toast.success('Live session starting! (WebRTC integration required)')} className="btn-primary" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: '0 4px 20px rgba(239,68,68,0.35)' }}>
                  🔴 Go Live Now
                </button>
              </div>
              <div className="glass" style={{ padding: 32 }}>
                <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Schedule a Session</h3>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Select Batch</label>
                  <select className="input-field">
                    {MOCK_BATCHES.filter(b => b.status === 'active').map(b => <option key={b.id}>{b.title}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Date & Time</label>
                  <input className="input-field" type="datetime-local" />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Topic</label>
                  <input className="input-field" placeholder="Session topic..." />
                </div>
                <button onClick={() => toast.success('Session scheduled! Students will be notified.')} className="btn-secondary" style={{ width: '100%' }}>
                  Schedule Session
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Batch Modal */}
      {showCreateModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24 }}>
          <div className="glass" style={{ width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', padding: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 22 }}>Create New Batch</h3>
              <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 20 }}>✕</button>
            </div>
            <form onSubmit={handleCreateBatch}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Batch Title *</label>
                <input className="input-field" placeholder="e.g., Strategic Leadership from the Battlefield" value={newBatch.title} onChange={e => setNewBatch(b => ({ ...b, title: e.target.value }))} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Description</label>
                <textarea className="input-field" rows={3} placeholder="What will students learn in this batch?" value={newBatch.description} onChange={e => setNewBatch(b => ({ ...b, description: e.target.value }))} style={{ resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Category *</label>
                  <select className="input-field" value={newBatch.category} onChange={e => setNewBatch(b => ({ ...b, category: e.target.value }))}>
                    <option value="">Select category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Duration (weeks)</label>
                  <input className="input-field" type="number" value={newBatch.duration_weeks} onChange={e => setNewBatch(b => ({ ...b, duration_weeks: +e.target.value }))} min="1" max="52" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Price (₹)</label>
                  <input className="input-field" type="number" value={newBatch.price} onChange={e => setNewBatch(b => ({ ...b, price: +e.target.value }))} min="0" />
                  <p style={{ color: '#64748b', fontSize: 11, marginTop: 4 }}>Default: ₹100 per student</p>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Max Students</label>
                  <input className="input-field" type="number" value={newBatch.max_students} onChange={e => setNewBatch(b => ({ ...b, max_students: +e.target.value }))} min="5" max="500" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-ghost" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn-secondary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <CheckCircle size={16} /> Create Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
