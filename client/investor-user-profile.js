$(document).ready(function () {
  let generatedOtp = null;
  let emailVerified = false;

  // Validate alphabets only for name fields
  $("#invFirstName, #invLastName").on("input", function () {
    this.value = this.value.replace(/[^a-zA-Z]/g, "");
  });

  // Validate phone (numbers only)
  $("#invPhoneInput").on("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });

  // Send OTP
  $("#sendOtpBtn").click(function () {
    const email = $("#invEmailInput").val();
    if (!validateEmail(email)) {
      alert("Enter a valid email before requesting OTP.");
      return;
    }
    generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    alert("OTP sent to " + email + ": " + generatedOtp); // Demo only
    $("#otpSection").removeClass("hidden").addClass("slide-up");
  });

  // Verify OTP
  $("#verifyOtpBtn").click(function () {
    const enteredOtp = $("#otpInput").val();
    if (enteredOtp === generatedOtp) {
      $("#otpStatus").text("✅ OTP Verified").css("color", "lime");
      emailVerified = true;
    } else {
      $("#otpStatus").text("❌ Incorrect OTP").css("color", "red");
      emailVerified = false;
    }
  });

  // Create / Save Profile
  $("#investorForm").submit(function (e) {
    e.preventDefault();

    if (!emailVerified) {
      alert("Please verify your email with OTP.");
      return;
    }

    const firstName = $("#invFirstName").val();
    const lastName = $("#invLastName").val();
    const email = $("#invEmailInput").val();
    const phone = $("#invPhoneInput").val();
    const fields = $("#invFieldsInput").val().join(", ");

    $("#invName").text(firstName + " " + lastName);
    $("#invEmail").text(email);
    $("#invPhone").text(phone);
    $("#invFields").text(fields);
    $("#invBio").text("No bio added");

    $("#investorForm").addClass("hidden");
    $("#investorDetails").removeClass("hidden fade-in");
  });

  // Edit Profile
  $("#editInvestorBtn").click(function () {
    $("#investorDetails").addClass("hidden");
    $("#investorForm").removeClass("hidden slide-up");
  });

  // Add/Edit Bio
  $("#editBioBtn").click(function () {
    $("#bioSection").removeClass("hidden slide-up");
    $("#investorDetails").addClass("hidden");
  });

  // Save Bio
  $("#saveBioBtn").click(function () {
    const bio = $("#bioInput").val();
    $("#invBio").text(bio || "No bio added");
    $("#bioSection").addClass("hidden");
    $("#investorDetails").removeClass("hidden fade-in");
  });

  // Email format validator
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
