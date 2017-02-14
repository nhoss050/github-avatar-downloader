var request = require ('request');
var fs = require('fs')
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var GITHUB_USER = "nhoss050";
  var GITHUB_TOKEN = "061e2c2d30fd19d4aaa022458d0abc5f4f985fa8";
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
// console.log(requestURL);

  request.get({
    url:requestURL, headers:{'User-Agent':'rohit'},
  }, function(err, response, body) {
    if (err) cb(null, err); // throw err;
    cb(JSON.parse(response.body));
  });

  // ...
  // request.get(requestURL, function(err, response, body) {
  //   if (err) throw err;
  //   console.log('Response Status Code:', response.body);
  // });

}

getRepoContributors("jquery", "jquery", function(result, err) {
  //console.log("Errors: ", err);
  // console.log("Result: \n", result);

  // var contributor_urls = result.map(contributor => contributor.url);
  // console.log(contributor_urls);
  for (var contributors of result) {
    console.log(contributors.avatar_url);
    downloadImageByURL(contributors.avatar_url,contributors.id )
    // todo: figure out filepath
    // todo: pass URL and filepath
  }
});

function downloadImageByURL(url, filePath) {
  // ...


  request.get(url)
  .on('error', function(err){
    throw err;
  })
  .on('response',function (response){
  console.log('Response Status Code: ', response.statusCode,'Response content type is: ',response.headers['content-type']);
  })
  .pipe(fs.createWriteStream("./pics/"+filePath));


}


