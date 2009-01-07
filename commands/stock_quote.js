CmdUtils.CreateCommand({
  name: "stock-quote",
  homepage: "http://hoffstein.net/ubiquity/stock-quote.html",
  author: { name: "Ben Hoffstein", email: "ben@hoffstein.net"},
  license: "MPL",
  description: "Launches the Google Finance page for a given ticker.",

  takes: { ticker: noun_arb_text },

  preview: function(pblock, ticker) {
    var searchText = jQuery.trim(ticker.text);
    if(searchText.length < 1) {
      pblock.innerHTML = "Retrieves stock quote for ticker";
      return;
    }

    var previewTemplate = "Retrieves stock quote for <b>${query}</b>";
    var previewData = { query: searchText };
    pblock.innerHTML = CmdUtils.renderTemplate(previewTemplate, previewData);

  },
  execute: function(ticker) {
    var url = "http://finance.google.com/finance?q={QUERY}";
    var query = ticker.text;
    var urlString = url.replace("{QUERY}", query);
    Utils.openUrlInBrowser(urlString);
  }
});

