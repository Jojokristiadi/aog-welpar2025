        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-menu');
        });

        // script.js

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const learnMoreBtn = document.getElementById('learn-more-btn'); // Ini untuk tombol "Learn More"

    // Fungsi untuk memuat konten secara dinamis
    async function loadContent(pageName) {
        try {
            let contentUrl = '';
            let contentWrapperId = '';

            // Tentukan URL file dan ID pembungkus konten berdasarkan pageName
            if (pageName === 'home') {
                // Untuk halaman home, kita akan memuat kembali konten default dari index.html jika diperlukan,
                // atau langsung set HTML-nya.
                // Untuk kesederhanaan, kita akan set ulang konten Home dari HTML string
                // ini menghindari fetching index.html lagi hanya untuk mendapatkan konten Home.
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
                                <img src="./Img/img/img1.png" alt="Event Image">
                            </div>
                            <div class="event-content">
                                <h2>The Journey Of You(th)</h2>
                                <p>
                                    Sebuah acara tahunan yang dilaksanakan untuk menyambut mahasiswa baru dan semester baru di Universitas Prasetiya Mulia. Tahun ini dengan mengangkat tema The Journey Of You(th), kami berharap...
                                </p>
                                <a href="#" class="event-btn">Book Your Seat</a>
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
                                    <div class="slide slide_1">
                                        <div class="slide-content">
                                            <h2>Abigail CG34</h2>
                                            <p>Testimonials provide a sense of what it's like to work with you or use your products. Change the text and add your own.</p>
                                        </div>
                                    </div>
                                    <div class="slide slide_2">
                                        <div class="slide-content">
                                            <h2>Testing 2</h2>
                                            <p>Content for Slide 2</p>
                                        </div>
                                    </div>
                                    <div class="slide slide_3">
                                        <div class="slide-content">
                                            <h2>Slide 3</h2>
                                            <p>Content for Slide 3</p>
                                        </div>
                                    </div>
                                    <div class="slide slide_4">
                                        <div class="slide-content">
                                            <h2>Slide 4</h2>
                                            <p>Content for Slide 4</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="controls">
                                <label for="slide1" class="prev-slide"></label>
                                <label for="slide2" class="prev-slide"></label>
                                <label for="slide3" class="prev-slide"></label>
                                <label for="slide4" class="prev-slide"></label>
                                <label for="slide1" class="next-slide"></label>
                                <label for="slide2" class="next-slide"></label>
                                <label for="slide3" class="next-slide"></label>
                                <label for="slide4" class="next-slide"></label>
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
                // Setelah konten home dimuat ulang, attach kembali event listener untuk tombol "Learn More"
                const newLearnMoreBtn = document.getElementById('learn-more-btn');
                if (newLearnMoreBtn) {
                    newLearnMoreBtn.addEventListener('click', (event) => {
                        event.preventDefault(); // Mencegah reload
                        loadContent(event.target.dataset.target);
                    });
                }
            } else {
                // Untuk halaman lain (our_event, our_community)
                contentUrl = `${pageName}.html`;
                contentWrapperId = `#${pageName}-content`; // Contoh: #our_event-content

                const response = await fetch(contentUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const html = await response.text();

                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;

                const contentToLoad = tempDiv.querySelector(contentWrapperId);
                if (contentToLoad) {
                    mainContent.innerHTML = contentToLoad.innerHTML;
                } else {
                    mainContent.innerHTML = `<p>Error: Content wrapper ${contentWrapperId} not found in ${pageName}.html</p>`;
                }
            }
            
            // Perbarui URL tanpa reload halaman penuh
            // Halaman 'home' akan kembali ke 'index.html'
            history.pushState({ page: pageName }, '', pageName === 'home' ? 'index.html' : `${pageName}.html`);

            // Perbarui kelas aktif pada navigasi
            updateActiveClass(pageName);

        } catch (error) {
            console.error('Error loading content:', error);
            mainContent.innerHTML = '<p>Failed to load content. Please try again later.</p>';
        }
    }

    // Fungsi untuk memperbarui kelas 'active' di navbar
    function updateActiveClass(currentPage) {
        navLinks.forEach(link => {
            // Hapus kelas 'active' dari semua link
            link.parentNode.classList.remove('active'); // Parent node karena active ada di li
            // Hapus juga kelas 'ctn' jika hanya untuk styling tombol Our Community
            if (link.parentNode.classList.contains('ctn')) {
                 // Tidak menghapus ctn karena itu styling tombol, tapi pastikan hanya satu yang active
            }
        });

        // Tambahkan kelas 'active' ke link yang sesuai
        navLinks.forEach(link => {
            if (link.dataset.target === currentPage) {
                link.parentNode.classList.add('active');
            }
            // Khusus untuk "OUR COMMUNITY", jika memang selalu active seperti di gambar Anda
            // Anda bisa tambahkan logic terpisah atau memastikan CSSnya tidak bergantung pada .active di li
            if (link.dataset.target === 'our_community') {
                link.parentNode.classList.add('ctn'); // Misal ctn adalah styling permanen
            }
        });

         // Logic khusus untuk membuat "OUR COMMUNITY" selalu memiliki kelas 'ctn' seperti di gambar Anda
         // Periksa apakah ini memang yang Anda inginkan ataukah 'ctn' juga seharusnya berinteraksi dengan 'active'
         document.querySelector('.nav-link[data-target="our_community"]').parentNode.classList.add('ctn');
    }


    // Event listener untuk setiap link di navbar
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Mencegah perilaku default tautan (reload halaman)
            const targetPage = event.target.dataset.target;
            loadContent(targetPage);
        });
    });

    // Event listener untuk tombol "Learn More" di halaman awal (home)
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Mencegah perilaku default tautan (reload halaman)
            loadContent(event.target.dataset.target); // Akan memuat our_event.html
        });
    }

    // Menangani tombol back/forward browser
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.page) {
            // Jika ada state yang disimpan (dari pushState kita), muat kontennya
            loadContent(event.state.page);
        } else {
            // Jika tidak ada state (misalnya, saat pertama kali memuat atau kembali ke URL awal),
            // asumsikan ini adalah halaman home.
            loadContent('home');
        }
    });

    // Pemuatan konten awal saat halaman pertama kali dimuat atau disegarkan
    const initialPath = window.location.pathname.split('/').pop();
    if (initialPath === 'our_event.html') {
        loadContent('our_event');
    } else if (initialPath === 'our_community.html') {
        loadContent('our_community');
    } else {
        // Jika tidak ada path spesifik (misal: hanya '/'), asumsikan ini adalah home
        updateActiveClass('home'); // Hanya update active class, konten home sudah ada di index.html
    }
});

    // ============================================
    // Logika Slider
    // ============================================
    const slideRadios = document.querySelectorAll('input[name="slider"]');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const totalSlides = slideRadios.length;
    let currentSlideIndex = 0; // Index slide yang aktif (0-based)

    // Fungsi untuk mengupdate slide yang aktif
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

    // Event listener untuk bullets
    slideRadios.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                currentSlideIndex = index;
            }
        });
    });

    // Inisialisasi slide pertama saat halaman dimuat
    updateSlide(0); // Pastikan slide pertama aktif secara default

    // Opsional: Auto-slide
    // let slideInterval = setInterval(() => {
    //     let nextIndex = (currentSlideIndex + 1) % totalSlides;
    //     updateSlide(nextIndex);
    // }, 5000); // Ganti slide setiap 5 detik

    // // Berhenti auto-slide saat user interaksi dengan slider
    // const sliderContainer = document.getElementById('slider');
    // if (sliderContainer) {
    //     sliderContainer.addEventListener('mouseenter', () => {
    //         clearInterval(slideInterval);
    //     });
    //     sliderContainer.addEventListener('mouseleave', () => {
    //         slideInterval = setInterval(() => {
    //             let nextIndex = (currentSlideIndex + 1) % totalSlides;
    //             updateSlide(nextIndex);
    //         }, 5000);
    //     });
    // }