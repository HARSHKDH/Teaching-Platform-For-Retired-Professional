import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, Users, Clock, Search, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const PENDING_MENTORS = [
  { id: 1, name: 'Dr. Neha Gupta', email: 'neha@example.com', expertise: ['Tech & AI', 'Science'], years: 28, org: 'Ex-DRDO Scientist', education: 'PhD, IIT Kharagpur', docs: ['degree.pdf', 'experience_letter.pdf'], submitted: '2026-03-14', status: 'pending' },
  { id: 2, name: 'Brig. Rajan Kapoor', email: 'rajan@example.com', expertise: ['Life Skills', 'Civil Services'], years: 32, org: 'Retd. Indian Army', education: 'M.Sc Defence Studies, NDC', docs: ['service_certificate.pdf', 'degree.pdf', 'certification.pdf'], submitted: '2026-03-13', status: 'pending' },
  { id: 3, name: 'Mrs. Lata Menon', email: 'lata@example.com', expertise: ['Arts & Culture'], years: 45, org: 'Retd. Doordarshan Artist', education: 'MA Fine Arts, BHU', docs: ['degree.pdf', 'experience_certificate.pdf'], submitted: '2026-03-12', status: 'pending' },
];

const PLATFORM_STATS = [
  { label: 'Total Users', value: '14,280', icon: '👥', color: '#60a5fa' },
  { label: 'Active Batches', value: '340', icon: '📚', color: '#F59E0B' },
  { label: 'Pending Approvals', value: '3', icon: '⏳', color: '#ef4444' },
  { label: 'Monthly Revenue', value: '₹1.2L', icon: '💰', color: '#10B981' },
];

export default function AdminPanel() {
  const { logout } = useAuth();
  const [mentors, setMentors] = useState(PENDING_MENTORS);
  const [activeTab, setActiveTab] = useState('approvals');
  const [selected, setSelected] = useState(null);

  const approve = (id) => {
    setMentors(m => m.map(x => x.id === id ? { ...x, status: 'approved' } : x));
    toast.success('Mentor approved! They\'ve been notified via email. ✅');
    setSelected(null);
  };

  const reject = (id) => {
    setMentors(m => m.map(x => x.id === id ? { ...x, status: 'rejected' } : x));
    toast.error('Application rejected. Mentor notified.');
    setSelected(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      {/* Nav */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(15,23,42,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 22 }}>🌱 </span>
          <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 18, color: '#a78bfa' }}>Vridhi Admin</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[{ id: 'approvals', label: '🔍 Pending Approvals' }, { id: 'stats', label: '📊 Platform Health' }].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: activeTab === t.id ? 'rgba(124,58,237,0.2)' : 'transparent', color: activeTab === t.id ? '#a78bfa' : '#94a3b8', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
              {t.label}
            </button>
          ))}
        </div>
        <button onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><LogOut size={18} /></button>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px 32px' }}>
        <h1 style={{ fontFamily: 'Poppins', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Admin Dashboard 🛡️</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Manage mentor verifications and monitor platform health</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
          {PLATFORM_STATS.map(s => (
            <div key={s.label} className="stat-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: s.color, fontFamily: 'Poppins' }}>{s.value}</div>
              <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {activeTab === 'approvals' && (
          <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: 24 }}>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                Mentor Verification Queue
                <span style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', fontSize: 12, padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
                  {mentors.filter(m => m.status === 'pending').length} Pending
                </span>
              </h3>
              {mentors.map(mentor => (
                <div key={mentor.id} className="glass" style={{ padding: 24, marginBottom: 12, cursor: 'pointer', border: selected?.id === mentor.id ? '1px solid rgba(124,58,237,0.4)' : '1px solid rgba(255,255,255,0.08)', transition: 'all 0.2s' }} onClick={() => setSelected(mentor)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div className="avatar" style={{ width: 44, height: 44, fontSize: 16 }}>{mentor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</div>
                      <div>
                        <div style={{ fontWeight: 700, marginBottom: 3 }}>{mentor.name}</div>
                        <div style={{ color: '#94a3b8', fontSize: 13 }}>{mentor.org} • {mentor.years} yrs exp</div>
                        <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>Submitted: {mentor.submitted}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                      <span className={mentor.status === 'pending' ? 'status-pending' : mentor.status === 'approved' ? 'status-approved' : 'status-rejected'}>
                        {mentor.status.charAt(0).toUpperCase() + mentor.status.slice(1)}
                      </span>
                      {mentor.status === 'pending' && (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button onClick={(e) => { e.stopPropagation(); approve(mentor.id); }} style={{ padding: '5px 12px', borderRadius: 8, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981', cursor: 'pointer', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <CheckCircle size={13} /> Approve
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); reject(mentor.id); }} style={{ padding: '5px 12px', borderRadius: 8, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', cursor: 'pointer', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <XCircle size={13} /> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selected && (
              <div className="glass" style={{ padding: 28, height: 'fit-content' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 18 }}>Application Details</h3>
                  <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>✕</button>
                </div>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 20 }}>
                  <div className="avatar" style={{ width: 52, height: 52, fontSize: 18 }}>{selected.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 17 }}>{selected.name}</div>
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>{selected.email}</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20, fontSize: 13 }}>
                  <div><span style={{ color: '#64748b' }}>Experience: </span><strong>{selected.years} years</strong></div>
                  <div><span style={{ color: '#64748b' }}>Org: </span><strong>{selected.org}</strong></div>
                  <div style={{ gridColumn: '1/-1' }}><span style={{ color: '#64748b' }}>Education: </span><strong>{selected.education}</strong></div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>Expertise Areas:</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {selected.expertise.map(e => <span key={e} className="tag" style={{ fontSize: 11 }}>{e}</span>)}
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>Uploaded Documents ({selected.docs.length})</div>
                  {selected.docs.map(doc => (
                    <div key={doc} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 16 }}>📄</span>
                      <span style={{ fontSize: 13, color: '#e2e8f0' }}>{doc}</span>
                      <button style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: 12 }}>View</button>
                    </div>
                  ))}
                </div>
                {selected.status === 'pending' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <button onClick={() => reject(selected.id)} style={{ padding: '12px', borderRadius: 12, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <XCircle size={16} /> Reject
                    </button>
                    <button onClick={() => approve(selected.id)} style={{ padding: '12px', borderRadius: 12, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <CheckCircle size={16} /> Approve
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div>
            <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 24 }}>Platform Health Overview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {[
                { label: 'Batch Completion Rate', value: '74%', icon: '📈' },
                { label: 'Avg Session Duration', value: '52 min', icon: '⏱️' },
                { label: 'Payment Success Rate', value: '98.2%', icon: '💳' },
                { label: 'Student Retention', value: '82%', icon: '🔄' },
                { label: 'Mentor Retention', value: '91%', icon: '🏅' },
                { label: 'Support Tickets', value: '23 open', icon: '🎫' },
              ].map(s => (
                <div key={s.label} className="stat-card" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#60a5fa' }}>{s.value}</div>
                    <div style={{ color: '#64748b', fontSize: 13 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
