import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const MOOD_EMOJIS = [
  { emoji: '😞', label: 'Struggling' },
  { emoji: '😕', label: 'Low' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '😊', label: 'Good' },
  { emoji: '😄', label: 'Great' },
];

const RESOURCES = [
  { icon: '🧘', title: 'Stress Management Guide', desc: 'Breathing techniques and mindfulness practices for student life' },
  { icon: '💤', title: 'Sleep Hygiene for Students', desc: 'How to optimize your sleep schedule for better academic performance' },
  { icon: '🏋️', title: 'Movement & Mental Health', desc: 'Simple exercises that can lift mood in under 10 minutes' },
  { icon: '📓', title: 'Journaling Prompts', desc: '30 daily prompts to improve self-awareness and emotional clarity' },
];

export default function SahayakPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mood, setMood] = useState(null);
  const [moodLogged, setMoodLogged] = useState(false);
  const [sessionTime, setSessionTime] = useState('');

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: 32 }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginBottom: 24, fontSize: 14 }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </button>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 60, marginBottom: 12 }}>💚</div>
          <h1 style={{ fontFamily: 'Poppins', fontSize: 38, fontWeight: 800, marginBottom: 12 }}>Sahayak</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>Your mental wellness companion. You are not alone in your journey.</p>
        </div>

        {/* Crisis banner */}
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 14, padding: '16px 24px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 24 }}>🆘</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, color: '#ef4444', marginBottom: 2 }}>Need immediate help?</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>iCall Helpline: <strong style={{ color: 'white' }}>9152987821</strong> • Vandrevala Foundation: <strong style={{ color: 'white' }}>1860-2662-345</strong></div>
          </div>
          <a href="tel:9152987821" style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444', padding: '8px 16px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>Call Now</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          {/* Mood tracker */}
          <div className="glass" style={{ padding: 32 }}>
            <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Daily Mood Check-In</h3>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 20 }}>30 seconds to check in with yourself</p>
            {!moodLogged ? (
              <>
                <div style={{ display: 'flex', gap: 8, marginBottom: 20, justifyContent: 'space-between' }}>
                  {MOOD_EMOJIS.map((m, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <button className={`mood-btn ${mood === i ? 'selected' : ''}`} onClick={() => setMood(i)}>{m.emoji}</button>
                      <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>{m.label}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => { if (mood !== null) { setMoodLogged(true); toast.success('Mood logged! 💚'); } }} disabled={mood === null} className="btn-primary" style={{ width: '100%', opacity: mood === null ? 0.5 : 1 }}>
                  Log Mood
                </button>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>{MOOD_EMOJIS[mood].emoji}</div>
                <div style={{ fontWeight: 700, color: '#10B981', marginBottom: 4 }}>Mood Logged! ✅</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>Come back tomorrow for your next check-in</div>
              </div>
            )}
          </div>

          {/* Book session */}
          <div className="glass" style={{ padding: 32 }}>
            <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>🧑‍⚕️ Book Psychologist Session</h3>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 20 }}>Free 15-minute confidential session with a certified counselor</p>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Preferred Time</label>
              <input className="input-field" type="datetime-local" value={sessionTime} onChange={e => setSessionTime(e.target.value)} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#2563EB' }} />
                <span style={{ fontSize: 13, color: '#94a3b8' }}>I prefer an anonymous session</span>
              </label>
            </div>
            <button onClick={() => toast.success('Session booked! You\'ll receive a confirmation email.')} className="btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, #10B981, #059669)', boxShadow: '0 4px 20px rgba(16,185,129,0.3)' }}>
              Book Free Session
            </button>
          </div>
        </div>

        {/* Vent room */}
        <div className="glass" style={{ padding: 32, marginBottom: 24, textAlign: 'center', background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(99,102,241,0.08))' }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>🗣️</div>
          <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Anonymous Vent Room</h3>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>A safe, AI-moderated space to express your thoughts without judgment. 100% anonymous.</p>
          <button onClick={() => toast.success('Vent room opening... (AI moderation active)')} style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: 'white', border: 'none', padding: '12px 32px', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Enter Vent Room 🔒
          </button>
        </div>

        {/* Resource library */}
        <div>
          <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 20 }}>📚 Resource Library</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {RESOURCES.map(r => (
              <div key={r.title} className="glass card-hover" style={{ padding: 22, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 28 }}>{r.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{r.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
