import fs from "fs";
import path from "path";

export class Server {
  config = {
    "enable-jmx-monitoring": false,
    "rcon.port": 25575,
    "level-seed": "",
    gamemode: "survival",
    "enable-command-block": false,
    "enable-query": false,
    "generator-settings": "",
    "level-name": "world",
    motd: "A Minecraft Server",
    "query.port": 25565,
    pvp: true,
    "generate-structures": true,
    difficulty: "easy",
    "network-compression-threshold": 256,
    "max-tick-time": 60000,
    "use-native-transport": true,
    "max-players": 20,
    "online-mode": true,
    "enable-status": true,
    "allow-flight": false,
    "broadcast-rcon-to-ops": true,
    "view-distance": 10,
    "max-build-height": 256,
    "server-ip": "",
    "allow-nether": true,
    "server-port": 25565,
    "enable-rcon": false,
    "sync-chunk-writes": true,
    "op-permission-level": 4,
    "prevent-proxy-connections": false,
    "resource-pack": "",
    "entity-broadcast-range-percentage": 100,
    "rcon.password": "",
    "player-idle-timeout": 0,
    debug: false,
    "force-gamemode": false,
    hardcore: false,
    "white-list": false,
    "broadcast-console-to-ops": true,
    "spawn-npcs": true,
    "spawn-animals": true,
    "snooper-enabled": true,
    "function-permission-level": 2,
    "level-type": "default",
    "spawn-monsters": true,
    "enforce-whitelist": false,
    "resource-pack-sha1": "",
    "spawn-protection": 16,
    "max-world-size": 29999984,
  };

  write(pathConfig) {
    const writer = fs.createWriteStream(
      path.join(pathConfig, "server.properties")
    );

    Object.keys(this.config).forEach((key) => {
      writer.write(`${key}=${this.config[key]}\n`);
    });

    writer.close();
  }
}

export default Server;
