// Help center articles data
const helpArticles = [
    {
        title: "Getting Started with Brainrot",
        category: "Getting Started",
        excerpt: "Download the app, set your first screen time goal, and start building healthier habits in under 5 minutes.",
        url: "help/getting-started.html",
        readTime: "3 min"
    },
    {
        title: "Setting Up Blocking Schedules",
        category: "Getting Started",
        excerpt: "Learn how to set up blocking schedules that fit your daily routine — during dinner, mornings, evenings, and more.",
        url: "help/screen-time-goals.html",
        readTime: "4 min"
    },
    {
        title: "How App Blocking Works",
        category: "Features",
        excerpt: "Understand how Brainrot blocks distracting apps using Apple's Screen Time API and how to configure it.",
        url: "help/app-blocking.html",
        readTime: "4 min"
    },
    {
        title: "Understanding Your Screen Time Stats",
        category: "Features",
        excerpt: "A walkthrough of the analytics dashboard — what each metric means and how to use the data to improve.",
        url: "help/screen-time-stats.html",
        readTime: "5 min"
    },
    {
        title: "Managing Your Subscription",
        category: "Account",
        excerpt: "How to upgrade, downgrade, or cancel your Brainrot subscription through the App Store.",
        url: "help/managing-subscription.html",
        readTime: "3 min"
    },
    {
        title: "Screen Time Data Not Showing Up",
        category: "Troubleshooting",
        excerpt: "If your screen time data looks missing or inaccurate, here are the most common causes and fixes.",
        url: "help/screen-time-not-showing.html",
        readTime: "3 min"
    },
    {
        title: "App Blocking Not Working",
        category: "Troubleshooting",
        excerpt: "Troubleshoot issues with app blocks not activating, including permissions and iOS settings to check.",
        url: "help/app-blocking-not-working.html",
        readTime: "4 min"
    },
    {
        title: "Using Brainrot on Multiple Devices",
        category: "Features",
        excerpt: "Learn how Brainrot syncs across your iPhone and other Apple devices using the same Apple ID.",
        url: "help/multiple-devices.html",
        readTime: "3 min"
    }
    // Add new help articles here
];

// Get unique categories in display order
function getCategories() {
    const order = ["Getting Started", "Features", "Account", "Troubleshooting"];
    const found = new Set(helpArticles.map(a => a.category));
    return order.filter(c => found.has(c));
}

// Render help articles grouped by category
function renderHelpArticles(filter) {
    const container = document.getElementById('help-articles-list');
    const query = (filter || '').toLowerCase().trim();

    const filtered = query
        ? helpArticles.filter(a =>
            a.title.toLowerCase().includes(query) ||
            a.excerpt.toLowerCase().includes(query) ||
            a.category.toLowerCase().includes(query))
        : helpArticles;

    if (filtered.length === 0) {
        container.innerHTML = '<p class="help-no-results">No articles found. Try a different search or <a href="/contact.html">contact us</a> for help.</p>';
        return;
    }

    const categories = query
        ? [...new Set(filtered.map(a => a.category))]
        : getCategories();

    const html = categories.map(category => {
        const articles = filtered.filter(a => a.category === category);
        if (articles.length === 0) return '';

        const articlesHTML = articles.map(article => `
            <a href="${article.url}" class="help-article-card">
                <div class="help-article-info">
                    <h3>${article.title}</h3>
                    <p>${article.excerpt}</p>
                </div>
                <span class="help-article-read-time">${article.readTime}</span>
            </a>
        `).join('');

        return `
            <div class="help-category-group">
                <h3 class="help-category-label">${category}</h3>
                <div class="help-category-articles">
                    ${articlesHTML}
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = html;
}

// FAQ accordion
function initFAQ() {
    document.querySelectorAll('.help-faq-question').forEach(btn => {
        btn.addEventListener('click', function () {
            const item = this.parentElement;
            const wasOpen = item.classList.contains('open');

            // Close all
            document.querySelectorAll('.help-faq-item').forEach(i => i.classList.remove('open'));

            // Toggle clicked
            if (!wasOpen) item.classList.add('open');
        });
    });
}

// Search
function initSearch() {
    const input = document.getElementById('help-search');
    let debounce;

    input.addEventListener('input', function () {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            const query = input.value;
            renderHelpArticles(query);

            // Also filter FAQ
            const faqItems = document.querySelectorAll('.help-faq-item');
            const quickAnswers = document.getElementById('faq');

            if (query.trim()) {
                let faqVisible = 0;
                faqItems.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (text.includes(query.toLowerCase())) {
                        item.style.display = '';
                        faqVisible++;
                    } else {
                        item.style.display = 'none';
                    }
                });
                quickAnswers.style.display = faqVisible > 0 ? '' : 'none';
            } else {
                faqItems.forEach(item => item.style.display = '');
                quickAnswers.style.display = '';
            }
        }, 200);
    });
}

// Init
document.addEventListener('DOMContentLoaded', function () {
    renderHelpArticles();
    initFAQ();
    initSearch();
});
