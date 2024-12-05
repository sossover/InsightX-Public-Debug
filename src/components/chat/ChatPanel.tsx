import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Send, Bot } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-analyst', {
        body: { message: input, messages: messages }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`fixed right-0 top-1/2 -translate-y-1/2 h-[80vh] bg-white border-l border-gray-200 shadow-lg transition-all duration-300 ease-in-out transform ${
        isOpen ? 'w-[400px] translate-x-0' : 'w-[40px] translate-x-[calc(100%-40px)]'
      } dark:bg-custom-purple-600 dark:border-custom-purple-400 rounded-l-xl`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white border shadow-sm dark:bg-custom-purple-600 dark:border-custom-purple-400 rounded-full hover:scale-110 transition-transform duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      {isOpen && (
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-2 mb-6 p-3 bg-gradient-to-r from-custom-purple-300 to-google-blue rounded-lg text-white">
            <Bot className="h-6 w-6" />
            <div>
              <h2 className="text-lg font-semibold">Marketing Analyst</h2>
              <p className="text-sm opacity-90">AI-powered insights at your service</p>
            </div>
          </div>

          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg animate-fade-in ${
                    message.role === 'user'
                      ? 'bg-custom-purple-50 ml-8 shadow-sm'
                      : 'bg-gradient-to-r from-custom-purple-100 to-blue-50 mr-8 shadow-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-center text-gray-500 py-8 animate-pulse">
                  Ask me anything about your marketing data!
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your marketing data..."
                disabled={isLoading}
                className="pr-12 bg-gray-50 border-custom-purple-200 focus:border-custom-purple-300 transition-colors duration-200"
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={isLoading}
                className="absolute right-1 top-1 h-8 w-8 bg-custom-purple-300 hover:bg-custom-purple-400 transition-colors duration-200"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}