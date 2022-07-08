"use strict";
const firebaseConfig = {
  apiKey: "AIzaSyBYr7BiMOGSJaCCOpKxnZvsH39vhLAZhJo",
  authDomain: "contact-form-4b643.firebaseapp.com",
  databaseURL: "https://contact-form-4b643-default-rtdb.firebaseio.com",
  projectId: "contact-form-4b643",
  storageBucket: "contact-form-4b643.appspot.com",
  messagingSenderId: "374931766832",
  appId: "1:374931766832:web:61e36c6a0b7e02b6acb7f5",
  measurementId: "G-572HS3GKRY",
};
firebase.initializeApp(firebaseConfig);
// referance message collection
var messagesRef = firebase.database().ref("messages");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  // get value
  var name = getInputVal("name");
  var email = getInputVal("email");
  var subject = getInputVal("subject");
  var message = getInputVal("message");
  //save message
  saveMessage(name, email, subject, message);
  document.querySelector(".alert").style.display = "block";

  // hide alert after 3sec.
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  document.getElementById("contactForm").reset();
}

function getInputVal(id) {
  return document.getElementById(id).value;
}

// save message to firebase

function saveMessage(name, email, subject, message) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email: email,
    subject: subject,
    message: message,
  });
}

/**
 * Easy selector helper function
 */
const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all);
  if (selectEl) {
    if (all) {
      selectEl.forEach((e) => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  }
};

/**
 * Easy on scroll event listener
 */
const onscroll = (el, listener) => {
  el.addEventListener("scroll", listener);
};

/**
 * Navbar links active state on scroll
 */
let navbarlinks = select("#navbar .scrollto", true);
const navbarlinksActive = () => {
  let position = window.scrollY + 200;
  navbarlinks.forEach((navbarlink) => {
    if (!navbarlink.hash) return;
    let section = select(navbarlink.hash);
    if (!section) return;
    if (
      position >= section.offsetTop &&
      position <= section.offsetTop + section.offsetHeight
    ) {
      navbarlink.classList.add("active");
    } else {
      navbarlink.classList.remove("active");
    }
  });
};
window.addEventListener("load", navbarlinksActive);
onscroll(document, navbarlinksActive);

/**
 * Scrolls to an element with header offset
 */
const scrollto = (el) => {
  let elementPos = select(el).offsetTop;
  window.scrollTo({
    top: elementPos,
    behavior: "smooth",
  });
};

/**
 * Back to top button
 */
let backtotop = select(".back-to-top");
if (backtotop) {
  const toggleBacktotop = () => {
    if (window.scrollY > 100) {
      backtotop.classList.add("active");
    } else {
      backtotop.classList.remove("active");
    }
  };
  window.addEventListener("load", toggleBacktotop);
  onscroll(document, toggleBacktotop);
}

/**
 * Mobile nav toggle
 */
on("click", ".mobile-nav-toggle", function (e) {
  select("body").classList.toggle("mobile-nav-active");
  this.classList.toggle("bi-list");
  this.classList.toggle("bi-x");
});

/**
 * Scrool with ofset on links with a class name .scrollto
 */
on(
  "click",
  ".scrollto",
  function (e) {
    if (select(this.hash)) {
      e.preventDefault();

      let body = select("body");
      if (body.classList.contains("mobile-nav-active")) {
        body.classList.remove("mobile-nav-active");
        let navbarToggle = select(".mobile-nav-toggle");
        navbarToggle.classList.toggle("bi-list");
        navbarToggle.classList.toggle("bi-x");
      }
      scrollto(this.hash);
    }
  },
  true
);

/**
 * Scroll with ofset on page load with hash links in the url
 */
window.addEventListener("load", () => {
  if (window.location.hash) {
    if (select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  }
});

/**
 * Hero type effect
 */
const typed = select(".typed");
if (typed) {
  let typed_strings = typed.getAttribute("data-typed-items");
  typed_strings = typed_strings.split(",");
  new Typed(".typed", {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
  });
}

/**
 * Skills animation
 */
let skilsContent = select(".skills-content");
if (skilsContent) {
  new Waypoint({
    element: skilsContent,
    offset: "80%",
    handler: function (direction) {
      let progress = select(".progress .progress-bar", true);
      progress.forEach((el) => {
        el.style.width = el.getAttribute("aria-valuenow") + "%";
      });
    },
  });
}

/**
 * Porfolio isotope and filter
 */
window.addEventListener("load", () => {
  let portfolioContainer = select(".portfolio-container");
  if (portfolioContainer) {
    let portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: ".portfolio-item",
    });

    let portfolioFilters = select("#portfolio-flters li", true);

    on(
      "click",
      "#portfolio-flters li",
      function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove("filter-active");
        });
        this.classList.add("filter-active");

        portfolioIsotope.arrange({
          filter: this.getAttribute("data-filter"),
        });
        portfolioIsotope.on("arrangeComplete", function () {
          AOS.refresh();
        });
      },
      true
    );
  }
});

/**
 * Initiate portfolio lightbox
 */
const portfolioLightbox = GLightbox({
  selector: ".portfolio-lightbox",
});

/**
 * Portfolio details slider
 */
new Swiper(".portfolio-details-slider", {
  speed: 400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
});

/**
 * Testimonials slider
 */
new Swiper(".testimonials-slider", {
  speed: 600,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  slidesPerView: "auto",
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

/**
 * Animation on scroll
 */
window.addEventListener("load", () => {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
});

// slider
let testim = document.getElementById("testim");
let testimDots = Array.prototype.slice.call(
  document.getElementById("testim-dots").children
);
let testimContent = Array.prototype.slice.call(
  document.getElementById("testim-content").children
);
let testimleftArrow = document.getElementById("left-arrow");
let testimRightArrow = document.getElementById("right-arrow");
let testimSpeed = 4500;
let currentSlide = 0;
let currentActive = 0;
let testimTimer;

window.onload = function () {
  // Testim Script
  function playSlide(slide) {
    for (var k = 0; k < testimDots.length; k++) {
      testimContent[k].classList.remove("active");
      testimContent[k].classList.remove("inactive");
      testimDots[k].classList.remove("active");
    }
    if (slide < 0) {
      slide = currentSlide = testimContent.length - 1;
    }
    if (slide > testimContent.length - 1) {
      slide = currentSlide = 0;
    }
    if (currentActive != currentSlide) {
      testimContent[currentActive].classList.add("inactive");
    }
    testimContent[slide].classList.add("active");
    testimDots[slide].classList.add("active");

    currentActive = currentSlide;

    clearTimeout(testimTimer);
    testimTimer = setTimeout(function () {
      playSlide((currentSlide += 1));
    }, testimSpeed);
  }

  testimleftArrow.addEventListener("click", function () {
    playSlide((currentSlide -= 1));
  });
  testimRightArrow.addEventListener("click", function () {
    playSlide((currentSlide += 1));
  });

  for (var l = 0; l < testimDots.length; l++) {
    testimDots[l].addEventListener("click", function () {
      playSlide((currentSlide = testimDots.indexOf(this)));
    });
  }
  playSlide(currentSlide);
};
