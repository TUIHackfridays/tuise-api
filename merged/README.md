# Merge apis

## Dependencies
- [node ^4.2.5](https://nodejs.org/en/)
- [npm ^3.5.3](https://www.npmjs.com/)

## Install
`$ npm install`

## Usage
`$ node index.js -d destinationFileName folder/inputfile1.yaml inputfile2.yaml /folder/inputfile3.json [...]`

The above command will merge all the the swagger specifications files into one file.
The file will contain the following information, schemes, host and basePath. These can be changed in the `index.js` file.
```javascript
var info         = {
    version: "1.0.0",
    title: "TUIse",
    description: "A bot designed by TUI HackFridays\n"
};
var schemes      = ['http', 'https'];
var host         = 'api.tuise.eu';
var basePath     = '/v1';
```

### Arguments
You can use `-d` or `--destination` to set the destination file name. By default it uses `bundled_result`.
