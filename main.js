// Main JavaScript file (Standalone Mode)
console.log('Base UI Clone Loaded');

// Sitemap Data
const sitemap = [
    {
        title: null, // Root items
        items: [
            { text: 'Descripción General', href: 'index.html' },
            { text: 'Arquitectura del Sistema', href: 'system-architecture.html' },
            { text: 'Primeros Pasos', href: 'getting-started.html' },
            { text: 'Esquema de Base de Datos Core', href: 'core-database-schema.html' },
            { text: 'Entidades Core y Relaciones', href: 'core-entities-relationships.html' },
            { text: 'Esquema de Gestión de Solicitudes de Acceso', href: 'access-request-schema.html' },
        ]
    },
    {
        title: 'Autenticación y Autorización',
        items: [
            { text: 'Descripción General de Arquitectura', href: 'authentication-authorization.html' },
            { text: 'Flujo de Autenticación', href: 'authentication-flow.html' },
            { text: 'Integración con Active Directory', href: 'active-directory-integration.html' },
            { text: 'Sistema de Permisos', href: 'permission-system.html' },
            { text: 'Gestión de Contraseñas', href: 'password-management.html' },
        ]
    },
    {
        title: 'Capa de Acceso a Datos',
        items: [
            { text: 'Patrón Repositorio', href: 'repository-pattern.html' },
            { text: 'Auditoría de Entidades', href: 'entity-auditing.html' },
        ]
    },
    {
        title: 'Controladores API',
        items: [
            { text: 'APIs de Gestión de Usuarios', href: 'user-management-apis.html' },
            { text: 'APIs de Aplicaciones y Módulos', href: 'application-module-apis.html' },
            { text: 'APIs de Solicitud de Acceso', href: 'access-request-apis.html' },
            { text: 'APIs de Gestión de Archivos', href: 'file-management-apis.html' },
        ]
    },
    {
        title: 'Servicios de Negocio',
        items: [
            { text: 'Servicios de Archivos', href: 'file-services.html' },
        ]

    }
];

// Render Sidebar
function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    // Header for Mobile (preserved from render logic)
    const mobileHeader = `
      <div class="mb-8 hidden lg:flex items-center justify-between">
        <span class="font-bold text-xl tracking-tight text-text-header">Base UI</span>
        <button id="theme-toggle" class="p-2 rounded-md text-gray-400 hover:text-text-primary hover:bg-bg-active transition-colors" aria-label="Toggle Dark Mode">
            <!-- Sun Icon (for dark mode) -->
            <svg id="sun-icon" class="hidden w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <!-- Moon Icon (for light mode) -->
            <svg id="moon-icon" class="hidden w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
        </button>
      </div>
    `;

    let navContent = `<ul class="space-y-1 text-sm font-medium">`;

    sitemap.forEach(section => {
        if (section.title) {
            navContent += `<li class="pt-6 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">${section.title}</li>`;
        }

        section.items.forEach(link => {
            // Active State Logic
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            const isLinkActive = currentPath === link.href;

            const baseClasses = "block px-3 py-2 rounded-md transition-colors";
            // Updated to use CSS variables for active/inactive states
            const activeClasses = "text-text-on-active bg-bg-active";
            const inactiveClasses = "text-gray-400 hover:text-text-primary hover:bg-bg-active";

            navContent += `
                <li>
                    <a href="${link.href}" class="${baseClasses} ${isLinkActive ? activeClasses : inactiveClasses}">
                        ${link.text}
                    </a>
                </li>
            `;
        });
    });

    navContent += `</ul>`;

    sidebar.innerHTML = mobileHeader + navContent;

    // Initialize Theme Toggle after rendering
    initThemeToggle();
}

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');

// Create overlay for mobile menu if it doesn't exist
let overlay = document.querySelector('.mobile-overlay');
if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-overlay fixed inset-0 bg-black/20 z-30 hidden lg:hidden backdrop-blur-sm transition-opacity opacity-0';
    document.body.appendChild(overlay);
}

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

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

// Theme Toggle Logic
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        sunIcon?.classList.remove('hidden');
        moonIcon?.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        sunIcon?.classList.add('hidden');
        moonIcon?.classList.remove('hidden');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // Toggle theme
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
                sunIcon?.classList.add('hidden');
                moonIcon?.classList.remove('hidden');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
                sunIcon?.classList.remove('hidden');
                moonIcon?.classList.add('hidden');
            }
        });
    }
}

// Inject CSS Variables for Theme Support
function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --bg-app: #ffffff;
            --bg-sidebar: #f6f8fa;
            --border-color: #d0d7de;
            --text-primary: #1f2328;
            --text-secondary: #656d76;
            --text-header: #1f2328;
            --color-accent: #0969da;

            /* New Variables */
            --bg-surface: #f6f8fa; /* Light grey for code blocks etc */
            --text-code: #1f2328;
            --bg-active: #eff2f5; /* Sidebar active item bg */
            --text-on-active: #1f2328;
        }
        .dark {
            --bg-app: #0d1117;
            --bg-sidebar: #010409;
            --border-color: #30363d;
            --text-primary: #c9d1d9;
            --text-secondary: #8b949e;
            --text-header: #ffffff;
            --color-accent: #58a6ff;

            /* New Variables */
            --bg-surface: #161b22;
            --text-code: #e6edf3;
            --bg-active: #1f2937;
            --text-on-active: #ffffff;
        }
    `;
    document.head.appendChild(style);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    injectStyles();
    renderSidebar();

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
});
