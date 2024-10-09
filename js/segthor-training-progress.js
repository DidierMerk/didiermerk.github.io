document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('trainingProgressSlider');
    const progressImage = document.querySelector('.training-progress-image');
    const epochInfo = document.querySelector('.training-epoch-info');
    
    function updateTrainingProgress(epoch) {
        // Update progress image
        progressImage.src = `images/Segthor/Training/result_png/iter${epoch.toString().padStart(3, '0')}_Patient_01_0129.png`;
        
        // Update epoch info
        epochInfo.textContent = `Epoch: ${epoch + 1} / 20`;
    }

    slider.addEventListener('input', function() {
        updateTrainingProgress(parseInt(this.value));
    });

    // Initialize with first image
    updateTrainingProgress(0);
});