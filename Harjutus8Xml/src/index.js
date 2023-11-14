import "./styles.css";

function loadXMLDoc(){
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200){
      getGameDetails(this);
    }
  };
  xmlhttp.open("GET", "src/games.xml", true);
  xmlhttp.send();
}

function getGameDetails(xml){
  const xmlDoc = xml.responseXML;
  let tableRows = "<tr><th>Title</th><th>Price</th><th>Platforms</th></tr>";
  let gameElements = xmlDoc.getElementsByTagName("game");
  for (let i = 0; i < gameElements.length; i++){
    tableRows +=
      "<tr><td>" +
      gameElements[i].getElementsByTagName("title")[0].childNodes[0].nodeValue + "</td><td>" +
      gameElements[i].getElementsByTagName("price")[0].childNodes[0].nodeValue +
      "</td><td>";
    let platforms = gameElements[i].getElementsByTagName("platform");
    for (let j = 0; j < platforms.length; j++){
      tableRows += platforms[j].childNodes[0].nodeValue + "/";
    }
    tableRows += "</td></tr>";
  }
  document.getElementById("xmlTable").innerHTML = tableRows;
}

document.getElementById("app").innerHTML = `
<table id="xmlTable"></table>
`;

loadXMLDoc();
