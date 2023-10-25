const { exec } = require("child_process");
const themeColors = {
    text: "#ff8e4d",
    variable: "#ff624d",
    error: "#f5426c"
}

const main = () => {
    console.log(chalk.hex(themeColors.text)("Starting build..."));
    exec("tsc", (err, stdout, stderr) => {
        if (err) {
            console.log(chalk.hex(themeColors.error)("Build failed with the following error: "));
            console.log(chalk.hex(themeColors.error)(stdout));
            return;
        }
        console.log(chalk.hex(themeColors.text)(`Build successful! You can start the bot by running ${chalk.hex(themeColors.variable)("npm start")}\n`));
    })
}


try {
    var chalk = require("chalk");
    main()
} catch (e) {
    if (e.code === "MODULE_NOT_FOUND") {
        console.log("\x1b[31mNode modules are not installed. \x1b[33mInstalling...\x1b[37m")
        exec("npm i", (err, stdout, stderr) => {
            if (err) {
                console.log("\x1b[31mFailed to install node modules. \x1b[37m");
                console.log(err);
                process.exit(1);
            }
            console.log(stdout);
            console.log("\x1b[32mNode modules successfully installed. \x1b[33mRestarting in 3 seconds... \x1b[37m");
            setTimeout(() => {
                exec("node build.js", (err, stdout, stderr) => {
                    if (err) {
                        console.log("\x1b[31mFailed to restart. \x1b[37m");
                        console.log(err);
                        process.exit(1);
                    }
                    console.log(stdout);
                })
            }, 3000)
        })
    }
}


