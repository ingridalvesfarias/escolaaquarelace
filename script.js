/* ============================================================
   Escola Aquarela — script.js
   - Menu mobile (hamburger) 100% funcional e acessível
   - Fecha o menu ao clicar num link, fora dele ou com ESC
   - Marca o link ativo do menu conforme a seção visível
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    var openMenu = function () {
      navLinks.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Fechar menu de navegação');
    };

    var closeMenu = function () {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
    };

    var toggleMenu = function () {
      var isOpen = navLinks.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    navToggle.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em qualquer link dentro dele
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function (event) {
      var clickedInsideNav = navLinks.contains(event.target) || navToggle.contains(event.target);
      if (!clickedInsideNav) {
        closeMenu();
      }
    });

    // Fecha o menu ao pressionar ESC
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    // Se a tela for redimensionada para desktop, garante que o menu não fique "aberto" escondido
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });
  }

  // Destaca no menu o link da seção que está sendo visualizada
  var sections = document.querySelectorAll('section[id]');
  var menuLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && menuLinks.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          menuLinks.forEach(function (link) {
            var isCurrent = link.getAttribute('href') === '#' + id;
            link.classList.toggle('is-active', isCurrent);
          });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // Animação do pincel e da linha na transição de seção
  var waveDivider = document.querySelector('.wave-divider');
  var motionAnim = document.getElementById('motionPath');
  var dashAnim = document.getElementById('dashAnim');

  if (waveDivider && motionAnim && dashAnim && 'IntersectionObserver' in window) {
    var waveObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Se já tem a classe, recomeça a animação
          if (waveDivider.classList.contains('is-animated')) {
            waveDivider.classList.remove('is-animated');
            void waveDivider.offsetWidth; // Força um reflow para reiniciar o CSS
          }
          waveDivider.classList.add('is-animated');
          motionAnim.beginElement();
          dashAnim.beginElement();
        } else {
          waveDivider.classList.remove('is-animated');
        }
      });
    }, { threshold: 0.3 }); // Começa a animação quando 30% da área estiver visível

    waveObserver.observe(waveDivider);
  }

  // Lógica do carrossel da galeria
  var galleryTrack = document.getElementById('galleryGrid');
  var btnPrev = document.querySelector('.carousel-prev');
  var btnNext = document.querySelector('.carousel-next');

  if (galleryTrack && btnPrev && btnNext) {
    btnNext.addEventListener('click', function () {
      galleryTrack.scrollBy({ left: galleryTrack.clientWidth, behavior: 'smooth' });
    });

    btnPrev.addEventListener('click', function () {
      galleryTrack.scrollBy({ left: -galleryTrack.clientWidth, behavior: 'smooth' });
    });
  }
});
