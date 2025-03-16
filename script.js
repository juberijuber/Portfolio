$(document).ready(function() {
  //sticky header
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1) {
        $(".header-area").addClass("sticky");
      } else {
        $(".header-area").removeClass("sticky");
      }
  
      // Update the active section in the header
      updateActiveSection();
    });
  
    $(".header ul li a").click(function(e) {
      e.preventDefault(); 
  
      var target = $(this).attr("href");
  
      if ($(target).hasClass("active-section")) {
        return; 
      }
  
      if (target === "#home") {
        $("html, body").animate(
          {
            scrollTop: 0 
          },
          500
        );
      } else {
        var offset = $(target).offset().top - 50; 
  
        $("html, body").animate(
          {
            scrollTop: offset
          },
          500
        );
      }
  
      $(".header ul li a").removeClass("active");
      $(this).addClass("active");
    });
  

    //Initial content revealing js
    ScrollReveal({
      distance: "100px",
      duration: 1200,
      delay: 200
    });
  
    ScrollReveal().reveal(" .profile-photo, .about-content, .education", {
      origin: "left"
    });
    ScrollReveal().reveal(" .profile-text, .about-skills, .internship", {
      origin: "right"
    });
    ScrollReveal().reveal(".project-title, .contact-title", {
      origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact", {
      origin: "bottom"
    });

  
  // ================ START OF EMAIL SECTION JAVASCRIPT ================

// Setup email form submission handler
const contactForm = document.forms['submitToGoogleSheet'];
const messageSpan = document.getElementById('msg');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.NAME.value;
        const email = contactForm.EMAIL.value;
        const subject = contactForm.SUBJECT.value;
        const message = contactForm.MESSAGE.value;
        
        // Send email using emailjs
        emailjs.send(
            "service_n6agwij",
            "template_hnye3fc",
            {
                name: name,
                email: email,
                subject: subject,
                message: message,
            },
            "fxvjkKPDAMKYiQ4FU"
        )
        .then(() => {
            console.log("Message sent successfully!");
            
            // Show success message
            if (messageSpan) {
                messageSpan.innerText = "Message sent successfully!";
                messageSpan.style.color = "green";
            }
            
            // Reset the form
            contactForm.reset();
        })
        .catch((error) => {
            console.error("Failed to send message:", error.text || error.message || error);
            
            if (messageSpan) {
                messageSpan.innerText = "Failed to send message. Please try again later.";
                messageSpan.style.color = "red";
            }
        });
    });
}

// ================ END OF EMAIL SECTION JAVASCRIPT ==================
});
  
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  // Checking if scroll position is at the top of the page
  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  // Iterate through each section and update the active class in the header
  $("section").each(function() {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (
      scrollPosition >= offset - 40 &&
      scrollPosition < offset + height - 40
    ) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}