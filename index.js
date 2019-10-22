const inquirer  = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

const init = () => {
    console.log(
        chalk.green(
            figlet.textSync("Node f**king JS",{
                font: "Ghost",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
}

const askQuestions = () => {
    const questions = [
        {
            name : "FILENAME",
            type : "INPUT",
            message : "WHAT IS THE NAME OF THE FILE WITIHOUT THE EXTENSION? "
        },
        {
            type : "LIST",
            name : "EXTENSION",
            choices : [".rb", ".js", ".php", ".css", ".docx"],
            filter: function(val){
                return val.split(".")[1];
            }
        }
    ];
    return inquirer.prompt(questions);
}

const createFile = (filename, extension) => {
    const filePath = ` ${process.cwd()}/${filename}.${extension} `
    shell.touch(filePath)
    return filePath;
}

const success = (filePath) => {
    console.log(
        chalk.white.bgGreen.bold(`Done, file created at ${filePath}`)
    )
} 
 
const run = async () => {
    //show script introduction
    init();

    //ask questions
    const answers = await askQuestions();
    const {FILENAME, EXTENSION} = answers;

    //create the file
    const filePath = createFile(FILENAME, EXTENSION)

    //show success message
    success(filePath);

};

run();


