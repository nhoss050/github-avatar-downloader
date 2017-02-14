var request = require ('request');
var fs = require('fs')
console.log('Welcome to the GitHub Avatar Downloader!');
var userinput = process.argv.slice(2);
  var OwnerOfRepo = userinput[0]
  var nameOfRepo = userinput[1]

function getRepoContributors(repoOwner, repoName, cb) {

  var GITHUB_USER = "nhoss050";
  var GITHUB_TOKEN = "061e2c2d30fd19d4aaa022458d0abc5f4f985fa8";
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

    if(OwnerOfRepo){
      if(nameOfRepo){
        request.get({
        url:requestURL, headers:{'User-Agent':'rohit'},
        }, function(err, response, body) {
             if (err) cb(null, err); // throw err;
             cb(JSON.parse(response.body));
        });
      }else {
      console.log('name of the Repo is required!')
      }

    } else {
      console.log('Owner of the Repo is required!')
    }

}

getRepoContributors(OwnerOfRepo, nameOfRepo, function(result, err) {

  for (var contributors of result) {
    console.log(contributors.avatar_url);
    downloadImageByURL(contributors.avatar_url,contributors.id )

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


