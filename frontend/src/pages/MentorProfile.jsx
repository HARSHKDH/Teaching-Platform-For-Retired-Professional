import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Users, Clock, Award } from 'lucide-react';

const MOCK_MENTORS = [
  { id: '1', name: 'Dr. Ashok Kumar', org: 'Ex-ISRO Scientist', years: 35, expertise: ['Tech & AI', 'Science'], rating: 4.9, students: 1200, bio: 'Former ISRO chief scientist with 35 years in space research. Led multiple satellite missions including PSLV and GSLV programs. Passionate about inspiring India\'s next generation of scientists and engineers through real-world stories from space missions.', badge: 'Platinum Icon', avatar: 'AK', price: 100, batches: [{ title: 'AI & ML Fundamentals', students: 340, rating: 4.9, price: 100 }, { title: 'Space Tech for Beginners', students: 280, rating: 4.8, price: 100 }] },
  { id: '2', name: 'Col. Sunita Mehta', org: 'Retd. Indian Army', years: 28, expertise: ['Life Skills', 'Civil Services'], rating: 4.8, students: 890, bio: 'Colonel with 28 years serving the Indian Army in leadership positions. Teaches strategic thinking, mental resilience, and decision-making under pressure — skills that apply to academic and corporate life equally.', badge: 'Gold Mentor', avatar: 'SM', price: 100, batches: [{ title: 'Leadership from the Battlefield', students: 480, rating: 4.8, price: 100 }, { title: 'UPSC Interview Mastery', students: 410, rating: 4.8, price: 100 }] },
];

export default function MentorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mentor = MOCK_MENTORS.find(m => m.id === id) || MOCK_MENTORS[0];
  const [enrolled, setEnrolled] = useState(false);

  const badgeStyle = (b) => {
    if (b === 'Platinum Icon') return 'badge-platinum';
    if (b === 'Gold Mentor') return 'badge-gold';
    if (b === 'Silver Guide') return 'badge-silver';
    return 'badge-bronze';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '32px' }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginBottom: 24, fontSize: 14 }}>
        <ArrowLeft size={16} /> Back
      </button>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Profile header */}
        <div className="glass" style={{ padding: 40, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div className="avatar" style={{ width: 100, height: 100, fontSize: 36, flexShrink: 0 }}>{mentor.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                <h1 style={{ fontFamily: 'Poppins', fontSize: 28, fontWeight: 800 }}>{mentor.name}</h1>
                <span className={badgeStyle(mentor.badge)}>{mentor.badge}</span>
              </div>
              <p style={{ color: '#F59E0B', fontWeight: 600, marginBottom: 4 }}>{mentor.org}</p>
              <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>{mentor.years} years of professional experience</p>
              <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Star size={16} color="#F59E0B" /><span style={{ fontWeight: 700 }}>{mentor.rating}</span><span style={{ color: '#64748b', fontSize: 13 }}>rating</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Users size={16} color="#60a5fa" /><span style={{ fontWeight: 700 }}>{mentor.students.toLocaleString()}</span><span style={{ color: '#64748b', fontSize: 13 }}>students</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={16} color="#10B981" /><span style={{ fontWeight: 700 }}>{mentor.years * 2000}</span><span style={{ color: '#64748b', fontSize: 13 }}>teaching hrs</span></div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {mentor.expertise.map(e => <span key={e} className="tag">{e}</span>)}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          <div>
            <div className="glass" style={{ padding: 32, marginBottom: 20 }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 14 }}>About</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>{mentor.bio}</p>
            </div>
            <div className="glass" style={{ padding: 32 }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Available Batches</h3>
              {mentor.batches?.map((batch, i) => (
                <div key={i} style={{ padding: 20, background: 'rgba(255,255,255,0.04)', borderRadius: 12, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{batch.title}</div>
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>👥 {batch.students} enrolled • ⭐ {batch.rating}</div>
                  </div>
                  <button onClick={() => setEnrolled(true)} className="btn-primary" style={{ padding: '8px 20px', fontSize: 14 }}>₹{batch.price} Enroll</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="glass" style={{ padding: 28, textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🤝</div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Connect with {mentor.name.split(' ')[0]}</div>
              {!enrolled ? (
                <button onClick={() => setEnrolled(true)} className="btn-primary" style={{ width: '100%', marginBottom: 10 }}>Enroll ₹100</button>
              ) : (
                <div style={{ color: '#10B981', fontWeight: 600, padding: '12px', background: 'rgba(16,185,129,0.1)', borderRadius: 10, marginBottom: 10 }}>✅ Enrolled!</div>
              )}
              <button className="btn-ghost" style={{ width: '100%', fontSize: 13 }}>💬 Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
