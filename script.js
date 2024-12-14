// Dark/Light Mode Toggle
const modeToggleButton = document.getElementById('mode-toggle');
const body = document.body;

modeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
});

// Logo Animation
function animateLogo() {
    const logo = document.querySelector('.logo img');
    logo.style.animation = 'logoAnimation 1s ease-out';
    setTimeout(() => {
        logo.style.animation = '';
    }, 1000);
}

// Copy Text Function
function copyText() {
    const emailContent = document.getElementById('email-content');
    navigator.clipboard.writeText(emailContent.value)
        .then(() => alert("Email copied to clipboard!"))
        .catch(err => alert("Failed to copy text: " + err));
}

// Email Generation Logic
document.getElementById('email-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const companyName = document.getElementById('company').value;
    const companyField = document.getElementById('company-field').value;
    const recruiterName = document.getElementById('recruiter-name').value;
    const recruiterGender = document.getElementById('recruiter-gender').value;
    const role = document.getElementById('role').value;
    const skills = document.getElementById('skills').value;
    const experienceLevel = document.getElementById('experience').value;
    const webLinks = document.getElementById('web-links').value;

    let emailContent = `Dear ${recruiterGender === 'Male' ? 'Mr.' : 'Ms.'} ${recruiterName || 'Hiring Manager'},\n\n`;

    emailContent += `I hope this message finds you well. My name is [Your Name], and I am writing to express my interest in the ${role} role at ${companyName}.\n\n`;

    if (companyField) {
        emailContent += `I deeply admire ${companyName}'s work in the field of ${companyField}, and I am excited about the opportunity to contribute.\n\n`;
    }

    emailContent += `With my skills in ${skills}, I believe I can make a meaningful impact.\n\n`;

    if (experienceLevel === 'Entry level') {
        emailContent += `I am eager to learn and grow within the company, bringing a fresh perspective and enthusiasm.\n\n`;
    } else if (experienceLevel === 'Mid level') {
        emailContent += `With my experience, I am excited to contribute and collaborate on meaningful projects that can drive success.\n\n`;
    } else if (experienceLevel === 'Senior level') {
        emailContent += `I am looking forward to leading initiatives and mentoring others, leveraging my experience to foster growth.\n\n`;
    }

    if (webLinks.trim()) {
        emailContent += `You can find more about my work at the following link(s):\n${webLinks}\n\n`;
    }

    emailContent += `Thank you for considering my application. I look forward to the possibility of working with ${companyName}.\n\nBest regards,\n[Your Name]`;

    document.getElementById('email-content').value = emailContent;
});

// Rate Button Functionality
function submitRating(stars) {
    const feedback = document.getElementById('rating-feedback');
    feedback.textContent = `Thanks for your valuable feedback! You rated us ${stars} stars.`;
}

// Rate Button Functionality
function submitRating(stars) {
    const feedback = document.getElementById('rating-feedback');
    feedback.textContent = `Thanks for your valuable feedback! You rated us ${stars} stars.`;
    
    // Hide the message after 5 seconds
    setTimeout(() => {
        feedback.textContent = '';
    }, 5000);
}


function submitRating(stars) {
    const feedback = document.getElementById('rating-feedback');
    feedback.textContent = `Thanks for your valuable feedback! You rated us ${stars} stars.`;

    // Send the rating to the backend
    fetch('https://c0ccaccc-3826-479c-beae-5bb60aadbb34-00-be3zijn44prk.sisko.replit.dev:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            rating: stars
        })
    })
    .then(response => {
        console.log('Response status:', response.status); // Log status code
        if (!response.ok) {
            return response.text().then(text => {
                console.error(`Server Error: ${response.status} - ${text}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); // Log the success message from the backend
    })
    .catch(error => {
        console.error('Fetch Error:', error); // Log fetch error
    });

    // Hide the feedback message after 5 seconds
    setTimeout(() => {
        feedback.textContent = '';
    }, 5000);
}

