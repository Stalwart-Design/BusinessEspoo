$(document).ready(start);

function start() {

    // Define and read parameters
    let text_lockup, color_symbol, color_lockup, size, style, isSecure;
    [text_lockup, color_symbol, color_lockup, size, style, isSecure] = readParams();

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
            primaryText: "Visual Symbol Generator",
            textStyle: 1,
            iconStyle: 1,
            color1: "#E6E8F2",
        }),
        displayHeight: 60,
        displayBackgroundColor: "transparent",
        displayLink: "index.html"
    });

    // Overlay logo
    displayImage({
        displayElement: document.getElementById("overlay-bevs"),
        displayImage: createSVG({
            primaryText: "Visual Symbol Generator",
            textStyle: 1,
            iconStyle: 1,
            color1: "#0114B3",
        }),
        displayHeight: 60,
        displayBackgroundColor: "transparent",
        displayLink: "index.html"
    });

    if (isSecure) {
        render_set(text_lockup, color_symbol, color_lockup, size, style);
    } else {
        let main_area = document.getElementById("main");
        main_area.innerHTML = ` `;
        let warning = document.createElement('p');
        warning.style = "padding-top: 80px";
        warning.innerHTML =
            ` <strong> ACCESS NOT GRANTED! </strong> 
                <br> Incorrect or missing SECRET KEY. <br> <br>
                The SECRET KEY is required to generate symbols. Contact Business Espoo Managemnet fot access.`;
        main_area.appendChild(warning);
    }

}

// Read values from URL and clean them
function readParams() {
    let params = new URLSearchParams(document.location.search.substring(1));
    let text_lockup = params.get("text_lockup");
    let color_symbol = params.get("color_symbol");
    let color_lockup = params.get("color_lockup");
    let size = params.get("size");
    let secret = params.get("secret");
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
        secret = secret ? secret : "";
        size = size ? size : 300;
        let style = 0;

        let passwordmd5 = "d1c24ffa194aa206286df139cbdf181b";
        let password = md5(secret) === passwordmd5;

        //replace unsupported characters
        text_lockup = text_lockup.replace(/&/g, 'and');
        text_lockup = text_lockup.replace(/</g, ' ');

        // Fill form with data
        $('#text_lockup').val(text_lockup);
        $('#color_symbol').val(color_symbol);
        $('#color_lockup').val(color_lockup);
        $('#symbol_size').val(size);
        $('#secret').val(secret);
        // Return all values
        return [text_lockup, color_symbol, color_lockup, size, style, password];
    }
}

// Render all logos
function render_set(TextLockup = '', ColorSymbol = '#0114B3', ColorText = '#0114B3', Size = 300) {

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
    if (TextLockup !== '') {

        displayImage({
            displayElement: element_symbol,
            displayImage: createSVG({
                size: Size,
                primaryText: TextLockup,
                color1: ColorSymbol,
                color2: ColorText,
                textStyle: 1,
                iconStyle: 1,
                displaySize: true
            }),
            displayBackgroundColor: ColorBG
        });

        let Twidth = getTextWidth(TextLockup, "bold 120px Metropolis");
        if (Twidth > 1500) {
            let fulltext = TextLockup;
            let TextLockupLine1 = fulltext.slice(0, fulltext.indexOf(' ', fulltext.length / 2));
            let TextLockupLine2 = fulltext.slice(fulltext.indexOf(' ', fulltext.length / 2));
            TextLockupLine2 = TextLockupLine2.substr(1);

            displayImage({
                displayElement: element_symbol,
                displayImage: createSVG({
                    size: Size,
                    primaryText: TextLockupLine1,
                    secondaryText: TextLockupLine2,
                    color1: ColorSymbol,
                    color2: ColorText,
                    textStyle: 1,
                    iconStyle: 1,
                    displaySize: true
                }),
                displayBackgroundColor: ColorBG
            });
        }

    } else {
        // Generate VS-only
        displayImage({
            displayElement: element_symbol,
            displayImage: createSVG({
                size: Size,
                primaryText: "",
                color1: ColorSymbol,
                color2: ColorText,
                textStyle: 1,
                iconStyle: 1,
                displaySize: true
            }),
            displayBackgroundColor: ColorBG
        });
    }
}
