(() => {
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  const onScroll = () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 12);
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      const feedback = document.querySelector('#formFeedback');
      if (feedback) {
        feedback.classList.remove('d-none');
        feedback.textContent = 'Formulário de demonstração. Na próxima etapa, conecte este envio ao WhatsApp, e-mail ou ao sistema de agendamento da clínica.';
      }
      form.reset();
      form.classList.remove('was-validated');
    });
  }
})();
