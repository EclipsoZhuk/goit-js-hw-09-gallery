import { refs } from './refs';
import galleryItems from './gallery-items';

// ------
export function onClickGalleryItem(evt) {
    evt.preventDefault();
    window.addEventListener('keydown', onClickEsc);
    const target = evt.target;
    if (target.nodeName !== 'IMG') {
        return;
    }
    if (target.nodeName === 'IMG') {
        refs.backdropRef.classList.add('is-open');
        refs.lightboxImg.src = target.dataset.source;
        refs.lightboxImg.alt = target.alt;
        refs.lightboxImg.dataset.index = evt.target.dataset.index;
    }
}

export function createGallery(gallery) {
    return gallery
        .map(({ preview, original, description }, index) => {
            return `<li class="gallery__item">
            <a
                class="gallery__link"
                href="${original}"
            >
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    data-index="${index}"
                />
            </a>
        </li>`;
        })
        .join('');
}

export function onClickCloseModal() {
    refs.backdropRef.classList.remove('is-open');
}

export function onCloseButtonClick(evt) {
    window.removeEventListener('keydown', onClickEsc);

    evt.preventDefault();
    onClickCloseModal();

    refs.lightboxImg.src = '';
    refs.lightboxImg.alt = '';
}

export function onCloseOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        onClickCloseModal();
    }
}

export function onClickEsc(evt) {
    const ESC_KEY_CODE = 'Escape';
    if (evt.code === ESC_KEY_CODE) {
        onClickCloseModal();
    }
}

export function onArrowLeft() {
    const index = +refs.lightboxImg.dataset.index;

    if (index === 0) {
        newSrc(index, galleryItems.length - 1);
        return;
    }
    newSrc(index, -1);
}

export function onArrowRight() {
    const index = +refs.lightboxImg.dataset.index;
    if (index === galleryItems.length - 1) {
        newSrc(0);
        return;
    }
    newSrc(index, 1);
}

export function newSrc(index, step = 0) {
    refs.lightboxImg.dataset.index = `${index + step}`;
    refs.lightboxImg.src = galleryItems[index + step].original;
}
