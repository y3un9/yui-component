/**
 * @author SubwaySamurai
 * @date 2020/12/07
 * @description 进度条
 */

import Component from '../Component';

/**
 * @constructor 进度条
 * @extends Component
 * @param {string|HTMLElement} selector 
 */
function Progress (selector) {
    Component.call(this, selector);
}
Progress.prototype = Object.create(Component);
Progress.prototype.constructor = Progress;
/**
 * @method init
 */
Progress.prototype.init = function () {

};
/**
 * @method render
 */
Progress.prototype.render = function () {

};
export default Progress;