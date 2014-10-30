
/*
功能都已经实现，个人觉得完成的挺好，暂时没有什么建议。
*/
/*
FileName: sorter.js;
Author: linyiting;
For MWC Homework2
*/

window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	var aTables = document.getElementsByTagName('table');
    return aTables;
}

function makeAllTablesSortable(aTables) {
    
    initStyle(aTables);

	for (var i = 0; i < aTables.length; i++)
		sortTable(aTables[i]);

}

/*
sortStyle用于记录各个表格每一列的排序状态
以0表示当前为无序状态，以1表示当前为有序状态
*/
sortStyle = new Array;

//初始化排序状态，将初始状态记为0
function initStyle(aTables) {
    for (var i = 0; i < aTables.length; i++) {
    	sortStyle[i] = new Array;
    	var count = aTables[i].tBodies[0].rows[0].cells.length;
    	for (var j = 0; j < count; j++)
    		sortStyle[i][j] = 0;
    }
}

//获取表格oTable第index列的排序状态
function getStyle(oTable, index) {
    var tables = getAllTables();
    var i;
    for (i = 0; i < tables.length; i++) {
    	if (oTable == tables[i]) {
    		break;
    	}
    }
    return sortStyle[i][index];
}

//设置表格oTable第index列的排序状态
function setStyle(oTable, index) {
    var tables = getAllTables();
    var i;
    for (i = 0; i < tables.length; i++) {
    	if (oTable == tables[i]) {
    		break;
    	}
    }
//记录表格oTable第index列当前的排序状态
    var currentStyle = sortStyle[i][index];

//将表格的排序状态全部设置为0
    initStyle(tables);

//设置表格oTable第index列的排序状态
    if (currentStyle == 0)
    	sortStyle[i][index] = 1;
    else
    	sortStyle[i][index] = 0;
}

function sortTable(oTable) {
    var aTh = oTable.getElementsByTagName('th');

    for (var i = 0; i < aTh.length; i++) {
    	/* oTable的第i个th的点击后，获取该th的索引值，作为参数传入sortNthCol函数，
    	表示以oTable的第i列为key进行排序
        */
        aTh[i].onclick = function () {
            for (var j = 0; j < aTh.length; j++) {
            	if (this == aTh[j])
            		sortNthCol(oTable, j);
            }
        }
    }
}

function sortNthCol(oTable, index) {
    //用aRows[]数组存储表格oTable的每一行
    var aRows = [];
	for(var i = 0; i < oTable.tBodies[0].rows.length; ++i) {
		aRows[i] = oTable.tBodies[0].rows[i];
	}
    //对aRows[]数组进行排序
	aRows.sort(function(row1, row2) {
		var str1 = row1.cells[index].innerHTML;
		var str2 = row2.cells[index].innerHTML;

		if (getStyle(oTable, index) == 0) {
		    return str1.localeCompare(str2);
		} else {
			return str2.localeCompare(str1);
		}
	});
    //将aRows[]的添加为oTable.tBodies[0]子节点，添加时会自动将原有节点删除
	for(var i = 0; i < aRows.length; ++i) {
		oTable.tBodies[0].appendChild(aRows[i]);
	}
    //将oTable的相关列设置为有序状态
	setStyle(oTable, index);
    //改变oTable相关列头的外观
	setThstyle(oTable, index);
}

//改变oTable第index列列头的外观
function setThstyle(oTable, index) {
	var tables = getAllTables();
	for (var i = 0; i < tables.length; i++) {
		var aTh = tables[i].getElementsByTagName('th');

		for (var j = 0; j < aTh.length; j++) {
            aTh[j].className = '';
            if (oTable == tables[i] && j == index) {
                if (sortStyle[i][index] == 1)
                    aTh[index].className = 'clicked-style1';
                else
                    aTh[index].className = 'clicked-style2';
            }
		}
	}
}
