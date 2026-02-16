'use client';
import { createContext, useContext, useRef, type ReactNode } from 'react';
import { useStore } from 'zustand';
import {
  createChatStore,
  initialChatState,
  type ChatStore,
} from '../chat-store';

// * Store API type
export type ChatStoreAPI = ReturnType<typeof createChatStore>;

// * Create Context
const ChatStoreContext = createContext<ChatStoreAPI | null>(null);

// * Chat Store Provider Props
interface ChatStoreProviderProps {
  children: ReactNode;
  initialState?: ChatStore;
}

/**
 * Chat store provider - creates one store instance per provider
 * Wrap your app/(app) layout with this provider
 */

export const ChatStoreProvider = ({
  children,
  initialState,
}: ChatStoreProviderProps) => {
  // Create store ref
  const storeRef = useRef<ChatStoreAPI | null>(null);
  if (storeRef.current == null) {
    storeRef.current = createChatStore(initialState ?? initialChatState);
  }

  return (
    // eslint-disable-next-line react-hooks/refs
    <ChatStoreContext.Provider value={storeRef.current}>
      {children}
    </ChatStoreContext.Provider>
  );
};

/**
 * Hook to access the chat store with a selector
 * Must be used within ChatStoreProvider
 */
export const useChatStore = <T,>(selector: (store: ChatStore) => T): T => {
  const chatStoreContext = useContext(ChatStoreContext);

  if (!chatStoreContext) {
    throw new Error('useChatStore must be used within ChatStoreProvider');
  }

  return useStore(chatStoreContext, selector);
};

// * Hook to access chat store actions

// * Get the chat box open state and actions
export const useIsChatOpen = () => useChatStore((state) => state.isOpen);

// * Get the pending message and actions
export const usePendingMessage = () =>
  useChatStore((state) => state.pendingMessage);

/**
 * * Get all chat actions
 * * * Actions are stable references from zustand, safe to destructure
 */
export const useChatActions = () => {
  const openChat = useChatStore((state) => state.openChat);
  const openChatWithMessage = useChatStore(
    (state) => state.openChatWithMessage,
  );
  const closeChat = useChatStore((state) => state.closeChat);
  const toggleChat = useChatStore((state) => state.toggleChat);
  const clearPendingMessage = useChatStore(
    (state) => state.clearPendingMessage,
  );

  return {
    openChat,
    openChatWithMessage,
    closeChat,
    toggleChat,
    clearPendingMessage,
  };
};
