/** 
 * @author SubwaySamurai
 * @date 2020/10/10
 * @description 分页表格组件
 */

import Table from '../Table';

/** @class 分页表格组件类 */
var PageableTable = (function () {
    /**
     * @constructor
     * @param {string} id 
     */
    function PageableTable (id) {
        Table.call(this, id);
    }
    PageableTable.prototype = Object.create(Table.prototype);
    PageableTable.prototype.constructor = PageableTable;
    return PageableTable;
}());

export default PageableTable;