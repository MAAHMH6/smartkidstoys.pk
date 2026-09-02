<?php
/**
 * Template Name: Contact Us
 * The template for displaying store contact details and WhatsApp support.
 * SVG-only icons. Zero raw emoji characters.
 *
 * @package SmartKidsToys
 * @version 1.1.0
 */

get_header();
?>

<div class="container" style="padding: 40px 20px 80px;">
    
    <div style="text-align: center; max-width: 640px; margin: 0 auto 48px;">
        <h1 class="section-title-text" style="font-size: 2.2rem; margin-bottom: 8px;">Contact &amp; <span>Support</span></h1>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
            Have a question about an order, delivery timing, or toy recommendations? We are just a message or phone call away!
        </p>
    </div>

    <!-- 3 Quick Contact Cards -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 48px;">
        
        <!-- WhatsApp -->
        <a href="https://wa.me/923098444501?text=Hello%20SmartKids%20Toys!%20I%20have%20an%20inquiry:" target="_blank" rel="noreferrer" style="background: white; padding: 28px; border-radius: var(--radius-xl); border: 1.5px solid #25D366; box-shadow: var(--shadow-card); text-decoration: none; display: flex; align-items: center; gap: 18px; transition: var(--transition);">
            <div style="width: 54px; height: 54px; border-radius: 50%; background: #DCFCE7; color: #16A34A; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </div>
            <div>
                <span style="font-size: 0.78rem; font-weight: 800; color: #16A34A; text-transform: uppercase;">Instant Chat</span>
                <h3 style="font-size: 1.15rem; font-weight: 900; color: var(--dark-heading); margin: 2px 0;">03098444501</h3>
                <p style="color: var(--text-muted); font-size: 0.82rem;">Available Mon-Sat 9AM-10PM</p>
            </div>
        </a>

        <!-- Direct Phone -->
        <a href="tel:03098444501" style="background: white; padding: 28px; border-radius: var(--radius-xl); border: 1.5px solid #0284C7; box-shadow: var(--shadow-card); text-decoration: none; display: flex; align-items: center; gap: 18px; transition: var(--transition);">
            <div style="width: 54px; height: 54px; border-radius: 50%; background: #EFF6FF; color: #0284C7; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.78 16.92z"/></svg>
            </div>
            <div>
                <span style="font-size: 0.78rem; font-weight: 800; color: #0284C7; text-transform: uppercase;">Direct Phone Line</span>
                <h3 style="font-size: 1.15rem; font-weight: 900; color: var(--dark-heading); margin: 2px 0;">03098444501</h3>
                <p style="color: var(--text-muted); font-size: 0.82rem;">Direct Helpline Support</p>
            </div>
        </a>

        <!-- Email -->
        <a href="mailto:info@smartkidstoys.pk" style="background: white; padding: 28px; border-radius: var(--radius-xl); border: 1.5px solid var(--gray-2); box-shadow: var(--shadow-card); text-decoration: none; display: flex; align-items: center; gap: 18px; transition: var(--transition);">
            <div style="width: 54px; height: 54px; border-radius: 50%; background: #F1F5F9; color: var(--dark-heading); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
                <span style="font-size: 0.78rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">Official Inquiries</span>
                <h3 style="font-size: 1.1rem; font-weight: 900; color: var(--dark-heading); margin: 2px 0;">info@smartkidstoys.pk</h3>
                <p style="color: var(--text-muted); font-size: 0.82rem;">24-hour response turnaround</p>
            </div>
        </a>

    </div>

    <!-- Contact Form & FAQ -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 36px; align-items: start;">
        
        <!-- Form -->
        <div style="background: white; padding: 36px; border-radius: var(--radius-xl); border: 1px solid var(--gray-2); box-shadow: var(--shadow-card);">
            <h2 style="font-size: 1.35rem; font-weight: 900; margin-bottom: 20px;">Send Us a Message</h2>
            <form onsubmit="event.preventDefault(); alert('Message received! Our customer care representative will contact you via WhatsApp shortly.');">
                <div style="margin-bottom: 16px;">
                    <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">Your Name *</label>
                    <input type="text" required placeholder="e.g. Asad Ali" style="width: 100%; padding: 10px 14px; border: 1.5px solid var(--gray-2); border-radius: var(--radius-md); font-size: 0.92rem;" />
                </div>

                <div style="margin-bottom: 16px;">
                    <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">WhatsApp Phone Number *</label>
                    <input type="tel" required placeholder="03XX XXXXXXX" style="width: 100%; padding: 10px 14px; border: 1.5px solid var(--gray-2); border-radius: var(--radius-md); font-size: 0.92rem;" />
                </div>

                <div style="margin-bottom: 16px;">
                    <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">City</label>
                    <input type="text" placeholder="Lahore, Karachi, Islamabad..." style="width: 100%; padding: 10px 14px; border: 1.5px solid var(--gray-2); border-radius: var(--radius-md); font-size: 0.92rem;" />
                </div>

                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">Inquiry / Question *</label>
                    <textarea rows="4" required placeholder="Describe your question or toy requirements..." style="width: 100%; padding: 10px 14px; border: 1.5px solid var(--gray-2); border-radius: var(--radius-md); font-size: 0.92rem;"></textarea>
                </div>

                <button type="submit" class="btn-hero-shop" style="width: 100%; justify-content: center; display: inline-flex; align-items: center; gap: 8px;">
                    <span>Submit Inquiry</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
            </form>
        </div>

        <!-- FAQs -->
        <div style="background: #F8FAFC; padding: 36px; border-radius: var(--radius-xl); border: 1px solid var(--gray-2);">
            <h2 style="font-size: 1.35rem; font-weight: 900; margin-bottom: 20px;">Frequently Asked Questions</h2>

            <div style="display: flex; flex-direction: column; gap: 18px;">
                <div>
                    <h3 style="font-size: 1rem; font-weight: 800; color: var(--dark-heading); margin-bottom: 4px;">How do I order via WhatsApp?</h3>
                    <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
                        Simply click the WhatsApp button on any toy or checkout page. Your order items and address are automatically formatted into a WhatsApp message.
                    </p>
                </div>

                <div>
                    <h3 style="font-size: 1rem; font-weight: 800; color: var(--dark-heading); margin-bottom: 4px;">What are the shipping charges across Pakistan?</h3>
                    <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
                        We offer <strong>Free Shipping on all orders above PKR 3,000</strong>. For orders below PKR 3,000, a standard flat fee of PKR 250 applies nationwide.
                    </p>
                </div>

                <div>
                    <h3 style="font-size: 1rem; font-weight: 800; color: var(--dark-heading); margin-bottom: 4px;">How long does delivery take?</h3>
                    <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
                        Deliveries in Lahore take 1-2 working days. Karachi, Islamabad, Rawalpindi, and other nationwide cities take 2-4 working days.
                    </p>
                </div>
            </div>
        </div>

    </div>

</div>

<?php
get_footer();
