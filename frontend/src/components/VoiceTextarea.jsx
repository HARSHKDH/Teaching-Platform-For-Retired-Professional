import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VoiceTextarea({ value, onChange, name, placeholder, rows = 4, className = 'input-field' }) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-IN';

      rec.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          }
        }
        if (finalTranscript) {
          onChange({ target: { name, value: value + (value ? ' ' : '') + finalTranscript.trim() } });
        }
      };

      rec.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        if (event.error !== 'no-speech') {
          toast.error('Microphone error: ' + event.error);
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    }
  }, [value, onChange, name]);

  const toggleListen = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
      toast.success('Voice dictation stopped.');
    } else {
      if (recognition) {
        try {
          recognition.start();
          setIsListening(true);
          toast.success('Listening... Speak now 🎙️');
        } catch (e) {
          console.error(e);
        }
      } else {
        toast.error('Voice dictation not supported on your browser.');
      }
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <textarea
        className={className}
        rows={rows}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={toggleListen}
        style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          background: isListening ? '#ef4444' : 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '50%',
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          boxShadow: isListening ? '0 0 15px rgba(239,68,68,0.6)' : 'none',
          transition: 'all 0.2s'
        }}
        title="Dictate with voice"
      >
        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
      </button>
    </div>
  );
}
