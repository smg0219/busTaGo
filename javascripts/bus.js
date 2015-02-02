var httpRequest;

function createXMKHttpRequest () {
	if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		httpRequest = new ActiveXObject("Microsoft.XMLHttp");
	}
}

function test () {
	createXMKHttpRequest();

	var route = 11;
	//var url = "http://busopen.jeju.go.kr/OpenAPI/service/bis?_wadl&_type=xml";
	var url = "http://busopen.jeju.go.kr/OpenAPI/service/bis/BusLocation?" + route;

	httpRequest.onreadystatechange = loader;
	httpRequest.open('GET', url, true);
	httpRequest.send(null);
}

function loader () {
	if (httpRequest.readyState == 4 && httpRequest.status == 200) {
		temp = httpRequest.responseXML;
		document.getElementById("container").innerHTML = temp;
	} else {
		console.log("Fail");
	}
}