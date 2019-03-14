function createSVG({
                       size = 300,
                       color1 = "#ffffff",
                       color2 = "#000000",
                       primaryText = "",
                       secondaryText = "",
                       opacity = 0.5,
                       textStyle = 1,
                       iconStyle = 1
                   }) {

    let height, width;
    [height, width] = canvasSize({
        textStyle: textStyle,
        size: size,
        primaryText: primaryText,
        secondaryText: secondaryText
    });

    let svg_icon = iconSVG({size: size, color1: color1, color2: color2, opacity: opacity, iconStyle: iconStyle});

    let svg_text = textSVG({
        textStyle: textStyle,
        height: height,
        width: width,
        size: size,
        color: color1,
        primaryText: primaryText,
        secondaryText: secondaryText
    });

    let svg_string = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml">`
        + svg_icon + svg_text + `</div></foreignObject></svg>`;
    return {svg: svg_string, height: height, width: width};
}

// Display downloadable image on page
function displayImage({
                          displayElement = "",
                          displayImage = {svg: "", height: 0, width: 0},
                          displayBackgroundColor = "#000000",
                          displayHeight = 100,
                          displayWidth = 250,
                          displayLink = ""
                      }) {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = displayImage.height;
    canvas.width = displayImage.width;

    const tempImg = document.createElement('img');
    tempImg.addEventListener('load', onTempImageLoad);
    tempImg.src = 'data:image/svg+xml,' + encodeURIComponent(displayImage.svg);

    const linkImg = document.createElement('a');
    if (displayLink !== "") {
        linkImg.href = displayLink;
    } else {
        linkImg.download = 'FA Logo';
    }
    displayElement.appendChild(linkImg);

    const targetImg = document.createElement('img');
    targetImg.style = "max-height: " + displayHeight + "; max-width: " + displayWidth + "; padding: 10px; margin: 5px 10px 0 0; border-radius: 5px; background-color:" + displayBackgroundColor + ";";
    linkImg.appendChild(targetImg);

    function onTempImageLoad(e) {
        ctx.drawImage(e.target, 0, 0);
        targetImg.src = canvas.toDataURL();
        if (displayLink === "") {
            linkImg.href = canvas.toDataURL();
        }
    }
}

// Size of canvas with icon and text
function canvasSize({
                        textStyle = 0,
                        size = 300,
                        primaryText = "",
                        secondaryText = ""
                    }) {
    let scale = size / 300;
    let scaledWidth = 890;
    let scaledHeight = 300;

    switch (textStyle) {
        case 1:
            scaledWidth += getTextWidth(primaryText, "bold 225px Metropolis") + getTextWidth(secondaryText, "48px Metropolis");
            scaledHeight = 300;
            if (primaryText && secondaryText) {
                scaledWidth += 40;
            } else if (primaryText === '') {
                scaledWidth = 800;
            }
            if (scaledWidth < 900) {
                scaledWidth = 800;
            }
            break;
        case 2:
            scaledWidth += Math.max(getTextWidth(primaryText, "bold 30px Metropolis"), getTextWidth(secondaryText, "22px Metropolis"));
            if (scaledWidth < 115) {
                scaledWidth = 100;
            }
            break;
        case 3:
            scaledWidth = Math.max(getTextWidth(primaryText, "bold 150px Metropolis"), getTextWidth(secondaryText, "22px Metropolis"));
            if (scaledWidth < 800) {
                scaledWidth = 800;
            }
            if (secondaryText === '') {
                scaledHeight = 480;
            } else {
                scaledHeight = 500;
            }
            break;
        default:
            scaledWidth = 800;
            scaledHeight = 300;
    }

    let width = Math.round(scaledWidth * scale);
    let height = Math.round(scaledHeight * scale);
    if (width % 2 !== 0) {
        width += 1;
    }
    if (height % 2 !== 0) {
        height += 1;
    }

    switch (textStyle) {
        case 1:
            let dimension_1 = document.getElementById('dimensions-1');
            dimension_1.textContent = "(Size: " + height + "x" + width + ")";
            break;
        case 2:
            let dimension_2 = document.getElementById('dimensions-2');
            dimension_2.textContent = "(Size: " + height + "x" + width + ")";
            break;
        case 3:
            let dimension_3 = document.getElementById('dimensions-3');
            dimension_3.textContent = "(Size: " + height + "x" + width + ")";
            break;
    }

    return [height, width]
}

