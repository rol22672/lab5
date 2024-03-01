//add style to html



//add style to body
document.body.style.display = "flex";
document.body.style.width = "100%";
document.body.style.height = "100vh";
document.body.style.margin = "0px"

//add style chats
var chats = document.getElementById("chats");

chats.style.width = "30%";

chats.style.height = "100%";

chats.style.overflowY = "scroll";

//add style message container
var messagesContainer = document.getElementById("messagesContainer");
messagesContainer.style.width = "70%";
messagesContainer.style.height = "100%";


// add style message header

var messageHeader = document.getElementById("messageHeader");
messageHeader.style.minHeight = "10vh";
messageHeader.style.padding = "0.5rem"
messageHeader.style.display = "flex";
messageHeader.style.justifyContent="center";
messageHeader.style.alignItems="center";

messageHeader.style.boxShadow = "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px";


//text
var messageText = document.getElementById("messageText");
messageText.style.display = "flex";
messageText.style.justifyContent="center";
messageText.style.alignItems="center";

//textarea
var inputText = document.getElementById("inputText");
inputText.style.width="80%";
inputText.style.height="65%";
inputText.style.boxShadow = "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px";
inputText.style.border = "none";
inputText.style.outline = "none";
inputText.style.padding = "1rem";


//search

var inputText = document.getElementById("inputTextSearch");
inputText.style.width="80%";
inputText.style.height="65%";
inputText.style.border = "none";
inputText.style.outline = "none";
inputText.style.padding = "1rem";
inputText.style.background="#d1d1d1";



//button
var buttonSend = document.getElementById("buttonSend");
buttonSend.style.width = "10%";
buttonSend.style.height="65%";
buttonSend.style.marginLeft="1rem";
buttonSend.style.color="#fff";
buttonSend.style.background="#573b8a";
buttonSend.style.borderRadius="5px";
buttonSend.style.cursor="pointer";


//add style message panel



var messagePanel = document.getElementById("messagePanel");
messagePanel.style.height = "45vh";
messagePanel.style.padding="2rem";
messagePanel.style.overflowY="scroll";


var meessageText = document.getElementById("messageText");
messageText.style.height="25vh";






var imagesProfile = document.getElementsByClassName("profileImage");


for (var i = 0; i < imagesProfile.length; i++) {
    imagesProfile[i].style.width = "30%";
}



var titles = document.getElementsByTagName("h4");


for (var i = 0; i < titles.length; i++) {
    titles[i].style.marginBottom = "0px";
}