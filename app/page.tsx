"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header with Logo */}
      <Card className="rounded-none border-b justify-between">
        <CardContent className="p-4">
          <h1 className="text-2xl font-bold text-center font-mono tracking-wider">
            BATTER-WAY
          </h1>
          <p className="text-center text-sm text-muted-foreground mt-1">
            Your sustainable living companion
          </p>
        </CardContent>
        <div></div>
      </Card>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center mt-8">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-2">
                  Welcome to Batter-Way! 🌱
                </h2>
                <p className="text-sm text-muted-foreground">
                  I'm here to help you make sustainable purchasing decisions,
                  reduce waste, and find creative ways to recycle or repurpose
                  items. Ask me anything about eco-friendly living!
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <Card
              className={`max-w-xs lg:max-w-md ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
            >
              <CardContent className="p-3">
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <div
                          key={`${message.id}-${i}`}
                          className="whitespace-pre-wrap text-sm"
                        >
                          {part.text}
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </CardContent>
            </Card>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <Card className="max-w-xs lg:max-w-md">
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Thinking...
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <Card className="rounded-none border-none">
        <CardContent className="p-4">
          <form
            onSubmit={handleSubmit}
            className="flex space-x-2 max-w-4xl mx-auto px-4"
          >
            <Input
              className="flex-1 text-lg h-12"
              value={input}
              placeholder="Ask me about sustainable living..."
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="lg"
              className="px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
