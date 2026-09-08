import posthog from 'posthog-js';

export const POSTHOG_TOKEN = 'phc_uwUAXpU8sWFmf4hzPHxHr92vJep3vNCSniUPBGXUByCz';
export const POSTHOG_HOST = 'https://us.i.posthog.com';
export const POSTHOG_PROJECT_ID = '599569';

let isInitialized = false;

/**
 * Initialize PostHog client for SmartKids Toys Pakistan
 */
export function initPostHog() {
  if (typeof window === 'undefined' || isInitialized) return posthog;

  try {
    posthog.init(POSTHOG_TOKEN, {
      api_host: POSTHOG_HOST,
      autocapture: true,
      capture_pageview: false, // Explicitly controlled via React Router in App.jsx
      capture_pageleave: true,
      person_profiles: 'always', // Ensures all visitors have person profiles, easily managed by email upon login
      persistence: 'localStorage+cookie',
      bootstrap: {},
      loaded: () => {
        // Successfully initialized
      },
    });
    isInitialized = true;
  } catch (err) {
    console.warn('PostHog init notice:', err);
  }

  return posthog;
}

/**
 * Identify a user in PostHog with their email as the distinct_id.
 * Prior anonymous sessions are merged into this identified email profile.
 */
export function identifyUser(user, profile) {
  if (!user && !profile) return;
  const email = (user?.email || profile?.email || '').trim().toLowerCase();
  if (!email) return;

  try {
    const fullName = profile?.full_name || user?.user_metadata?.full_name || email.split('@')[0];
    const phone = profile?.phone || user?.user_metadata?.phone || '';
    const isAdmin = Boolean(profile?.is_admin || user?.user_metadata?.is_admin || email === 'admin@smartkidstoys.pk');
    const customerNumber = profile?.customer_number || '';

    // 1. Identify person in PostHog with email as primary distinct_id
    posthog.identify(email, {
      $email: email,
      email: email,
      $name: fullName,
      name: fullName,
      phone: phone,
      is_admin: isAdmin,
      customer_number: customerNumber,
      authenticated: true,
      identified_at: new Date().toISOString()
    });

    // 2. Set person properties in PostHog directory
    if (posthog.people && posthog.people.set) {
      posthog.people.set({
        $email: email,
        email: email,
        $name: fullName,
        name: fullName,
        phone: phone,
        is_admin: isAdmin,
        customer_number: customerNumber
      });
    }
  } catch (err) {
    console.warn('PostHog identify notice:', err);
  }
}

/**
 * Reset PostHog identity on logout (generates a fresh anonymous ID)
 */
export function resetUser() {
  try {
    posthog.reset();
  } catch (err) {
    console.warn('PostHog reset notice:', err);
  }
}

/**
 * Track custom business and e-commerce events
 */
export function trackEvent(eventName, properties = {}) {
  try {
    posthog.capture(eventName, properties);
  } catch (err) {
    console.warn('PostHog capture notice:', err);
  }
}

/**
 * Track SPA route changes and pageviews
 */
export function trackPageView(url) {
  try {
    posthog.capture('$pageview', {
      $current_url: url || window.location.href,
      path: window.location.pathname,
      search: window.location.search
    });
  } catch (err) {
    console.warn('PostHog pageview notice:', err);
  }
}

export default posthog;
