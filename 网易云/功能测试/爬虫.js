$.get("https://music.163.com/discover/", function(response) {
  var $ = cheerio.load(response);
  var links = $(".nm s-fc0 f-thide a");
  links.each(function() {
    console.log($(this).text());
  });
});
