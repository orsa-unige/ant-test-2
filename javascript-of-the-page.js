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


/// Filling the example form with the parameters taken in the config file.
/// Look: there's nothing in the html tags!
$.each(config.form.example, function(name, val){
    $('[name="'+name+'"]')  /// Seleziono quello con l'attributo name uguale (num1)
    	.prop(val.prop)     /// Ci aggiungo le proprietà (in questo caso valore di default)
    	.attr(val.attr)     /// E gli attributi min, max, eccetera
     	.parent("label")    /// Seleziono l'elemento parente, che è la  label
    	.prepend(val.label)     /// Ci aggiungo il testo
     	.attr("title",val.title)  /// E l'attributo titolo. 
});


/// Retrives form data
$("form").on("submit",function(event){ /// When the Send button is pressed...
    event.preventDefault();       /// Avoids the page to reload on click.
    
    // /// Most simple implementation:
    //
    // var serialized_data = JSON.stringify(
    //   $("form").serializeArray()
    //	);
    //
    /// ...and I have something like:
    /// [{"name":"num1","value":"1"},{"name":"num2","value":"1.2"},{"name":"txt","value":"asd"}]
    
    /// ...but I compact it to avoid every time "name" and "value": {"num1":"1","num2":"1.2","txt":"asd"}
    
    var raw_form_data = {};

    $.each($('form').serializeArray(), function() {
	raw_form_data[this.name] = this.value; 
    });

    /// This javascript manages the actor "telescope observer".
    var whoami="telescope_observer";

    /// So let's find all its properties in the configuration file,
    /// and append it in the raw form data.
    raw_form_data.actor=config.actor.prop.find(function(o){return o.name==whoami});

    var serialized_form_data = JSON.stringify(raw_form_data);

    /// I put the serialized data into a tag to inspect the input sent
    /// to the ws server
    $("aside").text(serialized_form_data)    

    /// Then I send it to the ws server.     
    ws.send(serialized_form_data)
    
}); /// form on submit


/// Let's take some properties of the websocket server:I need the ip and the port
var wss = config.actor.prop.find(function(o){return o.name=="websocket_server"});

/// No need to require(websocket) : browsers natively support it.
var ws = new WebSocket('ws://'+wss.ip
		          +':'+wss.port, 'echo-protocol');

ws.addEventListener("message", function(e) {
    var obj=$.parseJSON(e.data)
    console.log(obj)
    $("div").prepend(JSON.stringify(obj)+'<br>')
});


