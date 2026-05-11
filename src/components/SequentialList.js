import { useEffect, useState } from "react";
export default function SequentialList({ items, delay = 500 }) {
    const [visibleItems, setVisibleItems] = useState([]);
    useEffect(() => {
        setVisibleItems([]);
        items.forEach((item, index) => {
            setTimeout(() => {
                setVisibleItems((prev) => [...prev, item]);
            }, index * delay);
        });
    }, [items, delay]);
    return (<ul>
      {visibleItems.map((item, i) => (<li key={i} className="fade-in">
          {item}
        </li>))}
    </ul>);
}
