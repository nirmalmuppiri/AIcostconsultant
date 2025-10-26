// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    // DOM elements
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const progressContainer = document.getElementById('progressContainer');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const resultArea = document.getElementById('resultArea');
    const textOutput = document.getElementById('textOutput');
    const pageCount = document.getElementById('pageCount');
    const charCount = document.getElementById('charCount');
    const btnClear = document.getElementById('btnClear');

    // Click to upload
    uploadArea.addEventListener('click', () => fileInput.click());

// Drag and drop handlers
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
        handleFile(files[0]);
    }
});

// File input change
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

// Clear button
btnClear.addEventListener('click', () => {
    resultArea.style.display = 'none';
    progressContainer.style.display = 'none';
    uploadArea.style.display = 'block';
    fileInput.value = '';
    textOutput.textContent = '';
});

// Main file processing function
async function handleFile(file) {
    // Hide upload area, show progress
    uploadArea.style.display = 'none';
    progressContainer.style.display = 'block';
    resultArea.style.display = 'none';
    
    // Simulate upload progress
    progressFill.style.width = '30%';
    progressText.textContent = 'Loading PDF...';
    
    try {
        // Read file as array buffer
        const arrayBuffer = await file.arrayBuffer();
        
        progressFill.style.width = '50%';
        progressText.textContent = 'Parsing document...';
        
        // Load PDF
        const pdf = await pdfjsLib.getDocument({data: arrayBuffer}).promise;
        const numPages = pdf.numPages;
        
        progressFill.style.width = '70%';
        progressText.textContent = `Extracting text from ${numPages} pages...`;
        
        let fullText = '';
        
        // Extract text from each page
        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += `\n\n--- Page ${i} ---\n\n${pageText}`;
            
            // Update progress
            const progress = 70 + (i / numPages) * 30;
            progressFill.style.width = progress + '%';
            progressText.textContent = `Extracting page ${i} of ${numPages}...`;
        }
        
        // Complete
        progressFill.style.width = '100%';
        progressText.textContent = 'Complete!';
        
        // Show results
        setTimeout(() => {
            progressContainer.style.display = 'none';
            resultArea.style.display = 'block';
            textOutput.textContent = fullText.trim();
            pageCount.textContent = numPages;
            charCount.textContent = fullText.length.toLocaleString();
        }, 500);
        
    } catch (error) {
        console.error('Error processing PDF:', error);
        progressText.textContent = 'Error processing PDF. Please try another file.';
        progressText.style.color = '#ff4757';
        
        setTimeout(() => {
            progressContainer.style.display = 'none';
            uploadArea.style.display = 'block';
        }, 2000);
    }
}

}); // End of DOMContentLoaded
