// Global variables
let currentColumn = null;
const modal = document.getElementById("modelModal");
// const closeBtn = document.getElementsByClassName("close")[0];

// Reset a column to its initial state
function resetColumn(columnId) {
    const column = document.getElementById(`column${columnId}`);
    const addButton = column.querySelector('.add-model-button');
    const options = column.querySelectorAll('.option');
    const connectors = column.querySelectorAll('.pipeline-connector');
    const trainButton = column.querySelector('.train-button');
    
    // Reset add button
    addButton.innerHTML = '<i class="fas fa-plus-circle"></i><span class="add-model-text"><strong>Add Model</strong></span>';
    addButton.style.border = '2px dashed #aaa';
    addButton.style.backgroundColor = '#f8f8f8';
    addButton.style.color = '#333';
    
    // Hide options and connectors
    options.forEach(option => {
        option.style.display = 'none';
        option.classList.remove('selected');
        option.style.backgroundColor = '';
        option.style.borderStyle = 'dashed';
    });
    
    connectors.forEach(connector => {
        connector.style.display = 'none';
    });
    
    // Reset and hide train button
    trainButton.style.display = 'none';
    trainButton.classList.remove('training', 'completed');
    trainButton.style.backgroundColor = '';
    trainButton.style.color = '';
    trainButton.innerHTML = 'Train';

    // Reset the column's data-model attribute
    column.setAttribute('data-model', '');
}

// Open the modal
function openModal(columnId) {
    const column = document.getElementById(`column${columnId}`);
    const addButton = column.querySelector('.add-model-button');
    
    // Check if a model is already selected
    if (addButton.textContent.trim() !== 'Add Model') {
        // If a model is selected, reset the column
        resetColumn(columnId);
    } else {
        // If no model is selected, open the modal
        currentColumn = columnId;
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Disable scrolling
    }
}

// Close the modal
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Enable scrolling
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// // Close modal event listeners
// closeBtn.onclick = closeModal;
// window.onclick = function(event) {
//     if (event.target == modal) {
//         closeModal();
//     }
// }

// Handle model selection
document.querySelectorAll('.select-model-btn').forEach(button => {
    button.addEventListener('click', function() {
        const model = this.getAttribute('data-model');
        selectModel(currentColumn, model);
        closeModal();
    });
});

// Select a model for a column
function selectModel(columnId, model) {
    const column = document.getElementById(`column${columnId}`);
    const addButton = column.querySelector('.add-model-button');
    const options = column.querySelectorAll('.option');
    const connectors = column.querySelectorAll('.pipeline-connector');
    
    addButton.innerHTML = `<span style="font-weight: bold;">${getModelName(model)}</span>`;
    addButton.style.border = '2px solid ' + getModelColor(model);
    addButton.style.backgroundColor = getLightModelColor(model);
    addButton.style.color = getModelColor(model);

    column.setAttribute('data-model', model); // Add this line
    
    options.forEach(option => {
        option.style.borderColor = getModelColor(model);
        option.style.display = 'flex';
    });
    
    connectors.forEach(connector => {
        connector.style.backgroundImage = `linear-gradient(to bottom, ${getModelColor(model)} 50%, transparent 50%)`;
        connector.style.display = 'block';
    });
    
    const trainButton = column.querySelector('.train-button');
    trainButton.style.backgroundColor = getLightModelColor(model);
    trainButton.style.color = getModelColor(model);
    trainButton.style.display = 'flex';
}

// Get the full name of the model
function getModelName(model) {
    switch(model) {
        case 'enet': return 'ENet (Baseline)';
        case 'vmunet': return 'VM-UNet';
        case 'sam2': return 'SAM2';
        default: return 'Unknown Model';
    }
}

// Get the color for the model
function getModelColor(model) {
    switch(model) {
        case 'enet': return '#0066cc';
        case 'vmunet': return '#cc6600';
        case 'sam2': return '#006600';
        default: return '#999';
    }
}

// Get the light color for the model
function getLightModelColor(model) {
    switch(model) {
        case 'enet': return '#e6f3ff';
        case 'vmunet': return '#fff0e6';
        case 'sam2': return '#e6ffe6';
        default: return '#f0f0f0';
    }
}

// Toggle option selection
function toggleOption(option) {
    option.classList.toggle('selected');
    const column = option.closest('.pipeline-column');
    const modelColor = column.querySelector('.add-model-button').style.color;
    if (option.classList.contains('selected')) {
        option.style.backgroundColor = getLightModelColor(getModelFromColor(modelColor));
        option.style.borderStyle = 'solid';
    } else {
        option.style.backgroundColor = '';
        option.style.borderStyle = 'dashed';
    }
}

// Get model from color
function getModelFromColor(color) {
    switch(color) {
        case 'rgb(0, 102, 204)': return 'enet';
        case 'rgb(204, 102, 0)': return 'vmunet';
        case 'rgb(0, 102, 0)': return 'sam2';
        default: return 'unknown';
    }
}

// Event listeners for options
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        toggleOption(this);
    });
});

// Handle train button click
document.querySelectorAll('.train-button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('training') || this.classList.contains('completed')) return; // Prevent clicks if training or completed

        const column = this.closest('.pipeline-column');
        const model = column.querySelector('.add-model-button span').textContent;
        const options = Array.from(column.querySelectorAll('.option.selected')).map(opt => opt.getAttribute('data-option'));
        
        console.log(`Training ${model} with options: ${options.join(', ')}`);
        
        // Start the training a nimation
        this.classList.add('training');
        const buttonText = this.querySelector('span');
        buttonText.textContent = 'Training...';
        const modelColor = getModelColor(getModelFromColor(this.style.color));

        setTimeout(() => {
            this.style.color = '#ffffff'; // Set text color to white for better contrast
        }, 2000);
        
        // After 5 seconds, complete the training
        setTimeout(() => {
            this.classList.remove('training');
            this.classList.add('completed');
            buttonText.textContent = 'Training Complete!';
            
            // Set the background color to match the filled state
            this.style.backgroundColor = modelColor;
            this.style.color = '#ffffff'; // Set text color to white for better contrast
        }, 5000);
    });
});

// Initialize pipeline
function initializePipeline() {
    document.querySelectorAll('.pipeline-column').forEach(column => {
        const options = column.querySelectorAll('.option');
        const connectors = column.querySelectorAll('.pipeline-connector');
        const trainButton = column.querySelector('.train-button');
        
        options.forEach(option => option.style.display = 'none');
        connectors.forEach(connector => connector.style.display = 'none');
        trainButton.style.display = 'none';
    });
}

// Call initialize function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePipeline);

// Add smooth scrolling for mobile (if needed)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});