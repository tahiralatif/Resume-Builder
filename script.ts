document.getElementById("resumeForm")?.addEventListener("submit", function (event: Event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    const formElement = this as HTMLFormElement;
    const formData = new FormData(formElement);

    const username = formData.get("username") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;

    // Generate a unique resume URL based on the username
    const uniqueURL = `${window.location.origin}/resume/${username}`;

    // Display the resume content
    const resumeContent = `
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Resume URL:</strong> <a href="${uniqueURL}" target="_blank">${uniqueURL}</a></p>
    `;
    
    const resumeContentElement = document.getElementById("resumeContent") as HTMLDivElement | null;
    if (resumeContentElement) {
        resumeContentElement.innerHTML = resumeContent;
    }

    // Show the resume preview and share options
    const resumePreview = document.getElementById("resumePreview") as HTMLDivElement | null;
    const shareOptions = document.getElementById("shareOptions") as HTMLDivElement | null;
    if (resumePreview && shareOptions) {
        resumePreview.style.display = "block";
        shareOptions.style.display = "block";
    }

    // Update the shareable link
    const resumeLink = document.getElementById("resumeLink") as HTMLAnchorElement | null;
    if (resumeLink) {
        resumeLink.href = uniqueURL;
        resumeLink.textContent = `View Resume at ${uniqueURL}`;
    }

    // Add functionality to download the resume as a PDF
    const downloadButton = document.getElementById("downloadResumeButton") as HTMLButtonElement | null;
    downloadButton?.addEventListener("click", function () {
        const resumeContentElement = document.getElementById("resumeContent") as HTMLDivElement | null;
        if (resumeContentElement) {
            const resumeHTML = resumeContentElement.innerHTML;
            const blob = new Blob([resumeHTML], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${username}_resume.pdf`;
            link.click();
        }
    });
});
