// Main JavaScript file
console.log('Base UI Clone Loaded (Standalone Mode)');

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.getElementById('sidebar');

// Create overlay for mobile menu
const overlay = document.createElement('div');
overlay.className = 'fixed inset-0 bg-black/20 z-30 hidden lg:hidden backdrop-blur-sm transition-opacity opacity-0';
document.body.appendChild(overlay);

function toggleMenu() {
    const isOpen = !sidebar.classList.contains('-translate-x-full');

    if (isOpen) {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    } else {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        // Force reflow
        overlay.offsetHeight;
        overlay.classList.remove('opacity-0');
    }
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
}

// Copy to Clipboard Logic
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const codeBlock = btn.closest('.bg-code').querySelector('code');
        const text = codeBlock.innerText;

        try {
            await navigator.clipboard.writeText(text);

            // Visual feedback
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            btn.classList.add('text-green-500');

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('text-green-500');
            }, 2000);

        } catch (err) {
            console.error('Failed to copy!', err);
        }
    });
});
