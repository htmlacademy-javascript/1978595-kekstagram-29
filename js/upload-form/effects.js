/**
 * @type {GraphicEffectObject}
 */
export const effects = {
  none: {

    style: 'none',
    step: 0,
    min: 0,
    max: 0,
    unit: ''
  },

  chrome: {

    style: 'grayscale',
    step: 0.1,
    min: 0,
    max: 1,
    unit: ''
  },

  sepia: {

    style: 'sepia',
    step: 0.1,
    min: 0,
    max: 1,
    unit: ''
  },

  marvin: {

    style: 'invert',
    step: 1,
    min: 0,
    max: 100,
    unit: '%'
  },

  phobos: {

    style: 'blur',
    step: 0.1,
    min: 0,
    max: 3,
    unit: 'px'
  },

  heat: {

    style: 'brightness',
    step: 0.1,
    min: 1,
    max: 3,
    unit: ''
  }
};
