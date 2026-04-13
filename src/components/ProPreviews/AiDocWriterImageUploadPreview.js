import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import ProBadge from './common/ProBadge';

const features = [
	__( 'Role-Based Permission Management', 'wedocs' ),
	__( 'Docs Duplicator', 'wedocs' ),
	__( '7-layer hierarchical article creation', 'wedocs' ),
	__( 'Social Sharing Options', 'wedocs' ),
	__( 'Floating Contact form', 'wedocs' ),
];

const AiDocWriterImageUploadPreview = () => {
	const [ showTooltip, setShowTooltip ] = useState( false );

	return (
		<div style={{ marginTop: '16px' }}>
			<div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
				<label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginRight: '8px' }}>
					{ __( 'Screenshots', 'wedocs' ) }{ ' ' }
					<span style={{ color: '#6b7280', fontWeight: '400' }}>
						({ __( 'optional', 'wedocs' ) })
					</span>
				</label>

				{/* Badge + Tooltip wrapper */}
				<span
					style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}
					onMouseEnter={ () => setShowTooltip( true ) }
					onMouseLeave={ () => setShowTooltip( false ) }
				>
					<ProBadge />

					{ showTooltip && (
						<div style={{
							position: 'absolute',
							left: '50%',
							top: 'calc(100% + 14px)',
							transform: 'translateX(-50%)',
							width: '270px',
							backgroundColor: '#000',
							borderRadius: '6px',
							padding: '32px 24px',
							zIndex: 99999,
							textAlign: 'left',
						}}>
							{/* Hover bridge - keeps tooltip open while moving mouse down */}
							<div style={{
								position: 'absolute',
								width: '100%',
								height: '16px',
								left: 0,
								top: '-16px',
							}} />

							{/* Arrow */}
							<div style={{
								position: 'absolute',
								width: '16px',
								height: '16px',
								backgroundColor: '#000',
								borderRadius: '2px',
								left: '50%',
								top: '2px',
								transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
							}} />

							{/* Heading */}
							<h3 style={{
								color: '#fff',
								fontSize: '14px',
								fontWeight: '600',
								lineHeight: '12px',
								marginBottom: '16px',
							}}>
								{ __( 'Unlock and Enjoy Pro Feature-', 'wedocs' ) }
							</h3>

							{/* Features list */}
							<ul style={{
								textAlign: 'left',
								marginBottom: '28px',
								padding: 0,
								listStyle: 'none',
							}}>
								{ features.map( ( feature, index ) => (
									<li key={ index } style={{
										display: 'flex',
										alignItems: 'center',
										fontSize: '14px',
										fontWeight: '400',
										lineHeight: '24px',
										color: '#fff',
										gap: '10px',
										whiteSpace: 'break-spaces',
									}}>
										<span style={{ flexShrink: 0, display: 'flex' }}>
											<svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" fill="#139F84">
												<path fillRule="evenodd" d="M8.927 1.134c-.33-.33-.865-.33-1.195 0L3.374 5.492 1.897 4.015c-.33-.33-.865-.33-1.195 0s-.33.865 0 1.195l2.075 2.075c.33.33.865.33 1.195 0l4.955-4.955c.33-.33.33-.865 0-1.195zM.992 4.853c.01.012.02.024.031.035l2.075 2.075a.39.39 0 0 0 .552 0l4.955-4.955a.39.39 0 0 0 .031-.517.39.39 0 0 1-.031.517L3.65 6.963a.39.39 0 0 1-.552 0L1.023 4.888c-.011-.011-.022-.023-.031-.035z" />
											</svg>
										</span>
										<span>{ feature }</span>
									</li>
								) ) }
							</ul>

							{/* Upgrade button */}
							<a
								href="//wedocs.co/pricing/?utm_source=wp-admin&utm_medium=freemium&utm_campaign=upgrade-popup"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									gap: '10px',
									backgroundColor: '#4F46E5',
									color: '#fff',
									padding: '10px 14px',
									borderRadius: '6px',
									fontSize: '14px',
									fontWeight: '600',
									textDecoration: 'none',
								}}
							>
								{ __( 'Go Pro – Up to 20% OFF! 🔥', 'wedocs' ) }
							</a>
						</div>
					) }
				</span>
			</div>

			<p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
				{ __(
					'Upload screenshots to help AI understand the current UI state.',
					'wedocs'
				) }
			</p>

			{/* Drop Zone - disabled preview */}
			<div style={{
				borderRadius: '8px',
				border: '2px dashed #93c5fd',
				backgroundColor: '#ffffff',
				padding: '32px 24px',
				textAlign: 'center',
				opacity: 0.7,
				cursor: 'not-allowed',
			}}>
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
					<div style={{
						width: '48px',
						height: '48px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: '50%',
						backgroundColor: '#dbeafe',
						marginBottom: '12px',
					}}>
						<svg
							style={{ width: '20px', height: '20px', color: '#3b82f6' }}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
							/>
						</svg>
					</div>
					<p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
						{ __( 'Click to select image or drag and drop', 'wedocs' ) }
					</p>
					<p style={{ fontSize: '12px', color: '#6b7280' }}>
						{ __( 'Supports JPG, PNG, GIF up to 10MB', 'wedocs' ) }
					</p>
				</div>
			</div>
		</div>
	);
};

export default AiDocWriterImageUploadPreview;
