import { getPhotoAttributesArray } from './photo-data-testing-generation.js';
import {isWithinWorkingDay} from './functions.js';

getPhotoAttributesArray();
isWithinWorkingDay('08:00', '17:30', '14:00', 90);
