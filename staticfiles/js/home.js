document.addEventListener("DOMContentLoaded", function () {
    const testimonials = [
        {
            title: "Great app!",
            text: "It makes you feel motivated to keep up a sporty lifestyle. Workouts are adaptable and always push your limits. It is even better with friends because you see their progression. Highly recommend it for anyone looking to stay fit!",
            img: "/static/Images/gabor.jpeg",
            name: "Gabor Talpai"
        },
        {
            title: "No more gym",
            text: "By far the best app for bodyweight workouts. Since the beginning of the pandemic, I have switched my training to Freeletics and will no longer enter a gym in the future. The flexibility it offers is unmatched!",
            img: "/static/Images/Olloni.jpeg",
            name: "Mirvjen Olloni"
        },
        {
            title: "Life-Changing!",
            text: "I've never felt stronger and more confident! The structured programs and progress tracking keep me motivated. The daily challenges push me beyond what I thought possible, making every session worth it.",
            img: "/static/Images/user_3.jpeg",
            name: "Elena Mark"
        },
        {
            title: "Best decision ever",
            text: "The workouts are intense but rewarding. I love how it tailors exercises based on my fitness level. I used to struggle with consistency, but now I look forward to every workout session!",
            img: "/static/Images/user_4.jpeg",
            name: "David Cross"
        },
        {
            title: "Simply Amazing!",
            text: "Every session feels like a personal training experience! The AI-generated routines make each workout unique, helping me target different muscle groups. I can see real changes in my stamina and strength.",
            img: "/static/Images/user_5.jpeg",
            name: "Alice Johnson"
        },
        {
            title: "Super effective!",
            text: "I see real progress in my strength and endurance! Unlike other fitness apps, this one adapts to my progress and keeps things challenging. I love how easy it is to follow, and the instructions are very clear!",
            img: "/static/Images/user_6.jpeg",
            name: "Samuel King"
        },
        {
            title: "Next Level!",
            text: "Pushes me beyond my limits in a fun way! The guided sessions help me maintain form, and the community support makes it even better. I feel healthier and more energetic than ever before!",
            img: "/static/Images/user_7.jpeg",
            name: "Jessica Lee"
        },
        {
            title: "Worth every penny!",
            text: "The app's exercises are spot on for my fitness goals! It has helped me build discipline in my workouts, and the progress tracking is super motivating. I never thought I’d be this consistent!",
            img: "/static/Images/user_8.jpeg",
            name: "Michael Brown"
        }
    ];

    let index = 0; // Tracks the starting index of the pair

    function updateTestimonials() {
        let firstIndex = index;
        let secondIndex = (index + 1) % testimonials.length;

        document.getElementById("testimonial-title-1").innerText = testimonials[firstIndex].title;
        document.getElementById("testimonial-text-1").innerText = testimonials[firstIndex].text;
        document.getElementById("profile-img-1").src = testimonials[firstIndex].img;
        document.getElementById("profile-name-1").innerText = testimonials[firstIndex].name;

        document.getElementById("testimonial-title-2").innerText = testimonials[secondIndex].title;
        document.getElementById("testimonial-text-2").innerText = testimonials[secondIndex].text;
        document.getElementById("profile-img-2").src = testimonials[secondIndex].img;
        document.getElementById("profile-name-2").innerText = testimonials[secondIndex].name;
    }

    document.getElementById("prev-btn").addEventListener("click", function () {
        index = (index - 2 + testimonials.length) % testimonials.length; // Go back in pairs
        updateTestimonials();
    });

    document.getElementById("next-btn").addEventListener("click", function () {
        index = (index + 2) % testimonials.length; // Move forward in pairs
        updateTestimonials();
    });

    updateTestimonials();
});
document.addEventListener('DOMContentLoaded', () => {
    let isBefore = false; // Global toggle state for all images

    function toggleAllImages() {
        isBefore = !isBefore;
        document.querySelectorAll('.toggle-img').forEach(img => {
            img.src = isBefore ? img.getAttribute('data-before') : img.getAttribute('data-after');
        });
    }

    // Start one interval for all images (keeps them in sync)
    let interval = setInterval(toggleAllImages, 2000);

    document.querySelectorAll('.toggle-img').forEach(img => {
        // Prevent disappearing issue
        img.addEventListener('mousedown', (e) => e.preventDefault()); // Stops image from disappearing when clicked
        img.addEventListener('dragstart', (e) => e.preventDefault()); // Stops dragging effect

        // Stop switching when hovering over any image
        img.addEventListener('mouseenter', () => clearInterval(interval));

        // Resume switching when cursor leaves
        img.addEventListener('mouseleave', () => {
            interval = setInterval(toggleAllImages, 2000);
        });
    });
});
