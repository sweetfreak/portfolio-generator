/*
const profileDataArgs = process.argv.slice(2, process.argv.length);

const printProfileData = profileDataArr => {
    //This...
    for (let i = 0; i < profileDataArr.length; i++) {
      console.log(profileDataArr[i]);
    }
 
    console.log("===========");

//Is the same as this...
    profileDataArr.forEach(profileItem => console.log(profileItem));
    
 };

  printProfileData(profileDataArgs);

//other code:

//takes what's in the console and puts it into two array objects
const profileDataArgs = process.argv.slice(2);


*/

const inquirer = require("inquirer");
//accesses the file system, or fs module.
// const fs = require("fs");
// //grabs the page-template function - generate page
// const generatePage = require("./src/page-template.js");

// const pageHTML = generatePage(name, github);

// //creates a file using the generatePage function
// fs.writeFile('index.html', pageHTML, err => {
//     if (err) throw new Error(err);

//     console.log("Portfolio complete! Check out index.html to see the output!");
// });

//function to prompt user
const promptUser = () => {
    //inquirer asks a question - here, it prompts the console.
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "github",
            message: "Enter your Github username:"
        },
        {
            type: "input",
            name: "about",
            message: "Provide some information about yourself:"
        }
    ]);
};

const promptProject = portfolioData => {
//if there's no "projects" array property, create one:
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    } 
    
    console.log(`
    =================
    Add a New Project
    =================
    `);
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project (Required)"
        },
        {
            type: "checkbox",
            name: "languages",
            message: "What did you build this project with? (Check all that apply)",
            choices: ["Javascript", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"]
        },
        {
            type: "input",
            name: "link",
            message: "Enter the Github link to your project (Required)"
        },
        {
            type: "confirm",
            name: "feature",
            message:"Would you like to feature this project?",
            default: false
        },
        {
            type: "confirm",
            name: "confirmAddProject",
            message:"Would you like to enter another project?",
            default: false
        }
    ])    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

//after prompting the user, it will take the answers, a new variable, and logs it (for now)
promptUser()
    .then(promptProject)
    .then(portfolioData => console.log(portfolioData));