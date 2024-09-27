// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll("nav ul li a");
    
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Section highlighting while scrolling
    const sections = document.querySelectorAll("main section");
    window.addEventListener("scroll", () => {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 50) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    });

    // Dynamic project loading
    const projectsSection = document.getElementById('projects');
    const projectData = [
        { title: "Project 1", description: "Description of Project 1", link: "#" },
        { title: "Project 2", description: "Description of Project 2", link: "#" },
        { title: "Project 3", description: "Description of Project 3", link: "#" },
        { title: "Project 4", description: "Description of Project 4", link: "#" }
    ];

    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project-list');
    projectsSection.appendChild(projectContainer);

    projectData.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');

        projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}">View Project</a>
        `;
        projectContainer.appendChild(projectElement);
    });

    // Light/Dark mode toggle
    const toggleSwitch = document.createElement('button');
    toggleSwitch.innerText = "Toggle Dark Mode";
    document.body.appendChild(toggleSwitch);

    toggleSwitch.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            toggleSwitch.innerText = "Switch to Light Mode";
        } else {
            toggleSwitch.innerText = "Switch to Dark Mode";
        }
    });
});
