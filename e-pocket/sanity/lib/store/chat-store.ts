import { createStore } from 'zustand/vanilla';

// Types
export interface ChatState {
  isOpen: boolean;
  pendingMessage: string | null;
}

// * Chat Store Actions
export interface ChatActions {
  openChat: () => void;
  openChatWithMessage: (message: string) => void;
  closeChat: () => void;
  toggleChat: () => void;
  clearPendingMessage: () => void;
}

export type ChatStore = ChatState & ChatActions;

// * Initial State
export const initialChatState: ChatState = {
  isOpen: false,
  pendingMessage: null,
};

/**
 * TODO: Create the Chat Store factory = Creates new store instance pre provides
 * Chat store factory - creates new store instance per provider
 * Simple store for managing chat sheet visibility
 * No persistence needed - chat should start closed on page load
 */

export const createChatStore = (initialState: ChatState = initialChatState) =>
  createStore<ChatStore>()((set) => ({
    ...initialState,
    openChat: () => set({ isOpen: true }),
    openChatWithMessage: (message: string) =>
      set({ isOpen: true, pendingMessage: message }),
    closeChat: () => set({ isOpen: false }),
    toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
    clearPendingMessage: () => set({ pendingMessage: null }),
  }));
