import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '../../utils/cn';

/** Accessible accordion: buttons with aria-expanded controlling labelled regions. */
export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div className="divide-y divide-navy-100 rounded-3xl border border-navy-100 bg-white shadow-soft">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.q}>
            <h3 className="text-base font-semibold sm:text-[17px]">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 rounded-3xl px-5 py-5 text-left text-navy-900 transition-colors hover:text-teal-700 sm:px-7"
              >
                <span>{item.q}</span>
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                    isOpen ? 'rotate-45 border-teal-500 bg-teal-500 text-white' : 'border-navy-200 text-navy-600',
                  )}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 pr-14 text-navy-900/70 sm:px-7">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
