import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const TUTORIALS = [
  { id: 1, student: 'Rahul K.', title: 'How to use ChatGPT for UPSC prep', category: 'AI Tools', mentors: 34, points: 120, avatar: 'RK' },
  { id: 2, student: 'Sneha P.', title: 'Create & secure your first UPI account', category: 'Digital Finance', mentors: 28, points: 80, avatar: 'SP' },
  { id: 3, student: 'Arjun M.', title: 'Navigating YouTube Studio for Beginners', category: 'Social Media', mentors: 19, points: 60, avatar: 'AM' },
];

export default function ReverseMentorPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: 32 }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginBottom: 24, fontSize: 14 }}>
        <ArrowLeft size={16} /> Back
      </button>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: 'Poppins', fontSize: 36, fontWeight: 800, marginBottom: 12 }}>🔄 Reverse Mentoring</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 600, margin: '0 auto 24px' }}>Students teach mentors modern digital skills. Earn Scholarship Points and Help the elder generation thrive digitally.</p>
          <button onClick={() => toast.success('Create tutorial feature coming soon!')} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
            <Plus size={18} /> Create a Tutorial
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, textAlign: 'left' }}>
          {TUTORIALS.map(t => (
            <div key={t.id} className="glass card-hover" style={{ padding: 28 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                <div className="avatar" style={{ width: 40, height: 40, fontSize: 15 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.student}</div>
                  <span className="tag" style={{ fontSize: 11 }}>{t.category}</span>
                </div>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, lineHeight: 1.4 }}>{t.title}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#64748b', marginBottom: 16 }}>
                <span>👴 {t.mentors} mentors enrolled</span>
                <span style={{ color: '#10B981', fontWeight: 700 }}>+{t.points} pts</span>
              </div>
              <button onClick={() => toast.success('Enrolling in tutorial...')} className="btn-primary" style={{ width: '100%', fontSize: 14 }}>Learn This Skill</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
