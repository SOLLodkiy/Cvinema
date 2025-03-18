document.addEventListener("DOMContentLoaded", function () {
    const advantages = document.querySelectorAll(".advantage");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            } else {
                entry.target.style.opacity = 0;
                entry.target.style.transform = "translateY(20px)";
            }
        });
    }, { threshold: 0.3 });

    advantages.forEach(advantage => {
        observer.observe(advantage);
    });
});
