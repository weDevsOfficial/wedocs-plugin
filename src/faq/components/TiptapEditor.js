// DESCRIPTION: Reusable rich-text editor component built on Tiptap.
// Toolbar: Bold, Italic, Underline, Strikethrough, Code, Normal/Heading dropdown, Alignments, Highlight, Link/Unlink, Lists.

import { __ } from '@wordpress/i18n';
import { useState, useRef, useEffect } from '@wordpress/element';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';

const ToolbarButton = ( { onClick, isActive, disabled, title, children } ) => (
    <button
        type="button"
        onClick={ onClick }
        disabled={ disabled }
        title={ title }
        className={ `p-1.5 rounded text-sm leading-none transition-colors ${
            isActive
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
        } disabled:opacity-40 disabled:cursor-not-allowed` }
    >
        { children }
    </button>
);

const ToolbarDivider = () => (
    <span className="w-px h-5 bg-gray-300 mx-0.5" />
);

const BlockTypeDropdown = ( { editor } ) => {
    const [ isOpen, setIsOpen ] = useState( false );
    const dropdownRef = useRef( null );

    useEffect( () => {
        const handleClickOutside = ( e ) => {
            if ( dropdownRef.current && ! dropdownRef.current.contains( e.target ) ) {
                setIsOpen( false );
            }
        };
        document.addEventListener( 'mousedown', handleClickOutside );
        return () => document.removeEventListener( 'mousedown', handleClickOutside );
    }, [] );

    const getCurrentLabel = () => {
        if ( editor.isActive( 'heading', { level: 2 } ) ) {
            return __( 'Heading 2', 'wedocs' );
        }
        if ( editor.isActive( 'heading', { level: 3 } ) ) {
            return __( 'Heading 3', 'wedocs' );
        }
        if ( editor.isActive( 'heading', { level: 4 } ) ) {
            return __( 'Heading 4', 'wedocs' );
        }
        return __( 'Normal', 'wedocs' );
    };

    const options = [
        {
            label: __( 'Normal', 'wedocs' ),
            action: () => editor.chain().focus().setParagraph().run(),
            isActive: ! editor.isActive( 'heading' ),
        },
        {
            label: __( 'Heading 2', 'wedocs' ),
            action: () => editor.chain().focus().toggleHeading( { level: 2 } ).run(),
            isActive: editor.isActive( 'heading', { level: 2 } ),
        },
        {
            label: __( 'Heading 3', 'wedocs' ),
            action: () => editor.chain().focus().toggleHeading( { level: 3 } ).run(),
            isActive: editor.isActive( 'heading', { level: 3 } ),
        },
        {
            label: __( 'Heading 4', 'wedocs' ),
            action: () => editor.chain().focus().toggleHeading( { level: 4 } ).run(),
            isActive: editor.isActive( 'heading', { level: 4 } ),
        },
    ];

    return (
        <div ref={ dropdownRef } className="relative">
            <button
                type="button"
                onClick={ () => setIsOpen( ! isOpen ) }
                className="flex items-center gap-1 px-2 py-1 rounded text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-colors min-w-[90px]"
            >
                <span>{ getCurrentLabel() }</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
            { isOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[130px] py-1">
                    { options.map( ( opt ) => (
                        <button
                            key={ opt.label }
                            type="button"
                            onClick={ () => {
                                opt.action();
                                setIsOpen( false );
                            } }
                            className={ `block w-full text-left px-3 py-1.5 text-sm transition-colors ${
                                opt.isActive
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }` }
                        >
                            { opt.label }
                        </button>
                    ) ) }
                </div>
            ) }
        </div>
    );
};

