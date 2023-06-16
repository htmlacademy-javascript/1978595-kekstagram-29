import { getPhotoAttributesArray } from './photo-data-testing-generation.js';
import {withinTheWorkingDay} from './functions.js';

getPhotoAttributesArray();
withinTheWorkingDay('08:00', '17:30', '14:00', 90);
