import React, { useState } from "react";
import { Button } from "../ui/button";
import { Copy, Check } from "lucide-react";

type CopyCheckButtonProps = {
  copyToClipboard: () => void;
};

const CopyCheckButton = ({ copyToClipboard }: CopyCheckButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard();
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Button
      className="self-start"
      onClick={handleCopy}
      size={"sm"}
      variant={"ghost"}>
      {isCopied ? <Check size={10} /> : <Copy size={10} />}
    </Button>
  );
};

export default CopyCheckButton;
