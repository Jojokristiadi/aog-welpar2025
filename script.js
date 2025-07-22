// Menangani menu mobile (hamburger)
const menuBtn = document.querySelector('.menu-btn');
const navlinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navlinks.classList.toggle('mobile-menu');
});


// Logika untuk navigasi halaman (Single Page Application)
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // --- Langkah 1: Membungkus semua logika slider ke dalam satu fungsi ---
    function initializeSlider() {
        const slideRadios = document.querySelectorAll('input[name="slider"]');
        
        // PENTING: Jika tidak ada slider di halaman saat ini, hentikan eksekusi fungsi
        if (slideRadios.length === 0) {
            return;
        }

        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const totalSlides = slideRadios.length;
        let currentSlideIndex = 0;

        // Cek slide mana yang sedang aktif (checked) untuk inisialisasi
        slideRadios.forEach((radio, index) => {
            if (radio.checked) {
                currentSlideIndex = index;
            }
        });

        // Fungsi untuk update slide
        function updateSlide(index) {
            if (index >= 0 && index < totalSlides) {
                slideRadios[index].checked = true;
                currentSlideIndex = index;
            }
        }

        // Event listener untuk tombol 'Next'
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let nextIndex = (currentSlideIndex + 1) % totalSlides;
                updateSlide(nextIndex);
            });
        }

        // Event listener untuk tombol 'Previous'
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
                updateSlide(prevIndex);
            });
        }

        // Event listener untuk 'bullets' (radio buttons)
        slideRadios.forEach((radio, index) => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    currentSlideIndex = index;
                }
            });
        });
        
        // Inisialisasi posisi slide saat fungsi dipanggil
        updateSlide(currentSlideIndex);
    }

    // Fungsi untuk memuat konten halaman secara dinamis
    async function loadContent(pageName) {
        try {
            if (pageName === 'home') {
                // Untuk 'home', kita muat ulang dari string HTML agar tidak perlu fetch
                mainContent.innerHTML = `
                    <header>
                        <div class="header-content">
                            <h2>WELCOME HOME!</h2>
                            <div class="line"></div>
                            <h1>Discover the comfort of your second home</h1>
                            <a href="#" class="ctn" id="learn-more-btn" data-target="our_event">Learn More</a> 
                        </div>
                    </header>
                    <section class="event-section">
                        <div class="event-container">
                            <div class="event-image">
                                <img src="./Img/img/event.png" alt="Event Image">
                            </div>
                            <div class="event-content">
                                <h2>The Journey Of You(th)</h2>
                                <p>Sebuah acara tahunan yang dilaksanakan untuk menyambut mahasiswa baru dan semester baru di Universitas Prasetiya Mulia. Tahun ini dengan mengangkat tema The Journey Of You(th), kami berharap...</p>
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfbY3EhKH5hzWyL0Tz1YNF4KK6sshvYWT570lug-h3ibdLrZw/viewform" class="event-btn">Book Your Seat</a>
                            </div>
                        </div>
                    </section>
                    <section class="previous-section"></section>
                    <section class="slider-section">
                        <div id="slider">
                            <input type="radio" name="slider" id="slide1" checked>
                            <input type="radio" name="slider" id="slide2">
                            <input type="radio" name="slider" id="slide3">
                            <input type="radio" name="slider" id="slide4">
                            <div id="slides">
                                <div class="inner">
                                    <div class="slide slide_1"><div class="slide-content"><h2>Abigail CG34</h2><p>Testimonials provide a sense of what it's like to work with you or use your products. Change the text and add your own.</p></div></div>
                                    <div class="slide slide_2"><div class="slide-content"><h2>Testing 2</h2><p>Content for Slide 2</p></div></div>
                                    <div class="slide slide_3"><div class="slide-content"><h2>Slide 3</h2><p>Content for Slide 3</p></div></div>
                                    <div class="slide slide_4"><div class="slide-content"><h2>Slide 4</h2><p>Content for Slide 4</p></div></div>
                                </div>
                            </div>
                            <div id="controls">
                                <label class="prev-slide" id="prev-btn"></label>
                                <label class="next-slide" id="next-btn"></label>
                            </div>
                            <div id="bullets">
                                <label for="slide1"></label>
                                <label for="slide2"></label>
                                <label for="slide3"></label>
                                <label for="slide4"></label>
                            </div>
                        </div>
                    </section>
                `;
            } else {
                // Untuk halaman lain, fetch dari file .html
                const response = await fetch(`${pageName}.html`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const html = await response.text();
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const contentToLoad = tempDiv.querySelector('.page-content-wrapper'); 
                if (contentToLoad) {
                    mainContent.innerHTML = contentToLoad.innerHTML;
                } else {
                    mainContent.innerHTML = `<p>Error: Konten tidak ditemukan.</p>`;
                }
            }
            
            history.pushState({ page: pageName }, '', pageName === 'home' ? 'index.html' : `${pageName}.html`);
            updateActiveClass(pageName);

            
            initializeSlider();

            attachLearnMoreListener();

        } catch (error) {
            console.error('Error loading content:', error);
            mainContent.innerHTML = '<p>Gagal memuat konten. Silakan coba lagi.</p>';
        }
    }


    function updateActiveClass(currentPage) {
        navLinks.forEach(link => {
            const li = link.parentNode;
            if (link.dataset.target === currentPage) {
                li.classList.add('active');
            } else {
                li.classList.remove('active');
            }
        });
    }

    function attachLearnMoreListener() {
        const learnMoreBtn = document.getElementById('learn-more-btn');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', (event) => {
                event.preventDefault();
                loadContent(event.target.dataset.target);
            });
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetPage = event.target.dataset.target;
            loadContent(targetPage);
            navlinks.classList.remove('mobile-menu');
        });
    });

    

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.page) {

            loadContent(event.state.page);
        } else {

            loadContent('home');
        }
    });


    const initialPath = window.location.pathname.split('/').pop();
    if (initialPath === 'our_event.html' || initialPath === 'our_community.html') {
        loadContent(initialPath.replace('.html', ''));
    } else {
        updateActiveClass('home');
        initializeSlider();
        attachLearnMoreListener();
    }
});