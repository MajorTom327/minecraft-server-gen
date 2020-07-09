import inquirer from "inquirer";
import paper from "./paper";
import ora from "ora";
import fs from "fs";
import path from "path";
import chalk from "chalk";

import { ConfigureServer } from "./configure";

const log = console.log;

(async () => {
  const { pathDir } = await inquirer.prompt({
    type: "input",
    name: "pathDir",
    message: "Chemin du dossier",
    default: process.cwd,
  });

  console.log(pathDir);

  const { versions } = await paper.GetVersions();

  const { version } = await inquirer.prompt({
    type: "list",
    name: "version",
    message: "Version de minecraft",
    choices: versions || [],
  });

  const spinnerDownload = ora("Telechargement de paper").start();
  const writer = fs.createWriteStream(path.join(pathDir, "paperclip.jar"));

  const response = await paper.DownloadPaper(version);
  response.data.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
  spinnerDownload.stop();

  const spinnerPrepare = ora("Preparation de paper").start();
  paper.Prepare(pathDir);
  spinnerPrepare.stop();

  log(chalk.green("Installation du serveur terminer !"));
  log(
    chalk.grey("Pour telecharger des plugins: "),
    chalk.blueBright.underline("https://dev.bukkit.org/bukkit-plugins")
  );

  inquirer
    .prompt({
      type: "confirm",
      name: "configure",
      message: "Configurer le serveur",
    })
    .then(({ configure }) => {
      if (configure) {
        ConfigureServer(pathDir);
      }
    });

  // Initialise file
})();
