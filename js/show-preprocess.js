document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.image-comparison-slider');

    sliders.forEach((slider, index) => {
        const sliderHandle = slider.querySelector('.slider-handle');
        const imageBefore = slider.querySelector('.image-before');
        let isResizing = false;

        function setSliderPosition(percent) {
            sliderHandle.style.left = `${percent}%`;
            imageBefore.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
        }

        function startResize(e) {
            e.preventDefault();
            isResizing = true;
        }

        function stopResize() {
            isResizing = false;
        }

        function resize(e) {
            if (!isResizing && e.type !== 'init') return;

            const sliderRect = slider.getBoundingClientRect();
            let x;
            if (e.type === 'init') {
                x = sliderRect.width * e.initPercent / 100;
            } else {
                x = (e.clientX || e.touches[0].clientX) - sliderRect.left;
            }
            const percent = Math.min(Math.max(x / sliderRect.width * 100, 0), 100);
            setSliderPosition(percent);
        }

        sliderHandle.addEventListener('mousedown', startResize);
        slider.addEventListener('mousemove', resize);
        slider.addEventListener('mouseleave', stopResize);
        document.addEventListener('mouseup', stopResize);

        sliderHandle.addEventListener('touchstart', startResize);
        slider.addEventListener('touchmove', resize);
        slider.addEventListener('touchend', stopResize);

        // Initialize the slider position
        let initPercent;
        if (index === 0) { // First slider (left visualization)
            initPercent = 82; // Set to 100% (fully showing the "before" image)
        } else { // Other sliders (including the right visualization)
            initPercent = 50; // Set to 50% (middle position)
        }
        resize({ type: 'init', initPercent: initPercent });
    });
});