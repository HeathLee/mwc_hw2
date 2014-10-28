/*********************************************************
 *Date:2014.10.27
 *Author:Panbin
 *********************************************************/
//设置点击事件的处理
window.onload = function () {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}
//获取表格所有数据
function getAllTables(){
    return document.getElementsByTagName('table');
}

//表格排序
function makeAllTablesSortable(tables){
    for(var i = 0 ; i < tables.length ; i++)
    {
        tableProcess(tables[i]);
    }
}

//单个表格处理
function tableProcess(table)
{
    window.eventDeal(table);
}

//获取数据
function getData(table)
{
        var rowArray = [ ];             //二维形式存储表格数据
        var cellArray = [ ];
        var rLength = table.rows.length;

        for(var r = 1 ; r < rLength ; r++)
            for(var c = 0 ; c < table.rows[r].cells.length ; c++)
                cellArray.push(table.rows[r].cells[c].innerText);
            rowArray.push(cellArray);
            return rowArray;
}

//事件处理
function eventDeal(table)
{
    var tableData = getData(table);                                 //用于存储单个表格数据
    var tableHead = table.rows[0].cells;

    for(var i = 0 ; i < tableHead.length ; i++)
    {
        var sortType = " ";
        tableHead[i].onclick = function(event)
        {
            //样式改变
            var clickTarget = event.target;
            console.log("tablehead "+(clickTarget.cellIndex+1)+" has been clicked!");
            if(sortType==" ")
                sortType = "asc";
            else if(sortType=="asc")
                sortType="desc";
            else
                sortType="asc"

            //排序
            var sorted = colSort(tableData,clickTarget.cellIndex,sortType);

            for(var i = 0 ; i < sorted.length; i++)
                for(var j = 0 ;  j< sorted[i].length; j++)
                    console.log("row "+i+" col "+j+" = "+sorted[i][j] +"row = " + sorted.length + "col" + sorted[i].length);

            //数据更新
        }
    }
}

//按列排序
function colSort(array,celIndex,sorttype)
{
    if(sorttype == " ")
        return array.sort(function(x,y){console.log("默认"); return x[celIndex].localeCompare(y[celIndex]);});
    else if(sorttype == "asc")
        return array.sort(function(x,y){console.log("升序"); return x[celIndex].localeCompare(y[celIndex]);});
    else
        return array.sort(function(x,y){console.log("降序"); return y[celIndex].localeCompare(x[celIndex]);});
}
