import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Every shortcode weDocs registers, with the attributes each one accepts.
 *
 * Pro adds its own through the `wedocs_shortcodes` filter rather than being
 * listed here, so the tab only ever shows what is actually registered.
 */
const getShortcodes = () => {
  const shortcodes = [
    {
      tag: 'wedocs',
      title: __( 'Documentation List', 'wedocs' ),
      description: __(
        'Lists your documentation. Use this on the page you have set as the docs home.',
        'wedocs'
      ),
      example:
        '[wedocs col="2" items="10" include="any" exclude="" more="View Details" paginate=""]',
      attributes: [
        {
          name: 'col',
          default: '2',
          description: __( 'Number of columns to lay the docs out in.', 'wedocs' ),
        },
        {
          name: 'items',
          default: '10',
          description: __( 'How many sections to show under each doc.', 'wedocs' ),
        },
        {
          name: 'include',
          default: 'any',
          description: __(
            'Comma separated doc IDs to show. Leave as any to show all of them.',
            'wedocs'
          ),
        },
        {
          name: 'exclude',
          default: '',
          description: __( 'Comma separated doc IDs to leave out.', 'wedocs' ),
        },
        {
          name: 'more',
          default: __( 'View Details', 'wedocs' ),
          description: __( 'Label for the link at the foot of each doc.', 'wedocs' ),
        },
        {
          name: 'paginate',
          default: '',
          description: __(
            'Docs per page. Leave empty to show every doc on one page.',
            'wedocs'
          ),
        },
      ],
    },
    {
      tag: 'wedocs_faq',
      title: __( 'FAQ Section', 'wedocs' ),
      description: __(
        'Renders your FAQ groups as an accordion. Inactive groups and groups with no FAQs are skipped.',
        'wedocs'
      ),
      example: '[wedocs_faq group="" limit="-1" orderby="menu_order" order="ASC"]',
      attributes: [
        {
          name: 'group',
          default: '',
          description: __(
            'Comma separated FAQ group slugs to show. Leave empty for all groups.',
            'wedocs'
          ),
        },
        {
          name: 'limit',
          default: '-1',
          description: __(
            'FAQs to show per group. Use -1 for no limit.',
            'wedocs'
          ),
        },
        {
          name: 'orderby',
          default: 'menu_order',
          description: __(
            'What to sort the FAQs by, for example menu_order, title or date.',
            'wedocs'
          ),
        },
        {
          name: 'order',
          default: 'ASC',
          description: __( 'Sort direction, ASC or DESC.', 'wedocs' ),
        },
      ],
    },
  ];

  return wp.hooks.applyFilters( 'wedocs_shortcodes', shortcodes );
};

/**
 * One shortcode, its example and the attributes it takes.
 */
const ShortcodeCard = ( { shortcode } ) => {
  const [ copied, setCopied ] = useState( false );

  const copyExample = () => {
    const done = () => {
      setCopied( true );
      window.setTimeout( () => setCopied( false ), 2000 );
    };

    if ( navigator.clipboard?.writeText ) {
      navigator.clipboard.writeText( shortcode.example ).then( done ).catch( () => {} );

      return;
    }

    // Clipboard API needs a secure context, so fall back for plain http sites.
    const field = document.createElement( 'textarea' );
    field.value = shortcode.example;
    field.setAttribute( 'readonly', '' );
    field.style.position = 'absolute';
    field.style.left = '-9999px';
    document.body.appendChild( field );
    field.select();
    document.execCommand( 'copy' );
    document.body.removeChild( field );
    done();
  };

  return (
    <div className="border border-gray-300 rounded-md">
      <div className="px-5 py-4">
        <h3 className="text-base font-medium text-black !m-0">
          { shortcode.title }
        </h3>
        <p className="mt-1 mb-0 text-sm text-[#6B7280]">
          { shortcode.description }
        </p>

        <div className="mt-4 flex items-start gap-3">
          <code className="flex-1 min-w-0 bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 break-all">
            { shortcode.example }
          </code>
          <button
            type="button"
            onClick={ copyExample }
            title={ copied ? __( 'Copied', 'wedocs' ) : __( 'Copy shortcode', 'wedocs' ) }
            aria-label={ copied ? __( 'Copied', 'wedocs' ) : __( 'Copy shortcode', 'wedocs' ) }
            className="shrink-0 flex items-center justify-center h-[38px] w-[38px] rounded-md border border-gray-300 bg-white text-gray-400 hover:text-indigo-600 hover:border-gray-400 transition-colors"
          >
            { copied ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-indigo-600"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            ) }
          </button>
        </div>
      </div>

      { !! shortcode.attributes?.length && (
        <div className="border-t border-gray-200 px-5 py-4">
          <span className="block text-sm font-medium text-gray-600 mb-3">
            { __( 'Attributes', 'wedocs' ) }
          </span>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-[#6B7280]">
                  <th className="py-2 pr-4 font-medium">{ __( 'Attribute', 'wedocs' ) }</th>
                  <th className="py-2 pr-4 font-medium">{ __( 'Default', 'wedocs' ) }</th>
                  <th className="py-2 font-medium">{ __( 'Description', 'wedocs' ) }</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                { shortcode.attributes.map( ( attribute ) => (
                  <tr key={ attribute.name }>
                    <td className="py-2 pr-4 align-top whitespace-nowrap">
                      <code className="text-gray-900">{ attribute.name }</code>
                    </td>
                    <td className="py-2 pr-4 align-top whitespace-nowrap">
                      { attribute.default === '' ? (
                        <span className="text-gray-400">{ __( 'empty', 'wedocs' ) }</span>
                      ) : (
                        <code className="text-gray-400 bg-gray-50 px-1 py-0.5 rounded">
                          { attribute.default }
                        </code>
                      ) }
                    </td>
                    <td className="py-2 align-top text-[#6B7280]">
                      { attribute.description }
                    </td>
                  </tr>
                ) ) }
              </tbody>
            </table>
          </div>
        </div>
      ) }
    </div>
  );
};

const ShortcodeSettings = () => {
  const shortcodes = getShortcodes();

  return (
    <section>
      <div className="shadow sm:rounded-md">
        <div className="bg-white sm:rounded-md min-h-[500px]">
          <div className="section-heading py-4 px-8 sm:px-8 sm:py-4">
            <h2 className="text-gray-900 font-medium text-lg">
              { __( 'Shortcodes', 'wedocs' ) }
            </h2>
          </div>
          <hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200" />

          <div className="pt-6 pb-10 px-8">
            <p className="mt-0 mb-6 text-sm text-[#6B7280]">
              { __(
                'Paste any of these into a page or post. Every attribute is optional, so the shortcode on its own works too.',
                'wedocs'
              ) }
            </p>

            <div className="space-y-4">
              { shortcodes.map( ( shortcode ) => (
                <ShortcodeCard key={ shortcode.tag } shortcode={ shortcode } />
              ) ) }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortcodeSettings;