// Return text SVG
function textSVG({
                     textStyle = 0,
                     height = 100,
                     width = 100,
                     size = 100,
                     color = "#ffffff",
                     primaryText = "",
                     secondaryText = ""
                 }) {
    switch (textStyle) {
        case 1: let textWidth = width - height * 2.7;
            return '<svg height="' + height + '"  width="' + textWidth + '" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
                '<style>' +
                '    .logo-type-primary {' +
                '        font: 500 ' + size * 0.75 + 'px Metropolis;' +
                '        fill: ' + color + ';' +
                '    }' +
                '    .logo-type-secondary {' +
                '        font: ' + size * 0.48 + 'px Metropolis;' +
                '        fill: ' + color + ';' +
                '    }' +
                '</style>' +
                '    <text  x="' + size * 0.3  + '" y="' + size + '" class="logo-type-primary" >' + primaryText + '<tspan class="logo-type-secondary">' + ' ' + secondaryText + '</tspan></text>' +
                '</svg>';

        case 2:
            return '<svg height="' + height + '"  width="' + (width - size) + '" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
                '<style>' +
                '    .logo-type-primary {' +
                '        font: bold ' + size * 0.3 + 'px Metropolis;' +
                '        fill: ' + color + ';' +
                '    }' +
                '    .logo-type-secondary {' +
                '        font: ' + size * 0.22 + 'px Metropolis;' +
                '        fill: ' + color + ';' +
                '    }' +
                '</style>' +
                '    <text x="' + size * 0.14 + '" y="' + size * 0.48 + '" class="logo-type-primary" >' + primaryText + '</text>' +
                '    <text x="' + size * 0.14 + '" y="' + size * 0.74 + '" class="logo-type-secondary" >' + secondaryText + '</text>' +
                '</svg>';

        case 3:

            return '<svg height="' + height + '"  width="' + width + '" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
                '<style>' +
                '    .logo-type-primary {' +
                '        font: 500 ' + size * 0.5 + 'px Metropolis;' +
                '        fill: ' + color + ';' +
                '    }' +
                '    .logo-type-secondary {' +
                '        font: ' + size * 0.22 + 'px Metropolis;' +
                '        fill: ' + color + ';' +
                '    }' +
                '</style>' +
                '    <text x="-10px" y="' + size * 0.5 + '" class="logo-type-primary" >' + primaryText + '</text>' +
                '    <text  x="0" y="' + size * 0.56 + '" class="logo-type-secondary" >' + secondaryText + '</text>' +
                '</svg>';
    }
}

