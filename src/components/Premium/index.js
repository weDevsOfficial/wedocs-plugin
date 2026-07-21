import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';

import heroIllustration from '../../assets/img/premium/hero-illustration.png';
import videoThumbnail from '../../assets/img/premium/video-thumbnail.png';
import logosStrip from '../../assets/img/premium/logos-strip.png';
import refundBadge from '../../assets/img/premium/refund-badge.svg';
import payOne from '../../assets/img/premium/pay-1.png';
import payTwo from '../../assets/img/premium/pay-2.png';
import payThree from '../../assets/img/premium/pay-3.png';
import payFour from '../../assets/img/premium/pay-4.png';
import payFive from '../../assets/img/premium/pay-5.png';
import paySix from '../../assets/img/premium/pay-6.png';

import iconPublicPrivate from '../../assets/img/premium/icon-public-private.svg';
import iconAiChatbot from '../../assets/img/premium/icon-ai-chatbot.svg';
import iconAiSparkle from '../../assets/img/premium/icon-ai-sparkle.svg';
import iconSearch from '../../assets/img/premium/icon-search.svg';
import iconRoleAccess from '../../assets/img/premium/icon-role-access.svg';
import iconNestedStructure from '../../assets/img/premium/icon-nested-structure.svg';
import iconContactForm from '../../assets/img/premium/icon-contact-form.svg';
import iconTurnstile from '../../assets/img/premium/icon-turnstile.svg';
import iconTranslation from '../../assets/img/premium/icon-translation.svg';

const PRICING_URL =
  'https://wedocs.co/pricing/?utm_source=wp-admin&utm_medium=premium-page&utm_campaign=upgrade';
const COUPON_CODE = 'LiteUpgrade25';
const VIDEO_ID = 'UgXtmkgAEGI';
const VIDEO_URL = `https://www.youtube.com/watch?v=${ VIDEO_ID }`;
const VIDEO_EMBED_URL = `https://www.youtube-nocookie.com/embed/${ VIDEO_ID }?autoplay=1&rel=0`;

const ArrowRightIcon = ( { className = 'w-5 h-5' } ) => (
  <svg
    className={ className }
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const PlayIcon = () => (
  <svg
    className="w-7 h-7 text-white"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

const CrownIcon = ( { className = 'w-4 h-4' } ) => (
  <svg
    className={ className }
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5zm14 3a1 1 0 01-1 1H6a1 1 0 01-1-1v-1h14v1z" />
  </svg>
);

const CheckCircle = () => (
  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#ECFDF5] to-[#F0FDFA]">
    <svg
      className="w-5 h-5 text-emerald-500"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  </span>
);

const LockCircle = () => (
  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F5F5F4] opacity-60">
    <svg
      className="w-5 h-5 text-gray-400"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
        clipRule="evenodd"
      />
    </svg>
  </span>
);

const ListCheckIcon = () => (
  <svg
    className="w-5 h-5 shrink-0 text-indigo-600"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.5 2.5 4.5-5.5" />
  </svg>
);

const PrimaryLinkButton = ( { href, children } ) => (
  <a
    href={ href }
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-3 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] pl-[17px] pr-[15px] py-[9px] text-base font-medium !text-white !no-underline !shadow-sm transition-colors focus:!shadow-none"
  >
    { children }
    <ArrowRightIcon />
  </a>
);

const comparisonFeatures = [
  { name: __( 'Create and publish docs', 'wedocs' ), lite: true },
  { name: __( 'AI Doc Writer', 'wedocs' ), lite: true },
  { name: __( 'Frontend documentation display', 'wedocs' ), lite: true },
  { name: __( 'Access restrictions', 'wedocs' ), lite: false },
  { name: __( 'Frontend search', 'wedocs' ), lite: false },
  { name: __( 'Custom layouts', 'wedocs' ), lite: false },
  { name: __( 'Doc Duplication', 'wedocs' ), lite: false },
  { name: __( 'Priority support', 'wedocs' ), lite: false },
  { name: __( 'Social Sharing Options', 'wedocs' ), lite: false },
  { name: __( 'Assistant Widget', 'wedocs' ), lite: false },
];

