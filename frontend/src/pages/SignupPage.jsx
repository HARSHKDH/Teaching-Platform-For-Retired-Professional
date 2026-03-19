import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Eye, EyeOff, Upload, CheckCircle, AlertCircle, X, ArrowLeft, ArrowRight, User, Briefcase, GraduationCap, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CATEGORIES = ['Technology & AI', 'Civil Services', 'Life Skills', 'Business & Finance', 'Arts & Culture', 'Mental Wellness', 'Science & Research', 'Education'];
const DOC_TYPES = [
  { key: 'degree', label: 'Educational Degree', desc: 'Upload degree certificate or marksheet', required: true },
  { key: 'experience', label: 'Proof of Experience', desc: 'Retirement letter, service certificate or LinkedIn profile', required: true },
  { key: 'certification', label: 'Additional Certifications', desc: 'Any professional certifications (optional)', required: false },
];

const STEPS_STUDENT = ['Account Details', 'Profile Setup'];
const STEPS_MENTOR = ['Account Details', 'Professional Info', 'Upload Documents', 'Review & Submit'];

export default function SignupPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState(searchParams.get('role') || null);
  const [step, setStep] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState({});

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', password: '', confirm_password: '',
    phone: '', bio: '', expertise_areas: [], years_experience: '', current_org: '',
    education: '', linkedin_url: '', age: '', location: '',
    goals: '', interests: '', education_level: '',
  });
  const [errors, setErrors] = useState({});

  const steps = role === 'mentor' ? STEPS_MENTOR : STEPS_STUDENT;

  const update = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  const toggleExpertise = (cat) => {
    setForm(f => ({ ...f, expertise_areas: f.expertise_areas.includes(cat) ? f.expertise_areas.filter(c => c !== cat) : [...f.expertise_areas, cat] }));
  };

  const handleFileUpload = (docKey, file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { toast.error('File must be under 10MB'); return; }
    setUploadedDocs(d => ({ ...d, [docKey]: file }));
    toast.success(`${file.name} uploaded!`);
  };

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.first_name.trim()) e.first_name = 'First name required';
      if (!form.last_name.trim()) e.last_name = 'Last name required';
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
      if (form.password.length < 8) e.password = 'Minimum 8 characters';
      if (form.password !== form.confirm_password) e.confirm_password = 'Passwords do not match';
    }
    if (step === 1) {
      if (role === 'mentor') {
        if (!form.bio.trim()) e.bio = 'Bio is required';
        if (form.expertise_areas.length === 0) e.expertise_areas = 'Select at least one area';
        if (!form.years_experience) e.years_experience = 'Years of experience required';
        if (!form.education.trim()) e.education = 'Education details required';
      } else {
        if (!form.goals.trim()) e.goals = 'Tell us your learning goals';
        if (!form.education_level) e.education_level = 'Select your education level';
      }
    }
    if (step === 2 && role === 'mentor') {
      const missing = DOC_TYPES.filter(d => d.required && !uploadedDocs[d.key]);
      if (missing.length) e.docs = `Please upload: ${missing.map(d => d.label).join(', ')}`;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => { if (validateStep()) setStep(s => Math.min(s + 1, steps.length - 1)); };
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    try {
      // Simulate API call — replace with real authAPI.signup call
      await new Promise(r => setTimeout(r, 1500));
      const mockUser = {
        id: Date.now(), first_name: form.first_name, last_name: form.last_name,
        email: form.email, user_type: role,
        verification_status: role === 'mentor' ? 'pending' : 'approved',
        badge_level: role === 'mentor' ? 'Bronze Sage' : null,
        karma_points: 0,
      };
      if (role === 'mentor') {
        toast.success('Application submitted! You\'ll be notified once verified.');
        login(mockUser, 'mock_token_' + Date.now(), 'mock_refresh');
        navigate('/pending-verification');
      } else {
        toast.success(`Welcome to Vridhi, ${form.first_name}! 🌱`);
        login(mockUser, 'mock_token_' + Date.now(), 'mock_refresh');
        navigate('/student/dashboard');
      }
    } catch (err) {
      toast.error('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Role selection screen
  if (!role) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Link to="/" style={{ position: 'absolute', top: 24, left: 24, color: '#64748b', display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', fontSize: 14 }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div style={{ fontSize: 36, marginBottom: 16 }}>🌱</div>
        <h1 style={{ fontFamily: 'Poppins', fontSize: 40, fontWeight: 800, marginBottom: 12, textAlign: 'center' }}>Welcome to <span style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vridhi</span></h1>
        <p style={{ color: '#94a3b8', fontSize: 18, marginBottom: 48, textAlign: 'center' }}>Who are you joining as?</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%', maxWidth: 700 }}>
          <button onClick={() => setRole('student')} className="card-hover"
            style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(99,102,241,0.1))', border: '2px solid rgba(37,99,235,0.4)', borderRadius: 24, padding: 40, cursor: 'pointer', textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🎓</div>
            <h2 style={{ fontFamily: 'Poppins', fontSize: 26, fontWeight: 700, marginBottom: 12, color: '#60a5fa' }}>I'm a Student</h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: 14, marginBottom: 24 }}>Learn from retired experts, build real skills, and earn certificates.</p>
            <div style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.4)', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, color: '#60a5fa' }}>
              Instant Access ✓
            </div>
          </button>

          <button onClick={() => setRole('mentor')} className="card-hover"
            style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(239,68,68,0.08))', border: '2px solid rgba(245,158,11,0.4)', borderRadius: 24, padding: 40, cursor: 'pointer', textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🏅</div>
            <h2 style={{ fontFamily: 'Poppins', fontSize: 26, fontWeight: 700, marginBottom: 12, color: '#F59E0B' }}>I'm a Mentor</h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: 14, marginBottom: 24 }}>Share your lifetime expertise, earn income, and leave a legacy.</p>
            <div style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, color: '#F59E0B' }}>
              Requires Verification ⚡
            </div>
          </button>
        </div>

        <p style={{ marginTop: 32, color: '#64748b', fontSize: 14 }}>Already have an account? <Link to="/login" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link></p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 680 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <button onClick={() => { setRole(null); setStep(0); }} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, margin: '0 auto 20px', fontSize: 14 }}>
            <ArrowLeft size={14} /> Change Role
          </button>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 28 }}>{role === 'mentor' ? '🏅' : '🎓'}</span>
            <h1 style={{ fontFamily: 'Poppins', fontSize: 28, fontWeight: 800 }}>
              {role === 'mentor' ? 'Mentor Registration' : 'Student Registration'}
            </h1>
          </div>
          {role === 'mentor' && <p style={{ color: '#F59E0B', fontSize: 13 }}>Your credentials will be verified before your account is activated</p>}
        </div>

        {/* Progress stepper */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 36, background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 6 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ flex: 1, textAlign: 'center', padding: '10px 8px', borderRadius: 8, background: i === step ? (role === 'mentor' ? 'rgba(245,158,11,0.2)' : 'rgba(37,99,235,0.2)') : 'transparent', transition: 'all 0.3s' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: i <= step ? (role === 'mentor' ? '#F59E0B' : '#60a5fa') : '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <span style={{ width: 18, height: 18, borderRadius: '50%', background: i < step ? '#10B981' : i === step ? (role === 'mentor' ? '#F59E0B' : '#2563EB') : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'white', flexShrink: 0 }}>
                  {i < step ? '✓' : i + 1}
                </span>
                <span style={{ display: 'none' }}>{s}</span>
              </div>
              <div style={{ fontSize: 10, color: i === step ? (role === 'mentor' ? '#F59E0B' : '#60a5fa') : '#475569', marginTop: 4, fontWeight: 600 }}>{s}</div>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="glass" style={{ padding: 40 }}>
          {/* STEP 0: Account Details (both roles) */}
          {step === 0 && (
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 24 }}>Account Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>First Name *</label>
                  <input className="input-field" placeholder="Arjun" value={form.first_name} onChange={e => update('first_name', e.target.value)} />
                  {errors.first_name && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.first_name}</p>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Last Name *</label>
                  <input className="input-field" placeholder="Sharma" value={form.last_name} onChange={e => update('last_name', e.target.value)} />
                  {errors.last_name && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.last_name}</p>}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Email *</label>
                <input className="input-field" type="email" placeholder="arjun@example.com" value={form.email} onChange={e => update('email', e.target.value)} />
                {errors.email && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Phone Number</label>
                <input className="input-field" placeholder="+91 98765 43210" value={form.phone} onChange={e => update('phone', e.target.value)} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Password *</label>
                <div style={{ position: 'relative' }}>
                  <input className="input-field" type={showPass ? 'text' : 'password'} placeholder="Minimum 8 characters" value={form.password} onChange={e => update('password', e.target.value)} style={{ paddingRight: 48 }} />
                  <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.password}</p>}
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Confirm Password *</label>
                <input className="input-field" type="password" placeholder="Repeat password" value={form.confirm_password} onChange={e => update('confirm_password', e.target.value)} />
                {errors.confirm_password && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.confirm_password}</p>}
              </div>
            </div>
          )}

          {/* STEP 1 - STUDENT: Profile Setup */}
          {step === 1 && role === 'student' && (
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 24 }}>Tell Us About Yourself</h3>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Your Learning Goals *</label>
                <textarea className="input-field" rows={3} placeholder="e.g., I want to crack UPSC and learn leadership from real-world experience..." value={form.goals} onChange={e => update('goals', e.target.value)} style={{ resize: 'vertical' }} />
                {errors.goals && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.goals}</p>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Current Education Level *</label>
                <select className="input-field" value={form.education_level} onChange={e => update('education_level', e.target.value)}>
                  <option value="">Select level</option>
                  {['High School', 'Undergraduate', 'Postgraduate', 'PhD', 'Working Professional', 'Other'].map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                {errors.education_level && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.education_level}</p>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Interests (select all that apply)</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => toggleExpertise(cat)} style={{ padding: '6px 14px', borderRadius: 20, border: `1px solid ${form.expertise_areas.includes(cat) ? '#2563EB' : 'rgba(255,255,255,0.1)'}`, background: form.expertise_areas.includes(cat) ? 'rgba(37,99,235,0.2)' : 'transparent', color: form.expertise_areas.includes(cat) ? '#60a5fa' : '#94a3b8', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.2s' }}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Location</label>
                <input className="input-field" placeholder="Mumbai, Maharashtra" value={form.location} onChange={e => update('location', e.target.value)} />
              </div>
            </div>
          )}

          {/* STEP 1 - MENTOR: Professional Info */}
          {step === 1 && role === 'mentor' && (
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 24 }}>Professional Information</h3>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Professional Bio *</label>
                <textarea className="input-field" rows={4} placeholder="Describe your career, achievements, and what you want to teach..." value={form.bio} onChange={e => update('bio', e.target.value)} style={{ resize: 'vertical' }} />
                {errors.bio && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.bio}</p>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Years of Experience *</label>
                  <input className="input-field" type="number" placeholder="35" value={form.years_experience} onChange={e => update('years_experience', e.target.value)} min="1" max="60" />
                  {errors.years_experience && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.years_experience}</p>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Last Organization</label>
                  <input className="input-field" placeholder="IIT Delhi, ISRO, etc." value={form.current_org} onChange={e => update('current_org', e.target.value)} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>Educational Qualification *</label>
                <input className="input-field" placeholder="M.Tech, IIT Bombay / PhD Physics, Delhi University" value={form.education} onChange={e => update('education', e.target.value)} />
                {errors.education && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.education}</p>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>LinkedIn Profile URL</label>
                <input className="input-field" placeholder="https://linkedin.com/in/yourname" value={form.linkedin_url} onChange={e => update('linkedin_url', e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 8, fontWeight: 500 }}>Expertise Areas * (select all that apply)</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => toggleExpertise(cat)} style={{ padding: '6px 14px', borderRadius: 20, border: `1px solid ${form.expertise_areas.includes(cat) ? '#F59E0B' : 'rgba(255,255,255,0.1)'}`, background: form.expertise_areas.includes(cat) ? 'rgba(245,158,11,0.15)' : 'transparent', color: form.expertise_areas.includes(cat) ? '#F59E0B' : '#94a3b8', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.2s' }}>
                      {cat}
                    </button>
                  ))}
                </div>
                {errors.expertise_areas && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>{errors.expertise_areas}</p>}
              </div>
            </div>
          )}

          {/* STEP 2 - MENTOR: Document Upload */}
          {step === 2 && role === 'mentor' && (
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Upload Credentials</h3>
              <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 28 }}>These documents will be reviewed by our admin team. Accepted formats: PDF, JPG, PNG (max 10MB each)</p>
              {errors.docs && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', color: '#ef4444', fontSize: 14, marginBottom: 20, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <AlertCircle size={16} /> {errors.docs}
                </div>
              )}
              {DOC_TYPES.map(doc => (
                <div key={doc.key} style={{ marginBottom: 20 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, marginBottom: 6, color: '#e2e8f0' }}>
                    {doc.label} {doc.required && <span style={{ color: '#ef4444' }}>*</span>}
                    {uploadedDocs[doc.key] && <span style={{ color: '#10B981', fontSize: 12, fontWeight: 500 }}>✓ Uploaded</span>}
                  </label>
                  <p style={{ color: '#64748b', fontSize: 12, marginBottom: 8 }}>{doc.desc}</p>
                  <label className="upload-zone" style={{ display: 'block', cursor: 'pointer' }}>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={e => handleFileUpload(doc.key, e.target.files?.[0])} />
                    {uploadedDocs[doc.key] ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                        <CheckCircle size={24} color="#10B981" />
                        <div>
                          <div style={{ fontWeight: 600, color: '#10B981', fontSize: 14 }}>{uploadedDocs[doc.key].name}</div>
                          <div style={{ color: '#64748b', fontSize: 12 }}>Click to replace</div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Upload size={28} style={{ margin: '0 auto 10px', color: '#475569', display: 'block' }} />
                        <div style={{ color: '#94a3b8', fontSize: 14, fontWeight: 500 }}>Drag & drop or click to upload</div>
                        <div style={{ color: '#475569', fontSize: 12, marginTop: 4 }}>PDF, JPG, PNG up to 10MB</div>
                      </div>
                    )}
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* STEP 3 - MENTOR: Review & Submit */}
          {step === 3 && role === 'mentor' && (
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 24 }}>Review Your Application</h3>
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 24, marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                  <div className="avatar" style={{ width: 56, height: 56, fontSize: 20, flexShrink: 0 }}>{form.first_name[0]}{form.last_name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>{form.first_name} {form.last_name}</div>
                    <div style={{ color: '#94a3b8', fontSize: 14 }}>{form.email}</div>
                    <div style={{ color: '#F59E0B', fontSize: 13, marginTop: 4 }}>{form.years_experience} years experience • {form.current_org}</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13 }}>
                  <div><span style={{ color: '#64748b' }}>Education: </span><span style={{ color: '#e2e8f0' }}>{form.education}</span></div>
                  <div><span style={{ color: '#64748b' }}>Documents: </span><span style={{ color: '#10B981' }}>{Object.keys(uploadedDocs).length} uploaded</span></div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <span style={{ color: '#64748b', fontSize: 13 }}>Expertise: </span>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                    {form.expertise_areas.map(a => <span key={a} className="tag" style={{ fontSize: 11 }}>{a}</span>)}
                  </div>
                </div>
              </div>
              <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 12, padding: 20, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>⏳</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#F59E0B', marginBottom: 6 }}>Verification Process</div>
                  <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>
                    Our admin team will review your credentials within <strong style={{ color: '#e2e8f0' }}>24-48 hours</strong>. You'll receive an email notification once approved. After approval, you'll be redirected to your Mentor Dashboard.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
            <button onClick={step === 0 ? () => setRole(null) : prevStep} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ArrowLeft size={16} /> Back
            </button>
            {step < steps.length - 1 ? (
              <button onClick={nextStep} className={role === 'mentor' ? 'btn-secondary' : 'btn-primary'} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} className={role === 'mentor' ? 'btn-secondary' : 'btn-primary'} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: loading ? 0.7 : 1 }}>
                {loading ? <div style={{ width: 18, height: 18, border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> : null}
                {loading ? 'Submitting...' : (role === 'mentor' ? 'Submit Application' : 'Create Account')}
              </button>
            )}
          </div>

          <p style={{ textAlign: 'center', marginTop: 20, color: '#64748b', fontSize: 14 }}>
            Already have an account? <Link to="/login" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
