export function showNotification(msg = "Wait"){
    let div = document.createElement("div");
    div.setAttribute("id", "notification");
    let html = `
        <p>${msg}</p>
        <span>x</span>
    `
    div.innerHTML = html;
    document.body.appendChild(div);

}