const featureCards = [
  {
    icon: iconPublicPrivate,
    title: __( 'Public & Private Docs', 'wedocs' ),
    description: __(
      'Create documentation for users and internal teams from one place. Control visibility with simple access rules.',
      'wedocs'
    ),
  },
  {
    icon: iconAiChatbot,
    iconOverlay: iconAiSparkle,
    title: __( 'AI Chatbot Addon', 'wedocs' ),
    description: __(
      'Let users get instant answers directly from your documentation. Add the AI chatbot as an optional add-on and reduce support tickets faster.',
      'wedocs'
    ),
  },
  {
    icon: iconSearch,
    title: __( 'Powerful Search', 'wedocs' ),
    description: __(
      'Help users find answers in seconds. Search across titles and content.',
      'wedocs'
    ),
  },
  {
    icon: iconRoleAccess,
    title: __( 'Role-Based Access Control', 'wedocs' ),
    description: __(
      'Control who can view or manage specific documents. Perfect for internal and customer-facing docs.',
      'wedocs'
    ),
  },
  {
    icon: iconNestedStructure,
    title: __( 'Nested Documentation Structure', 'wedocs' ),
    description: __(
      'Organize content the way users think. Categories. Articles. Clear hierarchy upto 7 Layers.',
      'wedocs'
    ),
  },
  {
    icon: iconContactForm,
    title: __( 'Floating Contact Form', 'wedocs' ),
    description: __(
      'Let users reach out when the docs are not enough. Show a contact form without leaving the page.',
      'wedocs'
    ),
  },
  {
    icon: iconTurnstile,
    title: __( 'Cloudflare Turnstile Protection', 'wedocs' ),
    description: __(
      'Protect your docs and forms from spam. No captchas. No user friction.',
      'wedocs'
    ),
  },
  {
    icon: iconTranslation,
    title: __( 'Translation Ready', 'wedocs' ),
    description: __(
      'Create docs for a global audience. Compatible with multilingual setups.',
      'wedocs'
    ),
  },
];

const sharedPlanFeatures = [
  __( 'Duplicator to clone docs', 'wedocs' ),
  __( 'Templates & doc styles', 'wedocs' ),
  __( '7-layer hierarchical article', 'wedocs' ),
  __( 'Contributors visibility toggle', 'wedocs' ),
  __( 'Social sharing options', 'wedocs' ),
];

const pricingPlans = [
  {
    name: __( 'Starter', 'wedocs' ),
    badge: null,
    description: __( 'Everything you need for professional docs on a single site', 'wedocs' ),
    annual: 39,
    lifetime: 119,
    lifetimeRegular: 125,
    lifetimeDiscount: 5,
    sites: __( '1 Site', 'wedocs' ),
    highlighted: false,
  },
  {
    name: __( 'Professional', 'wedocs' ),
    badge: null,
    description: __( 'Do more with weDocs using powerful advanced features', 'wedocs' ),
    annual: 59,
    lifetime: 149,
    lifetimeRegular: 165,
    lifetimeDiscount: 10,
    sites: __( '5 Sites', 'wedocs' ),
    highlighted: false,
  },
  {
    name: __( 'Business', 'wedocs' ),
    badge: { label: __( 'Most Popular', 'wedocs' ), className: 'bg-[#FFE2B4]' },
    description: __( 'The ultimate documentation toolkit for growing teams', 'wedocs' ),
    annual: 79,
    lifetime: 199,
    lifetimeRegular: 235,
    lifetimeDiscount: 15,
    sites: __( '10 Sites', 'wedocs' ),
    highlighted: true,
  },
  {
    name: __( 'Agency', 'wedocs' ),
    badge: { label: __( 'Best Valued', 'wedocs' ), className: 'bg-[#88FFB3]' },
    description: __( 'Reach greater heights with docs across all client sites', 'wedocs' ),
    annual: 149,
    lifetime: 249,
    lifetimeRegular: 312,
    lifetimeDiscount: 20,
    sites: __( 'Unlimited Sites', 'wedocs' ),
    highlighted: false,
  },
];

const CouponBadge = ( { dark = true } ) => (
  <span
    className={ `inline-flex items-center gap-2 rounded-md border pl-[17px] pr-[15px] py-[9px] text-base font-medium ${
      dark
        ? 'bg-transparent border-[#3C434A] text-[#A7AAAD]'
        : 'bg-white border-gray-300 text-gray-600'
    }` }
  >
    { __( 'Coupon:', 'wedocs' ) }
    <strong className={ dark ? 'text-white' : 'text-[#23282D]' }>
      { COUPON_CODE }
    </strong>
  </span>
);

