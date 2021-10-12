const fs = require('fs')
const process = require('process')
const axios = require('axios')
let path = process.argv[2];

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
      } else {
        console.log(data);
      }
    });
  }

async function webCat(url=process.argv){
    const res = await axios.get(url)
    console.log(res.data)
}

if (path.includes('http')) {
  webCat(path);
} else {
  cat(path);
}