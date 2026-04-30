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
                // Mark as voted
                $container.addClass('has-voted voted-' + vote);

                // Show thank you message (hides content, full-width centered)
                this.showThankYou($container, thankYouMessage);

                // Fire custom event
                $(document).trigger('wedocs:feedback:voted', {
                    container: $container,
                    vote: vote,
                    data: response.data
                });
            } else if (response.data && response.data.already_voted) {
                // User already voted — hide content, show full-width centered message
                this.showFullMessage($container, response.data.message, 'already-voted');
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

        showThankYou($container, thankYouMessage) {
            this.showFullMessage($container, thankYouMessage, 'thank-you');
        }

        showFullMessage($container, message, type) {
            const $children = $container.children(':not(.wedocs-feedback-full-message)');

            $children.fadeOut(250, () => {
                $container.find('.wedocs-feedback-full-message').remove();

                const color = type === 'already-voted' ? '#dc3545' : 'inherit';
                const $msg = $(`<div class="wedocs-feedback-full-message wedocs-feedback-full-message--${type}" style="width: 100%; display: flex; align-items: center; justify-content: center; text-align: center; min-height: 40px; font-size: 14px; color: ${color};"></div>`);
                $msg.text(message);

                $container.append($msg);
                $msg.hide().fadeIn(300);
            });
        }

        showError($container, message) {
            // Remove any existing error messages
            $container.find('.wedocs-feedback-error').remove();

            const $error = $('<div class="wedocs-feedback-error" style="color: #dc3545; margin-top: 10px; padding: 8px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; font-size: 14px;"></div>');
            $error.text(message);

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