const HeroSection = () => (
  <section className="relative overflow-hidden rounded-[20px] bg-[#000823]">
    <div className="relative z-10 flex flex-col gap-9 px-10 py-14 max-w-[680px]">
      <h1 className="text-3xl font-bold !leading-snug !text-white m-0 p-0">
        { __( 'A Knowledgebase Built for Growing Products', 'wedocs' ) }
      </h1>
      <div className="text-sm leading-relaxed text-white space-y-4 max-w-[580px]">
        <p className="m-0">
          { __(
            'Secure your documentation with public and private access, role-based permissions, a floating contact form, and Cloudflare Turnstile spam protection.',
            'wedocs'
          ) }
        </p>
        <p className="m-0">
          { __(
            'Upgrade to weDocs Pro for advanced control, and add the AI-powered chatbot when you need instant answers from your docs.',
            'wedocs'
          ) }
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <PrimaryLinkButton href={ PRICING_URL }>
          { __( 'Upgrade to Pro', 'wedocs' ) }
        </PrimaryLinkButton>
        <CouponBadge />
      </div>
    </div>
    <div className="absolute top-8 right-0 hidden xl:block w-[426px]">
      <img
        src={ heroIllustration }
        alt=""
        className="w-full max-w-full h-auto border-0"
      />
      <span className="absolute left-1/2 -translate-x-1/2 bottom-4 rounded-full bg-[#000D37] px-8 py-2.5 text-2xl font-bold text-white whitespace-nowrap">
        { __( 'Up to 25% Off', 'wedocs' ) }
      </span>
    </div>
  </section>
);

const ComparisonSection = () => (
  <section className="mx-auto flex w-full max-w-[1000px] flex-col gap-11 lg:flex-row">
    <div className="flex w-full lg:w-[385px] shrink-0 flex-col gap-4">
      <h2 className="text-3xl font-bold !leading-snug text-gray-800 m-0 p-0">
        { __( 'Powerful Features Available Only in weDocs Pro', 'wedocs' ) }
      </h2>
      <p className="m-0 text-sm leading-relaxed text-gray-500">
        { __(
          "You've started with Lite. Now unlock access restrictions, powerful frontend search, custom layouts, doc duplication, priority support, and more.",
          'wedocs'
        ) }
      </p>
    </div>
    <div className="flex-1 rounded-2xl border border-stone-200/50 bg-white p-px shadow-sm">
      <div className="flex items-center justify-between rounded-t-2xl border-b border-stone-200/70 bg-gradient-to-br from-[#FFFBEB] via-[#FAFAF9] to-[#F0FDFA]/30 px-10 py-5">
        <span className="text-sm font-semibold text-gray-600">
          { __( 'Feature Area', 'wedocs' ) }
        </span>
        <div className="flex items-center gap-10">
          <span className="w-10 text-center text-sm font-semibold text-gray-600">
            { __( 'Lite', 'wedocs' ) }
          </span>
          <span className="flex w-16 items-center justify-end gap-1.5 text-sm font-semibold text-gray-600">
            { __( 'Pro', 'wedocs' ) }
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#FFB900] to-[#FE9A00]">
              <CrownIcon className="w-4 h-4 text-white" />
            </span>
          </span>
        </div>
      </div>
      { comparisonFeatures.map( ( feature, index ) => (
        <div
          key={ feature.name }
          className={ `flex items-center justify-between px-10 py-[11px] ${
            index !== comparisonFeatures.length - 1
              ? 'border-b border-stone-200/60'
              : ''
          }` }
        >
          <span className="text-sm font-semibold text-gray-600">
            { feature.name }
          </span>
          <div className="flex items-center gap-10">
            <span className="flex w-10 justify-center">
              { feature.lite ? <CheckCircle /> : <LockCircle /> }
            </span>
            <span className="flex w-16 justify-end pr-2">
              <CheckCircle />
            </span>
          </div>
        </div>
      ) ) }
    </div>
  </section>
);

