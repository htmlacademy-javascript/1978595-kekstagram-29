/**
 * @typedef Picture
 * @prop {number} id
 * @prop {string} url
 * @prop {string} description
 * @prop {number} likes
 * @prop {Array<PictureComment>} comments
 */

/**
 * @typedef PictureComment
 * @prop {number} id
 * @prop {string} avatar
 * @prop {string} message
 * @prop {string} name
 */

/**
 * @typedef GraphicEffect
 * @prop {string} style
 * @prop {number} step
 * @prop {number} min
 * @prop {number} max
 * @prop {string} unit
 */

/**
 * @typedef GraphicEffectObject
 * @type {Object.<string, GraphicEffect>}
 */

/**
 * @typedef  {'error' | 'success'} messageType
 */
