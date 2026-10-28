@php
    $skinColors = [
        '#0068e1', '#0095b6', '#6453f7', '#723881',
        '#f51e46', '#fa9928', '#fd6602', '#59b210',
        '#ff749f', '#2a3447', '#4b0082', '#f8008c'
    ];
@endphp

<div id="color-skin-switcher" class="color-skin-switcher-wrap">
    <!-- Toggle Gear Button -->
    <button
        type="button"
        id="color-skin-toggle-btn"
        class="color-skin-toggle-btn"
        title="Color Skin Switcher"
        aria-label="Color Skin Switcher"
    >
        <svg class="gear-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2a3447" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
    </button>

    <!-- Color Skin Popover Panel -->
    <div id="color-skin-panel" class="color-skin-panel">
        <!-- Section: Color Skin -->
        <div class="color-skin-title">
            <span>Color Skin</span>
            <div class="title-divider"></div>
        </div>

        <div class="color-skin-grid">
            @foreach ($skinColors as $colorHex)
                <div
                    class="color-skin-item"
                    data-color="{{ $colorHex }}"
                    style="background-color: {{ $colorHex }};"
                    role="button"
                    tabindex="0"
                >
                    <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
            @endforeach
        </div>

        <!-- Section: Custom Color -->
        <div class="color-skin-title">
            <span>Custom Color</span>
            <div class="title-divider"></div>
        </div>

        <div class="custom-color-input-container">
            <input
                type="text"
                id="custom-color-hex"
                class="custom-color-val"
                value="#0068e1"
                placeholder="#0068e1"
            >
            <label class="custom-color-preview-box" id="custom-color-preview-box" style="background-color: #0068e1;">
                <input
                    type="color"
                    id="custom-color-native"
                    class="hidden-color-native"
                    value="#0068e1"
                >
            </label>
        </div>

        <!-- Section: Direction -->
        <div class="color-skin-title">
            <span>Direction</span>
            <div class="title-divider"></div>
        </div>

        <div class="direction-btn-grid">
            <button
                type="button"
                id="dir-btn-ltr"
                class="direction-choice-btn active"
                data-dir="ltr"
            >
                LTR
            </button>
            <button
                type="button"
                id="dir-btn-rtl"
                class="direction-choice-btn"
                data-dir="rtl"
            >
                RTL
            </button>
        </div>
    </div>
</div>

