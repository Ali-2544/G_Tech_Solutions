import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm GTech Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    "Tell me about your services",
    "What are your pricing plans?",
    "How can I contact you?",
    "Do you offer support?"
  ];

  const botResponses = {
    "tell me about your services": "We offer comprehensive IT solutions including web development, cloud services, cybersecurity, mobile app development, data analytics, and IT consultancy. Would you like to know more about any specific service?",
    
    "what are your pricing plans": "Our pricing varies based on project scope and requirements. Web development starts from $5,000, cloud solutions from $3,000, and cybersecurity from $4,000. Would you like a detailed quote for your project?",
    
    "how can i contact you": "You can reach us at hello@gtechsolutions.com or call +1 (555) 123-4567. You can also fill out our contact form on this website. We typically respond within 24 hours!",
    
    "do you offer support": "Yes! We provide 24/7 support for all our clients. Our support includes system monitoring, maintenance, troubleshooting, and technical assistance. Premium support packages are also available.",
    
    "default": "Thanks for your question! For detailed information about our services and solutions, I'd recommend speaking with one of our experts. You can contact us through the contact form or call us directly. Is there anything specific I can help you with?"
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const lowerInput = inputMessage.toLowerCase();
      let botResponse = botResponses.default;

      for (const [key, response] of Object.entries(botResponses)) {
        if (key !== "default" && lowerInput.includes(key)) {
          botResponse = response;
          break;
        }
      }

      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-primary shadow-elegant hover:shadow-glow z-50 group"
            size="icon"
          >
            <MessageCircle className="w-6 h-6 text-primary-foreground group-hover:scale-110 transition-transform" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md h-[600px] flex flex-col p-0">
          <DialogHeader className="gradient-primary p-4 text-primary-foreground">
            <DialogTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span>GTech Assistant</span>
            </DialogTitle>
            <p className="text-primary-foreground/80 text-sm">
              Online • Typically replies instantly
            </p>
          </DialogHeader>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {message.sender === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  
                  <div className={`px-3 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === "user" 
                        ? "text-primary-foreground/70" 
                        : "text-muted-foreground"
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-3 py-2 bg-muted rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs hover:border-primary hover:text-primary"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                variant="cta"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Chatbot;