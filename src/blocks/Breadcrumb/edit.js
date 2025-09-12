import { useBlockProps } from "@wordpress/block-editor";
import Inspector from "./Inspector";
import "./style.scss";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const { separator, hideHomeIcon } = attributes;

	// Helper function to convert WordPress color format to CSS variable
	const getColorValue = (color) => {
		if (!color) return undefined;
		if (color.startsWith('var:preset|color|')) {
			const colorName = color.replace('var:preset|color|', '');
			return `var(--wp--preset--color--${colorName})`;
		}
		return color;
	};

	// Extract style system colors
	const backgroundColor = attributes.backgroundColor;
	const textColor = attributes.textColor;
	const linkColor = attributes.style?.elements?.link?.color?.text;

	const getSeparatorIcon = () => {
		switch (separator) {
			case "slash":
				return "/";
			case "arrow":
				return "›";
			case "chevron":
				return "»";
			case "dot":
				return "•";
			default:
				return "/";
		}
	};

	// Mock breadcrumb data for preview
	const breadcrumbs = [
		{
			title: "Home",
			url: "#"
		},
		{
			title: "Documentation",
			url: "#"
		},
		{
			title: "Getting Started",
			url: null
		}
	];

	return (
		<>
			<Inspector attributes={attributes} setAttributes={setAttributes} />
			<div className="wedocs-document">
				<nav aria-label="Breadcrumb" className="flex">
					<ol 
						role="list" 
						className="flex space-x-4 rounded-md px-6 shadow"
						style={{
							backgroundColor: backgroundColor ? `var(--wp--preset--color--${backgroundColor})` : undefined,
							color: textColor ? `var(--wp--preset--color--${textColor})` : undefined
						}}
					>
						{breadcrumbs.map((breadcrumb, index) => (
							<li key={index} className="flex">
								<div className="flex items-center">
									{index > 0 && (
										<svg viewBox="0 0 24 44" fill="currentColor" preserveAspectRatio="none" aria-hidden="true" className="h-full w-6 shrink-0 text-gray-200">
											<path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
										</svg>
									)}

									{breadcrumb.url ? (
										!hideHomeIcon && index === 0 ? (
											<a 
												href={breadcrumb.url} 
												className="hover:opacity-80 flex items-center"
												style={{
													color: getColorValue(linkColor) || (textColor ? `var(--wp--preset--color--${textColor})` : undefined)
												}}
											>
												<svg 
													viewBox="0 0 20 20" 
													fill="currentColor" 
													data-slot="icon" 
													aria-hidden="true" 
													className="w-5 h-5 shrink-0 mr-1"
													style={{
														color: getColorValue(linkColor) || (textColor ? `var(--wp--preset--color--${textColor})` : undefined)
													}}
												>
													<path d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" fillRule="evenodd" />
												</svg>
												<span className="sr-only">{breadcrumb.title}</span>
											</a>
										) : (
											<a 
												href={breadcrumb.url} 
												className={`${index === 0 ? '' : 'ml-4'} text-sm font-medium hover:opacity-80`}
												style={{
													color: getColorValue(linkColor) || (textColor ? `var(--wp--preset--color--${textColor})` : undefined)
												}}
											>
												{breadcrumb.title}
											</a>
										)
									) : (
										<span 
											className={`${index === 0 ? '' : 'ml-4'} text-sm font-medium`} 
											aria-current="page"
											style={{
												color: textColor ? `var(--wp--preset--color--${textColor})` : undefined
											}}
										>
											{breadcrumb.title}
										</span>
									)}
								</div>
							</li>
						))}
					</ol>
				</nav>
			</div>
		</>
	);
}
