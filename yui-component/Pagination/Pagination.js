/**
 * @author SubwaySamurai
 * @date 2020/10/12
 * @description 分页组件
 */

import Component from './Component';

/** @class 分页组件 */
var Pagination = (function () {
    /**
     * @constructor
     * @param {string} id 
     */
    function Pagination (id) {
        Component.call(this, id);

        this.state = {
            /** 当前页码 */
            currentPage: 1,
            /** 分页大小 */
            pageSize: 10,
            /** 数据总量 */
            dataTotal: 0
        };

        this.pageItemDisabledClassName = 'pagination-disabled';
        this.pageItemActiveClassName = 'pagination-active';

        /** @type {HTMLElement} */
        this.pagePrevElem = this.rootElem.querySelector('.pagination-prev');
        /** @type {HTMLElement} */
        this.pageNextElem = this.rootElem.querySelector('.pagination-next');
        /** @type {HTMLElement} */
        this.pageItemsContainerElem = this.rootElem.querySelector('.pagination-items-container');

        this.handlePagePrevClick = this.handlePagePrevClick.bind(this);
        this.handlePageNextClick = this.handlePageNextClick.bind(this);
        this.handlePageItemClick = this.handlePageItemClick.bind(this);
    }
    Pagination.prototype = Object.create(Component.prototype);
    Pagination.prototype.constructor = Pagination;
    /**
     * @method init
     */
    Pagination.prototype.init = function () {
        this.pagePrevElem.addEventListener('click', this.handlePagePrevClick);
        this.pageNextElem.addEventListener('click', this.handlePageNextClick);
        delegate(this.pageItemsContainerElem, 'click', '.pagination-item', this.handlePageItemClick);
    };
    /**
     * @method handlePagePrevClick
     * @param {MouseEvent} e 
     */
    Pagination.prototype.handlePagePrevClick = function (e) {
        
    };
    /**
     * @method handlePageNextClick
     * @param {MouseEvent} e 
     */
    Pagination.prototype.handlePageNextClick = function (e) {

    };
    /**
     * @method handlePageItemClick
     * @param {MouseEvent} e 
     * @param {HTMLElement} elem
     */
    Pagination.prototype.handlePageItemClick = function (e, elem) {
        var target_elem = elem;
        var target_page = target_elem.getAttribute('data-page');
        // 判断是否点击相同页码
        if (target_page == this.state.currentPage) {
            return;
        }
        // 将高亮页码切换到当前点击的页码
        var page_item_elems = this.pageItemsContainerElem.querySelectorAll('.pagination-item');
        var self = this;
        Array.prototype.forEach.call(page_item_elems, function (elem, index) {
            var page_value = elem.getAttribute('data-page');
            if (page_value !== target_page) {
                elem.classList.remove(self.pageItemActiveClassName);
                return;
            }
            elem.classList.add(self.pageItemActiveClassName);
        });
    };
    /**
     * @method render
     */
    Pagination.prototype.render = function () {

    };
    return Pagination;
}());

export default Pagination;