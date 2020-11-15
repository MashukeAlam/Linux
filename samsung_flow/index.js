var Client = require('ftp');
const fs = require('fs');
const { dir } = require('console');

Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

  var c = new Client();
  c.on('ready', function() {
    c.list('/CamScanner/', (err, list) => {
      if(err) throw err;
      const sortedFiltered = list.filter(file => file.name.startsWith('CamScanner') && file.name.slice(-3) === 'pdf').sort((a, b) => b.date - a.date)
      console.log(sortedFiltered[0].name);
      c.get(`/CamScanner/${sortedFiltered[0].name}`, function(err, stream) {
        if (err) throw err;
        stream.once('close', function() { c.end(); });
        stream.pipe(fs.createWriteStream(`/home/mashuk/Desktop/011181145    (${new Date().getDate()}-${new Date().getTime()}).pdf`)).on("close", () => {
          console.log("Done!");
          c.end();
        });
        
      });
    });
    
  });
  // connect to localhost:21 as anonymous
  c.connect({host: "192.168.0.100", port: "2221"});
