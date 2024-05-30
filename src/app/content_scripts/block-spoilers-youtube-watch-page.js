(async function() {
    'use strict';

    console.log('Vi är youtube watch page');
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
        document.querySelectorAll('ytd-compact-video-renderer, ytd-reel-item-renderer, style-scope ytd-rich-item-renderer').forEach(renderer => {
            const isVideo = renderer.matches('ytd-compact-video-renderer');
            const isReel = renderer.matches('ytd-reel-item-renderer');
            console.log(isVideo);

            if (isVideo) {
                checkAndApplySpoilers(renderer, '#video-title', 'ytd-compact-video-renderer-overlay', 'ytd-compact-video-renderer-spoiler-content');
            } else if (isReel) {
                checkAndApplySpoilers(renderer, '#video-title', 'ytd-reel-item-renderer-overlay', 'ytd-reel-item-renderer-spoiler-content');
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
