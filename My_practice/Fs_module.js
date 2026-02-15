 const fs = require("fs");
 const fileName = "test.txt";

 const writeFile = fs.writeFileSync(fileName,"this is the initail data" ,"utf-8");
// console.log(writeFile);

const path = require("path");
const filePath = path.join(__dirname, fileName);

// const readFile = fs.readFileSync(filePath,"utf-8");
// console.log(readFile.toString());
// console.log(readFile);

// const appendFile = fs.appendFileSync(fileName,"this is the initail data" ,"utf-8");
//  console.log(appendFile);


//  const FileDelete = fs.unlinkSync(fileName,"this is the initail data" ,"utf-8");
//  console.log(FileDelete);

const newUpdatedFileName = "updateTest.txt";
const newFilePath = path.join(__dirname, newUpdatedFileName);
const renameFile = fs.renameSync(filePath, newFilePath);
console.log(renameFile);
