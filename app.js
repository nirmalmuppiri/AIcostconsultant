// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const uploadBtn = document.getElementById('uploadBtn');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const processing = document.getElementById('processing');
    const results = document.getElementById('results');
    
    // Before/After slider elements
    const comparisonContainer = document.getElementById('comparisonContainer');
    const sliderHandle = document.getElementById('sliderHandle');
    const beforeImage = document.getElementById('beforeImage');
    
    // Feature cards
    const excelCard = document.getElementById('excelCard');
    const xmlCard = document.getElementById('xmlCard');
    const dashboardCard = document.getElementById('dashboardCard');

    // Before/After Slider Logic
    let isDragging = false;
    const leftLabel = document.querySelector('.comparison-label-left');
    const rightLabel = document.querySelector('.comparison-label-right');

    function updateSlider(x) {
        const rect = comparisonContainer.getBoundingClientRect();
        const offsetX = x - rect.left;
        const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
        
        sliderHandle.style.left = percentage + '%';
        beforeImage.style.width = percentage + '%';

        leftLabel.style.opacity =  percentage / 100;
        rightLabel.style.opacity = 1 - percentage / 100;
    }

    sliderHandle.addEventListener('mousedown', function(e) {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            updateSlider(e.clientX);
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // Touch events for mobile
    sliderHandle.addEventListener('touchstart', function(e) {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('touchmove', function(e) {
        if (isDragging) {
            updateSlider(e.touches[0].clientX);
        }
    });

    document.addEventListener('touchend', function() {
        isDragging = false;
    });

    // Click anywhere on comparison to move slider
    comparisonContainer.addEventListener('click', function(e) {
        if (!isDragging && e.target !== sliderHandle && !sliderHandle.contains(e.target)) {
            updateSlider(e.clientX);
        }
    });

    // Create confetti animation
    function createConfetti() {
        const colors = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];
        
        for (let i = 0; i < 40; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Get button position for confetti origin
            const rect = uploadBtn.getBoundingClientRect();
            confetti.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 200) + 'px';
            confetti.style.top = (rect.top + rect.height / 2) + 'px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = (Math.random() * 0.2) + 's';
            
            // Random size
            const size = 8 + Math.random() * 8;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            
            // Random shape (circle or square)
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            document.body.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => confetti.remove(), 1200);
        }
    }

    // Handle upload button click
    uploadBtn.addEventListener('click', function() {
        // Trigger confetti explosion
        createConfetti();
        
        // Disable button
        uploadBtn.disabled = true;
        uploadBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Uploaded!';
        
        // Show processing after short delay
        setTimeout(() => {
            step1.style.opacity = '0.5';
            processing.style.display = 'block';
        }, 600);

        // Show results and activate step 2
        setTimeout(() => {
            processing.style.display = 'none';
            results.style.display = 'block';
            
            step1.classList.remove('active');
            step1.classList.add('completed');
            step1.style.opacity = '1';
            
            step2.classList.remove('inactive');
            step2.classList.add('active');
            
            // Smooth scroll to step 2
            step2.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 2500);
    });

    // Feature card click handlers
    excelCard.addEventListener('click', function() {
        alert('Excel export coming soon! This will generate a structured spreadsheet with your transactions.');
    });

    xmlCard.addEventListener('click', function() {
        alert('XML export coming soon! This will create a machine-readable file for accounting software.');
    });

    dashboardCard.addEventListener('click', function() {
        alert('Dashboard coming soon! This will show AI-powered insights and spending analytics.');
    });
});
