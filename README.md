
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
        this.on('click', colorButton, this.changeColor);  
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