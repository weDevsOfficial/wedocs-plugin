const ProgressBar = ( { progress } ) => {
    return (
        <div className={ `w-full h-1.5 rounded bg-[#E2E8F0] flex items-center my-24` }>
            <div
                style={ { width: `${ progress }%` } }
                className={ `h-full text-right bg-[#4F46E5] rounded rounded-tr-none rounded-br-none` }
            ></div>
            <div
                className={ `w-12 h-12 text-white flex items-center justify-center text-sm py-1 px-0.5 rounded-full bg-[#4F46E5]` }
            >
                { `${progress}%` }
            </div>
        </div>
    )
}

export default ProgressBar;
