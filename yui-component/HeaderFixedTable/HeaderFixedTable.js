/**
 * @author SubwaySamurai
 * @date 2020/10/10
 * @description 表头固定表格组件
 */

import Table from '../Table';

/**
 * @constructor 表头固定表格组件类
 * @extends Table
 * @param {string|HTMLElement} selector 
 */
function HeaderFixedTable (selector) {
    Table.call(this, selector);

    /** @type {HTMLTableElement} 显示表头的表格元素 */
    this.headTableElem = null;
    /** @type {HTMLTableElement} 显示表体的表格元素 */
    this.contentTableElem = null;
}
HeaderFixedTable.prototype = Object.create(Table.prototype);
HeaderFixedTable.prototype.constructor = HeaderFixedTable;
/**
 * @override
 * @method 渲染组件
 */
HeaderFixedTable.prototype.render = function () {
    // console.log(this.constructor.name, arguments.callee.name);
    var txt = '';
    var txt2 = txt;
    this.headTableElem.innerHTML = txt;
    this.contentTableElem.innerHTML = txt;

    txt +=
        '<thead>';
    txt2 +=
        '<colgroup>';
    this.state.columnData.forEach(function (item) {
        txt += 
            '<th>' +
                item.title +
            '</th>'
        ;
        txt2 += 
            '<col style="width:' + item.width + ';">'
        ;
    });
    txt +=
        '</thead>';
    txt2 +=
        '</colgroup>';
    this.headTableElem.innerHTML = txt + txt2;

    var txt = '';
    txt +=
        '<tbody>';
    var self = this;
    this.state.tableData.forEach(
        /**
         * @param {Object} item 行数据
         * @param {number} index 行序
         */
        function (item, index) {
            var row_data = item;
            txt += self.renderTableRow(row_data);
        }
    );
    txt +=
        '</tbody>';
    this.contentTableElem.innerHTML = txt + txt2;
}
export default HeaderFixedTable;