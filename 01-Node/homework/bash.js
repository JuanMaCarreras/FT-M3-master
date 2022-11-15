const commands = require("./commands");


process.stdout.write(" $ ");

function termine(info) {
  process.stdout.write(info);
  process.stdout.write("\n > ");
}

process.stdin.on("data", function (data) {
  var cmd = data.toString().trim().split(" ");
  let comando = cmd.shift();

  if (commands[comando]) {
    commands[comando](cmd, termine);
  } else termine("El comando no existe");
});
