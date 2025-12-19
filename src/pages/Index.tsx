import { useEffect, useRef } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { useChat } from "@/hooks/useChat";

const Index = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4">
          <img
            src="/logo.png"
            alt="Josh IA Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <h1 className="text-lg font-semibold text-foreground">Josh IA</h1>
            <p className="text-sm text-muted-foreground">Siempre listo para ayudarte</p>
          </div>
        </div>
      </header>

      {/* Messages area */}
      <main className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="mx-auto max-w-3xl px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <img
                src="/logo.png"
                alt="Josh IA Logo"
                className="h-16 w-16 rounded-full object-cover mb-4"
              />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                ¡Hola! Soy Josh IA
              </h2>
              <p className="text-muted-foreground max-w-md">
                Escribe un mensaje para comenzar la conversación. Estoy aquí para ayudarte con lo que necesites.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input area */}
      <footer className="sticky bottom-0 border-t border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
      </footer>
    </div>
  );
};

export default Index;
