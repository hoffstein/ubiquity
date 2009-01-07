CmdUtils.CreateCommand({
    name: "stock-chart",
    homepage: "http://hoffstein.net/ubiquity/stock-chart.html",
    author: { name: "Ben Hoffstein", email: "ben@hoffstein.net" },
    license: "MPL",
    description: "Displays a stock chart for the given ticker.",

    takes: { ticker: noun_arb_text },

    _getChartUrl: function(searchText) {
        var template = '<script src="http://charts.wikinvest.com/wikinvest/wikichart/javascript/scripts.php" type="text/javascript"></script><object width="300" height="245"  codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#9,0,28" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name="movie" value="http://charts.wikinvest.com/WikiChartMini.swf"></param><param name="allowFullScreen" value="true"></param><param name="allowScriptAccess" value="always"></param><param name="flashvars" value="ticker=${ticker}&startDate=&endDate=&rollingDate=1 year&showAnnotations=false&liveQuote=true"></param><embed src="http://charts.wikinvest.com/WikiChartMini.swf" type="application/x-shockwave-flash"  allowfullscreen="true"  allowScriptAccess="always"  width="300" height="245" flashvars="ticker=${ticker}&startDate=&endDate=&rollingDate=1 year&showAnnotations=false&liveQuote=true"></embed></object>';
        var data = { ticker: searchText };
        return CmdUtils.renderTemplate(template, data);
    },

    preview: function(pblock, ticker) {
        var searchText = jQuery.trim(ticker.text);
        if (searchText.length < 1) {
            pblock.innerHTML = "Retrieves stock chart for ticker";
            return;
        }
        var previewData = "Stock chart for <b>" + searchText + "</b><br><br>" + this._getChartUrl(searchText);
        pblock.innerHTML = previewData;
    },
    
    execute: function(ticker) {
        var url = "http://www.wikinvest.com/chart/{TICKER}?utm_campaign=wchart&utm_content=textchart";
        var query = jQuery.trim(ticker.text);
        var urlString = url.replace("{TICKER}", query);
        Utils.openUrlInBrowser(urlString);
    }
});
