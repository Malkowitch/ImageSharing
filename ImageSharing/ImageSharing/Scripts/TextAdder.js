var text = $("#txtChat");
var input = $("#txtWindow");
var username = $("#userName");
var btnchat = $("#btnChat")

$(function () {
    var ws = new WebSocket("ws://localhost:44300/socket/");

    ws.onopen = function () {
        //ws.send("Hello");
    };
    ws.onerror = function (er) {
        console.log("Socket error: " + er);
    };
    ws.onmessage = function (e) {
        var data = JSON.parse(e.data);
        input.append("<div>[" + data.from + "] - " + data.message + "</div>");
    };


    btnchat.click(function () {
        if (text.val() == "") {

        }
        else {
            inputText();
        }
    });
    text.keydown(function (e) {
        if (e.keyCode == 13) {
            if (text.val() == "") {

            }
            else {
                inputText();
            }
        }
    });

    function inputText() {
        
        ws.send(JSON.stringify({
            from: username.val(),
            message: text.val()
        }));

        text.val("");
        input.animate({
            scrollTop: input[0].scrollHeight
        }, 2000);

    }
    function isEmpty(el) {
        return !$.trim(el.html());
    }
});