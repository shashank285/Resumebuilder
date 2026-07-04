function generateResume() {
    const user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        profilePicture: document.getElementById('profilePicture').value, // Add the image URL here if needed
        education: {
            school: document.getElementById('educationSchool').value,
            degree: document.getElementById('educationDegree').value,
            startDate: document.getElementById('educationStartDate').value,
            endDate: document.getElementById('educationEndDate').value,
        },
        experience: {
            position: document.getElementById('experiencePosition').value,
            company: document.getElementById('experienceCompany').value,
            startDate: document.getElementById('experienceStartDate').value,
            endDate: document.getElementById('experienceEndDate').value,
        },
        skills: document.getElementById('skills').value,
        languages: document.getElementById('languages').value,
        // Add more fields as needed
    };

    // Store user details in localStorage
    localStorage.setItem('resumeData', JSON.stringify(user));

    // Display user details
    displayResume();
}

function displayResume() {
    const resumeOutput = document.getElementById('resumeOutput');
    const user = JSON.parse(localStorage.getItem('resumeData'));

    if (user) {
        const educationPeriod = formatPeriod(user.education.startDate, user.education.endDate);
        const experiencePeriod = formatPeriod(user.experience.startDate, user.experience.endDate);

        resumeOutput.innerHTML = `
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Address: ${user.address}</p>
            <h3>Education</h3>
            <p>${user.education.school}, ${user.education.degree}</p>
            <p>${educationPeriod}</p>
            <h3>Work Experience</h3>
            <p>${user.experience.position} at ${user.experience.company}</p>
            <p>${experiencePeriod}</p>
            <h3>Skills</h3>
            <p>${user.skills}</p>
            <h3>Languages</h3>
            <p>${user.languages}</p>
            <!-- Add more sections as needed -->
        `;
    }
}

function saveAsPDF() {
    const resumeContainer = document.getElementById('resumeOutput');

    html2canvas(resumeContainer).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 180, 180);

        // Save the PDF at the computer location
        pdf.save('resume.pdf');
    });
}

function formatPeriod(startDate, endDate) {
    if (startDate && endDate) {
        return `${startDate} - ${endDate}`;
    } else if (startDate) {
        return `Since ${startDate}`;
    } else {
        return '';
    }
}
