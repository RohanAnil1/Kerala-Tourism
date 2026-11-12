'use client';

import { useEffect, useRef, type ReactNode, type KeyboardEventHandler } from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, className = '', onKeyDown }: { open: boolean; onClose: () => void; title: string; children: ReactNode; className?: string; onKeyDown?: KeyboardEventHandler<HTMLDialogElement> }) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    returnFocus.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; returnFocus.current?.focus(); };
  }, [open]);
  return <dialog ref={ref} className={`editorial-modal ${className}`} aria-label={title} onKeyDown={onKeyDown} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="modal-content"><div className="modal-top"><span className="eyebrow">{title}</span><button type="button" className="icon-button" aria-label={`Close ${title}`} onClick={onClose}><X size={22}/></button></div>{children}</div>
  </dialog>;
}
