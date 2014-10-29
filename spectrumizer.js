var spectrumizer = (function($){
    
    var svgSelector;
    
    // Set height of SVG Container
    function setSvgSize(){
        var width = document.getElementById('svg-container').offsetWidth;
        var x = parseInt( $(svgSelector).attr('width') );
        var y = parseInt( $(svgSelector).attr('height') );
        var height = (width / x) * y;
        $('#svg-container').css('height',height);
    }
    
    // Change color of input
    function initChromo(){
        chromoOptions = {
            eventPrefix: 'j',
            resizable: false,
            ringwidth: 10,
            panel: true,
            panelMode: 'hex',
            panelModes: [],
            preview: false,
            update: function(){
                changeInputColor(this);
                changeSvgColor(this);
            }
        }
        $('.color-select').chromoselector(chromoOptions);
    }
    
    // Get elements within SVG
    function findSvgElements(){
        return $(svgSelector).find('*');
    }
    
    // Get colors of SVG and assign classes
    function findSvgColors(elements){
        colors = [];
        elements.each(function(svgSelector){
            if ($(this).attr('fill')){
                var color = $(this).attr('fill');
                var colorPos = $.inArray(color,colors );
                if (colorPos === -1) {
                    colors.push(color);
                    colorPos = colors.length
                } else {
                    colorPos++;
                }
                $(this).attr('class', 'color' + colorPos);
            }
        });
    }
    
    // Sets the default color of the color selectors 
    // Custom option names should be 'color1', 'color2', etc...
    function setInitialSelectors(){
        for (i=0;i <= colors.length -1;i++){
            var color = colors[i];
            var index = i+1;
            selector = "input[data-target='color" + index + "']";
            $(selector).chromoselector('setColor', color);
            changeInputColor($(selector));
        }
    }
    
    // Change color of input
    function changeInputColor(caller) {
        var inputColor = $(caller).chromoselector('getColor').getHexString();
        $(caller).css({
            'background-color': inputColor,
            'color': inputColor
        });
    }
    
    function changeSvgColor(caller){
        var target = '.' + $(caller).attr('data-target');
        var value = $(caller).val();
        $(target).attr('fill',value);
    }
    
    
    return{
       productPage: function(config){
            svgSelector = config.svgSelector       || 'svg';
            setSvgSize();
            initChromo();
            var elements = findSvgElements();
            findSvgColors(elements);
            setInitialSelectors();
        }
    }
})(jQuery);