import { __ } from '@wordpress/i18n';

const PlacementSettings = () => {
	let tabs = [
		{ id: 1, key: 'integrate_ai', text: __( 'A.I. Chat', 'wedocs' ) },
		{ id: 2, key: 'explore', text: __( 'Explore', 'wedocs' ) },
		{ id: 3, key: 'message', text: __( 'Messaging', 'wedocs' ) },
	];

	return (
		<div className={ `placement-settings` }>
			<div className={ `placement-label` }>
				<div className={ 'flex items-center' }>
					<h3 className={ `text-base text-[#111827] font-medium leading-5` }>
						{ __( 'Drag your tabs and place orders', 'wedocs_pro' ) }
					</h3>
					<div
						className="tooltip cursor-pointer ml-2 z-[9999]"
						data-tip={ __(
							'Prevent the widget from appearing on specific pages',
							'wedocs'
						) }
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							fill="none"
						>
							<path
								d="M9.833 12.333H9V9h-.833M9 5.667h.008M16.5 9a7.5 7.5 0 1 1-15 0 7.5 7.5 0 1 1 15 0z"
								stroke="#6b7280"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</div>
				<hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200 mt-5 mb-6" />
			</div>

			<div className="tab-order-settings relative flex items-start min-h-[200px] gap-4">
				{ tabs?.map( ( tab ) => (
					<div key={ tab?.id } className={ `bg-[#F3F4F6] text-[#111827] text-sm font-medium leading-5 rounded-md px-3.5 py-2 flex items-center gap-3 cursor-grab shadow` }>
						<svg width='16' height='16' fill='none'>
							<path
								fill='#9ca3af'
								d='M15.997 8.049l-2.584 2.573-.154.15c-.14.125-.297.15-.466.075-.161-.072-.244-.201-.244-.383l.003-1.358c.004-.165-.036-.229-.215-.226H9.067c-.161 0-.215.043-.215.211v3.29c0 .158.05.204.204.201l1.34-.004c.201-.004.351.072.426.258s.029.348-.115.487l-2.602 2.605c-.093.093-.154.097-.247 0l-2.602-2.605c-.14-.14-.19-.305-.115-.487s.226-.262.426-.262l1.358.004c.136.004.19-.036.19-.179V9.056a.14.14 0 0 0-.176-.176H3.598c-.147 0-.183.05-.179.186l.004 1.34c.004.204-.064.366-.262.444s-.358.018-.502-.129L.079 8.145c-.108-.104-.104-.168 0-.272l2.566-2.566c.151-.151.312-.219.516-.136s.262.254.258.462l-.004 1.322c-.004.14.039.186.183.186h3.343c.136 0 .172-.047.172-.176V3.623c0-.15-.057-.179-.19-.179l-1.34.004c-.208.004-.366-.068-.444-.262s-.014-.358.129-.502L7.784.168 7.945 0h.072l.161.168 2.516 2.516c.143.143.208.308.129.502s-.236.265-.444.262c-.441-.004-.882.004-1.322-.004-.151-.004-.208.036-.208.197v3.308c0 .147.047.194.194.194h3.308c.161 0 .201-.057.197-.208l-.004-1.376a.39.39 0 0 1 .244-.383c.168-.075.326-.05.466.075l.129.125 2.609 2.598a.28.28 0 0 1 .007.075z'
							/>
						</svg>
						{ tab?.text }
					</div>
				) ) }
			</div>
		</div>
	);
}

export default PlacementSettings;
