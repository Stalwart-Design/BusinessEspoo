$(document).ready(start);

function start() {

    // Define and read parameters
    let text_lockup, color_symbol, color_lockup, size, style;
    [text_lockup, color_symbol, color_lockup, size, style] = readParams();

    // Copy Share Link
    $('#share').click(function (e) {
        let dummy = document.createElement('input'),
            text = window.location.href;
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        $(this).text("Link copied to clipboard!");
        e.stopPropagation();
    });

    // Main Logo
    displayImage({
        displayElement: document.getElementById("bevs"),
        displayImage: createSVG({
            primaryText: "Visual Symbol",
            textStyle: 2,
            iconStyle: 1,
            color1: "#E6E8F2"
        }),
        displayHeight: 80,
        displayBackgroundColor: "transparent",
        displayLink: "index.html"
    });

    render_set(text_lockup, color_symbol, color_lockup, size, style);
}

// Read values from URL and clean them
function readParams() {
    let params = new URLSearchParams(document.location.search.substring(1));
    let text_lockup = params.get("text_lockup");
    // let secondary_text = params.get("secondary");
    let color_symbol = params.get("color_symbol");
    let color_lockup = params.get("color_lockup");
    let size = params.get("size");
    // let style = params.get("style");
    let json_return = params.get("json");
    // Check if JSON requested
    if (json_return && json_return === "true") {
        let response = `
        {   "primary": "${text_lockup}",
        }`;
        response = JSON.parse(response);
        $("html").html(response);
        console.log(response);
    } else {
        // Clean and Validate data
        color_symbol = color_symbol ? color_symbol : "#0114B3";
        color_lockup = color_lockup ? color_lockup : "";
        text_lockup = text_lockup ? text_lockup : "";
        size = size ? size : 200;
        let style = 0;
        // Fill form with data
        $('#text_lockup').val(text_lockup);
        $('#color_symbol').val(color_symbol);
        $('#color_lockup').val(color_lockup);
        $('#symbol_size').val(size);
        // $('input:radio[name="style"]').filter('[value=' + style + ']').prop('checked', true);
        // Return all values
        return [text_lockup, color_symbol, color_lockup, size, style];
    }
}

// Render all logos
function render_set(TextLockup = '', ColorSymbol = '#0114B3', ColorText = '#0114B3', Size = 500, style = 0) {

    // console.log([Text1, Text2, Color, Size, style]);
    let ColorBG = invertColor(ColorSymbol);

    const element_icon = document.getElementById("icon_area");
    element_icon.innerHTML = '';
    const element_symbol = document.getElementById("symbol_area");
    element_symbol.innerHTML = '';

    displayImage({
        displayElement: element_icon,
        displayImage: createSVG({
            size: Size,
            color1: ColorSymbol,
            iconStyle: 2,
            textStyle: 1
        }),
        displayBackgroundColor: ColorBG
    });

    //Lockups
    let height, width;
    [height, width] = canvasSize({
        textStyle: 1,
        size: Size,
        primaryText: TextLockup.toUpperCase()
    });

    if (width / height < 8) {
        if (TextLockup !== '') {
            displayImage({
                displayElement: element_symbol,
                displayImage: createSVG({
                    size: Size,
                    primaryText: TextLockup,
                    color1: ColorSymbol,
                    color2: ColorText,
                    textStyle: 2,
                    iconStyle: 1,
                }),
                displayBackgroundColor: ColorBG
            });
        }
        displayImage({
            displayElement: element_symbol,
            displayImage: createSVG({
                size: Size,
                primaryText: TextLockup,
                color1: ColorSymbol,
                color2: ColorText,
                textStyle: 1,
                iconStyle: 1,
            }),
            displayBackgroundColor: ColorBG
        });
    } else {
        displayImage({
            displayElement: element_symbol,
            displayImage: createSVG({
                size: Size,
                primaryText: TextLockup,
                color1: ColorSymbol,
                color2: ColorText,
                textStyle: 2,
                iconStyle: 1,
            }),
            displayBackgroundColor: ColorBG
        });
    }

}
