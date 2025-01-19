// Home Page courosel

document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prev = document.querySelector('.carousel-control.prev');
    const next = document.querySelector('.carousel-control.next');
    const dots = document.querySelectorAll('.carousel-indicators .dot');

    let currentIndex = 0; // Track the active slide
    const totalItems = items.length;

    // Clone first and last slides for infinite scroll
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalItems - 1].cloneNode(true);

    carouselInner.appendChild(firstClone); // Add clone of first item at the end
    carouselInner.insertBefore(lastClone, items[0]); // Add clone of last item at the beginning

    // Adjust the initial position to the real first slide
    carouselInner.style.transform = `translateX(-100%)`;

    // Update carousel position and active classes
    function updateCarousel() {
        carouselInner.style.transition = 'transform 0.4s ease-in-out';
        carouselInner.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;

        // Update dot indicators
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Reset carousel position instantly (for infinite effect)
    function resetPosition() {
        carouselInner.style.transition = 'none';
        if (currentIndex === totalItems) {
            currentIndex = 0;
            carouselInner.style.transform = `translateX(-100%)`;
        } else if (currentIndex === -1) {
            currentIndex = totalItems - 1;
            carouselInner.style.transform = `translateX(-${totalItems * 100}%)`;
        }
    }

    // Move to the previous slide
    prev.addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
        setTimeout(resetPosition, 400); // Wait for transition to finish
    });

    // Move to the next slide
    next.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
        setTimeout(resetPosition, 400); // Wait for transition to finish
    });

    // Move to a specific slide on dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
});






// Eco Destination Courosel 

let currentTab = 'staycations';
let currentBookingLink = '';

