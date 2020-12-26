/**
 * @author SubwaySamurai
 * @date 2020/10/10
 * @description 组件类
 */

/**
 * @constructor 组件类
 * @extends null
 * @param {string|HTMLElement} selector CSS选择器或元素节点
 */
function Component (selector) {
    /** @type {Object} 组件状态 */
    this.state = {};
    /** @type {HTMLElement} 组件元素DOM对象 */
    this.rootElem = null;
    // 判断 selector 是 元素选择器字符串，还是 元素节点
    if (typeof selector === 'string') {
        this.rootElem = document.querySelector(selector);
    } else if (selector && selector.nodeType === Node.ELEMENT_NODE) {
        this.rootElem = selector;
    }
}
Component.prototype = Object.create(null);
Component.prototype.constructor = Component;
/**
 * 设置组件状态
 * @method setState
 * @param {Object} newState 
 * @returns {Object} 更新后的状态
 */
Component.prototype.setState = function (newState) {
    // console.log(this.constructor.name, arguments.callee.name);
    // console.log('newState', newState);
    if (!newState || typeof newState !== 'object') {
        return;
    }
    var oldState = this.state;
    Object.keys(newState).forEach(function (key) {
        if (oldState.hasOwnProperty(key)) {
            oldState[key] = newState[key];
        }
    });
    return this.state;
};
export default Component;
