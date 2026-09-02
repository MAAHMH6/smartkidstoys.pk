import React from 'react';
import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ quantity, onChange, min = 1, max = 99 }) {
  const handleDecrement = (e) => {
    e.stopPropagation();
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="quantity-control">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="qty-btn"
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <input
        type="text"
        readOnly
        value={quantity}
        className="qty-display"
        aria-label="Quantity"
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="qty-btn"
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
