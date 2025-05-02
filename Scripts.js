// Smooth scrolling for nav links
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Contact form submit handler (Formspree)
document.querySelector('.contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = this;
  const status = document.getElementById('form-status');
  const formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        status.style.color = 'green';
        status.textContent = "✅ Thanks! Your message has been sent.";
        form.reset();
      } else {
        response.json().then(data => {
          if (data.errors) {
            status.style.color = 'red';
            status.textContent = data.errors.map(error => error.message).join(", ");
          } else {
            status.style.color = 'red';
            status.textContent = "❌ Oops! Something went wrong.";
          }
        });
      }
    })
    .catch(error => {
      status.style.color = 'red';
      status.textContent = "❌ Network error. Please try again later.";
    });
});

// Scroll to top on page load
window.scrollTo(0, 0);

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});