const FeatureCardsSection = () => (
  <section className="border border-gray-200 bg-[#D2D6E4] px-8 py-[72px] xl:px-[140px]">
    <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 m-0 p-0">
          { __( 'AI Powered Features for Better Documentation', 'wedocs' ) }
        </h2>
        <p className="m-0 text-sm text-gray-500">
          { __(
            'Everything you need to build, manage, and grow your documentation on WordPress.',
            'wedocs'
          ) }
        </p>
      </div>
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        { featureCards.map( ( card ) => (
          <div
            key={ card.title }
            className="flex min-h-[214px] flex-col gap-5 rounded-[20px] border border-gray-200 bg-white p-5"
          >
            <span className="relative self-start w-[35px]">
              <img
                src={ card.icon }
                alt=""
                className="block h-9 w-auto border-0"
              />
              { card.iconOverlay && (
                <img
                  src={ card.iconOverlay }
                  alt=""
                  className="absolute -right-2 -top-1 h-4 w-auto border-0"
                />
              ) }
            </span>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold text-gray-900 m-0 p-0">
                { card.title }
              </h3>
              <p className="m-0 text-sm leading-relaxed text-gray-800">
                { card.description }
              </p>
            </div>
          </div>
        ) ) }
      </div>
      <PrimaryLinkButton href={ PRICING_URL }>
        { __( 'Show all the Pro Features', 'wedocs' ) }
      </PrimaryLinkButton>
    </div>
  </section>
);

const DokanSection = () => {
  const [ playing, setPlaying ] = useState( false );
  const videoTitle = __( 'How to mark a doc as vendor docs', 'wedocs' );

  return (
    <section className="mx-auto flex w-full max-w-[1000px] flex-col items-center gap-11 px-8 xl:px-0">
      <div className="flex max-w-[581px] flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 m-0 p-0">
          { __( 'Dokan Support for weDocs', 'wedocs' ) }
        </h2>
        <p className="m-0 text-sm text-gray-500">
          { __(
            'This feature lets marketplace owners create vendor-specific documentation to simplify onboarding, store management, policies, payments, and other resources.',
            'wedocs'
          ) }
        </p>
      </div>
      <div className="relative w-full overflow-hidden rounded-[20px] aspect-video bg-[#0A101A]">
        { playing ? (
          <iframe
            src={ VIDEO_EMBED_URL }
            title={ videoTitle }
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={ () => setPlaying( true ) }
            aria-label={ videoTitle }
            className="group absolute inset-0 h-full w-full cursor-pointer border-0 bg-transparent p-0"
          >
            <img
              src={ videoThumbnail }
              alt={ videoTitle }
              className="block h-full w-full border-0 object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-[68px] w-[96px] items-center justify-center rounded-[14px] bg-black/60 transition-colors group-hover:bg-[#FF0000]">
                <PlayIcon />
              </span>
            </span>
          </button>
        ) }
      </div>
      <PrimaryLinkButton href={ VIDEO_URL }>
        { __( 'Watch on YouTube', 'wedocs' ) }
      </PrimaryLinkButton>
    </section>
  );
};

const BrandsSection = () => (
  <section className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-14 px-8 xl:px-0">
    <h2 className="text-3xl font-bold text-gray-800 m-0 p-0 text-center">
      { __( 'From the trusted team behind:', 'wedocs' ) }
    </h2>
    <img
      src={ logosStrip }
      alt={ __(
        'Dokan, WP User Frontend, WP ERP, WP Project Manager, FlyWP, WP Hive, weMail, Appsero, weDocs, wePOS, and InboxWP logos',
        'wedocs'
      ) }
      className="w-full max-w-[1013px] h-auto border-0"
    />
  </section>
);

