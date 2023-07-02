import { getPhotoAttributesArray } from './data.js';
//import {renderThumbnails} from './gallery.js';
import { renderGallery } from './thumbnails-generation-alternative.js';
import './load-form.js';

//renderThumbnails(getPhotoAttributesArray());

renderGallery(getPhotoAttributesArray());

