import galleryItems from './gallery-items';

import {
    onClickGalleryItem,
    createGallery,
    onCloseButtonClick,
    onCloseOverlayClick,
    onArrowLeft,
    onArrowRight,
} from './function';

import { refs } from './refs';

// --------
export const imgGallery = createGallery(galleryItems);
refs.galleryListRef.insertAdjacentHTML('beforeend', imgGallery);

refs.galleryListRef.addEventListener('click', onClickGalleryItem);
refs.btnModalClose.addEventListener('click', onCloseButtonClick);
refs.lightboxOverlay.addEventListener('click', onCloseOverlayClick);

window.addEventListener('keydown', evt => {
    if (evt.code === 'ArrowLeft') {
        onArrowLeft();
    }
    if (evt.code === 'ArrowRight') {
        onArrowRight();
    }
});
