/**
 * Portfolio Interactivity & Logic
 * Minal Sachin Patil — Aspiring Data Analyst & Developer
 */

document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;

  // -------------------------------------------------------------------------
  // 1. Dynamic Year
  // -------------------------------------------------------------------------
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------------------------------
  // 2. Light / Dark Theme Toggle
  // -------------------------------------------------------------------------
  const themeToggle = document.getElementById("theme-toggle");
  const mediaDark = window.matchMedia("(prefers-color-scheme: dark)");

  try {
    const savedTheme = localStorage.getItem("portfolio_theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      root.setAttribute("data-theme", savedTheme);
    }
  } catch (e) {
    // LocalStorage restricted or unavailable
  }

  function getActiveTheme() {
    return root.getAttribute("data-theme") || (mediaDark.matches ? "dark" : "light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const current = getActiveTheme();
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("portfolio_theme", next);
      } catch (e) {}
      showToast(`Switched to ${next === "dark" ? "Dark Midnight" : "Light Lavender"} mode`);
    });
  }

  // -------------------------------------------------------------------------
  // 3. Mobile Navigation Menu Toggle
  // -------------------------------------------------------------------------
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close mobile menu when clicking any nav link
    navMenu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // -------------------------------------------------------------------------
  // 4. Scroll Spy - Active Navigation Link
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(function (current) {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavOnScroll, { passive: true });

  // -------------------------------------------------------------------------
  // 5. Project Filtering (All / Data Science / Web & Python)
  // -------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");

      projectCards.forEach(function (card) {
        const category = card.getAttribute("data-category");
        if (filterVal === "all" || category === filterVal) {
          card.style.display = "flex";
          setTimeout(function () {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";
          setTimeout(function () {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 6. Interactive Data Simulator Widget
  // -------------------------------------------------------------------------
  const cuisineSelect = document.getElementById("cuisine-select");
  const statOrders = document.getElementById("stat-orders");
  const statRating = document.getElementById("stat-rating");
  const statCost = document.getElementById("stat-cost");
  const statSatisfaction = document.getElementById("stat-satisfaction");
  const statDistribution = document.getElementById("stat-distribution");
  const segHigh = document.getElementById("seg-high");
  const segMid = document.getElementById("seg-mid");
  const segLow = document.getElementById("seg-low");

  const cuisineData = {
    all: {
      orders: "14,250",
      rating: "4.2 / 5.0",
      cost: "₹450",
      satisfaction: "89.4%",
      distribution: "72% High • 21% Mid • 7% Low",
      highWidth: "72%",
      midWidth: "21%",
      lowWidth: "7%"
    },
    "north-indian": {
      orders: "5,680",
      rating: "4.3 / 5.0",
      cost: "₹580",
      satisfaction: "91.2%",
      distribution: "78% High • 17% Mid • 5% Low",
      highWidth: "78%",
      midWidth: "17%",
      lowWidth: "5%"
    },
    chinese: {
      orders: "3,420",
      rating: "4.1 / 5.0",
      cost: "₹390",
      satisfaction: "86.5%",
      distribution: "68% High • 24% Mid • 8% Low",
      highWidth: "68%",
      midWidth: "24%",
      lowWidth: "8%"
    },
    cafes: {
      orders: "2,750",
      rating: "4.4 / 5.0",
      cost: "₹520",
      satisfaction: "93.8%",
      distribution: "82% High • 14% Mid • 4% Low",
      highWidth: "82%",
      midWidth: "14%",
      lowWidth: "4%"
    },
    "fast-food": {
      orders: "2,400",
      rating: "3.9 / 5.0",
      cost: "₹220",
      satisfaction: "82.0%",
      distribution: "60% High • 28% Mid • 12% Low",
      highWidth: "60%",
      midWidth: "28%",
      lowWidth: "12%"
    }
  };

  if (cuisineSelect) {
    cuisineSelect.addEventListener("change", function () {
      const selected = cuisineData[this.value] || cuisineData.all;

      // Animate updates
      statOrders.textContent = selected.orders;
      statRating.textContent = selected.rating;
      statCost.textContent = selected.cost;
      statSatisfaction.textContent = selected.satisfaction;
      statDistribution.textContent = selected.distribution;

      segHigh.style.width = selected.highWidth;
      segMid.style.width = selected.midWidth;
      segLow.style.width = selected.lowWidth;
    });
  }

  // -------------------------------------------------------------------------
  // 7. Project Details Modal Dialog
  // -------------------------------------------------------------------------
  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-content");
  const modalClose = document.getElementById("modal-close");
  const viewDetailsBtns = document.querySelectorAll(".view-details-btn");

  const projectDetails = {
    zomato: {
      category: "Data Science & Exploratory Data Analysis",
      title: "Zomato Restaurant Data Analysis",
      description: "A comprehensive data analysis project examining consumer habits, restaurant ratings, price tiering, and delivery logistics across thousands of restaurant entries.",
      sections: [
        {
          title: "Project Objectives & Key Discoveries",
          items: [
            "Analyzed whether restaurants with online table booking and food delivery achieved higher consumer ratings (found +0.4 average boost).",
            "Identified pricing hotspots and calculated average dining cost for two across diverse city zones.",
            "Visualized top trending cuisines (North Indian, Chinese, Continental) and identified underserved high-demand micro-markets."
          ]
        },
        {
          title: "Tools & Libraries Employed",
          items: [
            "Python: Pandas & NumPy for data cleaning, handling missing values, and type conversions.",
            "Matplotlib & Seaborn: Heatmaps, box plots, and histograms for statistical distribution evaluation.",
            "Jupyter Notebook: Reproducible analytical notebook documenting step-by-step findings."
          ]
        }
      ],
      github: "https://github.com/minalbhosale5282-coder"
    },
    taskmanager: {
      category: "Full Stack & Python Application",
      title: "Python Task Manager Clone",
      description: "An organized task and productivity platform engineered with Python for individuals needing structured daily goal tracking, status lifecycles, and deadline prioritization.",
      sections: [
        {
          title: "Core Architecture & Capabilities",
          items: [
            "Full CRUD functionality: Add, update, prioritize, mark complete, and archive daily tasks.",
            "Data validation & persistence: Prevents corrupt entries and stores state using structured DBMS / local data files.",
            "Dynamic status filtering: Allows quick toggling between Pending, In-Progress, and Completed work items.",
            "Clean and responsive user interface for smooth user interactions."
          ]
        },
        {
          title: "Technologies Used",
          items: [
            "Python: Backend logic, scheduling, validation routines.",
            "Database/DBMS: Organized table schemas for persistent storage.",
            "JavaScript & CSS3: Frontend interactivity and interactive DOM rendering."
          ]
        }
      ],
      github: "https://github.com/minalbhosale5282-coder"
    },
    sqlanalytics: {
      category: "Database Systems & SQL Optimization",
      title: "Business Analytics & DBMS Query Engine",
      description: "A database-centric analytics project designed to extract deep business intelligence from complex relational schemas through high-performance SQL query design.",
      sections: [
        {
          title: "Architectural & Query Highlights",
          items: [
            "Constructed relational schemas adhering to 3rd Normal Form (3NF) to minimize redundancy and guarantee data consistency.",
            "Formulated analytical queries leveraging Common Table Expressions (CTEs), Subqueries, and Window Functions (ROW_NUMBER, DENSE_RANK).",
            "Calculated month-over-month sales trends, churn metrics, and revenue cohorts.",
            "Benchmarked query execution plans and applied indexing strategies for performance gains."
          ]
        },
        {
          title: "Technologies Used",
          items: [
            "SQL (MySQL / PostgreSQL): Schema modeling, DDL, DML, and complex analytical queries.",
            "Relational DBMS: Foreign key integrity, triggers, and stored routines."
          ]
        }
      ],
      github: "https://github.com/minalbhosale5282-coder"
    },
    dataexplorer: {
      category: "Modern Web & Interactive Frontend",
      title: "Dynamic Data Explorer & Interactive UI",
      description: "A fast, modern web application crafted with React, Next.js, and TypeScript that transforms static datasets into interactive visual components and search interfaces.",
      sections: [
        {
          title: "Key Features & Engineering",
          items: [
            "Real-time search, multi-faceted filtering, and sorting across complex dataset items.",
            "Responsive layout with smooth transitions, accessible focus management, and dark/light mode toggle.",
            "Strict TypeScript typing across components and data interfaces to minimize runtime bugs.",
            "Modular architecture structured for easy extension with future RESTful or GraphQL endpoints."
          ]
        },
        {
          title: "Technologies Used",
          items: [
            "React.js & Next.js: Component rendering and performant routing.",
            "TypeScript: Type safety and scalable application architecture.",
            "CSS3 & Modern Design Systems: Light purple accents and sleek responsive grids."
          ]
        }
      ],
      github: "https://github.com/minalbhosale5282-coder"
    }
  };

  viewDetailsBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const projKey = btn.getAttribute("data-project");
      const data = projectDetails[projKey];

      if (!data) return;

      let sectionsHtml = "";
      data.sections.forEach(function (sec) {
        sectionsHtml += `
          <h4 class="modal-section-title">${sec.title}</h4>
          <ul class="modal-bullet-list">
            ${sec.items.map(function (item) { return `<li>${item}</li>`; }).join("")}
          </ul>
        `;
      });

      modalContent.innerHTML = `
        <div class="modal-project-header">
          <span class="modal-project-badge">${data.category}</span>
          <h3 class="modal-project-title">${data.title}</h3>
          <p class="modal-project-desc">${data.description}</p>
        </div>
        ${sectionsHtml}
        <div class="modal-actions">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <span>View on GitHub</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
          <button class="btn btn-outline btn-sm" id="modal-close-action">Close</button>
        </div>
      `;

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      // Attach close button inside modal
      const modalCloseAction = document.getElementById("modal-close-action");
      if (modalCloseAction) {
        modalCloseAction.addEventListener("click", closeModal);
      }
    });
  });

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // -------------------------------------------------------------------------
  // 8. Copy to Clipboard Handlers (Email & Phone)
  // -------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const targetText = btn.getAttribute("data-target");
      if (!targetText) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(targetText).then(
          function () {
            showToast(`Copied: ${targetText}`);
          },
          function () {
            fallbackCopy(targetText);
          }
        );
      } else {
        fallbackCopy(targetText);
      }
    });
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand("copy");
      showToast(`Copied: ${text}`);
    } catch (err) {
      showToast("Please copy manually: " + text);
    }
    document.body.removeChild(tempInput);
  }

  // -------------------------------------------------------------------------
  // 9. Toast Notification System
  // -------------------------------------------------------------------------
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2800);
  }

  // -------------------------------------------------------------------------
  // 10. Contact Form Submission
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("form-name").value.trim();
      const email = document.getElementById("form-email").value.trim();
      const subject = document.getElementById("form-subject").value.trim();
      const message = document.getElementById("form-message").value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = "Please fill out all required fields.";
        formStatus.className = "form-status error";
        return;
      }

      const submitBtn = document.getElementById("submit-btn");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "<span>Sending message...</span>";
      }

      // Simulate network request
      setTimeout(function () {
        formStatus.textContent = `Thank you ${name}! Your message has been prepared. You can also directly reach Minal at minalbhosale23@gmail.com`;
        formStatus.className = "form-status success";
        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Send Message</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>`;
        }

        showToast("Message processed! Opening email client...");

        // Provide direct mailto fallback link automatically
        const mailtoUri = `mailto:minalbhosale23@gmail.com?subject=${encodeURIComponent(subject || "Portfolio Contact Inquiry")}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
        window.location.href = mailtoUri;
      }, 700);
    });
  }
});
