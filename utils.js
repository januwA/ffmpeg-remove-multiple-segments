const path = require("path");
const fs = require("fs");
const child_process = require("child_process");

const { Duration } = require("ajanuw-duration");

const concatFilePath = path.resolve(__dirname, "./temp/", `concat.txt`);

function createDuration(str) {
  const t = str.split(":").map((it) => +it);
  return new Duration({ hours: t[0], minutes: t[1], seconds: t[2] });
}

function outputDir(id) {
  return path.resolve(__dirname, "./temp/", `${id}.ts`);
}

/**
 * 创建合并文件
 * @param {number} id
 */
function createConcatFile(id) {
  let content = ``;
  for (let i = 1; i <= id; i++) {
    content += `file '${i}.ts'\r\n`;
  }
  fs.writeFileSync(concatFilePath, content);
}

function checkTempDir() {
  if (fs.existsSync("./temp")) {
    // child_process.execSync(`wsl rm -rf ./temp/*`);
    const files = fs.readdirSync("./temp/");
    if (!files || !files.length) return;
    files.forEach((filename) => {
      fs.unlinkSync(path.join("./temp/", filename));
    });
  } else {
    fs.mkdirSync("./temp");
  }
}

/**
 * 获取视频的总时长
 * @param {string} videopath
 */
function getVideoDuration(videopath) {
  return new Promise((res) => {
    child_process.exec(
      `ffmpeg  -i  "${path.resolve(videopath)}"`,
      (error, stdout, stderr) => {
        const end = stderr.match(/Duration:\s(\d{2}:\d{2}:\d{2})/)[1];
        res(end || 0);
      }
    );
  });

  // let mr = r
  // console.log(mr);
}

module.exports = {
  createDuration,
  outputDir,
  createConcatFile,
  checkTempDir,
  getVideoDuration,
};
