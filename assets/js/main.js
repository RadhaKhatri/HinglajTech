/* ==========================================================
   HINGLAJ TECH — shared interactivity
   Vanilla JS. No external runtime deps, no eval, no innerHTML
   of untrusted input (XSS-safe by construction).
   ========================================================== */
(function () {
  'use strict';

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealTargets = document.querySelectorAll('.reveal, .reveal-stagger, .pipeline');
  if ('IntersectionObserver' in window && revealTargets.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', !isOpen);
      q.setAttribute('aria-expanded', (!isOpen).toString());
    });
  });

  /* ---------- header shadow on scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var lastY = window.scrollY;
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 8 ? '0 1px 0 rgba(16,21,31,0.06)' : 'none';
      lastY = window.scrollY;
    }, { passive: true });
  }

  /* ---------- contact form (client-side only demo) ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');

    // simple sanitizer: strips tags, keeps plain text only. Defense in depth —
    // the real trust boundary is the server, which must also validate/escape.
    function sanitize(value) {
      return String(value || '').replace(/<[^>]*>/g, '').trim();
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = sanitize(data.get('name'));
      var email = sanitize(data.get('email'));
      var message = sanitize(data.get('message'));
      var accessKey = data.get('access_key');

      if (!name || !email || !message) {
        showStatus('Please fill in your name, email, and message.', 'error');
        return;
      }
      if (!isValidEmail(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }
      // honeypot tripped -> silently drop, act like success so bots learn nothing
      if (data.get('botcheck')) {
        showStatus('Thank you — your message has been received.', 'success');
        form.reset();
        return;
      }
      if (!accessKey || accessKey.indexOf('REPLACE_WITH') === 0) {
        showStatus('Form is not connected yet — the site owner needs to add a Web3Forms access key. See NOTES.md.', 'error');
        return;
      }

      submitBtn.disabled = true;
      var originalLabel = submitBtn.innerHTML;
      submitBtn.textContent = 'Sending...';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(data))
      })
        .then(function (res) { return res.json(); })
        .then(function (result) {
          if (result.success) {
            showStatus('Thank you, ' + name.split(' ')[0] + ' — your enquiry has been sent. We will get back to you within one business day.', 'success');
            form.reset();
          } else {
            showStatus('Something went wrong sending your message. Please email us directly at hinglajtech2026@gmail.com.', 'error');
          }
        })
        .catch(function () {
          showStatus('Network error — please email us directly at hinglajtech2026@gmail.com or try again.', 'error');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalLabel;
        });
    });

    function showStatus(msg, type) {
      status.textContent = msg;
      status.className = 'form-status ' + type;
      status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  /* ---------- current year in footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
