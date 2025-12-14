/* ================= FADE-IN SECTION ANIMATION ================= */
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.15 }
);

sections.forEach(section => observer.observe(section));

/* ================= HAMBURGER MENU TOGGLE (MOBILE-FRIENDLY) ================= */
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');
const navbar = document.querySelector('.navbar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('show');
        document.body.style.overflow = navLinksContainer.classList.contains('show') ? 'hidden' : '';
    });
}

/* ================= CLOSE MENU ON LINK CLICK ================= */
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('show');
        document.body.style.overflow = '';
    });
});

/* ================= AUTO CLOSE MENU ON SCROLL ================= */
window.addEventListener('scroll', () => {
    if (navLinksContainer.classList.contains('show')) {
        navLinksContainer.classList.remove('show');
        document.body.style.overflow = '';
    }
});

/* ================= NAVBAR ACTIVE LINK ON SCROLL ================= */
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbar.offsetHeight - 40;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

/* ================= SMOOTH SCROLL ================= */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        const offset = navbar.offsetHeight + 20;

        window.scrollTo({
            top: targetSection.offsetTop - offset,
            behavior: 'smooth'
        });
    });
});

/* ================= SAMPLE DATA ================= */
const rawData = [];
for (let i = 1; i <= 50; i++) {
    const types = ['Delay', 'Communication', 'Error'];
    rawData.push({
        type: types[Math.floor(Math.random() * types.length)]
    });
}

/* ================= CALCULATE ISSUE COUNTS ================= */
const issueCounts = rawData.reduce((acc, record) => {
    acc[record.type] = (acc[record.type] || 0) + 1;
    return acc;
}, {});

/* ================= ISSUE DISTRIBUTION CHART ================= */
const ctxIssue = document.getElementById('issueChart');
if (ctxIssue) {
    new Chart(ctxIssue, {
        type: 'pie',
        data: {
            labels: ['Delay', 'Communication', 'Error'],
            datasets: [{
                data: [
                    issueCounts['Delay'] || 0,
                    issueCounts['Communication'] || 0,
                    issueCounts['Error'] || 0
                ],
                backgroundColor: ['#ff6384', '#ffce56', '#36a2eb'],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Customer Issue Type Distribution (Sample-Based)',
                    font: { size: 18 }
                },
                legend: {
                    position: 'bottom'
                }
            },
            animation: { duration: 1000 }
        }
    });
}

/* ================= RESULTS COMPARISON CHART ================= */
const ctxImpact = document.getElementById('impactChart');
let impactChart;
if (ctxImpact) {
    impactChart = new Chart(ctxImpact, {
        type: 'bar',
        data: {
            labels: ['Delay', 'Communication', 'Error'],
            datasets: [
                {
                    label: 'Before Improvement (%)',
                    data: [
                        Math.round((issueCounts['Delay'] || 0) / rawData.length * 100),
                        Math.round((issueCounts['Communication'] || 0) / rawData.length * 100),
                        Math.round((issueCounts['Error'] || 0) / rawData.length * 100)
                    ],
                    backgroundColor: '#ff6384'
                },
                {
                    label: 'After Improvement (%)',
                    data: [
                        Math.round((issueCounts['Delay'] || 0) / rawData.length * 35), 
                        Math.round((issueCounts['Communication'] || 0) / rawData.length * 25), 
                        Math.round((issueCounts['Error'] || 0) / rawData.length * 15)
                    ],
                    backgroundColor: '#36a2eb'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Issue Rates Before vs After Process Improvements',
                    font: { size: 18 }
                },
                legend: { position: 'top' }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Percentage (%)' }
                }
            },
            animation: { duration: 1000 }
        }
    });
}

/* ================= DOWNLOAD CHART BUTTON ================= */
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn && impactChart) {
    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = impactChart.toBase64Image();
        link.download = 'Customer_Issue_Impact.png';
        link.click();
    });
}
