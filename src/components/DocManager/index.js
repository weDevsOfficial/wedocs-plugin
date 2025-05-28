import ManagerSettings from './ManagerSettings';
const ManagerPage = () => {
	const { backDocPage: BackToDocsPage } = window;

	return (
		<div className="docs-manager py-5">
			<BackToDocsPage />
			<ManagerSettings />
		</div>
	);
};

export default ManagerPage;
