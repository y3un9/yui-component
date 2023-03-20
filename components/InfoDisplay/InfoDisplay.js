/**
 * @author KahoYeung
 * @date 2021/03/05
 * @description 信息展示组件
 */

import './InfoDisplay.css';

import Display from '../Display';
import Descriptions from '../Descriptions';

/**
 * @constructor 信息展示组件
 * @extends Display
 * @param {string | HTMLElement} selector 
 */
function InfoDisplay (selector) {
    Display.call(this, selector);
    var superState = this.state;

    this.state = Object.assign({}, superState, {
        
    });

    /** @type {} */
    this.descriptionList = null;

    /** @type {HTMLElement} */
    this.listWrapperElem = null;
}
InfoDisplay.prototype = Object.create(Display.prototype);
InfoDisplay.prototype.constructor = InfoDisplay;
InfoDisplay.prototype.init = function () {
    // super func
    Display.prototype.init.call(this);

    this.listWrapperElem = this.rootElem.querySelector('.descriptions');

    this.descriptionList = new Descriptions(this.listWrapperElem);
    this.descriptionList.init();
}
export default InfoDisplay;