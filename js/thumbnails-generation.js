import {getPhotoAttributesArray} from './photo-data-testing-generation.js';

const pictures = getPhotoAttributesArray();

const pictureContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content;

const pictureList = document.createDocumentFragment();

for (const picture of pictures) {

  const newPicture = pictureTemplate.cloneNode(true);

  newPicture.querySelector('.picture__img').setAttribute('src',picture.url);
  newPicture.querySelector('.picture__img').setAttribute('alt',picture.description);
  newPicture.querySelector('.picture__comments').textContent = Object.keys(picture.comments).length;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;

  pictureList.appendChild(newPicture);

}

pictureContainer.appendChild(pictureList);
