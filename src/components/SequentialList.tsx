import { useEffect, useState } from "react";

type Props = {
  items: string[];
  delay?: number;
};

export default function SequentialList({ items, delay = 500 }: Props) {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  useEffect(() => {
    setVisibleItems([]);

    items.forEach((item, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, item]);
      }, index * delay);
    });
  }, [items, delay]);

  return (
    <ul>
      {visibleItems.map((item, i) => (
        <li key={i} className="fade-in" {...({} as any)}>
          {item}
        </li>
      ))}
    </ul>
  );
}
