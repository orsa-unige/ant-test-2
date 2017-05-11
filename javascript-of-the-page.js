/// Retrieves the configuration file
/// Browsers still do not accept "require()"
var config = (function() {
    var cfg = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "./config.json",
        'dataType': "json",
        'success': function (d) {
            cfg = d;
        }
    });
    return cfg;
})();

/// Retrives form data
$("form").on("submit",function(event){ /// When the Send button is pressed...
    event.preventDefault();       /// Avoids the page to reload on click.
    var text=$("input").val()    /// No json for now :)
    ws.send(text)
});

/// No need to require(websocket) : browsers natively support it.
var ws = new WebSocket('ws://'+config.ws.ip+':'+config.ws.port, 'echo-protocol');

ws.addEventListener("message", function(e) {
    var obj=e.data
    $("output").append(e.data+'<br>')    
})



