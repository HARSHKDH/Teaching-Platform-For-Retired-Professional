import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const steps = [
  { icon: '📋', title: 'Application Submitted', desc: 'Your credentials and documents have been received.', done: true },
  { icon: '🔍', title: 'Admin Review', desc: 'Our team is verifying your professional credentials (24-48 hrs).', done: false, active: true },
  { icon: '✅', title: 'Approval & Activation', desc: "You'll receive an email and gain full Mentor Dashboard access.", done: false },
];

export default function PendingVerification() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 600, textAlign: 'center' }}>
        <div style={{ fontSize: 72, marginBottom: 24 }}>⏳</div>
        <h1 style={{ fontFamily: 'Poppins', fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Application Under Review</h1>
        <p style={{ color: '#94a3b8', fontSize: 18, marginBottom: 48, lineHeight: 1.7 }}>
          Thank you, <strong style={{ color: '#F59E0B' }}>{user?.first_name}</strong>! Our admin team is reviewing your credentials. We'll notify you at <strong style={{ color: '#60a5fa' }}>{user?.email}</strong> once approved.
        </p>

        {/* Progress steps */}
        <div className="glass" style={{ padding: 36, marginBottom: 32, textAlign: 'left' }}>
          <h3 style={{ fontWeight: 700, marginBottom: 24, fontSize: 16 }}>Verification Progress</h3>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < steps.length - 1 ? 24 : 0, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: step.done ? 'rgba(16,185,129,0.2)' : step.active ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)', border: `2px solid ${step.done ? '#10B981' : step.active ? '#F59E0B' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                {step.done ? '✓' : step.icon}
              </div>
              <div style={{ paddingTop: 8 }}>
                <div style={{ fontWeight: 700, marginBottom: 4, color: step.done ? '#10B981' : step.active ? '#F59E0B' : '#475569' }}>{step.title}</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>{step.desc}</div>
              </div>
              {step.active && (
                <div style={{ marginLeft: 'auto', paddingTop: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B', animation: 'pulse 2s infinite', boxShadow: '0 0 12px #F59E0B' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div className="glass-light" style={{ padding: 20, textAlign: 'center' }}>
            <Clock size={24} color="#F59E0B" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 700, marginBottom: 4 }}>24-48 Hours</div>
            <div style={{ color: '#64748b', fontSize: 13 }}>Typical review time</div>
          </div>
          <div className="glass-light" style={{ padding: 20, textAlign: 'center' }}>
            <Mail size={24} color="#60a5fa" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Email Notification</div>
            <div style={{ color: '#64748b', fontSize: 13 }}>Instant alert on decision</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={logout} className="btn-ghost">Sign Out</button>
          <button onClick={() => window.location.reload()} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Check Status <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
