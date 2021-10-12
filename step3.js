const fs = require('fs')
const process = require('process')
const axios = require('axios')

let path;
let outputPath;

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
      } else {
        handleOutput(data, outputPath)
      }
    });
  }

async function webCat(url=process.argv){
    const res = await axios.get(url)
    handleOutput(res.data, outputPath)
}

function handleOutput(text, outputPath) {
    if (outputPath) {
      fs.writeFile(outputPath, text, 'utf8', function(err) {
        if (err) {
          console.error(`Couldn't write ${outputPath}: ${err}`);
          process.exit(1);
        }
      });
    } else {
      console.log(text);
    }
  }
  
  if (process.argv[2] === '--out') {
    outputPath = process.argv[3];
    path = process.argv[4];
  } else {
    path = process.argv[2];
  }
  
  if (path.slice(0, 4) === 'http') {
    webCat(path, outputPath);
  } else {
    cat(path, outputPath);
  }