// Return icon SVG
function iconSVG({
                     size = 100,
                     color1 = "#ffffff",
                     color2 = "#000000",
                     opacity = 0.5,
                     iconStyle = 1
                 }) {

    let svg_logo_opaque = `<svg width="${size}" height="${size}" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g id="FA-Icon">
                   <path d="M50,3.55271368e-15 C100,3.55271368e-15 100,3.55271368e-15 100,50 C100,100 100,100 50,100 C4.61852778e-14,100 4.61852778e-14,100 4.61852778e-14,50 C4.61852778e-14,3.55271368e-15 4.61852778e-14,3.55271368e-15 50,3.55271368e-15 Z" id="BG" fill="${color1}"></path>
                   <g id="FA" fill="${color2}">
                       <polygon id="Ar" points="56 26 70 26 86 74 72 74"></polygon>
                       <polygon id="Al" points="40 74 52 74 60 50 54 32" opacity="${opacity}"></polygon>
                       <polygon id="F" points="14 26 14 74 28 74 28 58 39.34 58 42.66 48 28 48 28 38 46 38 50 26"></polygon>
                   </g>
                </g>
                </svg>`;

    let be_svg_logo = `
<svg width="${size * 2.6667}" height="${size}" viewBox="0 0 80 30" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g id="BE-VIS-Guidelines" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="02-Symbol-8" fill="${color1}">
                <path d="M0,11.0109705 L0,0.189029536 L5.73711546,0.189029536 C7.76667998,0.189029536 9.17299241,1.33895921 9.17299241,2.91420534 C9.17299241,3.98537271 8.6136636,4.85175809 7.65481422,5.32433193 C8.91729924,5.87566807 9.66839792,6.89957806 9.66839792,8.08101266 C9.66839792,9.8137834 8.11825809,11.0109705 5.94486616,11.0109705 L0,11.0109705 Z M2.71673991,4.47369902 L5.06592089,4.47369902 C5.81701958,4.47369902 6.36036756,4.04838256 6.36036756,3.46554149 C6.36036756,2.88270042 5.81701958,2.47313643 5.06592089,2.47313643 L2.71673991,2.47313643 L2.71673991,4.47369902 Z M2.71673991,8.72686357 L5.48142229,8.72686357 C6.28046344,8.72686357 6.85577307,8.27004219 6.85577307,7.63994374 C6.85577307,7.00984529 6.28046344,6.55302391 5.48142229,6.55302391 L2.71673991,6.55302391 L2.71673991,8.72686357 Z M16.252497,11.2 C13.2640831,11.2 11.1546145,9.16793249 11.1546145,6.26947961 L11.1546145,0.189029536 L13.8873352,0.189029536 L13.8873352,6.14345992 C13.8873352,7.67144866 14.8781462,8.7583685 16.252497,8.7583685 C17.6428286,8.7583685 18.6336396,7.67144866 18.6336396,6.14345992 L18.6336396,0.189029536 L21.3503795,0.189029536 L21.3503795,6.26947961 C21.3503795,9.16793249 19.2568917,11.2 16.252497,11.2 Z M27.6148622,11.2 C25.6652018,11.2 23.8913304,10.5699015 22.5649221,9.38846695 L24.0990811,7.5769339 C25.1697962,8.44331927 26.368358,8.94739803 27.7107471,8.94739803 C28.7335198,8.94739803 29.2608869,8.53783404 29.2608869,7.95499297 C29.2608869,7.30914205 28.7495006,7.1673699 27.1514183,6.78931083 C24.8022373,6.26947961 23.0603276,5.63938115 23.0603276,3.46554149 C23.0603276,1.3862166 24.7542948,0 27.2632841,0 C29.1010787,0 30.5393528,0.519831224 31.7059529,1.48073136 L30.3156213,3.40253165 C29.3088294,2.6464135 28.2061526,2.25260197 27.1833799,2.25260197 C26.3044347,2.25260197 25.8090292,2.66216596 25.8090292,3.19774965 C25.8090292,3.85935302 26.3363963,4.07988748 27.9664403,4.42644163 C30.427487,4.94627286 32.0095885,5.63938115 32.0095885,7.67144866 C32.0095885,9.84528833 30.3316021,11.2 27.6148622,11.2 Z M33.59169,11.0109705 L33.59169,0.189029536 L36.3244107,0.189029536 L36.3244107,11.0109705 L33.59169,11.0109705 Z M38.4498602,11.0109705 L38.4498602,0.189029536 L41.1825809,0.189029536 L45.960847,6.58452883 L45.960847,0.189029536 L48.6935677,0.189029536 L48.6935677,11.0109705 L45.960847,11.0109705 L41.1825809,4.61547117 L41.1825809,11.0109705 L38.4498602,11.0109705 Z M59.4326808,2.59915612 L53.5197763,2.59915612 L53.5197763,4.28466948 L58.8893328,4.28466948 L58.8893328,6.69479606 L53.5197763,6.69479606 L53.5197763,8.60084388 L59.4326808,8.60084388 L59.4326808,11.0109705 L50.7870555,11.0109705 L50.7870555,0.189029536 L59.4326808,0.189029536 L59.4326808,2.59915612 Z M65.3935278,11.2 C63.4438674,11.2 61.669996,10.5699015 60.3435877,9.38846695 L61.8777467,7.5769339 C62.9484618,8.44331927 64.1470236,8.94739803 65.4894127,8.94739803 C66.5121854,8.94739803 67.0395525,8.53783404 67.0395525,7.95499297 C67.0395525,7.30914205 66.5281662,7.1673699 64.9300839,6.78931083 C62.5809029,6.26947961 60.8389932,5.63938115 60.8389932,3.46554149 C60.8389932,1.3862166 62.5329604,0 65.0419497,0 C66.8797443,0 68.3180184,0.519831224 69.4846185,1.48073136 L68.0942869,3.40253165 C67.087495,2.6464135 65.9848182,2.25260197 64.9620455,2.25260197 C64.0831003,2.25260197 63.5876948,2.66216596 63.5876948,3.19774965 C63.5876948,3.85935302 64.1150619,4.07988748 65.7451059,4.42644163 C68.2061526,4.94627286 69.7882541,5.63938115 69.7882541,7.67144866 C69.7882541,9.84528833 68.1102677,11.2 65.3935278,11.2 Z M75.6052737,11.2 C73.6556133,11.2 71.8817419,10.5699015 70.5553336,9.38846695 L72.0894926,7.5769339 C73.1602078,8.44331927 74.3587695,8.94739803 75.7011586,8.94739803 C76.7239313,8.94739803 77.2512984,8.53783404 77.2512984,7.95499297 C77.2512984,7.30914205 76.7399121,7.1673699 75.1418298,6.78931083 C72.7926488,6.26947961 71.0507391,5.63938115 71.0507391,3.46554149 C71.0507391,1.3862166 72.7447064,0 75.2536956,0 C77.0914902,0 78.5297643,0.519831224 79.6963644,1.48073136 L78.3060328,3.40253165 C77.2992409,2.6464135 76.1965641,2.25260197 75.1737915,2.25260197 C74.2948462,2.25260197 73.7994407,2.66216596 73.7994407,3.19774965 C73.7994407,3.85935302 74.3268078,4.07988748 75.9568518,4.42644163 C78.4178985,4.94627286 80,5.63938115 80,7.67144866 C80,9.84528833 78.3220136,11.2 75.6052737,11.2 Z M12.4361872,18.1631505 L4.36278539,18.1631505 L4.36278539,19.8959212 L11.7165525,19.8959212 L11.7165525,23.7890295 L4.36278539,23.7890295 L4.36278539,25.8368495 L12.4361872,25.8368495 L12.4361872,29.7299578 L0,29.7299578 L0,14.2700422 L12.4361872,14.2700422 L12.4361872,18.1631505 Z M21.1482557,30 C18.3596712,30 15.7285068,29.1223629 13.772,27.3895921 L16.2007671,24.4866385 C17.774968,25.7243319 19.4841005,26.3769339 21.3056758,26.3769339 C22.4975708,26.3769339 23.1272511,25.9718706 23.1272511,25.2967651 C23.1272511,24.5541491 22.5875251,24.4416315 20.4511096,23.9465541 C17.1003105,23.1814346 14.5141233,22.3037975 14.5141233,19.0857947 C14.5141233,16.0028129 16.9428904,14 20.6085297,14 C23.2846712,14 25.3761096,14.7201125 27.085242,16.092827 L24.9038493,19.1758087 C23.4645799,18.140647 21.890379,17.6230661 20.4960868,17.6230661 C19.4391233,17.6230661 18.9218858,18.0506329 18.9218858,18.6357243 C18.9218858,19.4233474 19.4616119,19.6708861 21.6654932,20.1434599 C25.2636667,20.9085795 27.5125251,21.8762307 27.5125251,24.8241913 C27.5125251,28.0872011 25.0162922,30 21.1482557,30 Z M29.767694,29.7299578 L29.767694,14.2700422 L37.1664383,14.2700422 C40.6296803,14.2700422 43.080936,16.4978903 43.080936,19.6708861 C43.080936,22.8438819 40.6296803,25.07173 37.1664383,25.07173 L34.1304794,25.07173 L34.1304794,29.7299578 L29.767694,29.7299578 Z M34.1304796,21.1111111 L36.8066212,21.1111111 C37.841096,21.1111111 38.5832193,20.5035162 38.5832193,19.6708861 C38.5832193,18.838256 37.841096,18.230661 36.8066212,18.230661 L34.1304796,18.230661 L34.1304796,21.1111111 Z M52.961073,30 C48.3958903,30 44.5503424,26.3319269 44.5503424,21.9887482 C44.5503424,17.6455696 48.3958903,14 52.961073,14 C57.5262556,14 61.3718036,17.6455696 61.3718036,21.9887482 C61.3718036,26.3319269 57.5262556,30 52.961073,30 Z M52.9610729,26.0393812 C55.0749998,26.0393812 56.8740866,24.1940928 56.8740866,21.9887482 C56.8740866,19.8059072 55.0749998,17.9606188 52.9610729,17.9606188 C50.847146,17.9606188 49.0480592,19.8059072 49.0480592,21.9887482 C49.0480592,24.1940928 50.847146,26.0393812 52.9610729,26.0393812 Z M71.5892694,30 C67.0240868,30 63.1785388,26.3319269 63.1785388,21.9887482 C63.1785388,17.6455696 67.0240868,14 71.5892694,14 C76.1544521,14 80,17.6455696 80,21.9887482 C80,26.3319269 76.1544521,30 71.5892694,30 Z M71.5892694,26.0393812 C73.7031963,26.0393812 75.5022831,24.1940928 75.5022831,21.9887482 C75.5022831,19.8059072 73.7031963,17.9606188 71.5892694,17.9606188 C69.4753425,17.9606188 67.6762557,19.8059072 67.6762557,21.9887482 C67.6762557,24.1940928 69.4753425,26.0393812 71.5892694,26.0393812 Z" id="Combined-Shape"></path>
        </g>
    </g>
</svg>`;

    let svg_logo_transparent = `<svg width="${size}" height="${size}" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g id="FA-Icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="FA-Icon-TP" fill="${color1}">
            <g id="FA">
                <path d="M50,1.42108547e-14 C100,1.42108547e-14 100,1.42108547e-14 100,50 C100,100 100,100 50,100 C4.26325641e-14,100 4.26325641e-14,100 4.26325641e-14,50 C4.26325641e-14,1.42108547e-14 4.26325641e-14,1.42108547e-14 50,1.42108547e-14 Z M56,26 L72,74 L86,74 L70,26 L56,26 Z M40,74 L52,74 L60,50 L54,32 L40,74 Z M14,26 L14,74 L28,74 L28,58 L39.34,58 L42.66,48 L28,48 L28,38 L46,38 L50,26 L14,26 Z" id="Shape"></path>
            </g>
            <g id="Al" opacity="${opacity}">
                <polygon id="Al" points="40 74 52 74 60 50 54 32"></polygon>
            </g>
        </g>
    </g>
    </svg>`;

    if (iconStyle === 1) {
        return be_svg_logo;
    } else {
        return svg_logo_transparent;
    }
}

// Width of text in specific font.
function getTextWidth(text, font) {
    let c = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    let context = c.getContext("2d");
    context.font = font;
    let metrics = context.measureText(text);
    return Math.round(metrics.width) + 5;
}

// Get contrast color - Black or White
function invertColor(hex, bw = true) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}