/***********************************************************
  scripts.js
  Contains logic for:
   1) Tab switching (login, register)
   2) User & Doctor login
   3) User & Doctor registration
   4) User dashboard logic
   5) Doctor dashboard logic
***********************************************************/

// ---------- Tab Switching (for index.html & register.html) ----------
function openTab(evt, tabName) {
    const tabcontents = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontents.length; i++) {
      tabcontents[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
  }
  
  /***********************************************************
    LOGIN PAGE (index.html)
  ***********************************************************/
  const userLoginForm = document.getElementById("user-login-form");
  if (userLoginForm) {
    userLoginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const fullname = document.getElementById("userFullname").value;
      const aadhaar = document.getElementById("userAadhaar").value;
  
      // In production, validate credentials via backend
      // For demo, generate a dummy Patient ID
      const patientId = "PAT" + Math.floor(Math.random() * 10000);
  
      // Store user info in sessionStorage
      sessionStorage.setItem("userFullname", fullname);
      sessionStorage.setItem("patientId", patientId);
  
      alert("Login successful. Welcome " + patientId);
      window.location.href = "dashboard.html";  // Redirect to user dashboard
    });
  }
  
  const doctorLoginForm = document.getElementById("doctor-login-form");
  if (doctorLoginForm) {
    doctorLoginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const fullname = document.getElementById("doctorFullname").value;
      const doctorId = document.getElementById("doctorId").value;
  
      // In production, validate credentials
      // For demo, just store them
      sessionStorage.setItem("doctorFullname", fullname);
      sessionStorage.setItem("doctorId", doctorId);
  
      alert("Login successful. Welcome Dr. " + fullname);
      window.location.href = "doctor-dashboard.html";  // Redirect to doctor dashboard
    });
  }
  
  /***********************************************************
    REGISTRATION PAGE (register.html)
  ***********************************************************/
  const userRegisterForm = document.getElementById("user-register-form");
  if (userRegisterForm) {
    userRegisterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Gather user registration details
      const name = document.getElementById("userName").value;
      const aadhaar = document.getElementById("userAadhaarReg").value;
      const phone = document.getElementById("userPhone").value;
      const dob = document.getElementById("userDOB").value;
      const gender = document.getElementById("userGender").value;
  
      // Generate a dummy Patient ID
      const patientId = "PAT" + Math.floor(Math.random() * 10000);
      alert(
        "Registration successful! Your Patient ID is: " +
          patientId +
          "\nPlease login with your credentials."
      );
      window.location.href = "index.html";  // Redirect to login
    });
  }
  
  const doctorRegisterForm = document.getElementById("doctor-register-form");
  if (doctorRegisterForm) {
    doctorRegisterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Gather doctor registration details
      const name = document.getElementById("doctorName").value;
      const aadhaar = document.getElementById("doctorAadhaarReg").value;
      const phone = document.getElementById("doctorPhone").value;
      const dob = document.getElementById("doctorDOB").value;
      const gender = document.getElementById("doctorGender").value;
  
      // Generate a dummy Doctor ID
      const docId = "DOC" + Math.floor(Math.random() * 10000);
      alert(
        "Registration successful! Your Doctor ID is: " +
          docId +
          "\nPlease login with your credentials."
      );
      window.location.href = "index.html";  // Redirect to login
    });
  }
  
  /***********************************************************
    USER DASHBOARD (dashboard.html)
  ***********************************************************/
  document.addEventListener("DOMContentLoaded", function () {
    // If we're on the user dashboard
    const welcomeMessage = document.getElementById("welcomeMessage");
    if (welcomeMessage) {
      const patientId = sessionStorage.getItem("patientId");
      const userFullname = sessionStorage.getItem("userFullname");
      if (patientId && userFullname) {
        welcomeMessage.textContent = `Welcome, Patient ${patientId}`;
  
        // Fill in profile info
        const profileNameEl = document.getElementById("profileName");
        const profileIdEl = document.getElementById("profileId");
        if (profileNameEl) profileNameEl.textContent = `Name: ${userFullname}`;
        if (profileIdEl) profileIdEl.textContent = `Patient ID: ${patientId}`;
      }
    }
  
    /***********************************************************
      DOCTOR DASHBOARD (doctor-dashboard.html)
    ***********************************************************/
    const doctorWelcome = document.getElementById("doctorWelcome");
    if (doctorWelcome) {
      const doctorFullname = sessionStorage.getItem("doctorFullname");
      if (doctorFullname) {
        doctorWelcome.textContent = `Welcome, Dr. ${doctorFullname}`;
      }
  
      // Handle Search Patient
      const searchPatientForm = document.getElementById("searchPatientForm");
      const searchMessage = document.getElementById("searchMessage");
      const patientSection = document.getElementById("patientSection");
  
      if (searchPatientForm) {
        searchPatientForm.addEventListener("submit", function (e) {
          e.preventDefault();
          const searchPatientId = document.getElementById("searchPatientId").value.trim();
  
          if (!searchPatientId) {
            searchMessage.textContent = "Please enter a Patient ID.";
            patientSection.style.display = "none";
            return;
          }
  
          // Simulate a found patient if ID matches "PAT1234"
          // In production, call your backend
          if (searchPatientId === "PAT1234") {
            searchMessage.textContent = "Patient found. Displaying details...";
            patientSection.style.display = "block";
  
            // Populate some dummy data
            document.getElementById("patientName").value = "John Doe";
            document.getElementById("patientIdField").value = "PAT1234";
            document.getElementById("patientAge").value = "35";
            document.getElementById("patientDisease").value = "Hypertension";
            document.getElementById("notes").value = "Has been experiencing headaches.";
          } else {
            searchMessage.textContent = "Patient not found. Try PAT1234 as a demo.";
            patientSection.style.display = "none";
          }
        });
      }
  
      // Handle Update Details
      const updateDetailsBtn = document.getElementById("updateDetailsBtn");
      const updateMessage = document.getElementById("updateMessage");
  
      if (updateDetailsBtn) {
        updateDetailsBtn.addEventListener("click", function () {
          // Gather data from forms
          const patientName = document.getElementById("patientName").value;
          const patientIdField = document.getElementById("patientIdField").value;
          const patientAge = document.getElementById("patientAge").value;
          const patientDisease = document.getElementById("patientDisease").value;
          const notes = document.getElementById("notes").value;
  
          const hospitalName = document.getElementById("hospitalName").value;
          const diseaseType = document.getElementById("diseaseType").value;
          const operationName = document.getElementById("operationName").value;
          const dateOfOperation = document.getElementById("dateOfOperation").value;
          const prescriptionFile = document.getElementById("prescriptionUpload").files[0];
          const reportNotes = document.getElementById("reportNotes").value;
  
          // In a real app, you'd send this data to your backend
          // For demo, just show a success message
          updateMessage.textContent = "Details updated successfully!";
          setTimeout(() => {
            updateMessage.textContent = "";
          }, 3000);
        });
      }
    }
  });
  