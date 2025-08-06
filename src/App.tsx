import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, Apple, Heart, Activity, Leaf, Sun, Moon } from 'lucide-react';
import { AIService, AIResponse } from './aiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<'checking' | 'configured' | 'missing'>('checking');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check API key status on component mount
  useEffect(() => {
    const checkApiKey = () => {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (apiKey && apiKey.trim() !== '') {
        setApiKeyStatus('configured');
      } else {
        setApiKeyStatus('missing');
      }
    };
    
    checkApiKey();
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse: AIResponse = await AIService.generateResponse(inputMessage);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse.success ? aiResponse.text : `Error: ${aiResponse.text}`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
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
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="header">
        <div className="header-content">
          <div className="logo">
            <Apple className="logo-icon" />
            <div className="logo-text">
              <h1>FitCoach</h1>
              <p>Your AI Fitness & Health Coach</p>
            </div>
          </div>
          <div className="header-controls">
            <div className="health-icons">
              <Heart className="health-icon pulse" />
              <Activity className="health-icon bounce" />
              <Leaf className="health-icon float" />
            </div>
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className="chat-container">
        {apiKeyStatus === 'missing' && (
          <div className="api-key-warning">
            <AlertCircle size={16} />
            <div>
              <strong>API Key Required</strong>
              <p>Add VITE_OPENAI_API_KEY to your .env file</p>
            </div>
          </div>
        )}

        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="welcome-message">
              <div className="welcome-animation">
                <Apple className="welcome-icon" />
                <div className="floating-elements">
                  <Heart className="floating-icon" />
                  <Activity className="floating-icon" />
                  <Leaf className="floating-icon" />
                </div>
              </div>
              <h2>Welcome to FitCoach! 💪</h2>
              <p>Your personal AI fitness and health coach</p>
              <div className="suggestion-chips">
                <button 
                  className="suggestion-chip"
                  onClick={() => setInputMessage("What should I eat for breakfast?")}
                >
                  🍳 Breakfast ideas
                </button>
                <button 
                  className="suggestion-chip"
                  onClick={() => setInputMessage("How many calories should I eat?")}
                >
                  📊 Calorie advice
                </button>
                <button 
                  className="suggestion-chip"
                  onClick={() => setInputMessage("What are healthy snacks?")}
                >
                  🥜 Healthy snacks
                </button>
                <button 
                  className="suggestion-chip"
                  onClick={() => setInputMessage("Help me plan a workout")}
                >
                  💪 Workout tips
                </button>
              </div>
              {apiKeyStatus === 'missing' && (
                <p className="warning">⚠️ Configure your API key to start chatting</p>
              )}
            </div>
          )}
          
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.role}`}>
              <div className="message-avatar">
                {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className="message-content">
                <div style={{ whiteSpace: 'pre-wrap' }}>{message.content}</div>
                <div className="message-time">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message assistant">
              <div className="message-avatar">
                <Bot size={16} />
              </div>
              <div className="message-content">
                <div className="loading">
                  <div className="loading-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                  <span>Analyzing your fitness question...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <div className="input-container">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about fitness, nutrition, or health advice..."
              disabled={isLoading || apiKeyStatus === 'missing'}
            />
            <button
              className="send-button"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading || apiKeyStatus === 'missing'}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; 