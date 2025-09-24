const ProgressBar = ( { progress } ) => {
    return (
        <div className={ `wedocs-w-full wedocs-h-1.5 wedocs-rounded wedocs-bg-[#E2E8F0] wedocs-flex wedocs-items-center wedocs-my-24` }>
            <div
                style={ { width: `${ progress }%` } }
                className={ `wedocs-h-full wedocs-text-right wedocs-bg-[#4F46E5] wedocs-rounded wedocs-rounded-tr-none wedocs-rounded-br-none` }
            ></div>
            <div
                className={ `wedocs-w-12 wedocs-h-12 wedocs-text-white wedocs-flex wedocs-items-center wedocs-justify-center wedocs-text-sm wedocs-py-1 wedocs-px-0.5 wedocs-rounded-full wedocs-bg-[#4F46E5]` }
            >
                { `${progress}%` }
            </div>
        </div>
    )
}

export default ProgressBar;
