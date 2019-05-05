function Car()
{
    picnic.controller.call(this);

    this.elements = ['type', 'button'];
    this.attributes = ['actualColor'];
}

$.extend(Car.prototype, picnic.controller.prototype,
{
    availableColors: ['red', 'green', 'blue', 'yellow', 'cyan', 'pink', 'black'],

    init: function()
    {
        this.updateColor(this.attributes.actualColor);
    },

    bindEvents: function ()
    {
        this.on('click', this.elements.button, this.changeColor);
    },

    updateColor: function (color)
    {
        this.elements.type.css('color', color);
    },

    updateType: function (type)
    {
        this.elements.type.html(type);
    },

    changeColor: function ()
    {
        var index = Math.floor(Math.random() * this.availableColors.length);
        var color = this.availableColors[index];

        this.updateColor(color);
    }
});
