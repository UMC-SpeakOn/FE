import { useMemo, useRef } from 'react';

import { LOCK, SWIPE } from '../constants/gesture';
import type { InsightTab } from '../types/myreport.type';

export const useSwipe = (
  tabs: InsightTab[],
  activeTab: InsightTab,
  setActiveTab: (tab: InsightTab) => void,
) => {
  const startX = useRef(0);
  const startY = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);

  const axis = useRef<'x' | 'y' | null>(null);

  const activeIndex = useMemo(() => {
    const idx = tabs.findIndex((t) => t === activeTab);
    return idx < 0 ? 0 : idx;
  }, [tabs, activeTab]);

  const moveTo = (index: number) => {
    if (index < 0 || index >= tabs.length) return;
    setActiveTab(tabs[index]);
  };

  const onSwipeStart = (e: React.PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
    lastX.current = e.clientX;
    lastY.current = e.clientY;
    axis.current = null;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onSwipeMove = (e: React.PointerEvent<HTMLDivElement>) => {
    lastX.current = e.clientX;
    lastY.current = e.clientY;

    if (!axis.current) {
      const dx = lastX.current - startX.current;
      const dy = lastY.current - startY.current;

      if (Math.abs(dx) < LOCK && Math.abs(dy) < LOCK) return;

      axis.current = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    }

    if (axis.current === 'y') return;
  };

  const onSwipeEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (axis.current !== 'x') return;

    const dx = lastX.current - startX.current;

    if (dx > SWIPE) moveTo(activeIndex - 1);
    if (dx < -SWIPE) moveTo(activeIndex + 1);
  };

  return {
    onSwipeStart,
    onSwipeMove,
    onSwipeEnd,
  };
};
