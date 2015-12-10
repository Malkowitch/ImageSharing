
var ws = new WebSocket("ws://localhost:44400/socket/");

ws.onopen = function () {
    //ws.send("Hello");
};
ws.onerror = function (er) {
    console.log("Socket error: " + er);
};
ws.onmessage = function (e) {
    var aBuf = e.data;
    var bytes = new Uint8Array(aBuf);
    var image = document.getElementById('loadedimg');
    image.src = encode(bytes);
    console.log("Bytes "+encode(bytes));
};
function encode(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    
    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}

if (window.FileReader) {
    addEventHandler(window, 'load', function () {
        //var drop = $('#dropzone');
        //var status = $('#status');
        //var img = $('#loadedimg');
        var drop = document.getElementById('dropzone');
        var status = document.getElementById('status');
        var img = document.getElementById('loadedimg');

        function cancel(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            return false;
        }

        addEventHandler(drop, 'dragover', cancel);
        addEventHandler(drop, 'dragenter', cancel);

        addEventHandler(drop, 'drop', function (e) {
            e = e || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            }

            var dt = e.dataTransfer;
            var files = dt.files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var reader = new FileReader();

                reader.readAsDataURL(file);

                addEventHandler(reader, 'loadend', function (e, file) {
                    var bin = this.result;
                    img.file = file;
                    img.src = bin;

                    ws.send(img);

                }.bindToEventHandler(file));
            }
            //var binary = Uint8Array(img.data.length);
            //for (var i = 0; i < img.data.length; i++) {
            //    binary[i] = img.data[i];
            //}
            return false;
        });
        Function.prototype.bindToEventHandler = function bindToEventHandler() {
            var handler = this;
            var boundparameters = Array.prototype.slice.call(arguments);
            return function (e) {
                e = e || window.event;
                boundparameters.unshift(e);
                handler.apply(this, boundparameters);
            }
        };
    });
}
else {
    //var status = $("status");
    status.innerHTML = "Your browser does not support this function."
}

function addEventHandler(obj, evt, handler) {
    if (obj.addEventListener) {
        //W3C method
        obj.addEventListener(evt, handler, false);
    }
    else if (obj.attachEvent) {
        //IE method
        obj.attachEvent('on' + evt, handler);
    }
    else {
        //Old school method
        obj['on' + evt] = handler;
    }
}