// JavaScript Interactivity

// Event Listener for CTA Button
document.getElementById('cta-button').addEventListener('click', function () {
    alert('You clicked the button!');
  });
  
  // Form Submission Handler
  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    if (name && email && message) {
      alert(`Thanks for reaching out, ${name}! We'll respond to your message soon.`);
      this.reset();
    } else {
      alert('Please fill out all fields.');
    }
  });
  