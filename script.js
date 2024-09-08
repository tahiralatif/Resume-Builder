var _a;
(_a = document.getElementById("resumeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from refreshing the page
    var formElement = this;
    var formData = new FormData(formElement);
    var username = formData.get("username");
    var firstName = formData.get("firstName");
    var lastName = formData.get("lastName");
    var email = formData.get("email");
    // Generate a unique resume URL based on the username
    var uniqueURL = "".concat(window.location.origin, "/resume/").concat(username);
    // Display the resume content
    var resumeContent = "\n        <p><strong>First Name:</strong> ".concat(firstName, "</p>\n        <p><strong>Last Name:</strong> ").concat(lastName, "</p>\n        <p><strong>Email:</strong> ").concat(email, "</p>\n        <p><strong>Resume URL:</strong> <a href=\"").concat(uniqueURL, "\" target=\"_blank\">").concat(uniqueURL, "</a></p>\n    ");
    var resumeContentElement = document.getElementById("resumeContent");
    if (resumeContentElement) {
        resumeContentElement.innerHTML = resumeContent;
    }
    // Show the resume preview and share options
    var resumePreview = document.getElementById("resumePreview");
    var shareOptions = document.getElementById("shareOptions");
    if (resumePreview && shareOptions) {
        resumePreview.style.display = "block";
        shareOptions.style.display = "block";
    }
    // Update the shareable link
    var resumeLink = document.getElementById("resumeLink");
    if (resumeLink) {
        resumeLink.href = uniqueURL;
        resumeLink.textContent = "View Resume at ".concat(uniqueURL);
    }
    // Add functionality to download the resume as a PDF
    var downloadButton = document.getElementById("downloadResumeButton");
    downloadButton === null || downloadButton === void 0 ? void 0 : downloadButton.addEventListener("click", function () {
        var resumeContentElement = document.getElementById("resumeContent");
        if (resumeContentElement) {
            var resumeHTML = resumeContentElement.innerHTML;
            var blob = new Blob([resumeHTML], { type: "application/pdf" });
            var link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "".concat(username, "_resume.pdf");
            link.click();
        }
    });
});
