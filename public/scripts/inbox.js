// let messages = [
//     {
//         name : "lorem",
//         time : "23: 34",
//         email : "slafj@ saflj ",
//         message : "lorem ipsu sa klas dfklasd aslkj askdj asfdlkj s dlakj asdlkjsa lsakjf asld aflkj sflk alfdkja slkj askjf alj asl lkjajflka puwr slpweuwr n sfapwnl sa -wej aslf -we als"
//     },
//     {
//         name : "lorem",
//         time : "23: 34",
//         email : "slafj@ saflj ",
//         message : "lorem ipsu sa klas dfklasd aslkj askdj asfdlkj s dlakj asdlkjsa lsakjf asld aflkj sflk alfdkja slkj askjf alj asl lkjajflka puwr slpweuwr n sfapwnl sa -wej aslf -we als"
//     },
//     {
//         name : "lorem",
//         time : "23: 34",
//         email : "slafj@ saflj ",
//         message : "lorem ipsu sa klas dfklasd aslkj askdj asfdlkj s dlakj asdlkjsa lsakjf asld aflkj sflk alfdkja slkj askjf alj asl lkjajflka puwr slpweuwr n sfapwnl sa -wej aslf -we als"
//     },
//     {
//         name : "lorem",
//         time : "23: 34",
//         email : "slafj@ saflj ",
//         message : "lorem ipsu sa klas dfklasd aslkj askdj asfdlkj s dlakj asdlkjsa lsakjf asld aflkj sflk alfdkja slkj askjf alj asl lkjajflka puwr slpweuwr n sfapwnl sa -wej aslf -we als"
//     },
//     {
//         name : "lorem",
//         time : "23: 34",
//         email : "slafj@ saflj ",
//         message : "lorem ipsu sa klas dfklasd aslkj askdj asfdlkj s dlakj asdlkjsa lsakjf asld aflkj sflk alfdkja slkj askjf alj asl lkjajflka puwr slpweuwr n sfapwnl sa -wej aslf -we als"
//     },
// ]

if(localStorage.getItem("letter-box-userlogged") == "false"){
    location.href = "/"
}else{
    let messages = JSON.parse(localStorage.getItem("letter-box-inbox"));
console.log(messages)


function renderMessages(){
    if(messages == null){
        messages = [];
    }
    let messageContainer = document.querySelector("#messages");
    messages.forEach(msg => {
        let section = document.createElement("section");
        section.setAttribute("id", `${msg._id}`);
        let html = `
            <p class="time">${msg.updatedAt}</p>
            <p class="sender">${msg.name}</p>
            <p class="contact">${msg.email}</p>
            <p class="message">${msg.message}</p>
        `
        section.innerHTML = html;
        messageContainer.appendChild(section);
    })
}

renderMessages();

function logout(){
    localStorage.setItem("letter-box-userlogged","false");
    localStorage.removeItem("letter-box-inbox");
    window.location.href = "/"
}
}

