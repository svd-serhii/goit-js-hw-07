import { galleryItems } from "./gallery-items.js";
// Change code below this line

// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
const galleryEl = document.querySelector(".gallery");
const galleryItemMarkup = createGalleryMarkup(galleryItems);

galleryEl.insertAdjacentHTML("beforeend", galleryItemMarkup);
// Реалізація делегування на div.gallery і отримання url великого зображення.
galleryEl.addEventListener("click", onGalleryElClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </div>`;
    })
    .join("");
}

function onGalleryElClick(e) {
  e.preventDefault();
  const isImgEl = e.target.classList.contains("gallery__image");
  if (!isImgEl) {
    return;
  }
  const instance = basicLightbox.create(`
    <img src="${e.target.dataset.source}" width="800" height="600" >
`);

  instance.show(() => {
    window.addEventListener("keydown", onEscPress);
  });

  function onEscPress(e) {
    if (e.code === "Escape") {
      instance.close(() => {
        window.addEventListener("keydown", onEscPress);
      });
      console.log(e.code);
    }
  }
}

// console.log(createGalleryMarkup(galleryItems));

// console.log(galleryItems);
