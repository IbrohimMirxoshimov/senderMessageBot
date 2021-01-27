function main() {
  console.log("Main function run");
  require("./app/core/bot")
}

process.on('unhandledRejection', (reason, promise) => {
  console.log('reason', reason.code, reason.message)
})

main()