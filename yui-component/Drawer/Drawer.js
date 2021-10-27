/**
 * @author SubwaySamurai
 * @date 2020/11/27
 * @description 抽屉
 */

import Modal from '../Modal';

import './Drawer.css'

import util from '../../../util';

/**
 * @constructor 抽屉
 * @extends Modal
 * @param {string|HTMLElement} selector 
 */
function Drawer (selector) {
    // super 
    Modal.apply(this, arguments);

    this.state = {
        ...this.state,
        isMouseDownInModalWrap: false
    };

    this.handleModalWrapClick = this.handleModalWrapClick.bind(this);
    this.handleModalWrapMouseUp = this.handleModalWrapMouseUp.bind(this);
    this.handleModalWrapMouseDown = this.handleModalWrapMouseDown.bind(this);
}
Drawer.prototype = Object.create(Modal.prototype);
Drawer.prototype.constructor = Drawer;
/**
 * @override
 */
Drawer.prototype.init = function () {
    // super func
    Modal.prototype.init.apply(this, arguments);

    // element event binding

    // // @deprecated 如果在抽屉按下鼠标 mousedown，然后将鼠标移动 mousemove 至抽屉显示区域外蒙层区域松开鼠标 mouseup，
    // // 那么会在松开鼠标的位置触发 click 事件，使得本事件的隐藏判定异常（判断为应该隐藏），故先不监听此事件
    // util.delegate(this.rootElem, 'click', '.modal-wrap', this.handleModalWrapClick);

    // 利用 mouseup 和 mousedown 加上一个变量可以解决问题
    util.delegate(this.rootElem, 'mouseup', '.modal-wrap', this.handleModalWrapMouseUp);
    util.delegate(this.rootElem, 'mousedown', '.modal-wrap', this.handleModalWrapMouseDown);

    // sub component initializing
}
/**
 * 
 * @param {UIEvent} e 
 * @param {HTMLElement} elem 
 */
Drawer.prototype.handleModalWrapClick = function (e, elem) {
    // console.log('handleModalWrapClick', arguments, e.target);
    var self = this;
    if (e.target !== elem) {
        return;
    }
    this.hide();
}
Drawer.prototype.handleModalWrapMouseUp = function (e, elem) {
    // console.log('handleModalWrapMouseUp', arguments, e.target);
    var self = this;
    if (e.target !== elem) {
        return;
    }
    if (!this.state.isMouseDownInModalWrap) {
        return;
    }
    // 这里注意要重新将判定变量设 false, 否则当上一次触发后, 
    // 若操作者在浏览器视口外按住鼠标, 然后再移动到此元素放开鼠标, 这里仍然会判定通过, 
    // 虽然多执行 hide 也不会造成影响，但是仍然要避免!!!
    this.setState({
        isMouseDownInModalWrap: false
    });
    this.hide();
}
Drawer.prototype.handleModalWrapMouseDown = function (e, elem) {
    // console.log('handleModalWrapMouseDown', arguments, e.target);
    var self = this;
    if (e.target !== elem) {
        this.setState({
            isMouseDownInModalWrap: false
        });
        return;
    }
    this.setState({
        isMouseDownInModalWrap: true
    });
}
export default Drawer;