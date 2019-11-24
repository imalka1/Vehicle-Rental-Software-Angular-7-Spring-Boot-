var webSoc = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port + $('#contextPath').val() + "/get_online_count");

// webSoc.onopen = function (ev) {
//     console.log("logged");
//     webSoc.send('');
// }
//
// webSoc.onclose = function (ev) {
//     console.log("closed");
//     webSoc.send('');
// }

webSoc.onmessage = function processMessage(message) {
    $('#onlineCount').html(JSON.parse(message.data))
}