const PricingSection = () => {
  const [ period, setPeriod ] = useState( 'annual' );
  const isAnnual = period === 'annual';

  return (
    <section className="mx-auto flex w-full max-w-[1000px] flex-col items-center gap-10 px-8 xl:px-0">
      <div className="flex max-w-[633px] flex-col items-center gap-10 text-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-gray-800 m-0 p-0">
            { __( 'Simple Pricing That Grows With You', 'wedocs' ) }
          </h2>
          <p className="m-0 text-sm text-gray-500">
            { __( 'Get Upto', 'wedocs' ) }{ ' ' }
            <strong className="text-[#23282D]">25%</strong>{ ' ' }
            { __( 'off instantly using the', 'wedocs' ) }{ ' ' }
            <strong className="text-[#23282D]">
              { __( 'Coupon:', 'wedocs' ) }
            </strong>{ ' ' }
            <strong className="text-[#4F46E5]">{ COUPON_CODE }</strong>
          </p>
        </div>
        <div className="flex rounded-full bg-white p-2 shadow-sm">
          <button
            type="button"
            onClick={ () => setPeriod( 'annual' ) }
            className={ `rounded-full px-[30px] py-2.5 text-base transition-colors cursor-pointer border-0 ${
              isAnnual ? 'bg-[#4F46E5] text-white' : 'bg-white text-[#5E6479]'
            }` }
          >
            { __( 'Annual', 'wedocs' ) }
          </button>
          <button
            type="button"
            onClick={ () => setPeriod( 'lifetime' ) }
            className={ `rounded-full px-[30px] py-2.5 text-base transition-colors cursor-pointer border-0 ${
              ! isAnnual ? 'bg-[#4F46E5] text-white' : 'bg-white text-[#5E6479]'
            }` }
          >
            { __( 'Lifetime', 'wedocs' ) }
          </button>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        { pricingPlans.map( ( plan, index ) => (
          <div
            key={ plan.name }
            className={ `flex flex-col gap-6 bg-white px-[21px] py-[25px] ${
              plan.highlighted
                ? 'border-2 border-[#4F46E5] relative lg:-my-px'
                : 'border border-[#E4E4E4]'
            } ${ index === 0 ? 'lg:rounded-l-2xl' : '' } ${
              index === pricingPlans.length - 1 ? 'lg:rounded-r-2xl' : ''
            }` }
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-[#101828] m-0 p-0">
                  { plan.name }
                </h3>
                { plan.badge && (
                  <span
                    className={ `rounded-[20px] px-2 py-1.5 text-xs text-[#0E0E0F] whitespace-nowrap ${ plan.badge.className }` }
                  >
                    { plan.badge.label }
                  </span>
                ) }
              </div>
              <p className="m-0 text-sm leading-snug text-[#4A5565] min-h-[40px]">
                { plan.description }
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="m-0 text-4xl font-bold text-[#101828]">
                ${ isAnnual ? plan.annual : plan.lifetime }
                <span className="text-base font-normal text-[#6A7282]">
                  { isAnnual
                    ? __( '/y', 'wedocs' )
                    : __( '/lifetime', 'wedocs' ) }
                </span>
              </p>
              { ! isAnnual && (
                <p className="m-0 flex items-center gap-2 text-sm text-[#6A7282]">
                  <span className="line-through">
                    ${ plan.lifetimeRegular }
                  </span>
                  <span className="rounded-[20px] bg-[#ECFDF5] px-2 py-0.5 text-xs font-semibold text-[#047857]">
                    { sprintf(
                      /* translators: %s: discount percentage, e.g. 15% */
                      __( 'Save %s', 'wedocs' ),
                      `${ plan.lifetimeDiscount }%`
                    ) }
                  </span>
                </p>
              ) }
            </div>
            <a
              href={ PRICING_URL }
              target="_blank"
              rel="noopener noreferrer"
              className={ `flex h-[45px] items-center justify-center gap-2 rounded-[5px] text-sm font-bold !no-underline transition-colors ${
                plan.highlighted
                  ? 'bg-[#4F46E5] !text-white hover:bg-[#4338CA]'
                  : 'border border-[#D3D3D3] bg-white !text-[#0E0E0F] hover:border-[#4F46E5]'
              }` }
            >
              { __( 'Get Started', 'wedocs' ) }
              <ArrowRightIcon className="w-4 h-4" />
            </a>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              <li className="flex items-center gap-2.5 text-sm font-bold text-black">
                <ListCheckIcon />
                { plan.sites }
              </li>
              { sharedPlanFeatures.map( ( feature ) => (
                <li
                  key={ feature }
                  className="flex items-center gap-2.5 text-sm text-[#4A5565]"
                >
                  <ListCheckIcon />
                  { feature }
                </li>
              ) ) }
            </ul>
          </div>
        ) ) }
      </div>

      <div className="flex w-full flex-col items-center gap-3 rounded-2xl border border-[#E4E4E4] bg-white px-8 py-6 text-center sm:flex-row sm:justify-center sm:gap-4 sm:text-left">
        <span className="relative w-[35px] shrink-0">
          <img
            src={ iconAiChatbot }
            alt=""
            className="block h-9 w-auto border-0"
          />
          <img
            src={ iconAiSparkle }
            alt=""
            className="absolute -right-2 -top-1 h-4 w-auto border-0"
          />
        </span>
        <p className="m-0 text-sm text-[#4A5565]">
          <strong className="text-[#101828]">
            { __( 'AI Chatbot Add-on', 'wedocs' ) }
          </strong>{ ' ' }
          { __( 'is available on any plan for', 'wedocs' ) }{ ' ' }
          <strong className="text-[#101828]">
            { __( '$7.99/month', 'wedocs' ) }
          </strong>
          { '. ' }
          { __( 'Not available as a lifetime purchase.', 'wedocs' ) }
        </p>
      </div>
    </section>
  );
};

const RefundSection = () => (
  <section className="mx-auto w-full max-w-[1000px] rounded-[20px] border border-[#E4E4E4] bg-white p-10">
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
      <div className="flex max-w-[751px] flex-col gap-5">
        <h3 className="text-3xl font-extrabold text-gray-900 m-0 p-0">
          { __( 'Our Fair Refund Policy', 'wedocs' ) }
        </h3>
        <p className="m-0 text-sm leading-relaxed text-gray-800">
          { __(
            "We guarantee 100% satisfaction with our help & support service. However, if our plugin still doesn't meet your needs, we'll happily provide full refund within 14 days of your purchase.",
            'wedocs'
          ) }
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <span className="text-xs font-semibold text-gray-800">
            { __( 'Payment Options:', 'wedocs' ) }
          </span>
          { [ payOne, payTwo, payThree, payFour, payFive, paySix ].map(
            ( logo, index ) => (
              <img
                key={ index }
                src={ logo }
                alt=""
                className="h-7 w-auto border-0 border-l border-solid border-gray-200 pl-4 first-of-type:border-0 first-of-type:pl-0"
              />
            )
          ) }
        </div>
      </div>
      <img
        src={ refundBadge }
        alt={ __( '14-day money back guarantee', 'wedocs' ) }
        className="h-[158px] w-[158px] shrink-0 border-0"
      />
    </div>
  </section>
);

const FinalCtaSection = () => (
  <section className="relative mx-auto w-full max-w-[1000px] overflow-hidden rounded-[20px] bg-[#000823]">
    <img
      src={ heroIllustration }
      alt=""
      className="pointer-events-none absolute -right-6 -bottom-10 w-[235px] max-w-none opacity-30 border-0"
    />
    <div className="relative z-10 flex flex-col items-start gap-6 p-10 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex max-w-[458px] flex-col gap-4">
        <h3 className="text-2xl font-bold !leading-8 !text-white m-0 p-0">
          { __(
            'Build a Complete Knowledge Base with One Powerful Plugin',
            'wedocs'
          ) }
        </h3>
        <p className="m-0 text-sm leading-5 text-white">
          { __(
            'Create docs, restrict access, add AI-powered answers, and support your users. Everything you need, all in one place.',
            'wedocs'
          ) }
        </p>
      </div>
      <PrimaryLinkButton href={ PRICING_URL }>
        { __( 'Upgrade to Pro', 'wedocs' ) }
      </PrimaryLinkButton>
    </div>
  </section>
);

const Premium = () => {
  // Full-bleed design: strip the admin chrome padding while this page is mounted.
  useEffect( () => {
    document.body.classList.add( 'wedocs-premium-fullwidth' );

    return () => document.body.classList.remove( 'wedocs-premium-fullwidth' );
  }, [] );

  return (
    <div className="wedocs-premium-page bg-[#F5F5F5] pb-[72px]">
      <div className="mx-auto flex max-w-[1216px] flex-col gap-[72px] px-8 pt-[72px] xl:px-0">
        <HeroSection />
        <ComparisonSection />
      </div>
      <div className="mt-[72px] flex flex-col">
        <FeatureCardsSection />
        { /* Dokan + brands sit on a white band in the design, not on the page gray. */ }
        <div className="flex flex-col gap-[72px] bg-white py-[72px]">
          <DokanSection />
          <BrandsSection />
        </div>
        <div className="flex flex-col gap-[72px] pt-[72px]">
          <PricingSection />
          <RefundSection />
          <FinalCtaSection />
        </div>
      </div>
    </div>
  );
};

export default Premium;
