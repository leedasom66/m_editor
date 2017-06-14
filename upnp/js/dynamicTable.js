var checkedList = new Array();
var defaultRowNum = 1;
var timelineNum = 0;
var contentsNum = 0;
		
function allowDrop(ev) {
	ev.preventDefault();
}

function dropFirst(ev, rowId) {
	ev.preventDefault();
	console.log(ev);
	var data = ev.dataTransfer.getData("text");
	console.log(data);

	if(data != null) {
		var slider = createDealer(rowId);

		var cell = document.getElementById(rowId).cells[1];
		console.log(cell);
		//row.removeEventListener("ondrop", function(){dropFirst()});
		cell.setAttribute("ondrop", null);

		
		console.log(data);
		var dataDiv = document.getElementById(data);
		dataDiv.className = "handle red-bar";
		//dataDiv.removeEventListener("ondragstart", function(){dragFirst()});
		dataDiv.setAttribute("ondragstart", null);
		//dataDiv.setAttribute("draggable", "false");
		slider.appendChild(dataDiv);

		ev.target.appendChild(slider);
	}
}

function add_device_row(table, msg) {
	mtable = document.getElementById(table);

	row = table.insertRow(table.rows.length);
	cell_index = row.insertCell(0);
	cell_name = row.insertCell(1);
	cell_address = row.insertCell(2);

	cell_index.innerHTML = '<input type="radio" name="selected[]"/>';
	cell_name.innerHTML = '	Device ' + table.rows.length + " : ";
	cell_address.innerHTML = msg;
}

function add_timeline(table) {
	targetTable = document.getElementById(table);
	countRow = targetTable.rows.length;
	row = targetTable.insertRow(countRow);
	row.id = 'row' + (countRow + timelineNum);
	row.dataset.value = '0';
	cell1 = row.insertCell(0);
	cell1.style.width = '85px';
	cell1.style.padding = '0px';
	cell1.innerHTML = '<input type="checkbox" id="check' + defaultRowNum + '">' + 'Track' + defaultRowNum + '</input>';
	cell1.style.width = "15px";
	cell2 = row.insertCell(1);
	cell2.colSpan = '15';
	cell2.style.width = '70px';
	cell2.style.height = '30px';
	cell2.style.padding = '0px';
	cell2.style.border = '1px solid black';
	cell2.ondrop = function(event){
		var id = event.path[1].id;
		console.log(id);
		dropFirst(event, id)
	};
	cell2.ondragover = function(){allowDrop(event)};
	cell2.innerHTML = '<div name="strs[]" class="' + defaultRowNum + '"></div>';
	defaultRowNum++;
}

function delete_timeline(table) {
	targetTable = document.getElementById(table);
	tableNum = targetTable.rows.length + timelineNum;
	var k = 0;
	if(tableNum < 2) return;
	for(var i = 1; i < tableNum; i++) {
		// �� �ึ�� �����ϴ� üũ�ڽ��� üũ ������ ���� �� ���� ���θ� ����
		// üũ�ڽ��� üũ�� �Ǿ��ִ� ����� checkedList�� �� ��ȣ�� �����Ͽ� �ϰ� ����
		//console.log(tableNum);
		var checkboxName = "check" + i;
		checkbox = document.getElementById(checkboxName);
		//console.log(checkboxName);
		//console.log(checkbox);
		if(checkbox != null && checkbox.checked) {
			checkedList[k] = i;
			console.log("0: " + k + ", " + checkedList[k]);
			k++;
		}
	}
	for(var i = 0; i < k; i++) {
		var n = checkedList[i] - timelineNum; // deleteRow ���� �� ���̺� row�ѹ��� ������ �� ��ȣ�� �޶����Ƿ� ���� Ƚ���� �� ��
		console.log("1: " + n);
		targetTable.deleteRow(n);
		timelineNum++;
	}
}

function delete_contents(table) {
	document.getElementById('contentsImg').src = "";
	targetTable = document.getElementById(table);
	tableNum = targetTable.rows.length + contentsNum;
	var k = 0;
	if(tableNum < 2) return;
	for(var i = 1; i < tableNum; i++) {
		// �� �ึ�� �����ϴ� üũ�ڽ��� üũ ������ ���� �� ���� ���θ� ����
		// üũ�ڽ��� üũ�� �Ǿ��ִ� ����� checkedList�� �� ��ȣ�� �����Ͽ� �ϰ� ����
		//console.log(tableNum);
		var checkboxName = "check" + i;
		checkbox = document.getElementById(checkboxName);
		//console.log(checkboxName);
		//console.log(checkbox);
		if(checkbox != null && checkbox.checked) {
			checkedList[k] = i;
			console.log("0: " + k + ", " + checkedList[k]);
			k++;
		}
	}
	for(var i = 0; i < k; i++) {
		var n = checkedList[i] - contentsNum; // deleteRow ���� �� ���̺� row�ѹ��� ������ �� ��ȣ�� �޶����Ƿ� ���� Ƚ���� �� ��
		console.log("1: " + n);
		targetTable.deleteRow(n);
		contentsNum++;
	}
}

var pullfiles = function(){ 
    // love the query selector
    var fileInput = document.querySelector("#myfiles");
    var files = fileInput.files;
    // cache files.length 
    var fl=files.length;
    var i=0;

    while ( i < fl) {
        // localize file var in the loop
        var file = files[i];
		add_row('contentsTable', file);
        console.log(file.name);
        i++;
    }    
}

function createDealer(rowId) {
	var slider = document.createElement("div");
	slider.id = "slider" + countPlayset;
	slider.className = "dragdealer";
	slider.dataset.value = "0";
	slider.ondragstart=function(){makeDragdealer(slider.id, rowId)};

	return slider;
}