const destinationData = {
    "staycations": [
        {
            "title": "Anandvan Resort",
            "description": "A peaceful stay surrounded by nature, perfect for a weekend getaway.",
            "bigBannerDescription": "Anandvan Resort offers a serene and eco-friendly stay, nestled in lush greenery. Ideal for nature lovers and those seeking peace away from the city.",
            "img": "../Assets/Destinations/Staycations/1.png",
            "bookingLink": "default-destination.html"
        },
        {
            "title": "Della Resort",
            "description": "A luxurious staycation resort with adventure activities and nature.",
            "bigBannerDescription": "Della Resort in Lonavala provides a luxurious stay with activities like sky cycling and ATV rides, along with a tranquil environment amidst the hills.",
            "img": "../Assets/Destinations/Staycations/2.png",
            "bookingLink": "default-destination.html"
        },
        {
            "title": "Sula Vineyards Resort",
            "description": "A wine and dine experience amidst the vineyards.",
            "bigBannerDescription": "Sula Vineyards Resort offers an immersive experience with scenic views of vineyards, offering wine tasting, nature walks, and great food.",
            "img": "../Assets/Destinations/Staycations/3.png",
            "bookingLink": "default-destination.html"
        },
        {
            "title": "Taj Fort Aguada Resort",
            "description": "An opulent staycation on the beach with a blend of luxury and history.",
            "bigBannerDescription": "Taj Fort Aguada Resort is a luxurious property in Goa, blending history with beachside luxury. The resort offers world-class amenities and scenic views of the Arabian Sea.",
            "img": "../Assets/Destinations/Staycations/4.png",
            "bookingLink": "default-destination.html"
        },
        {
            "title": "Eagle Ridge Resort",
            "description": "A comfortable staycation nestled between nature and hills.",
            "bigBannerDescription": "Eagle Ridge Resort in Lonavala offers cozy cottages and great views of nature, providing the perfect place to relax and unwind with loved ones.",
            "img": "../Assets/Destinations/Staycations/5.png",
            "bookingLink": "default-destination.html"
        },
        {
            "title": "The Machan",
            "description": "A tree house experience, ideal for a unique staycation.",
            "bigBannerDescription": "The Machan offers luxurious tree houses and eco-lodges amidst the forest, perfect for nature lovers seeking solitude and relaxation.",
            "img": "../Assets/Destinations/Staycations/6.png",
            "bookingLink": "default-destination.html"
        },
        {
            "title": "The Radisson Blu",
            "description": "A luxury stay in the heart of Pune, perfect for relaxation and rejuvenation.",
            "bigBannerDescription": "The Radisson Blu offers top-tier luxury with modern amenities and excellent views, making it an ideal staycation destination.",
            "img": "../Assets/Destinations/Staycations/7.png",
            "bookingLink": "default-destination.html"
        },
        {
            "title": "Hilton Shillim",
            "description": "A perfect retreat with luxurious villas and wellness programs.",
            "bigBannerDescription": "Hilton Shillim Estate Retreat & Spa offers an exclusive and peaceful stay with wellness programs, eco-friendly villas, and scenic views of the Sahyadri mountains.",
            "img": "../Assets/Destinations/Staycations/8.png",
            "bookingLink": "default-destination.html"
        }
    ],
    "wildlife": [
        {
            "title": "Sanjay Gandhi National Park",
            "description": "A rich biodiversity park located near Mumbai, ideal for nature walks and wildlife sightings.",
            "bigBannerDescription": "Sanjay Gandhi National Park in Mumbai is a rich reserve of flora and fauna. It is home to diverse wildlife including leopards, langurs, and over 270 species of birds.",
            "img": "../Assets/Destinations/nature/1.png",
            "bookingLink": "sanjay-gandhi-national-park.html"
        },
        {
            "title": "Tadoba Andhari Tiger Reserve",
            "description": "One of Maharashtra's most famous tiger reserves, known for its rich wildlife.",
            "bigBannerDescription": "Tadoba Andhari Tiger Reserve is a pristine wildlife haven and home to the Bengal tiger. The reserve also boasts a variety of other species like leopards, wild boars, and Indian bison.",
            "img": "../Assets/Destinations/nature/2.png",
            "bookingLink": "default-destination.html"
        },
        {
            "title": "Pench Tiger Reserve",
            "description": "A famous tiger reserve that inspired 'The Jungle Book', offering a rich diversity of wildlife.",
            "bigBannerDescription": "Pench Tiger Reserve is a vast park known for its jungle safari and diverse wildlife, including tigers, leopards, and a wide variety of birds.",
            "img": "../Assets/Destinations/nature/3.png",
            "bookingLink": "default-destination.html"
        },
        {
            "title": "Koyna Wildlife Sanctuary",
            "description": "A sanctuary located in the Sahyadri hills, known for its biodiversity and scenic beauty.",
            "bigBannerDescription": "Koyna Wildlife Sanctuary is a biodiversity hotspot with a variety of flora and fauna, including tigers, leopards, and elephants, set in the picturesque Sahyadri hills.",
            "img": "../Assets/Destinations/nature/4.png",
            "bookingLink": "default-destination.html"
        },
        {
            "title": "Melghat Tiger Reserve",
            "description": "A UNESCO Biosphere Reserve known for its biodiversity, especially tigers.",
            "bigBannerDescription": "Melghat Tiger Reserve is home to some of Maharashtra's most elusive tigers, along with other wildlife such as Indian wolves, sloth bears, and sambars.",
            "img": "../Assets/Destinations/nature/5.png",
            "bookingLink": "default-destination.html"
        },
        {
            "title": "Radhanagari Wildlife Sanctuary",
            "description": "A sanctuary located in the Western Ghats, known for its rich biodiversity and scenic views.",
            "bigBannerDescription": "Radhanagari Wildlife Sanctuary is home to a diverse range of species, including tigers, leopards, and bison, all amidst the lush greenery of the Western Ghats.",
            "img": "../Assets/Destinations/nature/6.png",
            "bookingLink": "default-destination.html"
        },
        {
            "title": "Sahyadri Tiger Reserve",
            "description": "A famous reserve in Maharashtra that boasts diverse wildlife and scenic landscapes.",
            "bigBannerDescription": "Sahyadri Tiger Reserve is located in the Western Ghats and is home to a wide range of wildlife, including tigers, leopards, and elephants.",
            "img": "../Assets/Destinations/nature/7.png",
            "bookingLink": "default-destination.html"
        },
        {
            "title": "Bhorgiri Wildlife Sanctuary",
            "description": "A secluded wildlife sanctuary known for its unique flora and fauna.",
            "bigBannerDescription": "Bhorgiri Wildlife Sanctuary offers a quiet retreat for nature lovers and wildlife enthusiasts. The sanctuary is home to a variety of birds, reptiles, and mammals.",
            "img": "../Assets/Destinations/nature/8.png",
            "bookingLink": "default-destination.html"
        }
    ],
        
    mountains: [
        { 
            title: 'Rajmachi Fort', 
            description: 'A scenic trek that combines history with nature, offering panoramic views of the Sahyadri range.', 
            bigBannerDescription: 'Rajmachi Fort, located near Lonavala, is a perfect blend of history and natural beauty. The trek offers stunning views of the Sahyadri mountains, valleys, waterfalls, and the two forts, Shrivardhan and Manaranjan. The route to the fort passes through dense forests, making it an excellent choice for nature lovers and history enthusiasts.', 
            img: '../Assets/Destinations/mountains/1.png', 
            bookingLink: 'default-destination.html' 
        },
        { 
            title: 'Harishchandragad', 
            description: 'A challenging trek offering mesmerizing views and ancient temples atop a high plateau.', 
            bigBannerDescription: 'Harishchandragad is a historic fort situated in the Ahmednagar district. The trek is strenuous and offers breathtaking views of Konkan Kada, a cliff known for its sharp drop. The fort has ancient temples like the Kedareshwar Temple and offers panoramic views of the surrounding valleys and forts.', 
            img: '../Assets/Destinations/mountains/2.png', 
            bookingLink: 'default-destination.html' 
        },
        { 
            title: 'Kalsubai Peak', 
            description: 'The highest peak in Maharashtra with a thrilling trek and sweeping views of the Sahyadri range.', 
            bigBannerDescription: 'Standing at 1,646 meters, Kalsubai is the highest peak in Maharashtra, offering a challenging and exciting trek. The summit provides spectacular views of the Western Ghats, and during the monsoon, the surrounding hills are covered with lush greenery and waterfalls. The trek includes a small temple dedicated to the goddess Kalsubai.', 
            img: '../Assets/Destinations/mountains/3.png', 
            bookingLink: 'default-destination.html' 
        },
        { 
            title: 'Sinhagad Fort', 
            description: 'A popular and easy trek with historical significance and scenic views of Pune\'s landscape.', 
            bigBannerDescription: 'Sinhagad Fort, located near Pune, is a historical fort offering a relatively easy trek with panoramic views of the surrounding valleys and hills. The fort is famous for its role in the Maratha Empire and provides a perfect spot for a day hike and history exploration.', 
            img: '../Assets/Destinations/mountains/4.png', 
            bookingLink: 'default-destination.html' 
        },
        { 
            title: 'Torna Fort', 
            description: 'A beautiful trek known for its lush greenery and panoramic views.', 
            bigBannerDescription: 'Torna Fort, located near Pune, is one of the highest forts in the region, offering an exciting trek that takes you through dense forests and steep ascents. The fort was historically significant during the reign of Shivaji Maharaj and offers stunning views of the surrounding landscape from its summit.', 
            img: '../Assets/Destinations/mountains/5.png', 
            bookingLink: 'default-destination.html' 
        },
        { 
            title: 'Ratangad Fort', 
            description: 'A beautiful and moderate trek that takes you to a fort with ancient temples and impressive rock formations.', 
            bigBannerDescription: 'Ratangad Fort, located in the Ahmednagar district, is famous for its unique rock formations, ancient temples, and views of the surrounding valleys and hills. The trek is moderately challenging, and the summit offers a fantastic view of the nearby forts and hills.', 
            img: '../Assets/Destinations/mountains/6.png', 
            bookingLink: 'default-destination.html' 
        },
        { 
            title: 'Lohagad Fort', 
            description: 'A well-known trekking spot with lush greenery and historical ruins, suitable for beginners.', 
            bigBannerDescription: 'Lohagad Fort, located near Lonavala, is a popular trek for beginners due to its easy route. The fort offers beautiful views of the nearby Bhaja caves, mountains, and valleys. The fort itself is known for its well-preserved ramparts, ancient structures, and historical significance.', 
            img: '../Assets/Destinations/mountains/7.png', 
            bookingLink: 'default-destination.html' 
        },
        { 
            title: 'Korigad Fort', 
            description: 'A relatively easy trek near Lonavala with beautiful views and historical structures.', 
            bigBannerDescription: 'Korigad Fort is an easy trek situated near Lonavala. The fort is surrounded by lush forests, and once you reach the summit, you’re greeted with panoramic views of the nearby hills and lakes. The fort has remnants of old structures, including a few temples, and is perfect for a short hike.', 
            img: '../Assets/Destinations/mountains/8.png', 
            bookingLink: 'default-destination.html' 
        }
    ],
    beaches: [
        { 
            title: 'Tarkarli Beach', 
            description: 'Famous for its clear waters, water sports, and serene atmosphere.', 
            bigBannerDescription: 'Tarkarli Beach, located in Sindhudurg district, is known for its clean, clear waters perfect for water sports like snorkeling and scuba diving. The beach is quieter than most beaches, making it a peaceful getaway for those seeking both relaxation and adventure.', 
            img: '../Assets/Destinations/beaches/1.png', 
            bookingLink: 'default-destination.html' 
        },
        { 
            title: 'Alibaug Beach', 
            description: 'A peaceful beach with clean waters and a historic fort.', 
            bigBannerDescription: 'Located near Mumbai, Alibaug Beach is a popular weekend getaway, known for its calm waters and historical Kolaba Fort. The beach offers a relaxed atmosphere and is ideal for leisurely walks, swimming, and exploring the nearby fort.', 
            img: '../Assets/Destinations/beaches/2.png', 
            bookingLink: 'default-destination.html' 
        },
        { 
            title: 'Ganpatipule Beach', 
            description: 'A serene and beautiful beach with clear waters, temples, and lush greenery.', 
            bigBannerDescription: 'Situated in the Konkan region, Ganpatipule Beach is famous for its clean sands and peaceful atmosphere. The beach is surrounded by hills and is home to the Ganapati Temple, making it a spiritual and scenic retreat for visitors.', 
            img: '../Assets/Destinations/beaches/3.png', 
            bookingLink: 'default-destination.html' 
        },
        { 
            title: 'Vengurla Beach', 
            description: 'A quiet and pristine beach perfect for a relaxed getaway.', 
            bigBannerDescription: 'Vengurla Beach, located in Sindhudurg district, is a serene beach surrounded by natural beauty. The beach is ideal for those looking for peace and solitude. It also offers water sports and is a great place for photography, surrounded by hills, forests, and temples.', 
            img: '../Assets/Destinations/beaches/4.png', 
            bookingLink: 'default-destination.html' 
        },
        { 
            title: 'Murud Janjira Beach', 
            description: 'Known for its pristine beauty and the historic Janjira Fort in the backdrop.', 
            bigBannerDescription: 'Murud Janjira Beach, located near Alibaug, is famous for its stunning views of the Janjira Fort, situated on an island. The beach is peaceful and offers opportunities for water sports, boating, and a visit to the fort.', 
            img: '../Assets/Destinations/beaches/5.png', 
            bookingLink: 'default-destination.html' 
        },
        { 
            title: 'Baga Beach', 
            description: 'A lively beach with a mix of relaxation, water activities, and vibrant nightlife.', 
            bigBannerDescription: 'Baga Beach in Goa is a popular beach that offers a mix of water sports, relaxation, and vibrant nightlife. While it is in Goa, it’s easily accessible from Maharashtra and offers a lively atmosphere with various beach shacks, bars, and water activities like parasailing and jet skiing.', 
            img: '../Assets/Destinations/beaches/6.png', 
            bookingLink: 'default-destination.html' 
        },
        { 
            title: 'Juhu Beach', 
            description: 'Famous for its energetic atmosphere, street food, and scenic sunset views.', 
            bigBannerDescription: 'Juhu Beach, located in Mumbai, is one of the most famous beaches in India. It offers a lively atmosphere with street food stalls, activities, and picturesque sunset views. It’s a perfect destination for families and friends looking to enjoy the beach culture.', 
            img: '../Assets/Destinations/beaches/7.png', 
            bookingLink: 'default-destination.html' 
        }
    ]
};


