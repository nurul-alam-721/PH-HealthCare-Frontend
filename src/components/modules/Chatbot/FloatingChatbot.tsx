"use client";

import { useState, useEffect, useRef } from "react";
import { queryRagAction, ingestDoctorsAction, getUserRoleAction } from "@/app/_actions/rag.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, MessageCircle, MessageSquare, Send, X, Zap } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  sources?: string;
}

interface SampleQuery {
  label: string;
  query: string;
}

const SAMPLE_QUERIES: SampleQuery[] = [
  { label: "Neurology specialists in Dhaka", query: "Show me neurology specialists in Dhaka" },
  { label: "Cardiologists near me", query: "Find cardiologists available for consultation" },
  { label: "Emergency care", query: "Which doctors are available for emergency care?" },
];

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoadingRole, setIsLoadingRole] = useState(true);
  const [isSyncingDoctors, setIsSyncingDoctors] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch user role on mount
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await getUserRoleAction();
        setUserRole(role);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      } finally {
        setIsLoadingRole(false);
      }
    };

    fetchUserRole();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [messages.length]);

  // Initialize with greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          type: "system",
          content: "👋 Welcome! I'm your AI Healthcare Assistant. I can help you find doctors, get medical information, and answer your healthcare questions. Try one of the sample queries below or ask me anything!",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();

    if (!textToSend) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await queryRagAction(textToSend);

      if (response.success) {
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          type: "assistant",
          content: response.answer || "No answer received",
          timestamp: new Date(),
          sources: response.sources,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          type: "assistant",
          content: response.message || response.error || "Sorry, I couldn't process your request. Please try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: "assistant",
        content: "An error occurred while processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncDoctors = async () => {
    setIsSyncingDoctors(true);
    try {
      const response = await ingestDoctorsAction();

      if (response.success) {
        toast.success(`${response.message}`, {
          description: `${response.indexedCount} doctors indexed successfully.`,
        });

        const systemMessage: Message = {
          id: `sync-${Date.now()}`,
          type: "system",
          content: `✅ Doctors database synced successfully! ${response.indexedCount} doctors have been indexed and are now searchable.`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, systemMessage]);
      } else {
        toast.error("Sync Failed", {
          description: response.message || "Failed to sync doctors data",
        });
      }
    } catch (error) {
      console.error("Sync error:", error);
      toast.error("Error", {
        description: "An error occurred while syncing doctors data",
      });
    } finally {
      setIsSyncingDoctors(false);
    }
  };

  const isAdmin = userRole === "ADMIN" || userRole === "SUPER_ADMIN";

  return (
    <>
      {/* Floating Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            "fixed bottom-6 right-6 z-40",
            "w-14 h-14 rounded-full",
            "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
            "text-white shadow-lg hover:shadow-xl",
            "flex items-center justify-center",
            "transition-all duration-300 transform hover:scale-110",
            "focus:outline-none focus:ring-2 focus:ring-blue-300"
          )}
          aria-label="Open chat"
          title="Chat with AI Assistant"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-6 right-6 z-50",
            "w-96 h-[600px]",
            "bg-white dark:bg-slate-950 rounded-2xl shadow-2xl",
            "flex flex-col",
            "border border-gray-200 dark:border-slate-800",
            "overflow-hidden",
            "animate-in fade-in slide-in-from-bottom-4 duration-300"
          )}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white px-4 py-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <h2 className="font-semibold text-lg">Healthcare Assistant</h2>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setMessages([]);
              }}
              className="p-1 hover:bg-blue-700 rounded-full transition-colors"
              aria-label="Close chat"
              title="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4 pr-2">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Start a conversation
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.type === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-xs px-4 py-3 rounded-xl text-sm leading-relaxed",
                        message.type === "user"
                          ? "bg-blue-500 text-white rounded-br-none"
                          : message.type === "system"
                            ? "bg-amber-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200 border border-amber-200 dark:border-slate-700 rounded-bl-none"
                            : "bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-bl-none"
                      )}
                    >
                      {message.type === "assistant" && (
                        <div className="prose prose-sm dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: message.content
                              .split('\n')
                              .map(line => {
                                // Bold text with **
                                line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                                return line;
                              })
                              .join('<br />')
                          }}
                        />
                      )}
                      {message.type !== "assistant" && message.content}
                      {message.sources && (
                        <div className="text-xs mt-2 opacity-75 border-t border-current pt-2">
                          📊 Confidence: {message.sources}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
              
              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-xs px-4 py-3 rounded-xl bg-gray-100 dark:bg-slate-800 rounded-bl-none">
                    <div className="flex gap-2 items-center h-6">
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={scrollRef} />
            </div>
          </div>

          {/* Sample Queries - Show only when no messages or just greeting */}
          {messages.length <= 1 && (
            <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                Try asking:
              </p>
              <div className="grid grid-cols-1 gap-2">
                {SAMPLE_QUERIES.map((query) => (
                  <button
                    key={query.query}
                    onClick={() => handleSendMessage(query.query)}
                    disabled={isLoading}
                    className="text-left text-xs px-3 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {query.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Admin Sync Doctors Button - Only for Admin/SuperAdmin */}
          {isLoadingRole ? (
            <div className="px-4 py-2 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : (
            isAdmin && (
              <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-700 bg-amber-50 dark:bg-slate-900/50">
                <button
                  onClick={handleSyncDoctors}
                  disabled={isSyncingDoctors || isLoading}
                  className={cn(
                    "w-full py-2 px-3 rounded-lg text-xs font-medium",
                    "flex items-center justify-center gap-2",
                    "bg-amber-500 hover:bg-amber-600 text-white",
                    "transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                    "focus:outline-none focus:ring-2 focus:ring-amber-300"
                  )}
                  title="Sync doctors data to AI knowledge base"
                >
                  {isSyncingDoctors ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Sync Doctors Data
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  ⚡ Admin only: Update the AI's knowledge base with latest doctors information
                </p>
              </div>
            )
          )}

          {/* Input Area */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !isLoading) {
                    handleSendMessage();
                  }
                }}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="text-sm"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputValue.trim()}
                size="sm"
                className="px-3"
                title="Send message"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
