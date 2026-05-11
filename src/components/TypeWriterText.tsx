import { useEffect, useState } from "react";

type Props = {
  text: string;
  speed?: number;
};

export default function TypewriterText({ text, speed = 20 }: Props) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className="cursor" {...({} as any)}>{displayed}</span>;
}
