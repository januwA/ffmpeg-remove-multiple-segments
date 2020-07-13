module.exports =  {
  // 输入视频
  "input": "C:\\Users\\ajanuw\\Desktop\\out2.mp4",

  // 输出视频
  "output": "./out.mp4",

  // 需要删除的片段
  // 按照时间循序排列
  // "segments": [
  //   ["00:00:10", "00:00:20"], // 10秒到20秒删除
  //   ["00:01:10", "00:01:22"], // 1分10秒到1分22秒删除
  // ],

  "segments": [
    ["00:00:00", "00:00:10"], // 去头10s
    ["00:04:49", "00:04:59"], // 去尾10s
  ]
}