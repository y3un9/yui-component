/**
 * @author SubwaySamurai
 * @date 2020/12/07
 * @description 滑动输入条
 */

import Component from '../Component';

/**
 * @constructor 滑动输入条
 * @extends Component
 * @param {string|HTMLElement} selector 
 */
function Slider (selector) {
    Component.call(this, selector);
}
Slider.prototype = Object.create(Component.prototype);
Slider.prototype.constructor = Slider;
/**
 * @method init
 */
Slider.prototype.init = function () {

};
/**
 * @method render
 */
Slider.prototype.render = function () {

};
export default Slider;