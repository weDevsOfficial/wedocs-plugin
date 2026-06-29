import { __ } from '@wordpress/i18n';

/**
 * A single stat card: icon + label + big value + optional helper line.
 */
const StatCard = ( { icon: Icon, label, value, helper, accent = 'indigo' } ) => {
  const accents = {
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    sky: 'bg-sky-50 text-sky-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="flex items-center gap-4 bg-white p-6 shadow transition hover:shadow-md sm:rounded-md">
      <span
        className={ `flex h-12 w-12 shrink-0 items-center justify-center rounded-md ${ accents[ accent ] || accents.indigo }` }
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          { label }
        </p>
        <p className="mt-0.5 text-2xl font-bold leading-tight text-gray-900">
          { value }
        </p>
        { helper && (
          <p className="mt-0.5 truncate text-xs text-gray-400">{ helper }</p>
        ) }
      </div>
    </div>
  );
};

export default StatCard;
