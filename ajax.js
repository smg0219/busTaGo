$.ajax({
	type: "GET",
	url: "http://busopen.jeju.go.kr/OpenAPI/service/bis/Bus",
	dataType: "xml",
	async: false,
	success: response_parse
});

function response_parse (xml) {
	$item = $(xml).find("item");

	var itemCount = $.item.length;

	$("div").html("<b>전체 item 수 : " + itemCount + " 개</b>");

	$item.each(function () {
		var busRouteId = $(this).find("routeId").text();
		var busRouteNum = $(this).find("rountNum").text();

		var html = "<tr>";
			html += "<td>" + busRouteId + "</td>";
			html += "<td>" + busRouteNum + "</td>";
			html += "</tr>";

		$("body").append(html);
	});
}