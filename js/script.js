/**
 * Animates a circular progress bar.
 * @param {string} progressSelector - The CSS selector for the circular progress element.
 * @param {string} valueSelector - The CSS selector for the text element displaying the percentage.
 * @param {number} endValue - The final percentage value.
 * @param {string} color - The color of the progress bar.
 * @param {number} speed - The speed of the animation in milliseconds.
 */
function animateProgressBar(progressSelector, valueSelector, endValue, color, speed) {
  const progressElement = document.querySelector(progressSelector);
  const valueElement = document.querySelector(valueSelector);

  if (!progressElement || !valueElement) {
    console.error("Progress bar elements not found for:", progressSelector);
    return;
  }

  let startValue = 0;
  const progress = setInterval(() => {
    startValue++;
    valueElement.textContent = `${startValue}%`;
    progressElement.style.background = `conic-gradient(${color} ${startValue * 3.6}deg, #ededed 0deg)`;

    if (startValue >= endValue) {
      clearInterval(progress);
    }
  }, speed);
}

// Initialize all progress bars and features
document.addEventListener("DOMContentLoaded", function () {
  // Initialize circular progress bars
  animateProgressBar(".html-css", ".html-progress", 90, "#fca61f", 30);
  animateProgressBar(".javascript", ".javascript-progress", 80, "#7d2ae8", 30);
  animateProgressBar(".php", ".php-progress", 70, "#20c997", 30);
  animateProgressBar(".reactjs", ".reactjs-progress", 75, "#3f396d", 30);

  // Portfolio filter logic
  const filterButtons = document.querySelectorAll(".filter-item");
  const portfolioItems = document.querySelectorAll(".post");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      portfolioItems.forEach(item => {
        item.style.transition = "opacity 0.5s, transform 0.5s";
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 10);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.9)";
          setTimeout(() => {
            item.style.display = "none";
          }, 500);
        }
      });
    });
  });

  // Sticky navbar logic
  const navbar = document.getElementById("navbar-top");
  const navbarHeight = navbar.offsetHeight;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("fixed-top");
      document.body.style.paddingTop = navbarHeight + "px";
    } else {
      navbar.classList.remove("fixed-top");
      document.body.style.paddingTop = "0";
    }
  });

  // Back-to-top button logic
  const backToTopButton = document.getElementById("btn-back-to-top");
  window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Feedback form submission handler
  const form = document.getElementById("feedbackForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const scriptURL = "https://script.google.com/macros/s/AKfycbxKdgLv-sIXRv4-UTE46wb-4dOkMSHHE5qmVvgdvXUHa8Xl4PJZof_AGLLSSNJPuHHUrQ/exec";
      const formData = new FormData(form);
      const submitBtn = form.querySelector("button[type='submit']");

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      fetch(scriptURL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      })
        .then(() => {
          alert("✅ Thank you! Your message has been sent.");
          form.reset();
        })
        .catch((error) => {
          console.error("❌ Form submission error:", error);
          alert("⚠️ There was a network error. Please try again.");
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit";
        });
    });
  }

});
