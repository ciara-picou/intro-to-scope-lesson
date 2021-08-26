//Scope determines the visibility of variables, functions, and objects in your code.

//Learning Goals
//Be able to describe the difference between GLOBAL SCOPE and LOCAL SCOPE

//Be able to define BLOCK SCOPE and LEXICAL SCOPE

//Be able to look at a variable and identify its SCOPE

// I like to think of scope like a hall monitor
//based on the school rules the hall monitor determines who is allowed to roam the halls
//Similarly, based on the rules of the programming language,
// scope determines which variables can be accessed at different points in your code

//GLOBAL SCOPE
//When we write code in our js file we start off in the GLOBAL SCOPE
//anything written in the GLOBAL SCOPE is accessible ANYWHERE in your code

//LOCAL SCOPE
//Locally scoped variables are only visible and accessible within
// their local scopes (where they are defined).

//the function below is written in the GLOBAL SCOPE
//the variables tip, tax, and total are LOCALLY SCOPED to the checkTotal function
//meaning you may access them inside the function but not outside of the function
function checkTotal(subTotal) {
  let tip = subTotal * 0.2;
  let tax = subTotal * 0.06;
  let total = subTotal + tip + tax;
  console.log(tip, tax, total);
  return total;
}
checkTotal(100);

//the function below is written in the ________________
//the variables _______ and _______ are LOCALLY SCOPED to the  annualSalary function
//meaning you may access them inside the function but not outside of the function
function annualSalary(baseSalary, yearsWithCompany) {
  let bonus = 0;
  let christmasBonus = 1000;
  if (yearsWithCompany == 1) {
    bonus = baseSalary * 0.05;
  } else if (yearsWithCompany >= 2) {
    bonus = baseSalary * 0.1;
  }
  return baseSalary + bonus + christmasBonus;
}
//the console.log below will result in an error because tip tax and total are
//LOCALLY SCOPED to the checkTotal function
//console.log(tip, tax, total)

//BLOCK SCOPE
//remember the boundary of a BLOCK is set by curly brackets {}
//examples of BLOCKS:

//CONDTIONAL STATEMENTS if(){ THIS IS A CODE BLOCK }

//FOR LOOPS for(let singular of plural){ THIS IS A CODE BLOCK }

//FUNCTIONS function myFunction(parameter){ THIS IS A CODE BLOCK }

//With var, a variable is either globally scoped, or locally scoped to the function in which it is defined.
// Block scopes like if, for, {}, etc. have no effect on var.
//let & const, on the other hand, are scoped within the block which they are defined.
//Let’s look at an example:
function splitTheBills(billsArray) {
  //we have to declare let monthlyExpenses = 0 OUTSIDE OF the for loop
  //because we want to have access to it outside of the for loop
  //Notice that bill is declared INSIDE of the for loop..
  //what do you think will happen if we try to access bill OUTSIDE of the for loop?
  let monthlyExpenses = 0;
  for (let bill of billsArray) {
    monthlyExpenses += bill;
  }
  return monthlyExpenses / 2;
}
splitTheBills([2500, 1200, 100, 100, 100]);

//now take a look at this example
//let's imagine this function is for a different company that only
//gives a bonus once you've worked their for 2 years or more
function yearlySalary(baseSalary, yearsWithCompany) {
  let christmasBonus = 1000;
  if (yearsWithCompany >= 2) {
    let bonus = baseSalary * 0.1;
  }
  return baseSalary + bonus + christmasBonus;
}
//console.log(yearlySalary(100000, 2));
//why do you think we are getting a REFERENCE ERROR saying bonus is not defined at yearlySalary?

//LEXICAL SCOPE
//Lexical scope (also referred to as static scope) is the ability of an inner function
// to access the scope of an outer function
function payTutor(tutorName, shiftsArray) {
  let tutorsPayRates = {
    Randi: 25,
    Ciara: 30,
    Chet: 50,
  };
  let yearsWithTutoringFirm = {
    Randi: 5,
    Ciara: 1,
    Chet: 2,
  };

  function calculateWeeklyPay(tutorName, shiftsArray) {
    let hoursWorked = 0;
    for (let shift of shiftsArray) {
      hoursWorked += shift;
    }
    if (tutorName == "Randi") {
      return hoursWorked * tutorsPayRates["Randi"];
    }
    if (tutorName == "Ciara") {
      return hoursWorked * tutorsPayRates["Ciara"];
    }
    if (tutorName == "Chet") {
      return hoursWorked * tutorsPayRates["Chet"];
    }
  }
  
  let weeklyPay = calculateWeeklyPay(tutorName, shiftsArray);

  function deductFindersFee(tutorName, weeklyPay) {
    const yearsWorked = yearsWithTutoringFirm[tutorName];
    let findersFee;
    if (yearsWorked <= 1) {
      findersFee = weeklyPay * 0.2;
    }
    if (yearsWorked >= 2) {
      findersFee = weeklyPay * 0.1;
    }
    if (yearsWorked >= 5) {
      findersFee = weeklyPay * 0.05;
    }
    return weeklyPay - findersFee;
  }
  return deductFindersFee(tutorName, weeklyPay);
}
console.log(payTutor("Ciara", [2, 2, 2, 2, 2]));
//Questions:
//What scope does the payTutor function have?
//What scope does the calculateWeeklyPay have?
//Why can we access the tutorsPayRates object inside of the calculateWeeklyPay function?
//What will happen if we try to access the tutorsPayRates object from outside of the payTutor funtion?
//What kind of scope does shift have?
//What kind of scope does hoursWorked have?
