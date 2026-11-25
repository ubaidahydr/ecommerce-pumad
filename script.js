(function() {
  'use strict';

  // === 1. TOAST NOTIFICATION ===
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message) {
    toastMessage.textContent = message || 'Produk ditambahkan ke keranjang!';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // === 2. TOMBOL BELI ===
  const buyButtons = document.querySelectorAll('.product-btn');
  buyButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const productName = this.getAttribute('data-product') || 'Produk';
      showToast(`🛒 ${productName} ditambahkan ke keranjang!`);
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });

  // === 3. FILTER KATEGORI ===
  const categoryItems = document.querySelectorAll('.category-item');
  const productCards = document.querySelectorAll('.product-card');

  categoryItems.forEach(item => {
    item.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter') || 'all';
      
      categoryItems.forEach(ci => ci.style.borderColor = '#333');
      this.style.borderColor = '#b71c1c';
      this.style.background = '#2c2c2c';

      let visibleCount = 0;
      productCards.forEach((card, index) => {
        const category = card.getAttribute('data-category') || '';
        const shouldShow = (filter === 'all' || category === filter);
        
        if (shouldShow) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50 + (index * 30));
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (visibleCount === 0) {
        showToast('😅 Tidak ada produk di kategori ini');
      }
    });
  });

  document.querySelector('.category-item[data-filter="all"]')?.click();

  // === 4. KIRIM PESAN ===
  const sendBtn = document.getElementById('sendMessageBtn');
  const messageInput = document.getElementById('messageInput');

  function sendMessage() {
    const msg = messageInput.value.trim();
    if (msg === '') {
      showToast('✏️ Silakan tulis pesan terlebih dahulu');
      return;
    }
    showToast(`📨 Pesan "${msg}" terkirim!`);
    messageInput.value = '';
  }

  sendBtn.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });

  // === 5. SCROLL ANIMATION HEADER ===
  const header = document.querySelector('header');
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > 100) {
      header.style.background = '#0e0e0e';
      header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.9)';
    } else {
      header.style.background = '#1e1e1e';
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.6)';
    }
    lastScroll = currentScroll;
  });

  // === 6. MENU NAVIGASI SCROLL SMOOTH ===
  const menuLinks = document.querySelectorAll('.menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          menuLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        }
      } else if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        menuLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('.menu a[data-menu="beranda"]')?.classList.add('active');
      }
    });
  });

  // === 7. INTERSECTION OBSERVER FOR CARDS ===
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = 'cardFadeIn 0.6s ease forwards';
          const index = Array.from(productCards).indexOf(card);
          card.style.animationDelay = (0.05 + index * 0.05) + 's';
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.1 });
    productCards.forEach(card => observer.observe(card));
  }

  // === 8. LOGO CLICK ===
  const logo = document.querySelector('.logo');
  logo.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    menuLinks.forEach(l => l.classList.remove('active'));
    document.querySelector('.menu a[data-menu="beranda"]')?.classList.add('active');
  });

  console.log('🔥 PUMAD · JavaScript animations aktif!');
})();