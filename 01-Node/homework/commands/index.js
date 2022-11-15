const fs = require("fs"); // Modulo CORE de NodeJS
const request = require("request");

function date(info, done) {
  done(Date());
}
function pwd(info, done) {
  done(process.mainModule.path);
}

function ls(info, done) {
  fs.readdir(".", function (err, files) {
    if (err) throw err;
    var respuesta = "";
    files.forEach((file) => {
      respuesta += file.toString() + "\n";
    });
    done(respuesta);
  });
}

function echo(info, done) {
  done(info.join(" "));
}

function cat(info, done) {
  fs.readFile(info[0], "utf8", (err, data) => {
    if (err) throw err;
    done(data);
  });
}

function head(info, done) {
  fs.readFile(info[0], "utf8", (err, data) => {
    if (err) throw err;
    var lineas = data.toString().split("\n").splice(0, 10).join("\n");
    done(lineas);
  });
}

function tail(info, done) {
  fs.readFile(info[0], "utf8", (err, data) => {
    if (err) throw err;
    var lineas = data.toString().split("\n");
    var ultimasLineas = lineas.splice(lineas.length - 10).join("\n");
    done(ultimasLineas);
  });
}

function curl(info, done) {
  request(`http://${info[0]}`, function (err, res, body) {
    if (err) throw err;
    done(body);
  });
}

module.exports = {
  date,
  pwd,
  ls,
  echo,
  cat,
  head,
  tail,
  curl,
};
