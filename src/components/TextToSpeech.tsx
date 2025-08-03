import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TextToSpeechProps {
  children: React.ReactNode;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setSpeech(utterance);
    }
    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('keyup', handleTextSelection);
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('keyup', handleTextSelection);
    };
  }, []);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.toString().trim() === '') {
      setIsVisible(false);
      return;
    }
    const text = selection.toString().trim();
    if (text.length < 3) {
      setIsVisible(false);
      return;
    }
    setSelectedText(text);
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const toolbarHeight = 50;
    const toolbarWidth = 200;
    let x = rect.left + (rect.width / 2) - (toolbarWidth / 2);
    let y = rect.top - toolbarHeight - 10;
    if (x < 10) x = 10;
    if (x + toolbarWidth > window.innerWidth - 10) {
      x = window.innerWidth - toolbarWidth - 10;
    }
    if (y < 10) {
      y = rect.bottom + 10;
    }
    setPosition({ x, y });
    setIsVisible(true);
  };

  const handleSpeak = () => {
    if (!speech || !selectedText) return;
    window.speechSynthesis.cancel();
    speech.text = selectedText;
    window.speechSynthesis.speak(speech);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedText).then(() => {
      const originalText = toolbarRef.current?.textContent;
      if (toolbarRef.current) {
        toolbarRef.current.textContent = 'Copied!';
        setTimeout(() => {
          if (toolbarRef.current) {
            toolbarRef.current.textContent = originalText || '';
          }
        }, 1000);
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <>
      {children}
      {isVisible && (
        <div
          ref={toolbarRef}
          className="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-2 flex items-center space-x-2"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          <Button
            size="sm"
            variant="ghost"
            onClick={isSpeaking ? handleStop : handleSpeak}
            className="flex items-center space-x-1 text-sm"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="h-4 w-4" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                <span>Speak</span>
              </>
            )}
          </Button>
          <div className="w-px h-4 bg-gray-300"></div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="text-sm"
          >
            Copy
          </Button>
          <div className="text-xs text-gray-500 max-w-32 truncate">
            "{selectedText.length > 20 ? selectedText.substring(0, 20) + '...' : selectedText}"
          </div>
        </div>
      )}
    </>
  );
};

export default TextToSpeech;
