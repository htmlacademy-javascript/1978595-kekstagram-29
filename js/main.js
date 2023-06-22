import {isWithinWorkingDay} from './functions.js';
import { getPhotoAttributesArray } from './photo-data-testing-generation.js';
import {renderThumbnails} from './thumbnails-generation.js';
//import { renderGallery } from './thumbnails-generation-alternative.js';

isWithinWorkingDay('08:00', '17:30', '14:00', 90);
renderThumbnails(getPhotoAttributesArray());
//renderGallery(getPhotoAttributesArray());
