import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

export default function LiveSessionRoom() {
  const { batchId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const jitsiContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load Jitsi script for WebRTC video conferencing
    const domain = 'meet.jit.si';
    const script = document.createElement('script');
    script.src = `https://${domain}/external_api.js`;
    script.async = true;
    script.onload = () => {
      setLoading(false);
      const options = {
        roomName: `Vridhi_LiveSession_${batchId}_${process.env.NODE_ENV === 'development' ? Date.now() : ''}`,
        width: '100%',
        height: '100%',
        parentNode: jitsiContainerRef.current,
        userInfo: {
          displayName: user?.first_name ? `${user.first_name} ${user.last_name || ''}` : 'Vridhi User',
          email: user?.email,
        },
        configOverwrite: {
          prejoinPageEnabled: false,
          disableDeepLinking: true,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
            'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
            'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
          ],
        },
      };
      
      const api = new window.JitsiMeetExternalAPI(domain, options);
      
      return () => {
        api.dispose();
      };
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [batchId, user]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#0f172a' }}>
      <div style={{ padding: '12px 24px', background: 'rgba(15,23,42,0.95)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => navigate(-1)} className="btn-ghost" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <ArrowLeft size={16} /> Leave Room
        </button>
        <div>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: 'white', margin: 0 }}>Live Session: Batch #{batchId}</h2>
          <div style={{ fontSize: 12, color: '#10B981', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, background: '#10B981', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
            Connection Secure (WebRTC)
          </div>
        </div>
      </div>
      
      <div style={{ flex: 1, position: 'relative' }}>
        {loading && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
            <div style={{ width: 40, height: 40, border: '3px solid rgba(96,165,250,0.2)', borderTopColor: '#60a5fa', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: 16 }} />
            Initializing Secure Video Room...
          </div>
        )}
        <div ref={jitsiContainerRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}
