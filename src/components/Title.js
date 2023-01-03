const Title = ({ obj, count }) => {
    // const id   = obj?.id,
    //     title  = obj?.title?.rendered,
    //     status = obj?.status;
    const { id, title, status } = obj || {};

    return (
        <>
            { obj?.caps?.edit ? (
                <a target="_blank" href={ `${window.location.origin}/wp-admin/post.php?action=edit&post=${ id }` }>
                    { title?.rendered } { status !== 'publish' ? <span className="doc-status">{ status }</span> : null }
                    { ( count && count > 0 ) && <span className="count">{ count }</span> }
                </a>
            ) : (
                <span>
                    { title?.rendered } { status !== 'publish' ? <span className="doc-status">{ status }</span> : null }
                    { ( count && count > 0 ) && <span className="count">{ count }</span> }
                </span>
            ) }
        </>
    );
}

export default Title;
