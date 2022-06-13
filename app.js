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

const { link } = require("fs");
const inquirer = require("inquirer");
//accesses the file system, or fs module.
const fs = require("fs");
// //grabs the page-template function - generate page
const generatePage = require("./src/page-template.js");



//function to prompt user
const promptUser = () => {
    //inquirer asks a question - here, it prompts the console.
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter your name!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmAbout",
            message: "Would you like to enter some information about yourself for an 'About Me' section?",
            default: true
        }, 
        {
            type: "input",
            name: 'about',
            message: "Please provide some information about yourself.",
            when: ({ confirmAbout }) => {
                if (confirmAbout ) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "Enter your Github username:",
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log("Please insert your Github Username!");
                    return false;
                }
            }
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
            message: "What is the name of your project?",
            validate: projectNameInput => {
                if (projectNameInput) {
                    return true;
                } else {
                    console.log("Please enter a project name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project (Required)",
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log("Please enter your project's descriptions");
                    return false;
                }
            }
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
            message: "Enter the Github link to your project (Required)",
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("Please enter a link");
                    return false;
                }
            }
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
    .then(portfolioData => {
        const pageHTML = generatePage(portfolioData);

        // //creates a file using the generatePage function
        fs.writeFile('./index.html', pageHTML, err => {
            if (err) throw new Error(err);

            console.log("Page created! Check out index.html in this directory to see the output!");
        });
    });