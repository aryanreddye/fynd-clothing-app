// Welcome Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add entrance animation to elements
    const logoContainer = document.querySelector('.logo-container');
    const enterBtn = document.querySelector('.enter-btn');
    
    // Add entrance animation to logo container
    if (logoContainer) {
        logoContainer.style.opacity = '0';
        logoContainer.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            logoContainer.style.transition = 'all 1s ease-out';
            logoContainer.style.opacity = '1';
            logoContainer.style.transform = 'scale(1)';
        }, 500);
    }
    
    // Add hover effect to the enter button
    if (enterBtn) {
        enterBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        enterBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add click effect
        enterBtn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
