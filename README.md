
# Picnic

Picnic is a small and easy to use JavaScript framework.

How does it work? 

```html
<div id="car" data-controller="car" data-color="red">
	<div data-element="name"></div> 
	<button data-element="colorButton">Change color</button>
</div>
```

Controller:

```js
function Car()  
{  
	picnic.controller.call(this);  
  
	this.elements = ['name', 'colorButton'];  
	this.attributes = ['color'];  
}  
  
$.extend(Car.prototype, picnic.controller.prototype,  
{    
	init: function()  
	{
	},
  
	bindEvents: function ()  
	{
		this.on('click', this.elements.colorButton, this.changeColor);
		
		//delay
		//this.on('click', this.elements.colorButton, [this.changeColor, 100]);
		
		//propagate default event
                //this.on('click', this.elements.colorButton, this.changeColor, true);
	},
  
	setName: function (name)  
	{
		this.elements.name.html(name);
	},
  
	changeColor: function ()  
	{
		this.elements.name.css('color', color);
	}
});
```
Start Picnic:
```js
$(document).ready(function () {  
  
	picnic.start();  
  
	//access controller
	$('#car').getController().setName('Audi Q8');  
});
```

## Plugins

```html
<button data-plugin="clicked">Change color</button>
```

Available plugins:
* clicked
* dropdown
* form-submit-button
* lazy-load
* scroll-to
* sticky
* tabs
* title-bubble
* tooltip

## Other components

```js
//locale
picnic.locale.messages = {
	'hotel': ['{n} hotel', '{n} hotely', '{n} hotelov'],
	'text': 'Hello {name}'
};
picnic.locale.t('text', {name: 'picnic'});
picnic.locale.t('hotel', 5);
picnic.locale.t('hotel', {n: 5});

//router
picnic.router.rules = {
	'url': '/admin/url'
};
picnic.router.getUrl('url');

//url
picnic.url.queryStringToJson();

//scrollbar
picnic.scrollbar.disable();
picnic.scrollbar.enable();

//backdrop
picnic.backdrop.open();
picnic.backdrop.close();

//events
picnic.event.on('picnic.event.test', function(event, params) { } );
picnic.event.trigger('picnic.event.test', {name: 'value'});

picnic.event.on('picnic.event.test', $('#target'), function(event, params) { } );
picnic.event.trigger('picnic.event.test', $('#target'), {name: 'value'});

//utils
$('body').findElement('elementName');
$('body').findController('controllerName');
$('body').findController('controllerName').initController();
$('body').findController('controllerName').getController();
$('body').findController('controllerName').getController().refresh();
picnic.initControllers();
```