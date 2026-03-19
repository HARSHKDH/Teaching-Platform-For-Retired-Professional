import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.email) errs.email = 'Email required';
    if (!form.password) errs.password = 'Password required';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      // Mock login — replace with authAPI.login(form)
      await new Promise(r => setTimeout(r, 1000));

      // Demo: detect role from email
      let role = 'student';
      let verStatus = 'approved';
      if (form.email.includes('mentor')) { role = 'mentor'; }
      if (form.email.includes('pending')) { role = 'mentor'; verStatus = 'pending'; }
      if (form.email.includes('admin')) { role = 'admin'; }

      const mockUser = {
        id: 1, first_name: 'Demo', last_name: 'User',
        email: form.email, user_type: role,
        verification_status: verStatus,
        badge_level: role === 'mentor' ? 'Gold Mentor' : null,
        karma_points: 450,
      };

      login(mockUser, 'mock_token_' + Date.now(), 'mock_refresh');
      toast.success(`Welcome back! 👋`);

      if (role === 'mentor' && verStatus === 'pending') navigate('/pending-verification');
      else if (role === 'mentor') navigate('/mentor/dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
      else navigate('/student/dashboard');
    } catch {
      toast.error('Invalid credentials. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 24 }}>
            <span style={{ fontSize: 28 }}>🌱</span>
            <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 22, background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vridhi</span>
          </Link>
          <h1 style={{ fontFamily: 'Poppins', fontSize: 30, fontWeight: 800, marginBottom: 8 }}>Welcome Back</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Sign in to continue your journey</p>
        </div>

        <div className="glass" style={{ padding: 36 }}>
          {/* Demo hint */}
          <div style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: 10, padding: '10px 14px', marginBottom: 24, fontSize: 12, color: '#94a3b8' }}>
            💡 Demo: use <code style={{ color: '#60a5fa' }}>student@demo.com</code>, <code style={{ color: '#F59E0B' }}>mentor@demo.com</code>, or <code style={{ color: '#a78bfa' }}>admin@demo.com</code> with any password
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Email Address</label>
              <input className="input-field" type="email" placeholder="you@example.com" value={form.email} onChange={e => update('email', e.target.value)} />
              {errors.email && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Password</label>
                <a href="#" style={{ fontSize: 12, color: '#60a5fa', textDecoration: 'none' }}>Forgot password?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <input className="input-field" type={showPass ? 'text' : 'password'} placeholder="Your password" value={form.password} onChange={e => update('password', e.target.value)} style={{ paddingRight: 48 }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', fontSize: 16, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1 }}>
              {loading ? <div style={{ width: 18, height: 18, border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> : <><span>Sign In</span><ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="divider" />
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: 14 }}>
            New to Vridhi? <Link to="/signup" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>Create Account</Link>
          </p>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, color: '#47556950', fontSize: 12 }}>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
