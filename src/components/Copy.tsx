import { useState } from "react";
import { Button } from "./button";

interface CopyProps {
  text: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Copy({ text, children, className = "" }: CopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      className={`w-24 ${className}`}
      variant="alternative"
      onClick={handleCopy}
    >
      {children || (copied ? "Copied!" : "Copy")}
    </Button>
  );
}
