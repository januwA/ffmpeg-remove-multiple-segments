const path = require("path");
const child_process = require("child_process");

const {
  createDuration,
  outputDir,
  createConcatFile,
  checkTempDir,
  getVideoDuration,
} = require("./utils");

const config = require("./config");

async function main() {
  const _videoDuration = await getVideoDuration(config.input);
  checkTempDir();

  let _id = 1;
  let _start = "00:00:00";
  let _t = 0;
  let _commmand = `ffmpeg -i "${config.input}" `;

  for (const [start, end] of config.segments) {
    if (_start === start) {
      _start = end;
      continue;
    }
    const startD = createDuration(_start);
    const endD = createDuration(start);
    _t = endD.sub(startD).inSeconds;
    _commmand += ` -ss ${_start} -t ${_t} -c copy "${outputDir(_id++)}" `;

    _start = end;
  }

  child_process.execSync(_commmand);

  // 合并到结尾
  const _endCommand = `ffmpeg -ss ${_start} -i "${
    config.input
  }" -c copy ${outputDir(_id)}`;

  if (_videoDuration !== _start) {
    child_process.execSync(_endCommand);
  } else {
    _id--;
  }

  // 合并ts
  createConcatFile(_id);
  process.chdir("./temp/");
  const _concatCommand = `ffmpeg -f concat -i concat.txt ${config.output}`;
  child_process.execSync(_concatCommand);
  process.chdir("../");
}

main();
