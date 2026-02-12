import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

import type { DateRange } from '../../utils/dateRange';

type Props = {
  open: boolean;
  initialRange?: DateRange;
  onClose: () => void;
  onConfirm: (range: { start: string; end: string }) => void;
};

const DateRangePickerBottomSheet = ({
  open,
  initialRange,
  onClose,
  onConfirm,
}: Props) => {
  const [draftStart, setDraftStart] = useState<string | undefined>(
    () => initialRange?.start,
  );
  const [draftEnd, setDraftEnd] = useState<string | undefined>(
    () => initialRange?.end,
  );
  const [cursor, setCursor] = useState<Date>(() => {
    const base = initialRange?.start
      ? new Date(initialRange.start)
      : new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const [isYMOpen, setIsYMOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const monthLabel = useMemo(() => `${year}년 ${month + 1}월`, [year, month]);

  const grid = useMemo(() => {
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);

    const firstDow = first.getDay();
    const totalDays = last.getDate();

    const cells: Array<{ date: Date; inMonth: boolean }> = [];

    if (firstDow > 0) {
      const prevLast = new Date(year, month, 0);
      const prevTotal = prevLast.getDate();
      for (let i = firstDow - 1; i >= 0; i -= 1) {
        cells.push({
          date: new Date(year, month - 1, prevTotal - i),
          inMonth: false,
        });
      }
    }

    for (let d = 1; d <= totalDays; d += 1) {
      cells.push({ date: new Date(year, month, d), inMonth: true });
    }

    while (cells.length % 7 !== 0) {
      const nextDay =
        cells.length - (firstDow > 0 ? firstDow : 0) - totalDays + 1;
      cells.push({ date: new Date(year, month + 1, nextDay), inMonth: false });
    }

    while (cells.length < 42) {
      const lastCell = cells[cells.length - 1].date;
      const d = new Date(lastCell);
      d.setDate(d.getDate() + 1);
      cells.push({ date: d, inMonth: false });
    }

    return cells;
  }, [year, month]);

  const toISO = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const toLabel = (iso: string) => iso.replaceAll('-', '/');

  const startMs = draftStart ? new Date(draftStart).getTime() : undefined;
  const endMs = draftEnd ? new Date(draftEnd).getTime() : undefined;

  const isSameDay = (a?: string, b?: string) => Boolean(a && b && a === b);

  const isBetweenOnly = (iso: string) => {
    if (!draftStart || !draftEnd) return false;
    const t = new Date(iso).getTime();
    return t > (startMs ?? 0) && t < (endMs ?? 0);
  };

  const handlePick = (iso: string) => {
    if (!draftStart || (draftStart && draftEnd)) {
      setDraftStart(iso);
      setDraftEnd(undefined);
      return;
    }

    const s = new Date(draftStart).getTime();
    const t = new Date(iso).getTime();

    if (t < s) {
      setDraftStart(iso);
      setDraftEnd(draftStart);
    } else {
      setDraftEnd(iso);
    }
  };

  const canConfirm = Boolean(draftStart && draftEnd);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center">
      <div className="relative w-full max-w-[430px] h-full">
        <button
          type="button"
          aria-label="close"
          onClick={onClose}
          className="absolute inset-0 bg-black/50"
        />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px]">
          <div className="w-full rounded-t-[2.0rem] bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.18)]">
            <div className="px-[2.0rem] pt-[1.6rem] pb-[1.2rem]">
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-[0.8rem] cursor-pointer"
                  onClick={() => setIsYMOpen(true)}
                >
                  <span className="text-[1.6rem] font-semibold text-[#222222]">
                    {monthLabel}
                  </span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="#6B7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="flex items-center gap-[0.6rem]">
                  <button
                    type="button"
                    onClick={() =>
                      setCursor(
                        (prev) =>
                          new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
                      )
                    }
                    className="h-[3.2rem] w-[3.2rem] flex items-center justify-center rounded-full"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 18l-6-6 6-6"
                        stroke="#6B7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCursor(
                        (prev) =>
                          new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
                      )
                    }
                    className="h-[3.2rem] w-[3.2rem] flex items-center justify-center rounded-full"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="#6B7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-[1.4rem] grid grid-cols-7 text-center text-[1.2rem] font-semibold text-[#9AA3B2]">
                {['일', '월', '화', '수', '목', '금', '토'].map((w) => (
                  <div key={w} className="py-[0.6rem]">
                    {w}
                  </div>
                ))}
              </div>

              <div className="mt-[0.2rem] grid grid-cols-7 text-center">
                {grid.map(({ date, inMonth }, idx) => {
                  const iso = toISO(date);
                  const isStart = isSameDay(iso, draftStart);
                  const isEnd = isSameDay(iso, draftEnd);
                  const betweenOnly = isBetweenOnly(iso);

                  return (
                    <button
                      key={`${iso}-${idx}`}
                      type="button"
                      onClick={() => handlePick(iso)}
                      className={clsx(
                        'relative h-[3.8rem] flex items-center justify-center text-[1.3rem] font-semibold',
                        inMonth ? 'text-[#1F2937]' : 'text-[#C7CDD8]',
                      )}
                    >
                      {betweenOnly && (
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[3.2rem] bg-[#E8E3FF]" />
                      )}
                      {(isStart || isEnd) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-[3.2rem] w-[3.2rem] rounded-[1.0rem] bg-[#7F68FF]" />
                        </div>
                      )}
                      <span
                        className={clsx(
                          'relative z-[1]',
                          (isStart || isEnd) && 'text-white',
                        )}
                      >
                        {date.getDate()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="px-[2.0rem] pb-[1.6rem]">
              <button
                type="button"
                disabled={!canConfirm}
                onClick={() => {
                  if (!draftStart || !draftEnd) return;
                  onConfirm({ start: draftStart, end: draftEnd });
                }}
                className={clsx(
                  'w-full h-[4.6rem] rounded-[1.2rem] flex items-center justify-center',
                  canConfirm ? 'bg-[#7F68FF]' : 'bg-[#E7EBF3]',
                )}
              >
                <span
                  className={clsx(
                    'text-[1.4rem] font-semibold',
                    canConfirm ? 'text-white' : 'text-[#9AA3B2]',
                  )}
                >
                  {canConfirm
                    ? `${toLabel(draftStart!)} → ${toLabel(draftEnd!)}`
                    : '기간을 선택해주세요'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {isYMOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-[1.6rem] p-[2rem] w-[260px]">
              <div className="flex gap-2 mb-4">
                <select
                  value={year}
                  onChange={(e) =>
                    setCursor(new Date(Number(e.target.value), month, 1))
                  }
                  className="flex-1 border rounded-lg px-2 py-2"
                >
                  {Array.from({ length: 15 }).map((_, i) => {
                    const y = year - 7 + i;
                    return <option key={y}>{y}</option>;
                  })}
                </select>

                <select
                  value={month}
                  onChange={(e) =>
                    setCursor(new Date(year, Number(e.target.value), 1))
                  }
                  className="flex-1 border rounded-lg px-2 py-2"
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i} value={i}>
                      {i + 1}월
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setIsYMOpen(false)}
                className="w-full h-[40px] rounded-[12px] bg-[#7F68FF] text-white font-semibold"
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangePickerBottomSheet;
