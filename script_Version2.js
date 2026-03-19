const GITHUB_USERNAME = 'george-1-0-1';
const GITHUB_API = 'https://api.github.com/users';

// Fetch and display GitHub projects
async function loadProjects() {
    try {
        const response = await fetch(`${GITHUB_API}/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        const repos = await response.json();
        displayProjects(repos);
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projectsGrid').innerHTML = '<p>Error loading projects. Please try again later.</p>';
    }
}

function displayProjects(repos) {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';

    repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
            <div class="project-meta" style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 1rem;">
                ${repo.language ? `<span>Language: ${repo.language}</span>` : ''}
                ${repo.stargazers_count ? `<span style="margin-left: 1rem;">⭐ ${repo.stargazers_count}</span>` : ''}
            </div>
            <div class="project-links">
                <a href="${repo.html_url}" target="_blank" class="project-link">View Repository</a>
                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="project-link">Live Demo</a>` : ''}
            </div>
        `;
        projectsGrid.appendChild(card);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Load projects when page loads
document.addEventListener('DOMContentLoaded', loadProjects);

// Add fade-in animation to sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});