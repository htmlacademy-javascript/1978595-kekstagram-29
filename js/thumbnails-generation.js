import {getPhotoAttributesArray} from './photo-data-testing-generation.js';

const pictures = getPhotoAttributesArray();

const pictureContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content;

const pictureList = document.createDocumentFragment();

for (const picture of pictures) {

  const newPicture = pictureTemplate.cloneNode(true);

  const {url, description, comments, likes} = picture;

  newPicture.querySelector('.picture__img').setAttribute('src',url);
  newPicture.querySelector('.picture__img').setAttribute('alt',description);
  newPicture.querySelector('.picture__comments').textContent = Object.keys(comments).length;
  newPicture.querySelector('.picture__likes').textContent = likes;

  pictureList.appendChild(newPicture);

}

pictureContainer.appendChild(pictureList);
