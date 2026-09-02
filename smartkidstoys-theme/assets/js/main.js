/**
 * SmartKids Toys Theme Frontend Script
 * Handles Cart in localStorage, Add to Bag modal gating, and WhatsApp Checkout
 * Version: 1.1.0 (Zero non-ASCII encoding corruption risk)
 */

(function($) {
    'use strict';

    var CART_STORAGE_KEY = 'skt_wp_cart';
    var AUTH_STORAGE_KEY = 'skt_wp_user';

    // 1. Cart Management Helpers
    function getCart() {
        try {
            var data = localStorage.getItem(CART_STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        updateHeaderBadges();
        renderBagPage();
    }

    function getUser() {
        try {
            var data = localStorage.getItem(AUTH_STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    }

    function setUser(user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }

    // 2. Update Header Counters
    function updateHeaderBadges() {
        var cart = getCart();
        var totalCount = cart.reduce(function(sum, item) { return sum + item.qty; }, 0);
        var subtotal = cart.reduce(function(sum, item) { return sum + (item.price * item.qty); }, 0);

        $('#skt-header-cart-count').text(totalCount);
        $('#skt-header-cart-total').text('PKR ' + subtotal.toLocaleString());
    }

    // 3. Add to Bag with Login Gating Modal
    var pendingItemToAdd = null;

    $(document).on('click', '.skt-add-to-cart-trigger', function(e) {
        e.preventDefault();
        var $btn = $(this);
        var toy = {
            id: $btn.data('toy-id'),
            name: $btn.data('toy-name'),
            price: Number($btn.data('toy-price')),
            image: $btn.data('toy-image'),
            qty: 1
        };

        var user = getUser();
        if (!user) {
            pendingItemToAdd = toy;
            $('#skt-auth-modal').css('display', 'flex');
        } else {
            performAddToCart(toy);
        }
    });

    function performAddToCart(toy) {
        var cart = getCart();
        var existingIndex = cart.findIndex(function(item) { return item.id === toy.id; });

        if (existingIndex > -1) {
            cart[existingIndex].qty += 1;
        } else {
            cart.push(toy);
        }

        saveCart(cart);

        // Feedback toast / alert with SVG icon
        showToast(toy.name + ' added to your bag!');
    }

    function showToast(msg) {
        var $toast = $('<div style="position:fixed; bottom:24px; right:24px; background:#0F172A; color:white; padding:12px 24px; border-radius:9999px; font-weight:800; font-size:0.9rem; z-index:99999; box-shadow:0 10px 25px rgba(0,0,0,0.3); display:inline-flex; align-items:center; gap:8px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>' + msg + '</span></div>');
        $('body').append($toast);
        setTimeout(function() { $toast.fadeOut(400, function() { $(this).remove(); }); }, 2500);
    }

    // 4. Auth Modal Tab Toggling
    $('#skt-tab-login').on('click', function() {
        $(this).css({ background: 'white', color: '#0284C7', boxShadow: 'var(--shadow-sm)' });
        $('#skt-tab-signup').css({ background: 'transparent', color: 'var(--text)', boxShadow: 'none' });
        $('#skt-fullname-group').hide();
    });

    $('#skt-tab-signup').on('click', function() {
        $(this).css({ background: 'white', color: '#0284C7', boxShadow: 'var(--shadow-sm)' });
        $('#skt-tab-login').css({ background: 'transparent', color: 'var(--text)', boxShadow: 'none' });
        $('#skt-fullname-group').show();
    });

    $('#skt-close-auth-modal').on('click', function() {
        $('#skt-auth-modal').hide();
        pendingItemToAdd = null;
    });

    $('#skt-auth-form').on('submit', function(e) {
        e.preventDefault();
        var emailOrPhone = $('#skt-auth-email').val().trim();
        var fullName = $('#skt-auth-name').val().trim() || emailOrPhone.split('@')[0];

        var userObj = {
            name: fullName,
            emailOrPhone: emailOrPhone,
            isLoggedIn: true
        };

        setUser(userObj);
        $('#skt-auth-modal').hide();

        if (pendingItemToAdd) {
            performAddToCart(pendingItemToAdd);
            pendingItemToAdd = null;
        }
    });

    // 5. Bag Page Render & Dynamic Calculations
    function renderBagPage() {
        var $list = $('#skt-bag-items-list');
        if (!$list.length) return;

        var cart = getCart();
        if (cart.length === 0) {
            $list.empty();
            $('#skt-bag-empty-state').show();
            $('#skt-summary-subtotal').text('PKR 0');
            $('#skt-summary-total').text('PKR 0');
            $('#skt-bag-progress-bar').css('width', '0%');
            $('#skt-bag-delivery-percent').text('0%');
            return;
        }

        $('#skt-bag-empty-state').hide();
        $list.empty();

        var subtotal = 0;

        cart.forEach(function(item, idx) {
            var itemTotal = item.price * item.qty;
            subtotal += itemTotal;

            var $row = $(
                '<div style="display:flex; justify-content:space-between; align-items:center; padding:16px 0; border-bottom:1px solid var(--gray-2); gap:16px; flex-wrap:wrap;">' +
                    '<div style="display:flex; align-items:center; gap:14px;">' +
                        '<img src="' + item.image + '" alt="' + item.name + '" style="width:60px; height:60px; border-radius:8px; object-fit:cover; background:#F8FAFC;">' +
                        '<div>' +
                            '<strong style="font-size:0.95rem; color:var(--dark-heading); display:block;">' + item.name + '</strong>' +
                            '<span style="font-size:0.85rem; color:var(--text-muted);">PKR ' + item.price.toLocaleString() + '</span>' +
                        '</div>' +
                    '</div>' +
                    '<div style="display:flex; align-items:center; gap:16px;">' +
                        '<div class="quantity-control">' +
                            '<button type="button" class="qty-btn skt-qty-dec" data-index="' + idx + '">-</button>' +
                            '<span class="qty-display" style="display:flex; align-items:center; justify-content:center;">' + item.qty + '</span>' +
                            '<button type="button" class="qty-btn skt-qty-inc" data-index="' + idx + '">+</button>' +
                        '</div>' +
                        '<strong style="font-size:1.05rem; min-width:85px; text-align:right;">PKR ' + itemTotal.toLocaleString() + '</strong>' +
                        '<button type="button" class="skt-remove-item" data-index="' + idx + '" style="color:#EF4444; background:none; border:none; padding:4px; cursor:pointer;" aria-label="Remove item">' +
                            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
                        '</button>' +
                    '</div>' +
                '</div>'
            );
            $list.append($row);
        });

        // Delivery calculation (Threshold PKR 3,000)
        var deliveryFee = subtotal >= 3000 ? 0 : 250;
        var total = subtotal + deliveryFee;

        var progressPct = Math.min(Math.round((subtotal / 3000) * 100), 100);
        $('#skt-bag-progress-bar').css('width', progressPct + '%');
        $('#skt-bag-delivery-percent').text(progressPct + '%');

        if (subtotal >= 3000) {
            $('#skt-bag-delivery-msg').html('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:6px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>You unlocked <strong>FREE Nationwide Delivery</strong>!');
            $('#skt-summary-delivery').text('FREE').css('color', '#16A34A');
        } else {
            var diff = 3000 - subtotal;
            $('#skt-bag-delivery-msg').html('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:6px;"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>Add <strong>PKR ' + diff.toLocaleString() + '</strong> more for FREE Nationwide Delivery!');
            $('#skt-summary-delivery').text('PKR 250').css('color', 'var(--text)');
        }

        $('#skt-summary-subtotal').text('PKR ' + subtotal.toLocaleString());
        $('#skt-summary-total').text('PKR ' + total.toLocaleString());
    }

    // Quantity Increment / Decrement
    $(document).on('click', '.skt-qty-inc', function() {
        var idx = $(this).data('index');
        var cart = getCart();
        cart[idx].qty += 1;
        saveCart(cart);
    });

    $(document).on('click', '.skt-qty-dec', function() {
        var idx = $(this).data('index');
        var cart = getCart();
        if (cart[idx].qty > 1) {
            cart[idx].qty -= 1;
        } else {
            cart.splice(idx, 1);
        }
        saveCart(cart);
    });

    $(document).on('click', '.skt-remove-item', function() {
        var idx = $(this).data('index');
        var cart = getCart();
        cart.splice(idx, 1);
        saveCart(cart);
    });

    // 6. WhatsApp Checkout Submission
    $('#skt-whatsapp-checkout-form').on('submit', function(e) {
        e.preventDefault();
        var cart = getCart();
        if (cart.length === 0) {
            alert('Your bag is empty. Please add toys first.');
            return;
        }

        var name = $('#skt-checkout-name').val().trim();
        var phone = $('#skt-checkout-phone').val().trim();
        var city = $('#skt-checkout-city').val();
        var address = $('#skt-checkout-address').val().trim();

        var subtotal = cart.reduce(function(sum, item) { return sum + (item.price * item.qty); }, 0);
        var deliveryFee = subtotal >= 3000 ? 0 : 250;
        var total = subtotal + deliveryFee;

        // Build WhatsApp Message (clean ASCII safe strings)
        var msg = "*NEW ORDER - SMARTKIDS TOYS*\n";
        msg += "===================================\n";
        msg += "*Customer:* " + name + "\n";
        msg += "*Phone:* " + phone + "\n";
        msg += "*City:* " + city + "\n";
        msg += "*Address:* " + address + "\n\n";
        msg += "*ORDER ITEMS:*\n";

        cart.forEach(function(item, i) {
            msg += (i + 1) + ". " + item.name + " (Qty: " + item.qty + ") - PKR " + (item.price * item.qty).toLocaleString() + "\n";
        });

        msg += "\n===================================\n";
        msg += "*Subtotal:* PKR " + subtotal.toLocaleString() + "\n";
        msg += "*Delivery:* " + (deliveryFee === 0 ? "FREE" : "PKR " + deliveryFee) + "\n";
        msg += "*TOTAL AMOUNT:* PKR " + total.toLocaleString() + "\n";
        msg += "Payment: Cash on Delivery (COD)\n";
        msg += "===================================";

        // Save order via WordPress AJAX to Orders CRM
        if (typeof skt_ajax !== 'undefined') {
            $.ajax({
                url: skt_ajax.ajax_url,
                type: 'POST',
                data: {
                    action: 'skt_submit_order',
                    nonce: skt_ajax.nonce,
                    customer_name: name,
                    phone: phone,
                    city: city,
                    address: address,
                    total: total,
                    items: JSON.stringify(cart)
                }
            });
        }

        // Clear Cart
        localStorage.removeItem(CART_STORAGE_KEY);
        updateHeaderBadges();

        // Redirect to WhatsApp
        var waNumber = typeof skt_ajax !== 'undefined' ? skt_ajax.whatsapp_number : '923098444501';
        var waUrl = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(msg);
        window.open(waUrl, '_blank');

        alert('Thank you ' + name + '! Your order has been registered and WhatsApp is opening to confirm your delivery.');
        window.location.href = '/';
    });

    // Initial load
    $(document).ready(function() {
        updateHeaderBadges();
        renderBagPage();
    });

})(jQuery);
