import { getPhotoAttributesArray } from './data.js';
//import {renderThumbnails} from './gallery.js';
import { renderGallery } from './gallery.js';
import './upload-form/upload-form.js';

//renderThumbnails(getPhotoAttributesArray());

renderGallery(getPhotoAttributesArray());

