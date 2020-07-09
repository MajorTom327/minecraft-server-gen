import inquirer from "inquirer";
import Server from "./Configuration/Server";

export const ConfigureServer = (pathDir) => {
  let server = new Server();
  inquirer
    .prompt([
      {
        type: "number",
        name: "server-port",
        message: "Port du serveur",
        default: server.config["server-port"],
      },
      {
        type: "input",
        name: "server-ip",
        message: "Ip du serveur",
        default: server.config["server-ip"],
      },
      {
        type: "confirm",
        name: "white-list",
        message: "Activer la whitelist",
        default: server.config["white-list"],
      },
      {
        type: "confirm",
        name: "online-mode",
        message: "Activer le online",
        default: server.config["online-mode"],
      },
      {
        type: "list",
        name: "gamemode",
        message: "Mode de jeu",
        choices: ["survival", "creative", "adventure", "spectator"],
        default: server.config.gamemode,
      },
      {
        type: "list",
        name: "difficulty",
        message: "Difficulte",
        choices: ["peaceful", "easy", "normal", "hard"],
        default: server.config.difficulty,
      },
      {
        type: "confirm",
        name: "pvp",
        message: "Activer le pvp",
        default: server.config.pvp,
      },

      {
        type: "confirm",
        name: "force-gamemode",
        message: "Forcer le gamemode",
        default: server.config["force-gamemode"],
      },
      {
        type: "confirm",
        name: "allow-flight",
        message: "Activer le vol",
        default: server.config["allow-flight"],
      },
      {
        type: "confirm",
        name: "enable-command-block",
        message: "Activer les blocks de commandes",
        default: server.config["enable-command-block"],
      },

      {
        type: "number",
        name: "max-players",
        message: "Nombre maximal de joueurs",
        default: server.config["max-players"],
      },
    ])
    .then((data) => {
      server.config = { ...server.config, ...data };

      server.write(pathDir);
    });
};
