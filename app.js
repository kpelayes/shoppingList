(function(){
	var pubnub = PUBNUB.init({publish_key:'pub-c-edf239fa-8197-4ec8-98a0-ce74f0a511e5',subscribe_key:'sub-c-faeec412-ee1d-11e6-b325-02ee2ddab7fe',ssl:true});
	var strSel= document.getElementById("category").value;
	var  input = PUBNUB.$('input'), channel = 'Demo Project';
	
	pubnub.subscribe({
		channel  : channel,
		callback : function(m) { 
			var box=PUBNUB.$(m.category);
			var node = document.createElement("LI");
			var checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.name = m.input;
			checkbox.value = m.input;
			checkbox.onclick;
			node.appendChild(checkbox);
			var text = document.createTextNode(' '+m.input+'  ');
			node.appendChild(text);   
			box.appendChild(node);}
	});
	pubnub.history(
    {
		//for now, only gathers 9 most recent items
        channel : channel, reverse: false, count: 9,
		callback: function(messages) {
			messages[0].forEach(function(m){ 
				var box=PUBNUB.$(m.category);
				var node = document.createElement("LI");
				var checkbox = document.createElement("input");
				checkbox.type = "checkbox";
				checkbox.name = m.input;
				checkbox.value = m.input;
				checkbox.onclick;
				node.appendChild(checkbox);
				var text = document.createTextNode(' '+m.input+'  ');
				node.appendChild(text);   
				box.appendChild(node);})}
	});

	PUBNUB.bind( 'keyup', input, function(e) {
		(e.keyCode || e.charCode) === 13 && pubnub.publish({
			channel : channel, message : {input: input.value, category: document.getElementById("category").value}, storeInHistory: true, x : (input.value='')
		})
	} )
	})()