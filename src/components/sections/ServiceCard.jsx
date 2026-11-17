import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { images } from '../../data/images';
import Icon from '../ui/Icon';
import SmartImage from '../ui/SmartImage';

/** Whole card is one link; heading level is configurable to fit the page outline. */
export default function ServiceCard({ service, headingAs: Heading = 'h3' }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy-100/80 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lift"
    >
      <div className="relative">
        <SmartImage
          image={images[service.image]}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
          className="aspect-[16/10]"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-teal-600 shadow-soft ring-4 ring-white transition-colors duration-300 group-hover:bg-teal-600 group-hover:text-white">
          <Icon name={service.icon} className="h-6 w-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col px-6 pb-6 pt-10">
        <Heading className="text-xl leading-snug">{service.title}</Heading>
        <p className="mt-2.5 flex-1 text-[15px] text-navy-900/65">{service.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-teal-700">
          Learn more
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