function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.querySelector(`#${tabName}`).style.display = 'block';
    document.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="openTab('${tabName}')"]`).classList.add('active');
    currentTab = tabName;

    // Automatically select the first card of the opened tab
    const firstCard = document.querySelector(`#destinationCards${tabName.charAt(0).toUpperCase() + tabName.slice(1)} .destination-card`);
    if (firstCard) {
        firstCard.click();
    }
}

function loadDestinationCards() {
    Object.entries(destinationData).forEach(([category, destinations]) => {
        const container = document.querySelector(`#destinationCards${category.charAt(0).toUpperCase() + category.slice(1)}`);
        destinations.forEach((destination, index) => {
            const card = document.createElement('div');
            card.className = 'destination-card';
            card.innerHTML = `<img src="${destination.img}" alt="${destination.title}">
                              <h3>${destination.title}</h3>
                              <p>${destination.description}</p>`;
            card.addEventListener('click', () => {
                document.querySelector('#active-destination-img').src = destination.img;
                document.querySelector('#active-destination-title').textContent = destination.title;
                document.querySelector('#active-destination-description').textContent = destination.bigBannerDescription;
                currentBookingLink = destination.bookingLink || '';
                document.querySelector('#book-now-button').style.display = currentBookingLink ? 'block' : 'none';
            });
            container.appendChild(card);

            // Automatically select the first card on initial load
            if (category === currentTab && index === 0) {
                card.click();
            }
        });
    });
}

function bookNow() {
    if (currentBookingLink) window.open(currentBookingLink, '_self');
}

document.addEventListener('DOMContentLoaded', () => {
    openTab(currentTab);
    loadDestinationCards();
});
