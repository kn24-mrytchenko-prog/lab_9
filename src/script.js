const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('loadMore');
const clearGalleryBtn = document.getElementById('clearGallery');
const deleteLastBtn = document.getElementById('deleteLast');
const reverseGalleryBtn = document.getElementById('reverseGallery');

let page = 1; // будемо підвантажувати нові картинки
const limit = 4;

// Функція для отримання картинок
async function fetchImages() {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
        const data = await response.json();
        displayImages(data);
        page++; // при наступному виклику отримуємо нові картинки
    } catch (error) {
        console.error('Помилка при завантаженні картинок:', error);
    }
}

// Відображення картинок у галереї
function displayImages(images) {
    images.forEach(img => {
        const imageElement = document.createElement('img');
        imageElement.src = `https://picsum.photos/id/${img.id}/300/200`;
        imageElement.alt = img.author;
        gallery.appendChild(imageElement);
    });
}

// Очистити галерею
function clearGallery() {
    gallery.innerHTML = '';
}

// Видалити останню картинку
function deleteLastImage() {
    const images = gallery.querySelectorAll('img');
    if (images.length > 0) {
        images[images.length - 1].remove();
    }
}

// Перевернути галерею
function reverseGallery() {
    const images = Array.from(gallery.querySelectorAll('img'));
    gallery.innerHTML = '';
    images.reverse().forEach(img => gallery.appendChild(img));
}

// Слухачі кнопок
loadMoreBtn.addEventListener('click', fetchImages);
clearGalleryBtn.addEventListener('click', clearGallery);
deleteLastBtn.addEventListener('click', deleteLastImage);
reverseGalleryBtn.addEventListener('click', reverseGallery);

// Перший виклик при завантаженні сторінки
fetchImages();
