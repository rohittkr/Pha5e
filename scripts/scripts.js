document.addEventListener('DOMContentLoaded', () => {''
    const equationChars = gsap.utils.toArray('.equation-animation > *');
    // Initialize Locomotive Scroll

    const equationTL = gsap.timeline()
    .to(equationChars, {
        duration: 0.8,
        opacity: 1,
        y: 0,
        rotationZ: 0,
        stagger: {
            amount: 1.5,
            from: "random"
        },
        ease: "power4.out"
    })
    .to(equationChars, {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        ease: "power4.inOut"
    });

// Rest of your existing loading sequence
const loadingTl = gsap.timeline({
    delay: equationTL.duration(),
    onComplete: () => {
        // Your existing completion logic
}
});
// ... rest of your loading animation code
});
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true }
    });

    // GSAP Animations
    gsap.from(".nav-left, .nav-right span", {
        duration: 1.5,
        y: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "power4.out"
    });

    gsap.from(".center-text", {
        duration: 2,
        opacity: 0,
        y: 50,
        ease: "power4.out",
        delay: 0.5
    });

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor position
        gsap.to(cursor, {
            x: e.clientX - 20,
            y: e.clientY - 20,
            duration: 0.5,
            ease: "power4.out"
        });
        
        updateImageStates();
    });

    // Image Hover Effects
    function updateImageStates() {
        const images = document.querySelectorAll('.image-container');
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const imgCenterX = rect.left + rect.width/2;
            const imgCenterY = rect.top + rect.height/2;
            
            // Calculate distance from mouse to image center
            const deltaX = Math.abs(mouseX - imgCenterX);
            const deltaY = Math.abs(mouseY - imgCenterY);
            
            // Calculate activation strength (0-1)
            const strengthX = 1 - (deltaX / windowWidth);
            const strengthY = 1 - (deltaY / windowHeight);
            const totalStrength = (strengthX + strengthY) / 2;

            if(totalStrength > 0.3) {
                gsap.to(img, {
                    scale: 1.15,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out"
                });
            } else {
                gsap.to(img, {
                    scale: 1,
                    opacity: 0.2,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
        });
    }

    // Initialize image states
    gsap.set(".image-container", { opacity: 0.2, scale: 1 });
    window.addEventListener('resize', updateImageStates);

    // Nav Hover Effect
    document.querySelectorAll('.nav-right span').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5 });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1 });
        });
    });
