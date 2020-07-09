import axios from "axios";
import fs from "fs";
import path from "path";

const baseUrl = "https://papermc.io/api/v1/paper";
const eula = "eula=true";
const commandRun = "java -Xms2G -Xmx2G -jar";

export const GetVersions = () => {
  return axios.get(baseUrl).then((d) => {
    // console.log(d.data);
    return d.data;
  });
};

export const GetBuild = (version) => {
  console.log(version);
  return axios.get([baseUrl, version].join("/")).then((d) => d.data);
};

export const DownloadPaper = (version) => {
  return axios({
    url: [baseUrl, version, "latest", "download"].join("/"),
    method: "GET",
    responseType: "stream",
  });
  // .then((d) => d.data);
  // .then((d) => d.data);
};

export const Run = (path = "./paperclip.jar") => {};

export const Prepare = (pathDest = "./", executable = "paperclip.jar") => {
  const writerEula = fs.createWriteStream(path.join(pathDest, "eula.txt"));
  writerEula.write(eula);
  writerEula.close();

  const writerRunner = fs.createWriteStream(path.join(pathDest, "./run.sh"));
  writerRunner.write("#!/bin/bash\n");
  writerRunner.write(`${commandRun} ${path.join("./", executable)}`);
  writerEula.close();
  fs.chmodSync(path.join(pathDest, "./run.sh"), "754");
};

export default {
  GetVersions,
  GetBuild,
  DownloadPaper,
  Prepare,
  Run,
};
