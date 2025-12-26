
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CommunityMessage {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  initials: string;
}

interface CommunityContextType {
  messages: CommunityMessage[];
  addMessage: (text: string, author: string) => void;
  deleteMessage: (id: string) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<CommunityMessage[]>(() => {
    // Merge logic to prevent data loss from previous separate features
    const feedbackSaved = localStorage.getItem('glutivia_community_feedback');
    const messagesSaved = localStorage.getItem('glutivia_community_messages');
    const unifiedSaved = localStorage.getItem('glutivia_unified_community');

    if (unifiedSaved) return JSON.parse(unifiedSaved);

    let combined: CommunityMessage[] = [];
    
    // Recovery from "Feedback" section
    if (feedbackSaved) {
      try {
        const fb = JSON.parse(feedbackSaved);
        combined = [...combined, ...fb];
      } catch (e) { console.error("Error migrating feedback data", e); }
    }

    // Recovery from "Discussion" section
    if (messagesSaved) {
      try {
        const msg = JSON.parse(messagesSaved);
        // Normalize structure if different (e.g., if it used userName instead of author)
        const normalized = msg.map((m: any) => ({
          id: m.id || Math.random().toString(36).substr(2, 9),
          author: m.author || m.userName || 'Anonymous',
          text: m.text || '',
          timestamp: m.timestamp || new Date().toISOString(),
          initials: m.initials || (m.author || m.userName || 'A').charAt(0).toUpperCase()
        }));
        combined = [...combined, ...normalized];
      } catch (e) { console.error("Error migrating message data", e); }
    }

    // Default messages if no data exists anywhere
    if (combined.length === 0) {
      combined = [
        {
          id: 'welcome-1',
          author: 'Glutivia Staff',
          text: 'Welcome to our unified community! This is a safe space for all members to share tips, recipes, and feedback.',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          initials: 'GS'
        }
      ];
    }

    // Sort by most recent first and remove duplicates by ID
    const uniqueMap = new Map();
    combined.forEach(m => uniqueMap.set(m.id, m));
    return Array.from(uniqueMap.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  });

  useEffect(() => {
    localStorage.setItem('glutivia_unified_community', JSON.stringify(messages));
  }, [messages]);

  const addMessage = (text: string, author: string) => {
    const initials = author.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const newMessage: CommunityMessage = {
      id: Math.random().toString(36).substr(2, 9),
      author,
      text,
      timestamp: new Date().toISOString(),
      initials
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  return (
    <CommunityContext.Provider value={{ messages, addMessage, deleteMessage }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};
