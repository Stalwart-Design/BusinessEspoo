$(document).ready(start);

function start() {

    // Define and read parameters
    let primary_text, secondary_text, color, size, style;
    [primary_text, secondary_text, color, size, style] = readParams();

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
        displayElement: document.getElementById("logo"),
        displayImage: createSVG({primaryText: "Logo", secondaryText: "GENERATOR"}),
        displayWidth: 240,
        displayBackgroundColor: "#0114B3",
        displayLink: "index.html"
    });

    render_set(primary_text, secondary_text, color, size, style);
}

// Read values from URL and clean them
function readParams() {
    let params = new URLSearchParams(document.location.search.substring(1));
    let primary_text = params.get("primary");
    let secondary_text = params.get("secondary");
    let color = params.get("color");
    let size = params.get("size");
    let style = params.get("style");
    let json_return = params.get("json");
    // Check if JSON requested
    if (json_return && json_return === "true") {
        let response = `
        {   "primary": "${primary_text}",
            "secondary": "${secondary_text}"
        }`;
        response = JSON.parse(response);
        $("html").html(response);
        console.log(response);
    } else {
        // Clean and Validate data
        color = color ? color : "#6C2621";
        primary_text = primary_text ? primary_text.toLowerCase() === "solutions" ? "SOLUTIONS" : primary_text : "";
        secondary_text = secondary_text ? secondary_text.toUpperCase() : "";
        size = size ? size : 200;
        style = style ? style : 0;
        // Fill form with data
        $('#logo-text-1').val(primary_text);
        $('#logo-text-2').val(secondary_text);
        $('#logo-color').val(color);
        $('#logo-size').val(size);
        $('input:radio[name="style"]').filter('[value=' + style + ']').prop('checked', true);
        // Return all values
        return [primary_text, secondary_text, color, size, style];
    }
}

// Render all logos
function render_set(Text1 = '', Text2 = '', Color = '#6C2621', Size = 500, style = 0) {

    // console.log([Text1, Text2, Color, Size, style]);
    let Color2 = invertColor(Color);

    if (Text1 === '') {
        // Icons

        const element = document.getElementById("logos-1");
        element.innerHTML = '';

        displayImage({
            displayElement: element,
            displayImage: createSVG({size: Size, color1: Color, color2: Color2}),
            displayBackgroundColor: Color2
        });
        displayImage({
            displayElement: element,
            displayImage: createSVG({size: Size, color1: Color, color2: Color2, opacity: 0}),
            displayBackgroundColor: Color2
        });


    } else {
        //Logos

        if (style == 0 || style == 1) {

            let height, width;
            [height, width] = canvasSize({
                textStyle: 1,
                size: Size,
                primaryText: Text1,
                secondaryText: Text2
            });
            const element = document.getElementById("logos-1");
            element.innerHTML = '';

            if (width / height > 7) {
                element.innerText = "Too wide to look good. The width should be less than " + height*7 + " px.";
            } else {
                displayImage({
                    displayElement: element,
                    displayImage: createSVG({
                        size: Size,
                        primaryText: Text1,
                        secondaryText: Text2,
                        color1: Color,
                        color2: Color2,
                        textStyle: 1
                    }),
                    displayBackgroundColor: Color2
                });

                displayImage({
                    displayElement: element,
                    displayImage: createSVG({
                        size: Size,
                        primaryText: Text1,
                        secondaryText: Text2,
                        color1: Color2,
                        color2: Color,
                        textStyle: 1,
                        iconStyle: 2
                    }),
                    displayBackgroundColor: Color
                });
            }
        }
        if (Text1 !== '' && Text2 !== '') {
            if (style == 0 || style == 2) {
                const element = document.getElementById("logos-2");
                element.innerHTML = '';
                displayImage({
                    displayElement: element,
                    displayImage: createSVG({
                        size: Size,
                        primaryText: Text1,
                        secondaryText: Text2,
                        color1: Color,
                        color2: Color2,
                        textStyle: 2
                    }),
                    displayBackgroundColor: Color2
                });

                displayImage({
                    displayElement: element,
                    displayImage: createSVG({
                        size: Size,
                        primaryText: Text1,
                        secondaryText: Text2,
                        color1: Color2,
                        color2: Color,
                        textStyle: 2,
                        iconStyle: 2
                    }),
                    displayBackgroundColor: Color
                });
            }
        }
        if (style == 0 || style == 3) {
            const element = document.getElementById("logos-3");
            element.innerHTML = '';
            displayImage({
                displayElement: element,
                displayImage: createSVG({
                    size: Size,
                    primaryText: Text1,
                    secondaryText: Text2,
                    color1: Color,
                    color2: Color2,
                    textStyle: 3
                }),
                displayBackgroundColor: Color2
            });

            displayImage({
                displayElement: element,
                displayImage: createSVG({
                    size: Size,
                    primaryText: Text1,
                    secondaryText: Text2,
                    color1: Color2,
                    color2: Color,
                    textStyle: 3,
                    iconStyle: 2
                }),
                displayBackgroundColor: Color
            });
        }
    }

}
