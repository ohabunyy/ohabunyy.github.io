document.addEventListener('DOMContentLoaded', () => {
    
    // Yükleme Ekranı (Loader) Yönetimi
    const loader = document.querySelector('.loader');
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500); // 1.5 saniye yapay yükleme süresi

    // Scroll Animasyonları (Intersection Observer)
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animasyonlanacak öğeleri seç
    const hiddenElements = document.querySelectorAll('.game-card, .about-text, .section-header');
    
    hiddenElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // 3D Tilt Efekti (Kartlar için)
    const cards = document.querySelectorAll('.game-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Mouse pozisyonuna göre hafif döndürme hesaplaması
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5; // -5 ile 5 derece arası
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            // Mouse çıkınca kartı düzelt
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});