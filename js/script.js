/* =========================================================
   EduTech Kids — Frontend Interactions
   - Course level filtering (Udemy/Class Central-inspired)
   - EmailJS appointment mailer (no backend needed)
   ========================================================= */

// ------- COURSE FILTERS -------
const filterButtons = document.querySelectorAll(".filter-btn");
const courseItems = document.querySelectorAll(".course-item");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // toggle active state
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const level = btn.dataset.level;
    courseItems.forEach(card => {
      if (level === "all" || card.dataset.level === level) {
        card.classList.remove("d-none");
      } else {
        card.classList.add("d-none");
      }
    });
  });
});

// ------- APPOINTMENT (EmailJS) -------
const appointmentForm = document.getElementById("appointmentForm");
const bookAlert = document.getElementById("bookAlert");

function showAlert(type, msg){
  if(!bookAlert) return;
  bookAlert.className = `alert alert-${type}`;
  bookAlert.textContent = msg;
  bookAlert.classList.remove("d-none");
  setTimeout(()=> bookAlert.classList.add("d-none"), 5000);
}

if (appointmentForm) {
  appointmentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const student = document.getElementById("studentName").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!student || !date || !time) {
      showAlert("warning","Please fill Name, Date and Time.");
      return;
    }

    // EmailJS - replace with your IDs
    const SERVICE_ID = "YOUR_SERVICE_ID";
    const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        student, date, time
      });
      showAlert("success", "Appointment booked! We emailed the details. 🎉");
      appointmentForm.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      showAlert("danger", "Could not send email right now. Please try again.");
    }
  });
}
