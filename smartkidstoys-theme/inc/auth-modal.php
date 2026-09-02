<?php
/**
 * Partial: Auth Modal Popup (Login / Sign up required before adding to bag)
 * SVG-only icons. Zero raw emoji characters.
 *
 * @package SmartKidsToys
 * @version 1.1.0
 */
?>
<div id="skt-auth-modal" style="display: none; position: fixed; inset: 0; z-index: 9999; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(5px); align-items: center; justify-content: center; padding: 20px;">
    <div style="background: white; width: 100%; max-width: 440px; border-radius: var(--radius-xl); padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.25); position: relative; border: 1px solid var(--gray-2);">
        
        <!-- Close Button -->
        <button type="button" id="skt-close-auth-modal" style="position: absolute; top: 16px; right: 16px; background: #F1F5F9; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text); cursor: pointer;" aria-label="Close modal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <!-- Header -->
        <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: #EFF6FF; color: var(--primary-blue); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <h2 style="font-size: 1.35rem; font-weight: 900; color: var(--dark-heading); margin-bottom: 4px;">Sign In to Add to Bag</h2>
            <p style="font-size: 0.84rem; color: var(--text-muted);">Create your account or log in to continue ordering toys.</p>
        </div>

        <!-- Tabs -->
        <div style="display: flex; background: #F1F5F9; border-radius: var(--radius-full); padding: 4px; margin-bottom: 20px;">
            <button type="button" id="skt-tab-login" style="flex: 1; padding: 8px; border-radius: var(--radius-full); font-weight: 800; font-size: 0.85rem; background: white; color: var(--primary-blue); border: none; cursor: pointer; box-shadow: var(--shadow-sm);">
                Log In
            </button>
            <button type="button" id="skt-tab-signup" style="flex: 1; padding: 8px; border-radius: var(--radius-full); font-weight: 800; font-size: 0.85rem; background: transparent; color: var(--text); border: none; cursor: pointer;">
                Sign Up
            </button>
        </div>

        <!-- Form -->
        <form id="skt-auth-form" style="display: flex; flex-direction: column; gap: 14px;">
            <div id="skt-fullname-group" style="display: none;">
                <label style="display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 4px;">Full Name *</label>
                <input type="text" id="skt-auth-name" placeholder="Your Name" style="width: 100%; padding: 9px 12px; border: 1.5px solid var(--gray-2); border-radius: var(--radius-md); font-size: 0.9rem;" />
            </div>

            <div>
                <label style="display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 4px;">Email or Phone *</label>
                <input type="text" id="skt-auth-email" required placeholder="admin@smartkidstoys.pk / 03XX XXXXXXX" style="width: 100%; padding: 9px 12px; border: 1.5px solid var(--gray-2); border-radius: var(--radius-md); font-size: 0.9rem;" />
            </div>

            <div>
                <label style="display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 4px;">Password *</label>
                <input type="password" id="skt-auth-password" required placeholder="Enter password" style="width: 100%; padding: 9px 12px; border: 1.5px solid var(--gray-2); border-radius: var(--radius-md); font-size: 0.9rem;" />
            </div>

            <button type="submit" class="btn-hero-shop" style="width: 100%; justify-content: center; padding: 11px; margin-top: 6px;">
                <span>Continue &amp; Add to Bag</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
        </form>

    </div>
</div>
