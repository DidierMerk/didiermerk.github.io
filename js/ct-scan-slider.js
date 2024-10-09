document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('ct-scan-slider');
    const ctScanImage = document.getElementById('ct-scan-image');
    const overlayImage = document.getElementById('overlay-image');
    const sliderInfo = document.getElementById('slider-info');
    const buttons = document.querySelectorAll('.button-group button');
    const legend = document.getElementById('legend');
    
    let currentOverlay = 'off';

    function updateImages(sliceNumber) {
        // Update CT scan image
        ctScanImage.src = `images/CT27/${sliceNumber.toString().padStart(4, '0')}.png`;
        
        // Update overlay image if necessary
        if (currentOverlay === 'wrong') {
            overlayImage.src = `images/GT27_wrong/${sliceNumber.toString().padStart(4, '0')}.png`;
            overlayImage.style.display = 'block';
            legend.style.display = 'block';
        } else if (currentOverlay === 'corrected') {
            overlayImage.src = `images/GT27_correct/${sliceNumber.toString().padStart(4, '0')}.png`;
            overlayImage.style.display = 'block';
            legend.style.display = 'block';
        } else {
            overlayImage.style.display = 'none';
            legend.style.display = 'none';
        }

        // Update slider info
        sliderInfo.textContent = `${sliceNumber} / 211`;
    }

    slider.addEventListener('input', function() {
        updateImages(parseInt(this.value));
    });

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentOverlay = this.getAttribute('data-overlay');
            updateImages(parseInt(slider.value));
        });
    });

    // Initialize with first image
    updateImages(0);
});