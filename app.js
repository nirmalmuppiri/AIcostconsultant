// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const pdfCard = document.getElementById('pdfCard');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const processing = document.getElementById('processing');
    const results = document.getElementById('results');
    
    // Feature cards
    const excelCard = document.getElementById('excelCard');
    const xmlCard = document.getElementById('xmlCard');
    const dashboardCard = document.getElementById('dashboardCard');

    // Create confetti animation
    function createConfetti() {
        const colors = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];
        
        for (let i = 0; i < 40; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Get card position for confetti origin
            const rect = pdfCard.getBoundingClientRect();
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

    // Handle PDF card click
    pdfCard.addEventListener('click', function() {
        if (!this.classList.contains('checked')) {
            // Add checkmark
            this.classList.add('checked');
            
            // Trigger confetti explosion
            createConfetti();
            
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
        }
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
