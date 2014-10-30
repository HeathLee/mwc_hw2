/*功能都已经实现。这里提两点建议：
1.如果makeAllTableSortable函数里面的功能太多，如果能够拆封出几个单一功能的函数，我觉得会更容易读点；
2.点击事件函数最好单独提出来，不然每个表头点击事件都需要生成一重复的函数。*/
window.onload = function() {
	var tables = getAllTables();
	makeAllTableSortable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}
function makeAllTableSortable(tables) {
	counter = new Array();

    for (var i = 0; i < tables.length; i++) {
		var th = tables[i].rows[0].cells;
		counter.push(-1);

		for (var j = 0; j < th.length; j++) {

			th[j].onclick = function() {
				var table = this.parentNode.parentNode.parentNode, allTables = getAllTables();
				var tr = table.rows, th = tr[0].cells, column, tableNum, flag;
				var tr_array = new Array(), values = new Array();

				for (var k = 0; k < allTables.length; k++){
					if (allTables[k].innerHTML == table.innerHTML) {
						tableNum = k;
						break;
					}
				}

				for (var k = 0; k < th.length; k++) {
					if (th[k].innerHTML == this.innerHTML) {
						column = k;
						break;
					}
				}

				if (counter[tableNum] == -1) {
					flag = 0;
					th[column].className += " changed1";
				}
				else if (counter[tableNum] % 10 == column){
					if (counter[tableNum] < 10) flag = 1;
					else flag = 0;
					
					if (flag != 0) {
     					th[column].className = th[column].className.replace(" changed1", " changed2");
					}
					else {
						th[column].className = th[column].className.replace(" changed2", " changed1");
					}
				}
				else {
					flag = 0;

					if (counter[tableNum] / 10 == 0) {
						th[counter[tableNum] % 10].className = th[counter[tableNum] % 10].className.replace(" changed1", "");
					}
					else {
						th[counter[tableNum] % 10].className = th[counter[tableNum] % 10].className.replace(" changed2", "");
					}
					th[column].className += " changed1";
				}
				counter[tableNum] = column + flag * 10;

				for (var k = 1; k < tr.length; k++) {
					tr_array.push(tr[k].innerHTML);
				}

				for (var k = 1; k < tr.length; k++) {
					values.push(tr[k].cells[column].innerHTML);
				} 

				if (flag == 0) {
					for (var x = 0; x < values.length - 1; x++) {
						var temp1, temp2;

						for (var y = x + 1; y < values.length; y++) {
							if (values[x] > values[y]) {
								temp1 = values[x];
								values[x] = values[y];
								values[y] = temp1;

								temp2 = tr_array[x];
								tr_array[x] = tr_array[y];
								tr_array[y] = temp2;
							}
						}
					}
				}
				else {
						for (var x = 0; x < values.length - 1; x++) {
						var temp1, temp2;

						for (var y = x + 1; y < values.length; y++) {
							if (values[x] < values[y]) {
								temp1 = values[x];
								values[x] = values[y];
								values[y] = temp1;

								temp2 = tr_array[x];
								tr_array[x] = tr_array[y];
								tr_array[y] = temp2;
							}
						}
					}
				} 


				for (var k = 0; k < tr_array.length; k++) {
					tr[k + 1].innerHTML = tr_array[k];
				}
			};
		}
	}
}
