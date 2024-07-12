const form = document.getElementById('contact-form');
const popup = document.getElementById('popup');
const close = document.getElementsByClassName('close')[0];

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const response = await fetch(form.action, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    });

    if (response.ok) {
        form.reset();
        popup.style.display = 'block';
    }
});

close.addEventListener('click', () => {
    popup.style.display = 'none';
});


close.addEventListener('click', () => {
    form.reset();
    popup.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');

    const isMobile = window.innerWidth <= 480;
    const triggerPoint = isMobile ? window.innerHeight / 2 : 1800;

    window.addEventListener('scroll', function() {
        if (window.scrollY > triggerPoint) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
