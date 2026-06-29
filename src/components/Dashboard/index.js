import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import {
  DocumentTextIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  HandThumbUpIcon,
  ArrowTopRightOnSquareIcon,
  PencilSquareIcon,
  FireIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import StatCard from './StatCard';
import ProAnalytics from './ProAnalytics';

const STATUS_BADGE = {
  publish: 'bg-emerald-50 text-emerald-700',
  draft: 'bg-gray-100 text-gray-600',
  pending: 'bg-amber-50 text-amber-700',
  private: 'bg-sky-50 text-sky-700',
};

const numberFormat = ( n ) => new Intl.NumberFormat().format( n || 0 );

/**
 * Card shell matching the weDocs settings panels:
 * `shadow sm:rounded-md` surface, `section-heading px-8 py-4` header with an
 * `text-lg font-medium` title, divided by an hr.
 */
const Card = ( { title, icon: Icon, children, action } ) => (
  <div className="bg-white shadow sm:rounded-md">
    <div className="section-heading flex items-center justify-between px-8 py-4">
      <h2 className="flex items-center gap-2 text-lg font-medium text-gray-900">
        { Icon && <Icon className="h-5 w-5 text-indigo-600" aria-hidden="true" /> }
        { title }
      </h2>
      { action }
    </div>
    <hr className="h-px border-0 !bg-gray-200" />
    { children }
  </div>
);

const EmptyRow = ( { children } ) => (
  <div className="px-8 py-10 text-center text-sm text-[#6B7280]">{ children }</div>
);

const Dashboard = () => {
  const [ stats, setStats ] = useState( null );
  const [ loading, setLoading ] = useState( true );
  const [ error, setError ] = useState( '' );

  useEffect( () => {
    let mounted = true;
    wp.apiFetch( { path: '/wp/v2/docs/dashboard-stats' } )
      .then( ( res ) => {
        if ( mounted ) {
          setStats( res );
          setLoading( false );
        }
      } )
      .catch( () => {
        if ( mounted ) {
          setError( __( 'Could not load dashboard data.', 'wedocs' ) );
          setLoading( false );
        }
      } );
    return () => {
      mounted = false;
    };
  }, [] );

  if ( loading ) {
    return (
      <div className="min-h-full pt-7">
        <div className="grid gap-6 pt-3 sm:grid-cols-2 lg:grid-cols-4">
          { [ 0, 1, 2, 3 ].map( ( i ) => (
            <div
              key={ i }
              className="h-24 animate-pulse rounded-md bg-white shadow"
            />
          ) ) }
        </div>
      </div>
    );
  }

  if ( error || ! stats ) {
    return (
      <div className="min-h-full pt-7">
        <div className="rounded-md bg-white p-8 text-sm text-red-600 shadow">
          { error || __( 'No data available.', 'wedocs' ) }
        </div>
      </div>
    );
  }

  const t = stats.totals;

  return (
    <div className="wedocs-dashboard min-h-full pt-7">
      <div className="space-y-6 pb-10 pt-3">
        {/* Header */}
        <h1 className="flex items-center text-xl font-medium text-[#111827]">
          { __( 'Dashboard', 'wedocs' ) }
        </h1>

        {/* Stat cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={ DocumentTextIcon }
            label={ __( 'Total Docs', 'wedocs' ) }
            value={ numberFormat( t.docs ) }
            helper={ `${ numberFormat( t.published ) } ${ __( 'published', 'wedocs' ) }${ t.drafts ? ` · ${ numberFormat( t.drafts ) } ${ __( 'draft', 'wedocs' ) }` : '' }` }
            accent="indigo"
          />
          <StatCard
            icon={ DocumentDuplicateIcon }
            label={ __( 'Articles', 'wedocs' ) }
            value={ numberFormat( t.articles ) }
            helper={ `${ numberFormat( t.contributors ) } ${ __( 'contributor(s)', 'wedocs' ) }` }
            accent="sky"
          />
          <StatCard
            icon={ EyeIcon }
            label={ __( 'Total Views', 'wedocs' ) }
            value={ numberFormat( t.views ) }
            helper={ __( 'across all docs', 'wedocs' ) }
            accent="emerald"
          />
          <StatCard
            icon={ HandThumbUpIcon }
            label={ __( 'Helpful Rate', 'wedocs' ) }
            value={ `${ t.helpful_rate }%` }
            helper={ `${ numberFormat( t.positive ) } ${ __( 'up', 'wedocs' ) } · ${ numberFormat( t.negative ) } ${ __( 'down', 'wedocs' ) }` }
            accent="amber"
          />
        </div>

        {/* Popular + Most helpful */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title={ __( 'Popular Docs', 'wedocs' ) } icon={ FireIcon }>
            { stats.popular.length ? (
              <ul className="divide-y divide-gray-100">
                { stats.popular.map( ( doc ) => (
                  <li
                    key={ doc.id }
                    className="flex items-center justify-between gap-3 px-8 py-3.5"
                  >
                    <a
                      href={ doc.edit }
                      className="truncate text-sm font-medium text-gray-700 no-underline hover:text-indigo-600"
                    >
                      { doc.title }
                    </a>
                    <span className="flex shrink-0 items-center gap-1 text-sm text-[#6B7280]">
                      <EyeIcon className="h-4 w-4" aria-hidden="true" />
                      { numberFormat( doc.views ) }
                    </span>
                  </li>
                ) ) }
              </ul>
            ) : (
              <EmptyRow>
                { __( 'No views recorded yet — they appear as visitors read your docs.', 'wedocs' ) }
              </EmptyRow>
            ) }
          </Card>

          <Card title={ __( 'Most Helpful Docs', 'wedocs' ) } icon={ HandThumbUpIcon }>
            { stats.most_helpful.length ? (
              <ul className="divide-y divide-gray-100">
                { stats.most_helpful.map( ( doc ) => (
                  <li key={ doc.id } className="px-8 py-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <a
                        href={ doc.edit }
                        className="truncate text-sm font-medium text-gray-700 no-underline hover:text-indigo-600"
                      >
                        { doc.title }
                      </a>
                      <span className="shrink-0 text-sm font-semibold text-gray-700">
                        { doc.percentage }%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={ { width: `${ doc.percentage }%` } }
                      />
                    </div>
                  </li>
                ) ) }
              </ul>
            ) : (
              <EmptyRow>{ __( 'No helpful votes yet.', 'wedocs' ) }</EmptyRow>
            ) }
          </Card>
        </div>

        {/* Recent docs */}
        <Card title={ __( 'Recently Updated', 'wedocs' ) } icon={ ClockIcon }>
          { stats.recent.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-[#6B7280]">
                    <th className="px-8 py-3 font-medium">{ __( 'Title', 'wedocs' ) }</th>
                    <th className="px-4 py-3 font-medium">{ __( 'Status', 'wedocs' ) }</th>
                    <th className="px-4 py-3 font-medium">{ __( 'Views', 'wedocs' ) }</th>
                    <th className="px-4 py-3 font-medium">{ __( 'Updated', 'wedocs' ) }</th>
                    <th className="px-8 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  { stats.recent.map( ( doc ) => (
                    <tr key={ doc.id } className="hover:bg-gray-50">
                      <td className="max-w-xs truncate px-8 py-3.5 font-medium text-gray-700">
                        { doc.title }
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={ `rounded-full px-2 py-0.5 text-xs font-medium ${ STATUS_BADGE[ doc.status ] || STATUS_BADGE.draft }` }
                        >
                          { doc.status }
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-[#6B7280]">{ numberFormat( doc.views ) }</td>
                      <td className="px-4 py-3.5 text-[#6B7280]">{ doc.modified }</td>
                      <td className="px-8 py-3.5 text-right">
                        <span className="inline-flex items-center gap-2">
                          <a
                            href={ doc.edit }
                            title={ __( 'Edit', 'wedocs' ) }
                            className="text-gray-400 hover:text-indigo-600"
                          >
                            <PencilSquareIcon className="h-4 w-4" aria-hidden="true" />
                          </a>
                          <a
                            href={ doc.link }
                            target="_blank"
                            rel="noreferrer"
                            title={ __( 'View', 'wedocs' ) }
                            className="text-gray-400 hover:text-indigo-600"
                          >
                            <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                          </a>
                        </span>
                      </td>
                    </tr>
                  ) ) }
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyRow>{ __( 'No docs yet.', 'wedocs' ) }</EmptyRow>
          ) }
        </Card>

        {/* Pro / advanced analytics — switches on whether Pro is active */}
        <ProAnalytics proActive={ !! stats.pro_active } stats={ stats } />
      </div>
    </div>
  );
};

export default Dashboard;
