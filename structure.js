

let chatsArray = [];
var chats = document.createElement("div");
chats.id = "chats";



var messagesContainer = document.createElement("div");
messagesContainer.id = "messagesContainer";


var messageHeader = document.createElement("div");
messageHeader.id = "messageHeader";

var messagePanel = document.createElement("div");
messagePanel.id = "messagePanel";

var messageText = document.createElement("div");
messageText.id = "messageText";

var inputText = document.createElement("textarea");
inputText.id = "inputText";


var buttonSend = document.createElement("button");
buttonSend.id = "buttonSend";
buttonSend.textContent = "Enviar";





buttonSend.addEventListener("click", function() {
    let text = document.getElementById("inputText");
    if(text.value){
        
        saveMessage(text.value);
        text.value = "";
    }else{
        alert("debes llenar tu mensaje");
    }
});



messageText.appendChild(inputText);
messageText.appendChild(buttonSend);



var inputTextSearch = document.createElement("input");
inputTextSearch.id = "inputTextSearch";
inputTextSearch.placeholder = "Busca algo ..."


messageHeader.appendChild(inputTextSearch);

inputTextSearch.addEventListener('input', function(e) {
    const textoBusqueda = e.target.value;

    if(textoBusqueda){
        const chatsFiltrados = filtrarChats(textoBusqueda);

        chatsArray = chatsFiltrados;
        messagePanel.innerHTML = "";
        setMessagetoPanel();
    }else{
        getMessage();
    }
    
});


messagesContainer.appendChild(messageHeader);

messagesContainer.appendChild(messagePanel);


messagesContainer.appendChild(messageText);



document.body.appendChild(chats);

document.body.appendChild(messagesContainer);





function addChats(id,name, url){
    
    var chatContainer = document.createElement("div");

    chatContainer.id = name+id;

    chatContainer.className = "chatList";

    chatContainer.style.boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px";
    chatContainer.style.margin = "1rem";
    chatContainer.style.padding = "1rem";
    chatContainer.style.cursor = "pointer";
    chatContainer.style.display = "flex";

    var image = document.createElement("div");

    var imagesrc = document.createElement("img");
    imagesrc.src = url;
    imagesrc.width = "75";


    image.appendChild(imagesrc);

    image.className = "profileImage";
    
    var chat = document.createElement("div");

    chat.innerHTML = "<h4>"+name+"</h4>";

    chatContainer.append(image);
    chatContainer.append(chat);

    chatContainer.addEventListener('click', function() {
        setHeader(id, name, url)
    });

    chats.append(chatContainer);

}



function setHeader(id,name, url){

    messageHeader.innerHTML = "";

    var image = document.createElement("div");

    var imagesrc = document.createElement("img");
    imagesrc.src = url;
    imagesrc.width = "75";


    image.appendChild(imagesrc);

    image.className = "profileImage";


    var chat = document.createElement("div");
    chat.id = "headerTitle"

    chat.style.marginLeft = "2rem";

    chat.innerHTML = "<h1>"+name+"</h1>";

    messageHeader.append(image);
    messageHeader.append(chat);
}


function setMessage(name, message){
    

    var chatMessage = document.createElement("div");
    chatMessage.style.width="100%";
    chatMessage.style.display = "flex";


    var imagesrc = document.createElement("img");
    imagesrc.src = "assets/profile.png";
    imagesrc.style.width = "5%";
    imagesrc.style.height = "30px";
    imagesrc.style.marginRight="0.5rem";
    chatMessage.appendChild(imagesrc);

    var chatText = document.createElement("div");
    chatText.style.boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px";
    
    var chatTextname = document.createElement("span");
    chatTextname.textContent = name;
    chatTextname.style.color = "#573b8a";
    chatTextname.style.fontSize ="16px";
    chatTextname.style.fontWeight="bolder";

    chatText.appendChild(chatTextname);
    chatText.style.width="90%";
    chatText.style.padding="1rem";

    var chatSpace = document.createElement("br");
    chatText.appendChild(chatSpace);

    var chatTextmessage = document.createElement("div");
    chatTextmessage.innerHTML = message;
    
    chatText.appendChild(chatTextmessage);
    
    chatMessage.appendChild(chatText);
    

    chatMessage.style.display="flex";
    chatMessage.style.alignItems="center";

    chatMessage.style.marginBottom="1rem";

    messagePanel.appendChild(chatMessage);
    messagePanel.scrollTop = messagePanel.scrollHeight;

}

