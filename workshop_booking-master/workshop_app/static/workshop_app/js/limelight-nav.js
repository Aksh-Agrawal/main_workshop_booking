/**
 * LimelightNav — vanilla JS implementation
 * Direct port of the React shadcn LimelightNav component.
 * Automatically initialises when the DOM is ready.
 */
(function () {
  'use strict';

  function initLimelightNav() {
    const nav = document.querySelector('.limelight-nav');
    if (!nav) return;

    const items = nav.querySelectorAll('.limelight-item');
    const indicator = nav.querySelector('.limelight-indicator');
    if (!items.length || !indicator) return;

    // Read the initially active item (set via data-active or first item)
    let activeIndex = 0;
    items.forEach(function (item, i) {
      if (item.classList.contains('active')) activeIndex = i;
    });

    function positionIndicator(index) {
      var item = items[index];
      if (!item || !indicator) return;
      var newLeft = item.offsetLeft + item.offsetWidth / 2 - indicator.offsetWidth / 2;
      indicator.style.left = newLeft + 'px';
    }

    function activate(index) {
      items.forEach(function (item) { item.classList.remove('active'); });
      items[index].classList.add('active');
      activeIndex = index;
      positionIndicator(index);
    }

    // Initial position (no animation)
    positionIndicator(activeIndex);

    // Enable transition after a brief paint delay (mirrors React's isReady pattern)
    setTimeout(function () {
      indicator.classList.add('ready');
    }, 50);

    // Attach click handlers
    items.forEach(function (item, i) {
      item.addEventListener('click', function (e) {
        activate(i);
        // Navigate if href is set and not "#"
        var href = item.getAttribute('href');
        if (href && href !== '#') {
          window.location.href = href;
        }
      });
    });

    // Re-position on window resize
    window.addEventListener('resize', function () {
      positionIndicator(activeIndex);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLimelightNav);
  } else {
    initLimelightNav();
  }
})();
