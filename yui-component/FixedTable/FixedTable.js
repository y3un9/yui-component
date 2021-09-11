/**
 * @author SubwaySamurai
 * @date 2021/02/23
 * @description 表头固定表体滚动表格
 */

import './FixedTable.css';

import Table from '../Table';

/**
 * @consturctor FixedTable
 * @extends Table
 * @param {string | HTMLElement} selector 
 */
function FixedTable (selector) {
    Table.call(this, selector);
    var superState = this.state;

    this.state = Object.assign({}, superState, {
        
    });

    /** @type {HTMLElement} */
    this.headTableElem = null;
    /** @type {HTMLElement} */
    this.bodyTableElem = null;
}
FixedTable.prototype = Object.create(Table.prototype);
FixedTable.prototype.constructor = FixedTable;
FixedTable.prototype.init = function () {
    // super func
    Table.prototype.init.call(this);

    /** @type {HTMLElement} */
    this.headTableElem = this.rootElem.querySelector('.head-table-wrapper table');
    /** @type {HTMLElement} */
    this.bodyTableElem = this.rootElem.querySelector('.body-table-wrapper table');
}
FixedTable.prototype.render = function () {
    var self = this;

    var tableTemplate = '';
    var colGroupTemplate = '';
    
    tableTemplate +=
        '<thead>';
    colGroupTemplate +=
        '<colgroup>';
    this.state.columnData.forEach(
        /**
         * @param {Object} item 列数据对象
         */
        function (item) {
            if (item.sortable === true) {
                tableTemplate += self.renderTableHeadColumnSortable(item);
            } else {
                tableTemplate += self.renderTableHeadColumn(item);
            }
            colGroupTemplate += 
                '<col style="width:' + item.width + ';">';
        }
    );
    tableTemplate +=
        '</thead>';
    colGroupTemplate +=
        '</colgroup>';

    this.headTableElem.innerHTML = tableTemplate + colGroupTemplate;

    tableTemplate = '';
    tableTemplate +=
        '<tbody>';
    this.state.tableData.forEach(
        /**
        * @param {Object} item 行数据对象
        * @param {number} index 行序
        */
        function (item, index) {
            var row_data = item;
            tableTemplate += self.renderTableRow(row_data);
        }
    );
    tableTemplate +=
        '</tbody>';

    this.bodyTableElem.innerHTML = tableTemplate + colGroupTemplate;
}
export default FixedTable;


