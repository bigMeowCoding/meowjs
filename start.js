const webpack = require("webpack");

// const getEnv = require("./env");
// const dot = require("dotenv");
//
// const command = process.argv[2];
//
// function format(time) {
//     return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
// }
//
// const envPath = getEnv(command, process.env.NODE_ENV || "");
// if (envPath) {
//     dot.config({ path: envPath });
//     if (!process.env.NODE_ENV) {
//         process.env.NODE_ENV = process.env.BUILD_ENV; // 绑定执行环境
//     }
// }
function run(fn, options) {
  // 程序总入口
  const task = typeof fn.default === "undefined" ? fn : fn.default; // 获取启动程序的task
    console.log(task)
  const start = new Date();
  console.info(
    `[${start}] Starting '${task.name}${options ? ` (${options})` : ""}'...`
  );
  webpack()
  return task(options).then((resolution) => {
    // 执行启动程序，成功之后会有日志。
    const end = new Date();
    const time = end.getTime() - start.getTime();
    console.info(
      `[${end}] Finished '${task.name}${
        options ? ` (${options})` : ""
      }' after ${time} ms`
    );
    return resolution;
  });
}

// if (require.main === module && process.argv.length > 2) {
//     delete require.cache[__filename];

let code = require(`./a.js`);
console.log(code)
run(code).catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
// }