function validarURL(str) {
    const patron = new RegExp("^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$");
    return patron.test(str);
}
function crearVistaPreviaDeImagenes(texto) {
    // Expresión regular para detectar posibles URLs en el texto
    const regexUrl = /https?:\/\/\S+\.(jpg|jpeg|png|gif)/gi;
    const regexGeneralUrl = /https?:\/\/\S+/gi;
    let nuevoTexto = texto;

    // Primero, manejar las imágenes
    let coincidenciasImagen;
    while ((coincidenciasImagen = regexUrl.exec(texto)) !== null) {
        const urlImagen = coincidenciasImagen[0];
        if (validarURL(urlImagen)) {
            const imgTag = `<br><img src="${urlImagen}" style="max-width: 200px; max-height: 200px;" />`;
            const linkTag = `<a href="${urlImagen}" target="_blank">${imgTag}</a>`;
            nuevoTexto = nuevoTexto.replace(urlImagen, linkTag);
        }
    }

    // Luego, manejar URLs generales que no son imágenes
    let coincidenciasGeneral;
    while ((coincidenciasGeneral = regexGeneralUrl.exec(texto)) !== null) {
        const urlGeneral = coincidenciasGeneral[0];
        // Asegurarse de no duplicar el trabajo para las URLs de imágenes ya manejadas
        if (!urlGeneral.match(/\.(jpg|jpeg|png|gif)$/i) && validarURL(urlGeneral)) {
            // Aquí podrías agregar la lógica para crear una vista previa más elaborada
            const linkTag = `<p><a href="${urlGeneral}" target="_blank">${urlGeneral}</a></p>`;
            nuevoTexto = nuevoTexto.replace(urlGeneral, linkTag);
            
        }
    }

    return nuevoTexto;
}

async function getMessage() {
    messagePanel.innerHTML = "";
    try {
        // Esperar de manera asíncrona la respuesta de fetch
        const response = await fetch('http://uwu-guate.site:3000/messages');
        if (!response.ok) {
            throw new Error('La petición ha fallado: ' + response.statusText);
        }
        // Esperar de manera asíncrona la conversión de la respuesta a JSON
        const data = await response.json();
        chatsArray = data;
        chatsArray = chatsArray.map(chat => {
            if(chat.content.length>500){
                chat.content = "mensaje fuera de rango";
            }
            return chat;
        });

        const nombresUnicos = Array.from(new Set(chatsArray.map(mensaje => mensaje.username)));

        chats.innerHTML = "";
        for (const nombre of nombresUnicos) {

            addChats(i,nombre,"assets/profile.png");

        }
        setMessagetoPanel();

        
    } catch (error) {
        console.error('Ha ocurrido un error:', error);
    }
}
setInterval(getMessage,10000)

function setMessagetoPanel(){

    for (const objeto of chatsArray) {
        let messageNew = crearVistaPreviaDeImagenes(objeto.content);
        setMessage(objeto.username, messageNew);
    }
}


function filtrarChats(busqueda) {
    return chatsArray.filter(chat => chat.content.toLowerCase().includes(busqueda.toLowerCase()));
}


getMessage();




function saveMessage(message) {

    const data = {
        username: "Davis",
        message: message
    }

    fetch('http://uwu-guate.site:3000/messages', {
        method: 'POST', // Método HTTP para la petición
        headers: {
            'Content-Type': 'application/json', // Indica que el contenido enviado es JSON
        },
        body: JSON.stringify(data), // Convierte el objeto data a una cadena JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La petición ha fallado: ' + response.statusText);
        }
        return response.json(); // Convierte la respuesta a JSON
    })
    .then(respuesta => {
        getMessage();
    })
    .catch(error => {
        console.error('Error en la petición:', error); // Maneja un posible error
    });
}


