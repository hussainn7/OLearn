import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { chatbotService } from '@/lib/chatbot';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface HelpChatbotProps {
  lessonContext?: string;
  lessonTitle?: string;
}

const HelpChatbot: React.FC<HelpChatbotProps> = ({ lessonContext, lessonTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm your learning assistant. I can help you with questions about ${lessonTitle ? `"${lessonTitle}"` : 'digital literacy'}. What would you like to know?`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const context = lessonContext 
        ? `Current lesson: ${lessonTitle}. ${lessonContext}. User is learning about digital literacy.`
        : 'digital literacy learning platform';
        
      const response = await chatbotService.sendMessage({
        message: userMessage.text,
        context: context
      });
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Use fallback response if API fails
      const fallbackResponse = chatbotService.getFallbackResponse(userMessage.text);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Help Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={handleToggle}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 shadow-lg"
        >
          <HelpCircle size={20} />
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 h-96 sm:w-96 sm:h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)]">
          <Card className="h-full flex flex-col shadow-2xl">
            <CardHeader className="bg-blue-600 text-white pb-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm sm:text-lg flex items-center gap-2">
                  <MessageCircle size={16} className="sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Learning Assistant</span>
                  <span className="sm:hidden">Help</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggle}
                  className="text-white hover:bg-blue-700 p-1"
                >
                  <X size={14} className="sm:w-4 sm:h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0 min-h-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-2 py-1.5 ${
                        message.isUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-xs sm:text-sm break-words">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 rounded-lg px-2 py-1.5">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 text-xs sm:text-sm"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-blue-600 hover:bg-blue-700 p-2"
                    size="sm"
                  >
                    <Send size={14} className="sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default HelpChatbot; 