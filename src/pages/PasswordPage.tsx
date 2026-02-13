import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === "cafe") {
      navigate("/memories");
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className={`w-full max-w-sm flex flex-col items-center gap-6 ${shaking ? "animate-shake" : ""}`}>
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card shadow-lg">
          <Lock className="h-10 w-10 text-primary" />
        </div>

        <h1 className="font-display text-3xl font-bold text-foreground text-center">
          Yayyyy, I know you will say YES... 💕
        </h1>

        <p className="text-muted-foreground text-center font-body">
          Enter the secret password to unlock our memories
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            className="text-center text-lg py-6 rounded-full border-2 border-primary/30 bg-card focus:border-primary font-body"
            autoFocus
          />

          <Button
            type="submit"
            className="w-full py-6 text-lg font-display rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-primary text-primary-foreground"
            size="lg"
          >
            Unlock 🔓
          </Button>
        </form>

        {error && (
          <p className="text-accent font-body text-sm animate-fade-in">
            Try again, A Chit Sone Lay
          </p>
        )}

        <div className="flex items-center gap-2 mt-2 text-muted-foreground">
          <Heart className="h-4 w-4 text-accent" fill="hsl(350, 40%, 80%)" />
          <p className="text-sm font-body italic">Hint: Place of our first date 💕</p>
          <Heart className="h-4 w-4 text-accent" fill="hsl(350, 40%, 80%)" />
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;
