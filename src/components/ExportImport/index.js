import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import WedocsPromoNotice from '../WedocsPromoNotice';

const ExportImport = () => {
    const [isExporting, setIsExporting] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [exportSuccess, setExportSuccess] = useState(false);
    const [importSuccess, setImportSuccess] = useState(false);
    const [importResult, setImportResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleExport = () => {
        setIsExporting(true);
        setExportSuccess(false);
        setErrorMessage('');

        jQuery.ajax({
            url: ajaxurl,
            type: 'POST',
            data: { action: 'wedocs_export_docs' },
            dataType: 'json',
            success: (response) => {
                setIsExporting(false);
                if (response.success) {
                    // Create download link
                    const dataStr = JSON.stringify(response.data.data, null, 2);
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = response.data.filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                    setExportSuccess(true);
                } else {
                    setErrorMessage(response.data?.message || __('Export failed.', 'wedocs'));
                }
            },
            error: () => {
                setIsExporting(false);
                setErrorMessage(__('Export failed. Please try again.', 'wedocs'));
            }
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/json') {
            setImportFile(file);
            setErrorMessage('');
        } else {
            setImportFile(null);
            setErrorMessage(__('Please select a valid JSON file.', 'wedocs'));
        }
    };

    const handleImport = () => {
        if (!importFile) {
            setErrorMessage(__('Please select a file to import.', 'wedocs'));
            return;
        }

        setIsImporting(true);
        setImportSuccess(false);
        setErrorMessage('');
        setImportResult(null);

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importData = e.target.result;
                
                jQuery.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'wedocs_import_docs',
                        import_data: importData
                    },
                    dataType: 'json',
                    success: (response) => {
                        setIsImporting(false);
                        if (response.success) {
                            setImportSuccess(true);
                            setImportResult(response.data);
                            setImportFile(null);
                            // Reset file input
                            document.getElementById('import-file-input').value = '';
                        } else {
                            setErrorMessage(response.data?.message || __('Import failed.', 'wedocs'));
                        }
                    },
                    error: () => {
                        setIsImporting(false);
                        setErrorMessage(__('Import failed. Please try again.', 'wedocs'));
                    }
                });
            } catch (error) {
                setIsImporting(false);
                setErrorMessage(__('Failed to read file. Please ensure it is a valid JSON file.', 'wedocs'));
            }
        };
        reader.readAsText(importFile);
    };

    return (
        <div className='w-full mt-7'>
            <WedocsPromoNotice />
            <div className='shadow sm:overflow-hidden sm:rounded-md'>
                <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                    <div className='w-full'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                            {__('Export/Import Documentation', 'wedocs')}
                        </h2>
                        <p className='text-gray-600 mb-6'>
                            {__('Export your documentation to a JSON file or import documentation from a previously exported file.', 'wedocs')}
                        </p>

                        {errorMessage && (
                            <div className='mb-4 p-4 bg-red-50 border border-red-200 rounded-md'>
                                <p className='text-red-800'>{errorMessage}</p>
                            </div>
                        )}

                        {/* Export Section */}
                        <div className='mb-8 p-6 border border-gray-200 rounded-lg'>
                            <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                                {__('Export Documentation', 'wedocs')}
                            </h3>
                            <p className='text-gray-600 mb-4'>
                                {__('Download all your documentation as a JSON file. This includes all docs, their hierarchy, metadata, and tags.', 'wedocs')}
                            </p>
                            
                            {exportSuccess && (
                                <div className='mb-4 p-4 bg-green-50 border border-green-200 rounded-md'>
                                    <div className='flex items-center'>
                                        <svg className='w-5 h-5 text-green-600 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                                        </svg>
                                        <p className='text-green-800'>{__('Export completed successfully!', 'wedocs')}</p>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleExport}
                                disabled={isExporting}
                                className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                                    isExporting 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                }`}
                            >
                                {isExporting ? (
                                    <Fragment>
                                        <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' fill='none' viewBox='0 0 24 24'>
                                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                                            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
                                        </svg>
                                        {__('Exporting...', 'wedocs')}
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <svg className='-ml-1 mr-2 h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' />
                                        </svg>
                                        {__('Export Documentation', 'wedocs')}
                                    </Fragment>
                                )}
                            </button>
                        </div>

                        {/* Import Section */}
                        <div className='p-6 border border-gray-200 rounded-lg'>
                            <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                                {__('Import Documentation', 'wedocs')}
                            </h3>
                            <p className='text-gray-600 mb-4'>
                                {__('Upload a previously exported JSON file to import documentation. Existing docs with the same slug will be skipped.', 'wedocs')}
                            </p>

                            {importSuccess && importResult && (
                                <div className='mb-4 p-4 bg-green-50 border border-green-200 rounded-md'>
                                    <div className='flex items-start'>
                                        <svg className='w-5 h-5 text-green-600 mr-2 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                                        </svg>
                                        <div>
                                            <p className='text-green-800 font-semibold mb-1'>{__('Import completed!', 'wedocs')}</p>
                                            <p className='text-green-700 text-sm'>
                                                {importResult.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    {__('Select JSON file', 'wedocs')}
                                </label>
                                <input
                                    id='import-file-input'
                                    type='file'
                                    accept='.json'
                                    onChange={handleFileChange}
                                    className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100'
                                />
                            </div>

                            <button
                                onClick={handleImport}
                                disabled={isImporting || !importFile}
                                className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                                    isImporting || !importFile
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                }`}
                            >
                                {isImporting ? (
                                    <Fragment>
                                        <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' fill='none' viewBox='0 0 24 24'>
                                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                                            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
                                        </svg>
                                        {__('Importing...', 'wedocs')}
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <svg className='-ml-1 mr-2 h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' />
                                        </svg>
                                        {__('Import Documentation', 'wedocs')}
                                    </Fragment>
                                )}
                            </button>

                            <div className='mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md'>
                                <p className='text-yellow-800 text-sm'>
                                    <strong>{__('Note:', 'wedocs')}</strong> {__('Existing documentation with the same slug will not be overwritten. Only new documentation will be created.', 'wedocs')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExportImport;
