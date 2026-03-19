import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const PROJECTS = [
  { id: 1, mentor: 'Dr. Ashok Kumar', title: 'Optimize a satellite orbit trajectory algorithm', category: 'Tech & AI', difficulty: 'Advanced', desc: 'Design a fuel-efficient orbit correction algorithm similar to what ISRO uses for PSLV missions.', submissions: 14, deadline: '2026-04-15' },
  { id: 2, mentor: 'Col. Sunita Mehta', title: 'Crisis Communication Plan for a Startup', category: 'Business', difficulty: 'Intermediate', desc: 'Create a comprehensive crisis communication strategy using military decision frameworks adapted for corporate environments.', submissions: 8, deadline: '2026-04-20' },
  { id: 3, mentor: 'Prof. Ramesh Iyer', title: 'Analyze a real PE deal gone wrong', category: 'Finance', difficulty: 'Advanced', desc: 'Study the Café Coffee Day case and present an alternative restructuring proposal with financial modelling.', submissions: 22, deadline: '2026-04-10' },
];

const diffColor = (d) => d === 'Advanced' ? '#ef4444' : d === 'Intermediate' ? '#F59E0B' : '#10B981';

export default function LegacyProjectsPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: 32 }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginBottom: 24, fontSize: 14 }}>
        <ArrowLeft size={16} /> Back
      </button>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontFamily: 'Poppins', fontSize: 36, fontWeight: 800, marginBottom: 12 }}>🏛️ Legacy Projects</h1>
          <p style={{ color: '#94a3b8', fontSize: 17 }}>Real industry challenges from verified professionals. Solve them, get reviewed, and earn certificates.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {PROJECTS.map(p => (
            <div key={p.id} className="glass card-hover" style={{ padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'flex-start' }}>
                <span className="tag">{p.category}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: diffColor(p.difficulty), background: `rgba(${diffColor(p.difficulty) === '#ef4444' ? '239,68,68' : diffColor(p.difficulty) === '#F59E0B' ? '245,158,11' : '16,185,129'},0.15)`, padding: '3px 10px', borderRadius: 12, border: `1px solid ${diffColor(p.difficulty)}40` }}>{p.difficulty}</span>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, lineHeight: 1.4 }}>{p.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</p>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>
                <div>by {p.mentor} • {p.submissions} submissions</div>
                <div>Deadline: {p.deadline}</div>
              </div>
              <button onClick={() => { setSelected(p); toast.success('Opening submission form...'); }} className="btn-primary" style={{ width: '100%', fontSize: 14 }}>Submit Solution</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