const Toolbar = ( { editor } ) => {
    if ( ! editor ) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes( 'link' ).href;
        // eslint-disable-next-line no-alert
        const url = window.prompt( __( 'Enter URL', 'wedocs' ), previousUrl || 'https://' );

        if ( url === null ) {
            return;
        }

        if ( url === '' ) {
            editor.chain().focus().extendMarkRange( 'link' ).unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange( 'link' ).setLink( { href: url } ).run();
    };

    return (
        <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-gray-300 bg-gray-50 rounded-t-md flex-wrap">
            { /* Bold */ }
            <ToolbarButton
                onClick={ () => editor.chain().focus().toggleBold().run() }
                isActive={ editor.isActive( 'bold' ) }
                title={ __( 'Bold', 'wedocs' ) }
            >
                <strong>B</strong>
            </ToolbarButton>

            { /* Italic */ }
            <ToolbarButton
                onClick={ () => editor.chain().focus().toggleItalic().run() }
                isActive={ editor.isActive( 'italic' ) }
                title={ __( 'Italic', 'wedocs' ) }
            >
                <em>I</em>
            </ToolbarButton>

            { /* Underline */ }
            <ToolbarButton
                onClick={ () => editor.chain().focus().toggleUnderline().run() }
                isActive={ editor.isActive( 'underline' ) }
                title={ __( 'Underline', 'wedocs' ) }
            >
                <span className="underline">U</span>
            </ToolbarButton>

            { /* Strikethrough */ }
            <ToolbarButton
                onClick={ () => editor.chain().focus().toggleStrike().run() }
                isActive={ editor.isActive( 'strike' ) }
                title={ __( 'Strikethrough', 'wedocs' ) }
            >
                <span className="line-through">S</span>
            </ToolbarButton>

            { /* Inline Code */ }
            <ToolbarButton
                onClick={ () => editor.chain().focus().toggleCode().run() }
                isActive={ editor.isActive( 'code' ) }
                title={ __( 'Inline Code', 'wedocs' ) }
            >
                <span className="font-mono text-xs">{ '{}' }</span>
            </ToolbarButton>

            <ToolbarDivider />

            { /* Block type dropdown (Normal / Heading) */ }
            <BlockTypeDropdown editor={ editor } />

            <ToolbarDivider />

            { /* Align Left */ }
            <ToolbarButton
                onClick={ () => editor.chain().focus().setTextAlign( 'left' ).run() }
                isActive={ editor.isActive( { textAlign: 'left' } ) }
                title={ __( 'Align Left', 'wedocs' ) }
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="17" y1="10" x2="3" y2="10" />
                    <line x1="21" y1="6" x2="3" y2="6" />
                    <line x1="21" y1="14" x2="3" y2="14" />
                    <line x1="17" y1="18" x2="3" y2="18" />
                </svg>
            </ToolbarButton>

            { /* Align Center */ }
            <ToolbarButton
                onClick={ () => editor.chain().focus().setTextAlign( 'center' ).run() }
                isActive={ editor.isActive( { textAlign: 'center' } ) }
                title={ __( 'Align Center', 'wedocs' ) }
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="10" x2="6" y2="10" />
                    <line x1="21" y1="6" x2="3" y2="6" />
                    <line x1="21" y1="14" x2="3" y2="14" />
                    <line x1="18" y1="18" x2="6" y2="18" />
                </svg>
            </ToolbarButton>

            { /* Align Right */ }
            <ToolbarButton
                onClick={ () => editor.chain().focus().setTextAlign( 'right' ).run() }
                isActive={ editor.isActive( { textAlign: 'right' } ) }
                title={ __( 'Align Right', 'wedocs' ) }
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="21" y1="10" x2="7" y2="10" />
                    <line x1="21" y1="6" x2="3" y2="6" />
                    <line x1="21" y1="14" x2="3" y2="14" />
                    <line x1="21" y1="18" x2="7" y2="18" />
                </svg>
            </ToolbarButton>

            { /* Align Justify */ }
            <ToolbarButton
                onClick={ () => editor.chain().focus().setTextAlign( 'justify' ).run() }
                isActive={ editor.isActive( { textAlign: 'justify' } ) }
                title={ __( 'Justify', 'wedocs' ) }
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="21" y1="10" x2="3" y2="10" />
                    <line x1="21" y1="6" x2="3" y2="6" />
                    <line x1="21" y1="14" x2="3" y2="14" />
                    <line x1="21" y1="18" x2="3" y2="18" />
                </svg>
            </ToolbarButton>

            <ToolbarDivider />

            { /* Highlight */ }
            <ToolbarButton
                onClick={ () => editor.chain().focus().toggleHighlight().run() }
                isActive={ editor.isActive( 'highlight' ) }
                title={ __( 'Highlight', 'wedocs' ) }
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
            </ToolbarButton>

            { /* Link */ }
            <ToolbarButton
                onClick={ setLink }
                isActive={ editor.isActive( 'link' ) }
                title={ __( 'Link', 'wedocs' ) }
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
            </ToolbarButton>

            { /* Unlink */ }
            <ToolbarButton
                onClick={ () => editor.chain().focus().unsetLink().run() }
                disabled={ ! editor.isActive( 'link' ) }
                title={ __( 'Unlink', 'wedocs' ) }
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
            </ToolbarButton>

            <ToolbarDivider />

            { /* Bullet List */ }
            <ToolbarButton
                onClick={ () => editor.chain().focus().toggleBulletList().run() }
                isActive={ editor.isActive( 'bulletList' ) }
                title={ __( 'Bullet List', 'wedocs' ) }
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <circle cx="3" cy="6" r="1" fill="currentColor" />
                    <circle cx="3" cy="12" r="1" fill="currentColor" />
                    <circle cx="3" cy="18" r="1" fill="currentColor" />
                </svg>
            </ToolbarButton>

            { /* Ordered List */ }
            <ToolbarButton
                onClick={ () => editor.chain().focus().toggleOrderedList().run() }
                isActive={ editor.isActive( 'orderedList' ) }
                title={ __( 'Ordered List', 'wedocs' ) }
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="10" y1="6" x2="21" y2="6" />
                    <line x1="10" y1="12" x2="21" y2="12" />
                    <line x1="10" y1="18" x2="21" y2="18" />
                    <text x="1" y="8" fontSize="8" fill="currentColor" stroke="none" fontFamily="sans-serif">1</text>
                    <text x="1" y="14" fontSize="8" fill="currentColor" stroke="none" fontFamily="sans-serif">2</text>
                    <text x="1" y="20" fontSize="8" fill="currentColor" stroke="none" fontFamily="sans-serif">3</text>
                </svg>
            </ToolbarButton>

        </div>
    );
};