<style>
    .color-skin-switcher-wrap {
        position: fixed !important;
        top: 220px !important;
        right: 0 !important;
        z-index: 999999 !important;
        font-family: var(--base-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
    }

    .color-skin-toggle-btn {
        width: 44px;
        height: 44px;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-right: none;
        border-radius: 8px 0 0 8px;
        box-shadow: -3px 3px 12px rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0;
        transition: background-color 0.2s, box-shadow 0.2s;
        outline: none;
    }

    .color-skin-toggle-btn:hover {
        background: #f8fafc;
        box-shadow: -4px 4px 16px rgba(0, 0, 0, 0.12);
    }

    .color-skin-toggle-btn .gear-icon {
        transition: transform 0.4s ease;
    }

    .color-skin-switcher-wrap.open .color-skin-toggle-btn .gear-icon {
        transform: rotate(90deg);
    }

    .color-skin-panel {
        display: none;
        position: absolute;
        top: 0;
        right: 52px;
        width: 240px;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
        padding: 16px 18px 18px;
        box-sizing: border-box;
        text-align: left;
    }

    .color-skin-switcher-wrap.open .color-skin-panel {
        display: block;
        animation: switcherFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .color-skin-title {
        display: flex;
        align-items: center;
        margin: 14px 0 10px 0;
        font-size: 15px;
        font-weight: 600;
        color: #1e293b;
        letter-spacing: -0.2px;
    }

    .color-skin-title:first-child {
        margin-top: 0;
    }

    .color-skin-title span {
        flex-shrink: 0;
        margin-right: 10px;
    }

    .color-skin-title .title-divider {
        flex: 1;
        height: 1px;
        background: #f1f5f9;
    }

    .color-skin-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        margin-bottom: 4px;
    }

    .color-skin-item {
        width: 44px;
        height: 44px;
        border-radius: 7px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        position: relative;
    }

    .color-skin-item:hover {
        transform: scale(1.06);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }

    .color-skin-item .check-icon {
        display: none;
    }

    .color-skin-item.active .check-icon {
        display: block;
    }

    .custom-color-input-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 5px 8px;
        background: #ffffff;
        box-sizing: border-box;
        margin-bottom: 4px;
    }

    .custom-color-val {
        border: none;
        outline: none;
        font-size: 14px;
        font-weight: 600;
        color: #1e293b;
        width: 120px;
        padding: 4px;
        background: transparent;
    }

    .custom-color-preview-box {
        width: 34px;
        height: 26px;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        margin: 0;
        border: 1px solid rgba(0, 0, 0, 0.15);
        box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
    }

    .hidden-color-native {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        padding: 0;
        border: none;
    }

    .direction-btn-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }

    .direction-choice-btn {
        padding: 8px 0;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        cursor: pointer;
        border: 1.5px solid #2a3447;
        background: #ffffff;
        color: #2a3447;
        transition: all 0.2s ease;
        outline: none;
    }

    .direction-choice-btn:hover {
        opacity: 0.9;
    }

    .direction-choice-btn.active {
        background: #2a3447;
        color: #ffffff;
    }

    @keyframes switcherFadeIn {
        from {
            opacity: 0;
            transform: translateX(10px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    /* RTL specific adjustments */
    [dir="rtl"] .color-skin-switcher-wrap {
        left: 0 !important;
        right: auto !important;
    }

    [dir="rtl"] .color-skin-toggle-btn {
        border-radius: 0 8px 8px 0;
        border-left: none;
        border-right: 1px solid #e2e8f0;
        box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.08);
    }

    [dir="rtl"] .color-skin-panel {
        left: 52px;
        right: auto;
        text-align: right;
    }
</style>

<script>
(function() {
    function hexToRgba(h, alpha) {
        h = h.replace('#', '');
        if (h.length === 3) h = h.split('').map(c => c + c).join('');
        const num = parseInt(h, 16);
        return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
    }

    function darken(h, p = 8) {
        h = h.replace('#', '');
        if (h.length === 3) h = h.split('').map(c => c + c).join('');
        let num = parseInt(h, 16);
        let r = Math.max(0, Math.round(((num >> 16) & 255) * (1 - p / 100)));
        let g = Math.max(0, Math.round(((num >> 8) & 255) * (1 - p / 100)));
        let b = Math.max(0, Math.round((num & 255) * (1 - p / 100)));
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    function applyTheme(hex) {
        if (!hex) return;
        if (!hex.startsWith('#')) hex = '#' + hex;
        if (hex.length < 4) return;

        const root = document.documentElement;
        root.style.setProperty('--color-primary', hex);
        root.style.setProperty('--color-primary-hover', darken(hex, 8));
        root.style.setProperty('--color-primary-alpha-10', hexToRgba(hex, 0.10));
        root.style.setProperty('--color-primary-alpha-12', hexToRgba(hex, 0.12));
        root.style.setProperty('--color-primary-alpha-15', hexToRgba(hex, 0.15));
        root.style.setProperty('--color-primary-alpha-30', hexToRgba(hex, 0.30));
        root.style.setProperty('--color-primary-alpha-80', hexToRgba(hex, 0.80));
        document.body.setAttribute('data-theme-color', hex);

        localStorage.setItem('dalifabooks_theme_color', hex);
        document.cookie = "dalifabooks_theme_color=" + encodeURIComponent(hex) + "; path=/; max-age=31536000";

        // Update UI inputs and active states
        const hexInput = document.getElementById('custom-color-hex');
        const nativeInput = document.getElementById('custom-color-native');
        const previewBox = document.getElementById('custom-color-preview-box');
        if (hexInput) hexInput.value = hex;
        if (nativeInput) nativeInput.value = hex.length === 7 ? hex : '#0068e1';
        if (previewBox) previewBox.style.backgroundColor = hex;

        document.querySelectorAll('.color-skin-item').forEach(item => {
            const c = item.getAttribute('data-color');
            if (c && c.toLowerCase() === hex.toLowerCase()) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function applyDirection(dir) {
        document.documentElement.setAttribute('dir', dir);
        document.body.setAttribute('dir', dir);
        if (dir === 'rtl') {
            document.body.classList.remove('ltr');
            document.body.classList.add('rtl');
            document.getElementById('dir-btn-rtl')?.classList.add('active');
            document.getElementById('dir-btn-ltr')?.classList.remove('active');
        } else {
            document.body.classList.remove('rtl');
            document.body.classList.add('ltr');
            document.getElementById('dir-btn-ltr')?.classList.add('active');
            document.getElementById('dir-btn-rtl')?.classList.remove('active');
        }
        localStorage.setItem('dalifabooks_direction', dir);
        document.cookie = "dalifabooks_direction=" + encodeURIComponent(dir) + "; path=/; max-age=31536000";
    }

    function initSwitcher() {
        const wrap = document.getElementById('color-skin-switcher');
        const toggleBtn = document.getElementById('color-skin-toggle-btn');
        const panel = document.getElementById('color-skin-panel');
        if (!wrap || !toggleBtn) return;

        // Toggle button click
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            wrap.classList.toggle('open');
        });

        // Click outside closes switcher
        document.addEventListener('click', function(e) {
            if (!wrap.contains(e.target)) {
                wrap.classList.remove('open');
            }
        });

        // Swatch clicks
        document.querySelectorAll('.color-skin-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                const color = this.getAttribute('data-color');
                applyTheme(color);
            });
        });

        // Custom hex input
        const hexInput = document.getElementById('custom-color-hex');
        if (hexInput) {
            hexInput.addEventListener('input', function() {
                applyTheme(this.value);
            });
        }

        // Native color picker input
        const nativeInput = document.getElementById('custom-color-native');
        if (nativeInput) {
            nativeInput.addEventListener('input', function() {
                applyTheme(this.value);
            });
        }

        // Direction buttons
        const ltrBtn = document.getElementById('dir-btn-ltr');
        const rtlBtn = document.getElementById('dir-btn-rtl');
        if (ltrBtn) {
            ltrBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                applyDirection('ltr');
            });
        }
        if (rtlBtn) {
            rtlBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                applyDirection('rtl');
            });
        }

        // Restore initial theme & direction
        const currentTheme = localStorage.getItem('dalifabooks_theme_color') || document.body.getAttribute('data-theme-color') || '#0068e1';
        applyTheme(currentTheme);

        const currentDir = localStorage.getItem('dalifabooks_direction') || document.documentElement.getAttribute('dir') || 'ltr';
        applyDirection(currentDir);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSwitcher);
    } else {
        initSwitcher();
    }
})();
</script>
