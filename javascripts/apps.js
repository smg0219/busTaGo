var jsonData = "";
var flag = "";
var defaultCount = 5;

function start()
{
	flag = 1;

	callAjax('http://busopen.jeju.go.kr/OpenAPI/service/bis/Bus', callbackStudentAjax);
}

/**
	https://github.com/niceaji/javascript-study/blob/gh-pages/doc/ajax.md
*/
function callAjax(url, callback)
{
	var xmlhttp;
	// compatible with IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			callback(xmlhttp.responseText);
		}
	}

	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function getDom(id)
{
	return document.getElementById(id);
}

function callbackStudentAjax(responseText)
{

	// string 을 json 으로 변환
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
	jsonData = JSON.parse(responseText);

	// var templateString = getDom('boxTemplate').innerHTML;
	// var parseString = [];
	// var newsList = getNewsData();
	// var enterList = getEnterData();
	// var sportsList = getSportsData();

	initList(getNewsData());
}


function initList(newsData, listCount)
{
	var templateString = getDom('boxTemplate').innerHTML;
	var parseString = [];

	if (listCount == null)
		listCount = defaultCount;

	for(var i = 0; i < listCount; i++)
	{
		parseString.push(template(templateString, {newsId: newsData[i].newsId, title: newsData[i].title}));
	}

	getDom('newsList').innerHTML = parseString.join("");
};

function clickNewsTab()
{
	getDom("news").className = "fst on";
	getDom("enter").className = "";
	getDom("sports").className = "";
	getDom("btnWrap").className = "fold_news fold_close";

	flag = 1;

	initList(getNewsData());
};

function clickEnterTab()
{
	getDom("news").className = "fst";
	getDom("enter").className = "on";
	getDom("sports").className = "";
	getDom("btnWrap").className = "fold_news fold_close";

	flag = 2;

	initList(getEnterData());
};

function clickSportsTab()
{
	getDom("news").className = "fst";
	getDom("enter").className = "";
	getDom("sports").className = "on";
	getDom("btnWrap").className = "fold_news fold_close";

	flag = 3;

	initList(getSportsData());
};

function moreBtn()
{
	var newsData = "";

	console.log(flag);

	switch (flag)
	{
		case 1: newsData = getNewsData();
				break;

		case 2: newsData = getEnterData();
				break;

		case 3: newsData = getSportsData();
				break;

		default: console.log("switch moreBtn Error");
				break;
	}

	getDom("btnWrap").className = "hide";

	initList(newsData, newsData.length);
};

function getNewsData()
{
	return jsonData[0].news;
};

function getEnterData()
{
	return jsonData[1].enter;
};

function getSportsData()
{
	return jsonData[2].sports;
};

//시작 
start();