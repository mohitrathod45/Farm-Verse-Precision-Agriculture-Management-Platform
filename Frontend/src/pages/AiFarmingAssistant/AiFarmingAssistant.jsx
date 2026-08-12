import { useState, useRef, useEffect } from 'react';
import {
  RiSparklingLine,
  RiLeafLine,
  RiSendPlane2Fill,
  RiRefreshLine,
  RiUser3Line,
  RiErrorWarningLine,
  RiArrowGoBackLine,
} from 'react-icons/ri';
import { askAI } from '../../services/api';
import FormattedMarkdown from '../../components/FormattedMarkdown';
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
      // Exclude transient loading placeholders
      return parsed.filter((msg) => msg && msg.status !== 'loading');
    }
  } catch (err) {
    console.error('Error loading chat history from localStorage:', err);
  }
  return [];
};



const AiFarmingAssistant = () => {
  // Initialize messages state from localStorage
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
      console.error('Error saving chat history to localStorage:', err);
    }
  }, [messages]);

  // Handle message submit
  const handleSendMessage = async (customQuery) => {
    const textToSend = typeof customQuery === 'string' ? customQuery : inputText;
    if (!textToSend || !textToSend.trim() || loading) return;

    const trimmedQuery = textToSend.trim();
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
      console.error('AI Chat Error:', err);
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
    handleSendMessage(queryToRetry);
  };

  // Clear conversation history
  const handleClearChat = () => {
    setMessages([]);
    setInputText('');
    localStorage.removeItem(CHAT_STORAGE_KEY);
    toast.success('Conversation cleared');
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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  };

  return (
    <div className="py-2 animate-fade-in max-w-4xl mx-auto w-full">
      {/* SINGLE UNIFIED CHATBOT CONTAINER */}
      <div className="bg-white rounded-3xl border border-border-light shadow-md overflow-hidden flex flex-col h-[560px] w-full">
        
        {/* 1. Header (Inside Chatbot Container Top) */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-600 px-5 sm:px-6 py-4 text-white shrink-0 flex items-center justify-between relative overflow-hidden border-b border-emerald-700/40">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center space-x-2.5">
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-white font-display">
                AI Farming Assistant
              </h1>
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-emerald-100 font-semibold text-[10px] sm:text-[11px] tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                <RiSparklingLine className="text-amber-300 animate-pulse text-xs" />
                <span>Online</span>
              </span>
            </div>
            <p className="text-emerald-100/90 text-xs mt-0.5 hidden sm:block">
              Your intelligent 24/7 agriculture and precision farming advisor
            </p>
          </div>

          {messages.length > 0 && (
            <button
              onClick={handleClearChat}
              disabled={loading}
              title="Clear Conversation History"
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 relative z-10 shrink-0"
            >
              <RiRefreshLine className="text-sm" />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          )}
        </div>

        {/* 2. Scrollable Conversation Stream (Inside Chatbot Container Middle) */}
        <div className="flex-1 min-h-0 bg-white p-4 sm:p-5 overflow-y-auto space-y-4">
          
          {/* Compact Minimal Empty State */}
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center max-w-sm mx-auto text-center py-6 space-y-2 animate-fade-in">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl shadow-2xs border border-emerald-200">
                🌱
              </div>
              <h3 className="text-base font-bold text-text-dark font-display">
                Welcome to FarmVerse AI
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Ask me anything about farming, crops, irrigation, soil health, or fertilizers.
              </p>
            </div>
          )}

          {/* Conversation Stream Messages */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${
                  isUser ? 'justify-end' : 'justify-start'
                } animate-fade-in`}
              >
                {/* AI Avatar */}
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs shrink-0 shadow-2xs mt-1">
                    <RiLeafLine />
                  </div>
                )}

                {/* Bubble Wrapper */}
                <div
                  className={`max-w-[85%] sm:max-w-[78%] space-y-1 ${
                    isUser ? 'items-end' : 'items-start'
                  }`}
                >
                  {/* AI Header Label */}
                  {!isUser && (
                    <div className="flex items-center space-x-2 text-[11px] font-bold text-emerald-900 px-1">
                      <span>FarmVerse AI</span>
                      <span className="text-[9px] font-normal text-text-muted">
                        {msg.timestamp}
                      </span>
                    </div>
                  )}

                  {/* Message Content Bubble */}
                  <div
                    className={`p-3.5 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                      isUser
                        ? 'bg-emerald-700 text-white rounded-2xl rounded-tr-xs font-medium'
                        : msg.status === 'error'
                        ? 'bg-red-50 border border-red-200 text-red-800 rounded-2xl rounded-tl-xs'
                        : 'bg-bg-light/60 border border-border-light text-text-dark rounded-2xl rounded-tl-xs font-sans'
                    }`}
                  >
                    {/* User Text */}
                    {isUser && <p className="whitespace-pre-wrap">{msg.text}</p>}

                    {/* AI Response Text (Formatted Markdown) */}
                    {!isUser && msg.status === 'sent' && (
                      <FormattedMarkdown content={msg.text} />
                    )}

                    {/* Typing Indicator */}
                    {!isUser && msg.status === 'loading' && (
                      <div className="flex items-center space-x-2 py-1 text-emerald-700">
                        <div className="flex space-x-1 items-center">
                          <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></span>
                        </div>
                        <span className="text-xs text-text-muted font-normal ml-1">
                          Thinking...
                        </span>
                      </div>
                    )}

                    {/* Error State */}
                    {!isUser && msg.status === 'error' && (
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <RiErrorWarningLine className="text-red-500 text-base shrink-0 mt-0.5" />
                          <p className="text-xs text-red-700">{msg.text}</p>
                        </div>
                        {msg.queryRef && (
                          <div className="pt-1 flex justify-end">
                            <button
                              onClick={() => handleRetry(msg.queryRef, msg.id)}
                              disabled={loading}
                              className="inline-flex items-center space-x-1 text-xs font-bold text-red-700 hover:text-red-900 bg-white px-2.5 py-1 rounded-lg border border-red-200 hover:border-red-300 transition-all cursor-pointer disabled:opacity-50"
                            >
                              <RiArrowGoBackLine className="text-xs" />
                              <span>Retry</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* User Message Timestamp */}
                  {isUser && (
                    <p className="text-[10px] text-text-muted text-right px-1">
                      {msg.timestamp}
                    </p>
                  )}
                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center text-xs shrink-0 shadow-2xs mt-1">
                    <RiUser3Line />
                  </div>
                )}
              </div>
            );
          })}

          {/* Scroll anchor target */}
          <div ref={messagesEndRef} />
        </div>

        {/* 3. Input Bar (Inside Chatbot Container Bottom) */}
        <div className="border-t border-border-light p-3 bg-white shrink-0">
          <div className="flex items-end space-x-2">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask your farming question..."
              rows={1}
              disabled={loading}
              className="flex-1 p-2.5 sm:p-3 bg-bg-light/60 border border-border-light rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-text-dark resize-none max-h-28 placeholder:text-text-muted/60 disabled:opacity-60 font-sans"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputText.trim()}
              className="h-10 sm:h-11 px-4 sm:px-5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center space-x-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send</span>
                  <RiSendPlane2Fill className="text-sm" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AiFarmingAssistant;