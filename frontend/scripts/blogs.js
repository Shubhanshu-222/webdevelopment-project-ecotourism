document.addEventListener('DOMContentLoaded', () => {
    // Updated JSON Data for Maharashtra Tourism
    const blogData = {
        "posts": [
            {
                "id": 1,
                "title": "Top Destinations to Explore in Maharashtra",
                "excerpt": "Discover popular tourist spots like Ajanta and Ellora Caves, Lonavala, and the beautiful beaches of Ratnagiri and Alibaug.",
                "image": "../Assets/blogs/1.png",
                "url": "/blog/1" // Configurable URL
            },
            {
                "id": 2,
                "title": "Cultural Heritage of Maharashtra: Temples and Forts",
                "excerpt": "Explore the historical temples and majestic forts of Maharashtra, like the Ellora Caves and the forts of Raigad and Shivneri, which played significant roles in India's history.",
                "image": "../Assets/blogs/2.png",
                "url": "/blog/2" // Configurable URL
            },
            {
                "id": 3,
                "title": "Adventure Tourism in Maharashtra: Trekking and Wildlife Sanctuaries",
                "excerpt": "Maharashtra offers adventure seekers thrilling trekking routes and wildlife sanctuaries like the Tadoba National Park, offering a chance to explore the wilderness of the region.",
                "image": "../Assets/blogs/3.png",
                "url": "/blog/3" // Configurable URL
            },
            {
                "id": 4,
                "title": "Maharashtra’s Hidden Gems: Lesser-Known Destinations",
                "excerpt": "Discover lesser-known yet beautiful destinations like the hill stations of Malshej Ghat and the serene beaches of Tarkarli, perfect for those seeking peace and solitude.",
                "image": "../Assets/blogs/4.png",
                "url": "/blog/4" // Configurable URL
            },
            {
                "id": 5,
                "title": "Sustainable Travel in Maharashtra: Responsible Tourism Practices",
                "excerpt": "Learn how sustainable travel practices can be adopted while exploring Maharashtra’s rich natural and cultural heritage, supporting local communities and preserving the environment.",
                "image": "../Assets/blogs/5.png",
                "url": "/blog/5" // Configurable URL
            }
        ],
        "comments": [
            {
                "id": 1,
                "name": "Rajesh Patel",
                "email": "rajesh@example.com",
                "message": "Great article on Maharashtra's cultural heritage! It’s fascinating to learn about the historic temples and forts."
            },
            {
                "id": 2,
                "name": "Meera Jain",
                "email": "meera@example.com",
                "message": "Thanks for highlighting the adventure opportunities in Maharashtra! Definitely planning a trip soon."
            },
            {
                "id": 3,
                "name": "Sandeep Sharma",
                "email": "sandeep@example.com",
                "message": "Love the list of lesser-known destinations. Malshej Ghat and Tarkarli are definitely on my travel list now!"
            },
            {
                "id": 4,
                "name": "Pooja Iyer",
                "email": "pooja@example.com",
                "message": "Wonderful suggestions on sustainable travel. Supporting local communities is so important."
            },
            {
                "id": 5,
                "name": "Ravi Kumar",
                "email": "ravi@example.com",
                "message": "Maharashtra has so much to offer! Great insights!"
            },
            {
                "id": 6,
                "name": "Priya Desai",
                "email": "priya@example.com",
                "message": "Thanks for sharing the hidden gems of Maharashtra! Malshej Ghat is now on my travel bucket list."
            }
        ]
    };

     // Function to render blog posts
     function renderPosts() {
        const blogPostsContainer = document.querySelector('.blog-posts');
        blogData.posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post');
            postElement.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="post-image">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="${post.url}" class="read-more">Read More</a>
            `;
            blogPostsContainer.appendChild(postElement);
        });
    }

    // Function to render comments with pagination
    function renderComments(page = 1) {
        const commentsContainer = document.querySelector('.comments-container');
        commentsContainer.innerHTML = '';

        const commentsPerPage = 5;
        const startIndex = (page - 1) * commentsPerPage;
        const endIndex = startIndex + commentsPerPage;

        const currentComments = blogData.comments.slice(startIndex, endIndex);
        currentComments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <strong>${comment.name}</strong>
                <p>${comment.message}</p>
            `;
            commentsContainer.appendChild(commentElement);
        });

        // Render pagination
        const totalPages = Math.ceil(blogData.comments.length / commentsPerPage);
        if (totalPages > 1) {
            renderPagination(page, totalPages);
        }
    }

    // Function to render pagination
    function renderPagination(currentPage, totalPages) {
        const paginationContainer = document.querySelector('.pagination');
        paginationContainer.innerHTML = '';

        const prevPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
        const nextPage = currentPage + 1 <= totalPages ? currentPage + 1 : totalPages;

        paginationContainer.innerHTML = `
            <a href="#" class="pagination-prev" data-page="${prevPage}">Previous</a>
            <span>Page ${currentPage} of ${totalPages}</span>
            <a href="#" class="pagination-next" data-page="${nextPage}">Next</a>
        `;

        // Add click event listeners for pagination
        document.querySelector('.pagination-prev').addEventListener('click', (e) => {
            e.preventDefault();
            renderComments(prevPage);
        });

        document.querySelector('.pagination-next').addEventListener('click', (e) => {
            e.preventDefault();
            renderComments(nextPage);
        });
    }

    // Form submission for adding new comments
    document.querySelector('.comment-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name && email && message) {
            const newComment = {
                id: blogData.comments.length + 1,
                name: name,
                email: email,
                message: message
            };
            blogData.comments.push(newComment); // Add new comment to the data
            renderComments(); // Re-render comments section to display the new comment
            document.querySelector('.comment-form').reset(); // Reset form fields
        } else {
            alert('Please fill out all fields.');
        }
    });
    
    // Initialize rendering
    renderPosts();
    renderComments(); // Render the comments initially
});
