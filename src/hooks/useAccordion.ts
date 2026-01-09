'use client';

import { useState, useCallback } from 'react';

export function useAccordion(initialIndex: number | null = null) {
  const [openIndex, setOpenIndex] = useState<number | null>(initialIndex);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  const isOpen = useCallback((index: number) => openIndex === index, [openIndex]);

  return { openIndex, toggle, isOpen };
}
