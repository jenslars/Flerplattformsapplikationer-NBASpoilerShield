(async function() {
    'use strict';

    console.log("Vi är i youtube home");

    async function fetchBlockedGames() {
        const response = await browser.runtime.sendMessage({action: "fetchBlockedGames"});
        return response.data || [];
    }

    const spoilerData = await fetchBlockedGames();
    console.log("Spoiler Data:", spoilerData);

    function createOverlay(rendererElement, containsSpoiler, overlayClass, spoilerClass) {
        if (!rendererElement.querySelector('.' + overlayClass)) {
            const overlay = document.createElement('div');
            overlay.className = overlayClass;
            overlay.textContent = 'This video may contain spoilers';

            const spoiler = document.createElement('div');
            spoiler.className = spoilerClass;
            spoiler.textContent = 'Title contains the name: ' + containsSpoiler;

            overlay.appendChild(spoiler);

            overlay.addEventListener('click', () => {
                console.log("Click event triggered on overlay for", containsSpoiler);
                overlay.classList.add('removed');
            });

            rendererElement.style.position = 'relative';
            rendererElement.appendChild(overlay);
        }
    }

    function checkAndApplySpoilers(renderer, titleSelector, overlayClass, spoilerClass) {
        const titleText = renderer.querySelector(titleSelector)?.textContent.toLowerCase() || "";
        const titleWords = new Set(titleText.split(" "));

        spoilerData.forEach(spoilerObject => {
            if (!spoilerObject.data || !Array.isArray(spoilerObject.data)) {
                console.error('Invalid spoiler data format:', spoilerObject);
                return;
            }

            spoilerObject.data.forEach(spoiler => {
                if (typeof spoiler !== 'string') {
                    console.error('Non-string value encountered in data:', spoiler);
                    return;
                }

                const spoilerWords = spoiler.toLowerCase().split(" ");
                const isSpoiler = spoilerWords.some(word => titleWords.has(word));

                if (isSpoiler) {
                    createOverlay(renderer, spoiler, overlayClass, spoilerClass);
                }
            });
        });
    }

    function hideSpoilers() {
        document.querySelectorAll('ytd-rich-grid-media, ytd-rich-grid-slim-media, style-scope ytd-rich-item-renderer').forEach(renderer => {
            const isVideo = renderer.matches('ytd-rich-grid-media');
            const isReel = renderer.matches('ytd-rich-grid-slim-media');
            const isPost = renderer.matches('style-scope ytd-rich-item-renderer');

            if (isVideo) {
                checkAndApplySpoilers(renderer, '#video-title', 'ytd-rich-grid-media-overlay', 'ytd-rich-grid-media-spoiler-content');
            } else if (isReel) {
                checkAndApplySpoilers(renderer, '#video-title', 'ytd-rich-grid-slim-media-overlay', 'ytd-rich-grid-slim-media-spoiler-content');
            } else if (isPost) {
                checkAndApplySpoilers(renderer, '#post-text', 'ytd-rich-item-overlay', 'ytd-rich-item-spoiler-content');
            }
        });
    }

    const observer = new MutationObserver(hideSpoilers);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    hideSpoilers();
})();
