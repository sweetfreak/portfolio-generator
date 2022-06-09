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
*/
//accesses the file system, or fs module.
const fs = require("fs");

//grabs the page-template function - generate page
const generatePage = require("./src/page-template.js");

//takes what's in the console and puts it into two array objects
const profileDataArgs = process.argv.slice(2);
//assigns the above into the array below
const [name, github] = profileDataArgs;

//creates a file using the generatePage function
fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw new Error(err);

    console.log("Portfolio complete! Check out index.html to see the output!");
});