/**
 * Helpful Feedback Frontend JavaScript
 * Handles AJAX voting functionality
 */

(function($) {
    'use strict';

    class WedocsHelpfulFeedback {
        constructor() {
            this.init();
        }

        init() {
            this.bindEvents();
        }

        bindEvents() {
            $(document).on('click', '.wedocs-feedback-button', this.handleVote.bind(this));
        }

        handleVote(e) {
            e.preventDefault();

            const $button = $(e.currentTarget);
            const $container = $button.closest('.wedocs-helpful-feedback');
            const vote = $button.data('vote');
            const postId = $container.data('post-id');
            const allowAnonymous = $container.data('allow-anonymous');
            const thankYouMessage = $container.data('thank-you-message');

            // Check if already voting
            if ($container.hasClass('loading')) {
                return;
            }

            // Validate required data
            if (!vote || !postId) {
                this.showError($container, 'Invalid voting data');
                return;
            }

            // Show loading state
            this.setLoadingState($container, true);

            // Prepare AJAX data
            const ajaxData = {
                action: 'wedocs_helpful_feedback_vote',
                post_id: postId,
                vote: vote,
                allow_anonymous: allowAnonymous,
                nonce: wedocsHelpfulFeedback.nonce
            };

            // Send AJAX request
            $.ajax({
                url: wedocsHelpfulFeedback.ajax_url,
                type: 'POST',
                data: ajaxData,
                dataType: 'json',
                success: (response) => {
                    this.handleVoteSuccess(response, $container, vote, thankYouMessage);
                },
                error: (xhr, status, error) => {
                    this.handleVoteError(xhr, $container);
                },
                complete: () => {
                    this.setLoadingState($container, false);
                }
            });
        }

        handleVoteSuccess(response, $container, vote, thankYouMessage) {
            if (response.success) {
                // Update vote counts
                this.updateVoteCounts($container, response.data.yes_votes, response.data.no_votes);

                // Show thank you message
                this.showThankYou($container, vote, thankYouMessage, response.data);

                // Mark as voted
                $container.addClass('has-voted voted-' + vote);

                // Fire custom event
                $(document).trigger('wedocs:feedback:voted', {
                    container: $container,
                    vote: vote,
                    data: response.data
                });
            } else {
                this.showError($container, response.data.message || 'Voting failed');
            }
        }

        handleVoteError(xhr, $container) {
            let errorMessage = 'An error occurred while voting';

            if (xhr.responseJSON && xhr.responseJSON.data && xhr.responseJSON.data.message) {
                errorMessage = xhr.responseJSON.data.message;
            } else if (xhr.status === 403) {
                errorMessage = 'You are not authorized to vote';
            } else if (xhr.status === 429) {
                errorMessage = 'Too many requests. Please try again later';
            }

            this.showError($container, errorMessage);
        }

        updateVoteCounts($container, yesVotes, noVotes) {
            const showVoteCount = $container.find('.vote-count').length > 0;

            if (showVoteCount) {
                $container.find('.wedocs-feedback-yes .vote-count').text('(' + yesVotes + ')');
                $container.find('.wedocs-feedback-no .vote-count').text('(' + noVotes + ')');
            }
        }

        showThankYou($container, vote, thankYouMessage, data) {
            const $title = $container.find('.wedocs-feedback-title');
            const $buttons = $container.find('.wedocs-feedback-buttons');

            // Create thank you content
            const voteIcon = vote === 'yes'
                ? '<svg viewBox="0 0 24 24" fill="currentColor" style="width: 24px; height: 24px; color: #4CAF50;"><path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558-.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z"/></svg>'
                : '<svg viewBox="0 0 24 24" fill="currentColor" style="width: 24px; height: 24px; color: #9e9e9e;"><path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z"/></svg>';

            const voteText = vote === 'yes' ? 'You found this helpful' : 'You found this not helpful';
            const showVoteCount = $container.find('.vote-count').length > 0;

            let voteSummary = '';
            if (showVoteCount) {
                voteSummary = `
                    <div class="wedocs-feedback-vote-summary">
                        <span class="vote-yes">${data.yes_votes} Yes</span>
                        <span class="vote-separator"> • </span>
                        <span class="vote-no">${data.no_votes} No</span>
                    </div>
                `;
            }

            const thankYouContent = `
                <div class="wedocs-feedback-thank-you">
                    <div class="wedocs-feedback-title" style="color: #28a745; margin-bottom: 16px;">
                        ${thankYouMessage}
                    </div>
                    <div class="wedocs-feedback-result">
                        <div class="wedocs-feedback-voted-option voted-${vote}" style="display: flex; align-items: center; gap: 8px; justify-content: ${$container.hasClass('left') ? 'flex-start' : $container.hasClass('right') ? 'flex-end' : 'center'}; margin-bottom: 10px;">
                            <span class="wedocs-feedback-icon">${voteIcon}</span>
                            ${voteText}
                        </div>
                        ${voteSummary}
                    </div>
                </div>
            `;

            // Fade out buttons and fade in thank you message
            $buttons.fadeOut(300, function() {
                $title.fadeOut(200, function() {
                    $container.append(thankYouContent);
                    $container.find('.wedocs-feedback-thank-you').hide().fadeIn(400);
                });
            });
        }

        showError($container, message) {
            // Remove any existing error messages
            $container.find('.wedocs-feedback-error').remove();

            // Create error message element
            const $error = $('<div class="wedocs-feedback-error" style="color: #dc3545; margin-top: 10px; padding: 8px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; font-size: 14px;"></div>');
            $error.text(message);

            // Append error message
            $container.append($error);

            // Auto-hide error after 5 seconds
            setTimeout(() => {
                $error.fadeOut(300, function() {
                    $error.remove();
                });
            }, 5000);
        }

        setLoadingState($container, loading) {
            if (loading) {
                $container.addClass('loading');
                $container.find('.wedocs-feedback-button').prop('disabled', true);
            } else {
                $container.removeClass('loading');
                $container.find('.wedocs-feedback-button').prop('disabled', false);
            }
        }
    }

    // Initialize when document is ready
    $(document).ready(function() {
        // Only initialize if we have the required globals
        if (typeof wedocsHelpfulFeedback !== 'undefined') {
            new WedocsHelpfulFeedback();
        }
    });

    // Expose class globally for extensibility
    window.WedocsHelpfulFeedback = WedocsHelpfulFeedback;

})(jQuery);
