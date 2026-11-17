import { motion } from 'framer-motion';
import { getWhatsAppLink } from '../../utils/whatsapp';
import WhatsAppIcon from '../ui/WhatsAppIcon';

/** Floating WhatsApp booking button, rendered once in the root layout so it appears on every page. */
export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book a home physiotherapy session on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
      className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-2 rounded-full bg-whatsapp p-3.5 text-whatsapp-ink shadow-lift transition-colors hover:bg-[#2fe072] focus-visible:ring-2 focus-visible:ring-whatsapp-dark focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:p-4"
    >
      <span
        className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-whatsapp motion-reduce:hidden"
        aria-hidden="true"
      />
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-[160px] group-hover:pr-1 group-focus-visible:max-w-[160px] group-focus-visible:pr-1 md:inline">
        Book on WhatsApp
      </span>
    </motion.a>
  );
}
