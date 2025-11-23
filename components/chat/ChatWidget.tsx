import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import CustomerDetailsModal from './CustomerDetailsModal';
import ChatToggle from './ChatToggle';
import { Message, Customer } from '@/types/chat';

// Hardcoded configuration
const CONFIG = {
  position: 'right' as 'left' | 'right',
  autoPop: false,
  supportName: 'Prakhar',
  supportAvatar: '/images/prakhar-avatar-nandann-creative.webp?v=2',
  welcomeMessage: "Hi! I'm not a bot - I'm a real human! How can I help you today?",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageUrl, setPageUrl] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const hasShownWelcome = useRef(false);

  // Restore customer data from localStorage on mount
  useEffect(() => {
    try {
      const savedCustomer = localStorage.getItem('chat_customer');
      const savedCustomerId = localStorage.getItem('chat_customerId');
      const savedTimestamp = localStorage.getItem('chat_timestamp');
      
      if (savedCustomer && savedCustomerId) {
        const customerData = JSON.parse(savedCustomer);
        
        // Check if data is too old (older than 24 hours)
        const now = Date.now();
        const timestamp = savedTimestamp ? parseInt(savedTimestamp) : 0;
        const age = now - timestamp;
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (age > maxAge) {
          localStorage.removeItem('chat_customer');
          localStorage.removeItem('chat_customerId');
          localStorage.removeItem('chat_timestamp');
          setMessages([]);
        } else {
          setCustomer(customerData);
          setCustomerId(savedCustomerId);
        }
      }
    } catch (error) {
      console.error('Error restoring customer data:', error);
      localStorage.removeItem('chat_customer');
      localStorage.removeItem('chat_customerId');
      localStorage.removeItem('chat_timestamp');
    }
  }, []);

  // Get page URL
  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  // Initialize audio context on user interaction (required for iOS Safari)
  useEffect(() => {
    const initAudioContext = async () => {
      if (!audioContextRef.current) {
        try {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          audioContextRef.current = new AudioContextClass();
          
          // Resume audio context if suspended (iOS Safari requirement)
          if (audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
          }
        } catch (error) {
          console.error('Error initializing audio context:', error);
        }
      }
    };

    // Initialize on any user interaction (click, touch, etc.)
    const handleUserInteraction = () => {
      initAudioContext();
    };

    // Try to initialize immediately if possible
    initAudioContext();

    // Also initialize on user interactions
    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });
    window.addEventListener('touchend', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('touchend', handleUserInteraction);
    };
  }, []);

  // Request notification permission only when user opens chat (user interaction)
  useEffect(() => {
    if (isOpen && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
    
    // Resume audio context when chat opens (user interaction)
    if (isOpen && audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume().catch(() => {});
    }
  }, [isOpen]);

  // Create notification sound - louder and more noticeable, iOS Safari compatible
  useEffect(() => {
    const createNotificationSound = async () => {
      try {
        // Get or create audio context
        if (!audioContextRef.current) {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          audioContextRef.current = new AudioContextClass();
        }

        const audioContext = audioContextRef.current;

        // Resume if suspended (critical for iOS Safari)
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }

        // Create a more noticeable double-beep pattern
        const playBeep = (frequency: number, startTime: number, duration: number, volume: number) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.value = frequency;
          oscillator.type = 'sine';
          
          // Louder volume - start at 0.8 (80%) instead of 0.3
          gainNode.gain.setValueAtTime(volume, startTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
          
          oscillator.start(startTime);
          oscillator.stop(startTime + duration);
        };
        
        const now = audioContext.currentTime;
        const volume = 0.8; // Much louder - 80% volume
        
        // Double beep pattern for better noticeability
        // First beep: higher pitch
        playBeep(1000, now, 0.15, volume);
        // Second beep: slightly lower pitch, after a short pause
        playBeep(800, now + 0.2, 0.15, volume);
      } catch (error) {
        console.error('Error playing notification sound:', error);
      }
    };
    
    (audioRef as any).current = createNotificationSound;
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!customerId) return;
    
    const pollMessages = async () => {
      try {
        const response = await fetch(`/api/chat/messages?customerId=${encodeURIComponent(customerId)}`);
        const data = await response.json();
        
        if (data.success && data.messages) {
          setMessages((prev) => {
            const existingIds = new Set(prev.map(msg => msg.id));
            const newMessages = data.messages.filter((msg: Message) => !existingIds.has(msg.id));
            
            if (newMessages.length > 0) {
              newMessages.forEach((msg: Message) => {
                if (msg.sender === 'admin') {
                  if ((audioRef as any).current) {
                    try {
                      // Call async function - await not needed in forEach, but function will handle it
                      (audioRef as any).current().catch(() => {});
                    } catch (e) {}
                  }

                  if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification('New message from Support', {
                      body: msg.text,
                      icon: CONFIG.supportAvatar,
                    });
                  }
                }
              });
              
              return [...prev, ...newMessages];
            }
            return prev;
          });
        }
      } catch (error) {
        console.error('Error polling messages:', error);
      }
    };

    pollMessages();
    const pollInterval = setInterval(pollMessages, 3000);

    return () => {
      clearInterval(pollInterval);
    };
  }, [customerId]);

  // Load messages when customer is set
  useEffect(() => {
    if (customerId) {
      loadMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  // Show welcome message when chat opens
  useEffect(() => {
    if (isOpen && !hasShownWelcome.current) {
      hasShownWelcome.current = true;
    }
  }, [isOpen]);

  const loadMessages = async () => {
    if (!customerId) return;
    try {
      const response = await fetch(`/api/chat/messages?customerId=${customerId}`);
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleCustomerDetailsSubmit = async (details: { name: string; email: string; phone: string }) => {
    setIsDetailsModalOpen(false);
    setIsLoading(true);

    try {
      const detailsResponse = await fetch('/api/chat/customer-details');
      const detailsData = await detailsResponse.json();

      const customerData: Customer = {
        id: `customer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: details.name,
        email: details.email,
        phone: details.phone,
        pageUrl: pageUrl || window.location.href,
        ...detailsData.data,
        createdAt: new Date(),
      };

      setCustomer(customerData);
      setCustomerId(customerData.id);
      hasShownWelcome.current = true;
      
      try {
        localStorage.setItem('chat_customer', JSON.stringify(customerData));
        localStorage.setItem('chat_customerId', customerData.id);
        localStorage.setItem('chat_timestamp', Date.now().toString());
      } catch (error) {
        console.error('Error saving customer to localStorage:', error);
      }

      const messageToSend = pendingMessage || inputMessage.trim();
      if (messageToSend) {
        setPendingMessage(null);
        setInputMessage('');
        
        const tempMessage: Message = {
          id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          customerId: customerData.id,
          text: messageToSend,
          sender: 'customer',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, tempMessage]);

        try {
          const response = await fetch('/api/chat/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customerId: customerData.id,
              message: messageToSend,
              customer: {
                name: customerData.name,
                email: customerData.email,
                phone: customerData.phone,
                pageUrl: customerData.pageUrl,
              },
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Network error' }));
            console.error('API error:', errorData);
            setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
            alert(`Failed to send message: ${errorData.error || 'Unknown error'}`);
            return;
          }

          const data = await response.json();
          if (data.success) {
            // Replace temp message with the actual saved message from server
            if (data.message) {
              setMessages((prev) => prev.map((msg) => 
                msg.id === tempMessage.id ? data.message : msg
              ));
            } else {
              // If no message in response, reload all messages
              try {
                const messagesResponse = await fetch(`/api/chat/messages?customerId=${encodeURIComponent(customerData.id)}`);
                const messagesData = await messagesResponse.json();
                if (messagesData.success && messagesData.messages) {
                  setMessages(messagesData.messages);
                }
              } catch (error) {
                console.error('Error reloading messages:', error);
                // Keep the temp message if reload fails
              }
            }
          } else {
            setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
            alert(`Failed to send message: ${data.error || 'Unknown error'}`);
          }
        } catch (error) {
          console.error('Error sending message:', error);
          setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
          alert(`Failed to send message: ${error instanceof Error ? error.message : 'Network error'}`);
        }
      }
    } catch (error) {
      console.error('Error creating customer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    if (!customerId || !customer) {
      setPendingMessage(inputMessage.trim());
      setIsDetailsModalOpen(true);
      return;
    }

    const messageText = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    const tempMessage: Message = {
      id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      customerId,
      text: messageText,
      sender: 'customer',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, tempMessage]);

    try {
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId,
          message: messageText,
          customer: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            pageUrl: customer.pageUrl,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        console.error('API error:', errorData);
        setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
        alert(`Failed to send message: ${errorData.error || 'Unknown error'}`);
        return;
      }

      const data = await response.json();
      if (data.success) {
        // Replace temp message with the actual saved message from server
        if (data.message) {
          setMessages((prev) => prev.map((msg) => 
            msg.id === tempMessage.id ? data.message : msg
          ));
        } else {
          // If no message in response, reload all messages
          try {
            const messagesResponse = await fetch(`/api/chat/messages?customerId=${encodeURIComponent(customerId)}`);
            const messagesData = await messagesResponse.json();
            if (messagesData.success && messagesData.messages) {
              setMessages(messagesData.messages);
            }
          } catch (error) {
            console.error('Error reloading messages:', error);
            // Keep the temp message if reload fails
          }
        }
        
        if (data.telegramError) {
          alert(`Warning: Message saved but not sent to Telegram: ${data.telegramError}`);
        }
      } else {
        setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
        alert(`Failed to send message: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
      alert(`Failed to send message: ${error instanceof Error ? error.message : 'Network error'}`);
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

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMinimize = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ChatToggle onClick={handleToggle} isOpen={isOpen} />
      
      {isOpen && (
        <div
          className={`fixed ${CONFIG.position === 'right' ? 'right-0 md:right-6' : 'left-0 md:left-6'} bottom-0 md:bottom-6 z-[9999] w-full md:w-96 h-[100dvh] md:h-[600px] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col`}
          style={{ 
            maxHeight: '100dvh',
            paddingBottom: 'env(safe-area-inset-bottom, 0px)'
          }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CONFIG.supportAvatar}
                  alt={CONFIG.supportName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
              </div>
              <div>
                <h3 className="font-semibold">{CONFIG.supportName}</h3>
                <p className="text-xs text-blue-100">Online</p>
              </div>
            </div>
            <button
              onClick={handleMinimize}
              className="text-white hover:text-blue-100 transition-colors"
              aria-label="Minimize chat"
              title="Minimize"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 min-h-0" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="mb-4">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-200">
                <p className="text-sm text-slate-700">{CONFIG.welcomeMessage}</p>
              </div>
            </div>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && messages.length > 0 && (
              <div className="flex justify-start mb-4">
                <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border border-slate-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div 
            className="p-4 border-t border-slate-200 bg-white flex-shrink-0"
            style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={(e) => {
                  setTimeout(() => {
                    e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 300);
                }}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <CustomerDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          if (pendingMessage && !customerId) {
            setInputMessage(pendingMessage);
          }
          if (!customerId) {
            setIsOpen(false);
          }
        }}
        onSubmit={handleCustomerDetailsSubmit}
        pageUrl={pageUrl}
      />
    </>
  );
}

