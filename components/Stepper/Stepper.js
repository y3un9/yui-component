/**
 * @author SubwaySamurai
 * @date 2020/11/26
 * @description 步进器
 */

// 步进器会有“加”按钮（+）和“减”按钮（-）
// 步进器应该具备的能力
// 1. 单点加按钮
// 2. 单点减按钮
// 3. 长按加按钮
// 4. 长按减按钮

import Component from '../Component';

/**
 * @constructor 步进器
 * @extends Component
 * @param {string|HTMLElement} selector 
 */
function Stepper (selector) {
    Component.call(this, selector);

    this.state = {
        /** @type {number} */
        default: null,
        /** @type {number} */
        step: null,
        /** @type {number} */
        current: null
    };

    this.plusBtnElem = this.rootElem.querySelector('');
    this.minusBtnElem = this.rootElem.querySelector('');

    this.handlePlusBtnClick = this.handlePlusBtnClick.bind(this);
    this.handleMinusBtnClick = this.handleMinusBtnClick.bind(this);
}
Stepper.prototype = Object.create(Component.prototype);
Stepper.prototype.constructor = Stepper;
/**
 * @method init
 */
Stepper.prototype.init = function () {
    this.plusBtnElem.addEventListener('click', this.handlePlusBtnClick);
    this.minusBtnElem.addEventListener('click', this.handleMinusBtnClick);
};
/**
 * 处理加按钮 hold 事件
 * @method handlePlusBtnHold
 * @param {MouseEvent} e 
 */
Stepper.prototype.handlePlusBtnHold = function (e) {
    
};
/**
 * 处理减按钮 hold 事件
 * @method handleMinusBtnHold
 * @param {MouseEvent} e 
 */
Stepper.prototype.handleMinusBtnHold = function (e) {

};
/**
 * 处理加按钮 click 事件
 * @method handlePlusBtnClick
 * @param {MouseEvent} e 
 */
Stepper.prototype.handlePlusBtnClick = function (e) {
    this.setState({
        current: this.state.current + step
    });
};
/**
 * 处理减按钮 click 事件
 * @method handleMinusBtnClick
 * @param {MouseEvent} e 
 */
Stepper.prototype.handleMinusBtnClick = function (e) {
    this.setState({
        current: this.state.current - step
    });
};
export default Stepper;