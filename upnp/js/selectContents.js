var countPlayset = 0;
var countRow = 0;

function add_device_row(table, msg) {
	targetTable = document.getElementById(table);
	rowNum = targetTable.rows.length;
	row = targetTable.insertRow(rowNum);
	cell1 = row.insertCell(0);
	cell2 = row.insertCell(1);
	cell1.innerHTML = '<input type="checkbox" id="check' + rowNum + '" name="device"/>';
	cell1.style.width = "15px";
	cell2.id = rowNum;
	cell2.innerHTML = '<div id="device' + rowNum + '" style="width:490px; margin-left:4px; font-size: 15px;"> ' + 'Device ' + rowNum + '<br/>IP Address : ' + msg + '</div>';

	cell1.onclick = function(evt) {
		// console.log(evt.path[1].id);
		// var index = evt.path[1].id;
			document.getElementById('selectedDeviceId').innerHTML = cell2.id;
			document.getElementById('selectedDeviceIP').innerHTML = msg;
    };
}


function add_row(table, file) {
	targetTable = document.getElementById(table);
	rowNum = targetTable.rows.length;
	row = targetTable.insertRow(rowNum);
	cell1 = row.insertCell(0);
	cell2 = row.insertCell(1);
	cell1.innerHTML = '<input type="radio" id="check' + rowNum + '" name="rowNum"/>';
	cell1.style.width = "15px";
	cell2.id = rowNum;
	cell2.innerHTML = '<div id="file' + rowNum + '" style="width:200px; margin-left:4px; font-size: 15px;"> ' + file.name + '<br/>File Type: ' + file.type + '</div>';
	cell1.onclick = function(evt) {
		// console.log(evt.path[1].id);
		// var index = evt.path[1].id;
		// document.getElementById('selectedContentsName').innerHTML = file.name;
		// document.getElementById('selectedContentsType').innerHTML = file.type;
		console.log(file.url);
		document.getElementById('contentsImg').src = "src/test.jpg";
	};
}


function makePlayset() {
	var deviceId = document.getElementById('selectedDeviceId').innerHTML;
	var deviceIP = document.getElementById('selectedDeviceIP').innerHTML;
	var contentsName = document.getElementById('selectedContentsName').innerHTML;
	var contentsType = document.getElementById('selectedContentsType').innerHTML;

	var playset = document.createElement('div');
	playset.id = 'playset' + countPlayset;
	//console.log(device + ', ' + contents);
	playset.style.background = "#CCFFFF";
	playset.style.border = "1px double #3399FF";
	playset.style.height = "30px";
	playset.style.width = "170px";
	playset.style.fontSize = "10px";
	playset.draggable = "true";
	playset.ondragstart = function(){dragFirst(event)};
	playset.innerHTML = deviceId + ' / ' + contentsName;
	document.getElementById('makePlayset').appendChild(playset);

	var contentsDataset = {fileName: contentsName, fileType: contentsType};
	playsetArr[countPlayset] = contentsDataset;
	console.log(playsetArr);

	var deviceDataset = {deviceID: deviceId, deviceIP: deviceIP};
	devicesetArr[countPlayset] = deviceDataset;
	console.log(devicesetArr);

	countPlayset++;
}

function makeDragdealer(wrapper, rowId) {
	new Dragdealer(wrapper, {
		animationCallback: function(x, y) {
			//console.log(document.getElementById(rowId).dataset.value);
			document.getElementById(rowId).dataset.value = Math.round(x * 100);
		}
	});
}

function saveSequence() {
	var table = document.getElementById('timeTable');
	console.log('0: ' + table);
	var delayArr = [];

	for(var i = 0; i < table.rows.length + timelineNum; i++) {
		var index = 'row' + (i + 1);
		console.log('1: ' + index);
		if(table.rows.namedItem(index)) {
			delayArr[i] = table.rows.namedItem(index).dataset.value;
			console.log('2: ' + delayArr[i]);
		}
	}

	console.log('dl: ' + delayArr);
	console.log('pl: ' + playsetArr);
	console.log('dv: ' + devicesetArr);
}