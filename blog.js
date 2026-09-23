// Blog posts data
const blogPosts = [
    {
        title: "Brain Rot: From Thoreau to TikTok - Oxford's 2024 Word of the Year",
        date: "2025-08-04",
        excerpt: "Discover the fascinating journey of 'brain rot' from Henry David Thoreau's 1854 coinage to Oxford's 2024 Word of the Year. Learn about its meaning, Gen Z impact, and societal effects.",
        url: "blog/2025-08-04-brain-rot-oxford-word-year.html",
        readTime: "8 min",
        author: "Yoni Smolyar",
        authorUrl: "author/yoni-smolyar.html"
    },
    {
        title: "The Complete Guide to Digital Detox",
        date: "2025-08-02",
        excerpt: "Learn how to successfully complete a digital detox and reset your relationship with technology.",
        url: "blog/2025-08-02-digital-detox-guide.html",
        readTime: "5 min",
        author: "Yoni Smolyar",
        authorUrl: "author/yoni-smolyar.html"
    }
    // Add new blog posts here
];

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Function to render blog posts
function renderBlogPosts() {
    const container = document.getElementById('blog-posts');
    
    if (blogPosts.length === 0) {
        container.innerHTML = '<p>No blog posts yet. Check back soon!</p>';
        return;
    }
    
    // Sort posts by date (newest first)
    const sortedPosts = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const postsHTML = sortedPosts.map(post => `
        <article class="blog-card">
            <h2><a href="${post.url}">${post.title}</a></h2>
            <div class="post-meta">
                <time datetime="${post.date}">${formatDate(post.date)}</time>
                <span class="reading-time">${post.readTime} read</span>
                ${post.author ? `<span class="post-author-with-image">by 
                    <a href="${post.authorUrl}" class="post-author">
                        <img src="images/yoni-smolyar.webp" alt="${post.author}" class="post-author-image">
                        ${post.author}
                    </a>
                </span>` : ''}
            </div>
            <p>${post.excerpt}</p>
            <a href="${post.url}" class="read-more">Read more →</a>
        </article>
    `).join('');
    
    container.innerHTML = postsHTML;
}

// Render posts when page loads
document.addEventListener('DOMContentLoaded', renderBlogPosts);