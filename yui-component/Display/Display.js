/**
 * @author SubwaySamurai
 * @date 2021/03/05
 * @description 展示组件
 */

import './Display.css';

import Component from '../Component';

/**
 * @constructor Display
 * @extends Component
 * @param {string | HTMLElement} selector 
 */
function Display (selector) {
    Component.call(this, selector);
    var superState = this.state;

    this.state = Object.assign({}, superState, {
        titleClassName: ''
    });

    this.titleElem = null;
}
Display.prototype = Object.create(Component.prototype);
Display.prototype.constructor = Display;
/**
 * @method init
 */
Display.prototype.init = function () {
    this.titleElem = this.rootElem.querySelector('.' + this.state.titleClassName);;
}
/**
 * @method renderTitle
 * @param {string} data 
 */
Display.prototype.renderTitle = function (data) {
    if (this.titleElem) {
        this.titleElem.innerText = data;
    }
}
export default Display;