/**
 * A single stat card: icon + label + big value + optional helper line.
 */
const StatCard = ( { icon: Icon, label, value, helper } ) => {
  return (
    <div className="flex items-center gap-4 bg-white p-6 shadow transition hover:shadow-md sm:rounded-md">
      { /* The icon pill uses the plugin's indigo accent; the icon itself is
           what tells the cards apart, not four separate hues. */ }
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
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
