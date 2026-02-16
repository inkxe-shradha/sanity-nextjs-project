import CartSheet from '@/components/project-level/CartSheet';
import ChatSheet from '@/components/project-level/ChatSheet';
import { DisableDraftMode } from '@/components/project-level/DisableDraftMode';
import Header from '@/components/project-level/Header';
import { SanityLive } from '@/sanity/lib/live';
import { CartStoreProvider } from '@/sanity/lib/store/providers/cart-provider';
import { ChatStoreProvider } from '@/sanity/lib/store/providers/chat-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { VisualEditing } from 'next-sanity/visual-editing';
import { draftMode } from 'next/headers';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <CartStoreProvider>
        <ChatStoreProvider>
          <Header />
          <main>
            {children}
            {(await draftMode()).isEnabled && (
              <>
                <VisualEditing />
                <DisableDraftMode />
              </>
            )}
            <SanityLive />
          </main>
          <CartSheet />
          <ChatSheet />
        </ChatStoreProvider>
      </CartStoreProvider>
    </ClerkProvider>
  );
};

export default Layout;
