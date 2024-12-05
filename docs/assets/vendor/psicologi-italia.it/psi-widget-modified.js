function resizeIframe(frame) {
    if (frame == null) {
        return true;
    }

    var docEl = null;
    var isFirefox = navigator.userAgent.search("Firefox") >= 0;

    if (isFirefox && frame.contentDocument != null) {
        docEl = frame.contentDocument.documentElement;
    } else if (frame.contentWindow != null) {
        docEl = frame.contentWindow.document.body;
    }

    if (docEl == null) {
        return;
    }
    frame.style.height="0px";
    var maxWidth = docEl.scrollWidth;
    var maxHeight = (isFirefox ? (docEl.offsetHeight) : (docEl.scrollHeight));
    frame.width = maxWidth;
    frame.height = maxHeight;
    frame.style.width = frame.width + "px";
    frame.style.height = frame.height + "px";
    if (maxHeight > 20) {
        frame.height = maxHeight;
        frame.style.height = frame.height + "px";
    } else {
        frame.style.height = "100%";
    }

    if (maxWidth > 0) {
        frame.width = maxWidth;
        frame.style.width = frame.width + "px";
    } else {
        frame.style.width = "100%";
    }
    }

function createWidget(id) {
    wHTML = '',
    baseURL = 'https://www.psicologi-italia.it/',
    imgsPath = 'images/legacy_js_widget',
    canonical = 'https://www.psicologi-italia.it/psicologo/cosimo-giuseppe-comparini.html';
    maxWidth = '200';
    widgetVd = '1';
    skinType = 'light';
    wD = {"value":"91","label":"Dott. Cosimo Giuseppe Comparini","text":"Dott. Cosimo Giuseppe Comparini","linkTo":"profile","image":"logo.png","extra":{"type":null,"data":{"title":null,"image":null,"url":null}},"stars":0,"profile_image":{"style":"position: absolute;  left: 50%; margin-left: -40px;  top: 50%; margin-top: -40px;","src":"https:\/\/cdn.psicologi-italia.it\/uploads\/2024\/11\/24\/thumb\/s_w80_h80\/img-2559-1-19351.jpeg","bigsrc":null,"width":50,"height":50,"didascalia":null,"ori":null}};
    wTarget = "_blank";
    var init = function () {
        var wHTML = '<div id="WidgetId_'+id+'" class="WidgetBox '+skinType+'">',
            item = document.getElementById("iw_widget_"+id),
            //targetUrl = (wD.linkTo == "profile") ? canonical : baseURL;
            targetUrl = canonical;

        var headText = wD.text;
        if (wD.image !== null) {
            headText = '<img src="'+baseURL+''+imgsPath+'/'+skinType + '_' + wD.image+'" alt="'+wD.text+'" title="'+wD.text+'" />';
        }
        if (wD.value == "91") {
            headText = '<img src="'+baseURL+'images/'+wD.image+'" alt="'+wD.text+'" title="'+wD.text+'" width="192"/><div class="wb_profileTitle"><img src="'+wD.profile_image.src+'" alt="'+wD.text+'" title="'+wD.text+'" /><span>'+wD.text+'</span></div>';
        }

        if (wD.starsvalue > 0) {
            headText += '<p style="font-size: 11px;color: #ffc50a;letter-spacing: 1px;margin-bottom: 5px;">';
                for(i = 1; i <= 5; i++){
                    if(wD.starsvalue >= i || wD.starsvalue > i+0.5){
                        headText += '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><path style="fill:#FDC40F;" d="M5,0.2l1.5,3.2L10,3.9L7.5,6.3l0.6,3.4L5,8.1L1.9,9.8l0.6-3.4L0,3.9l3.5-0.5L5,0.2z"/></svg>';
                    } else if(wD.stars >= i-0.5) {
                        headText += '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><path style="fill:#FDC40F;" d="M5,0.2l1.5,3.2L10,3.9L7.5,6.3l0.6,3.4L5,8.1L1.9,9.8l0.6-3.4L0,3.9l3.5-0.5L5,0.2z"/><polyline style="fill:#FFFFFF;" points="5,0.9 6.4,3.7 9.5,4.1 7.2,6.2 7.7,9.2 5,7.7 "/></svg>';
                    } else {
                        headText += '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><path style="fill:#FDC40F;" d="M5,0.2l1.5,3.2L10,3.9L7.5,6.3l0.6,3.4L5,8.1L1.9,9.8l0.6-3.4L0,3.9l3.5-0.5L5,0.2z"/></svg>';
                    }
                }
            headText += ' <span class="starscount">('+wD.starscount+')</span></p>';
        }

        wHTML+= '<div class="wb_mainTitle"><a href="'+ targetUrl +'" target="'+wTarget+'">'+headText+'</a></div>';

        /*if (wD.value == "91") {
                wHTML+= '<div class="WidgetFooter">';
            if (widgetVd == 1) {
                wHTML+= '<span class="wb_textverified">Psicologo iscritto all\'albo e verificato da</span>';
            }
                wHTML+= '<a href="'+baseURL+'" target="'+wTarget+'">Psicologi Italia</a></div>';
        }*/
        wHTML+='</div>';

        let isWidget = document.getElementById("WidgetFrameId_" + id);
        var widget = (isWidget)?isWidget:document.createElement("iframe");
        widget.id = "WidgetFrameId_" + id;
        widget.style = "border: none;margin: 0 auto; display: block; width: 100%; width:"+maxWidth+"px;";
        widget.setAttribute("scrolling","no");
        widget.setAttribute("onload","javascript:resizeIframe(this);");
        item.prepend(widget);

        var psiCssElement = document.createElement("link");
        psiCssElement.type = "text/css";
        psiCssElement.rel = "stylesheet";
        psiCssElement.id = "WidgetCSS_" + id;
        psiCssElement.href = baseURL + "css/legacy_widget_style.css?v=1732564430";

        var doc = document.getElementById("WidgetFrameId_" + id).contentWindow.document;
        doc.open();
        doc.write('' + wHTML + '');
        doc.head.appendChild(psiCssElement);
        doc.close();
    };
    init();

}