const TiptapEditor = ( { content, onChange, placeholder, hasError, id } ) => {
    const editor = useEditor( {
        extensions: [
            StarterKit.configure( {
                heading: { levels: [ 2, 3, 4 ] },
            } ),
            Underline,
            Link.configure( {
                openOnClick: false,
                HTMLAttributes: { rel: 'noopener noreferrer nofollow' },
            } ),
            Placeholder.configure( {
                placeholder: placeholder || __( 'Write your answer here...', 'wedocs' ),
            } ),
            TextAlign.configure( {
                types: [ 'heading', 'paragraph' ],
            } ),
            Highlight,
        ],
        content: content || '',
        onUpdate: ( { editor: ed } ) => {
            const html = ed.getHTML();
            // Tiptap returns '<p></p>' for empty content.
            onChange( html === '<p></p>' ? '' : html );
        },
    } );

    return (
        <div
            id={ id }
            className={ `wedocs-tiptap-editor border rounded-md bg-white overflow-hidden ${
                hasError ? '!border-red-500' : '!border-gray-300'
            }` }
        >
            <Toolbar editor={ editor } />
            <EditorContent
                editor={ editor }
                className="wedocs-tiptap-content prose prose-sm max-w-none px-3 py-2 min-h-[150px] text-gray-900 text-base focus-within:outline-none"
            />
        </div>
    );
};

export default TiptapEditor;
