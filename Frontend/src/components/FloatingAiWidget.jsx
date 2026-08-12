import { useState, useRef, useEffect } from 'react';
import {
  RiSparklingLine,
  RiLeafLine,
  RiSendPlane2Fill,
  RiCloseLine,
  RiUser3Line,
  RiErrorWarningLine,
  RiArrowGoBackLine,
} from 'react-icons/ri';
import { askAI } from '../services/api';
import FormattedMarkdown from './FormattedMarkdown';
import toast from 'react-hot-toast';

const CHAT_STORAGE_KEY = 'farmverse_ai_chat_history';

/**
 * Safely load persisted chat history from localStorage
 */
const loadPersistedMessages = () => {
  try {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed.filter((msg) => msg && msg.status !== 'loading');
    }
  } catch (err) {
    console.error('Error loading chat history in floating widget:', err);
  }
  return [];
};

const FloatingAiWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(loadPersistedMessages);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      // Reload latest chat history whenever popup opens (in case user chatted on full page)
      setMessages(loadPersistedMessages());
      setTimeout(scrollToBottom, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Persist messages to localStorage whenever conversation updates
  useEffect(() => {
    try {
      const validMessages = messages.filter((m) => m && m.status !== 'loading');
      if (validMessages.length > 0) {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(validMessages));
      } else {
        localStorage.removeItem(CHAT_STORAGE_KEY);
      }
    } catch (err) {
      console.error('Error saving chat history in floating widget:', err);
    }
  }, [messages]);

  // Handle message submit
  const handleSendMessage = async () => {
    if (!inputText || !inputText.trim() || loading) return;

    const trimmedQuery = inputText.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Create User Message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmedQuery,
      status: 'sent',
      timestamp: now,
    };

    // 2. Create AI Loading Message placeholder
    const aiLoadingMsgId = `ai-${Date.now()}`;
    const aiLoadingMsg = {
      id: aiLoadingMsgId,
      sender: 'ai',
      text: '',
      status: 'loading',
      timestamp: now,
      queryRef: trimmedQuery,
    };

    setMessages((prev) => [...prev, userMsg, aiLoadingMsg]);
    setInputText('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      setLoading(true);
      const responseText = await askAI(trimmedQuery);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiLoadingMsgId
            ? { ...msg, text: responseText, status: 'sent' }
            : msg
        )
      );
    } catch (err) {
      console.error('Floating Widget AI Error:', err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiLoadingMsgId
            ? {
                ...msg,
                text: "Sorry, I couldn't process that request right now. Please try again.",
                status: 'error',
              }
            : msg
        )
      );
      toast.error('Failed to get response from AI Assistant.');
    } finally {
      setLoading(false);
    }
  };

  // Retry failed prompt
  const handleRetry = (queryToRetry, failedMsgId) => {
    if (!queryToRetry || loading) return;
    setMessages((prev) => prev.filter((msg) => msg.id !== failedMsgId));
    setInputText(queryToRetry);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 90)}px`;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* CHATBOT POPUP WINDOW */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] bg-white rounded-3xl border border-border-light shadow-2xl overflow-hidden flex flex-col mb-3.5 animate-fade-in transition-all">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-600 px-4 py-3 text-white flex items-center justify-between shrink-0 border-b border-emerald-700/40">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-emerald-200">
                🌱
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold font-display leading-tight text-white">
                  AI Farming Assistant
                </h4>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  <span className="text-[10px] text-emerald-100 font-semibold">Online</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer text-lg"
              title="Close chat"
            >
              <RiCloseLine />
            </button>
          </div>

          {/* Scrollable Conversation Stream */}
          <div className="flex-1 min-h-0 bg-white p-3.5 overflow-y-auto space-y-3">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl border border-emerald-200">
                  🌱
                </div>
                <h5 className="text-xs sm:text-sm font-bold text-text-dark font-display">
                  Welcome to FarmVerse AI
                </h5>
                <p className="text-[11px] text-text-muted leading-relaxed max-w-xs">
                  Ask me anything about farming, crops, irrigation, soil health, or fertilizers.
                </p>
              </div>
            )}

            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-2 ${
                    isUser ? 'justify-end' : 'justify-start'
                  } animate-fade-in`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] shrink-0 mt-1">
                      <RiLeafLine />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] space-y-0.5 ${
                      isUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    {!isUser && (
                      <span className="text-[10px] font-bold text-emerald-900 px-1">
                        FarmVerse AI
                      </span>
                    )}

                    <div
                      className={`p-3 text-xs leading-relaxed shadow-2xs ${
                        isUser
                          ? 'bg-emerald-700 text-white rounded-2xl rounded-tr-xs font-medium'
                          : msg.status === 'error'
                          ? 'bg-red-50 border border-red-200 text-red-800 rounded-2xl rounded-tl-xs'
                          : 'bg-bg-light/60 border border-border-light text-text-dark rounded-2xl rounded-tl-xs'
                      }`}
                    >
                      {isUser && <p className="whitespace-pre-wrap">{msg.text}</p>}

                      {!isUser && msg.status === 'sent' && (
                        <FormattedMarkdown content={msg.text} />
                      )}

                      {!isUser && msg.status === 'loading' && (
                        <div className="flex items-center space-x-1.5 py-0.5 text-emerald-700">
                          <div className="flex space-x-1 items-center">
                            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce"></span>
                          </div>
                          <span className="text-[11px] text-text-muted">Thinking...</span>
                        </div>
                      )}

                      {!isUser && msg.status === 'error' && (
                        <div className="space-y-1.5">
                          <div className="flex items-start space-x-1.5">
                            <RiErrorWarningLine className="text-red-500 text-sm shrink-0 mt-0.5" />
                            <p className="text-[11px] text-red-700">{msg.text}</p>
                          </div>
                          {msg.queryRef && (
                            <div className="pt-0.5 flex justify-end">
                              <button
                                onClick={() => handleRetry(msg.queryRef, msg.id)}
                                disabled={loading}
                                className="inline-flex items-center space-x-1 text-[10px] font-bold text-red-700 bg-white px-2 py-0.5 rounded border border-red-200 transition-all cursor-pointer"
                              >
                                <RiArrowGoBackLine className="text-[10px]" />
                                <span>Retry</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center text-[10px] shrink-0 mt-1">
                      <RiUser3Line />
                    </div>
                  )}
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Input */}
          <div className="border-t border-border-light p-2.5 bg-white shrink-0">
            <div className="flex items-end space-x-1.5">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                rows={1}
                disabled={loading}
                className="flex-1 p-2 bg-bg-light/60 border border-border-light rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-text-dark resize-none max-h-24 placeholder:text-text-muted/60 disabled:opacity-60"
              />

              <button
                onClick={handleSendMessage}
                disabled={loading || !inputText.trim()}
                className="h-9 px-3.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center space-x-1 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                {loading ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send</span>
                    <RiSendPlane2Fill className="text-xs" />
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      )}

      {/* FLOATING CIRCULAR WIDGET BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-xl flex items-center justify-center transition-all transform hover:scale-105 cursor-pointer relative group"
        aria-label="AI Farming Assistant"
        title="AI Farming Assistant"
      >
        {isOpen ? (
          <RiCloseLine className="text-2xl" />
        ) : (
          <RiSparklingLine className="text-2xl text-amber-300 animate-pulse" />
        )}

        {/* Floating Tooltip */}
        {!isOpen && (
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-text-dark text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            AI Farming Assistant
          </span>
        )}
      </button>
    </div>
  );
};

export default FloatingAiWidget;
