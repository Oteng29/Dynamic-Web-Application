const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);


//SCENARIO: VALIDATION WHEN VALUES ARE MISSING
  //An additional condition(if (!dividend || !divider)) is added before assigning the innerText property. 
  //It checks if either the dividend or divider values are falsy (empty, null, undefined, etc.).
  //If either value is missing, the result element's text content is set to the error message: "Division not performed... Try again.". 
  if (!dividend || !divider) {
    result.innerText = "Division not performed. Both values are required in inputs. Try again.";
    return;      //added a 'return' statement,to prevent the rest of the code from executing and stops the division operation.
  }


//SCENARIO:PROVIDING ANYTHING THAT IS NOT A NUMBER SHOULD CRASH THE PROGRAM
  //This condition checks if either dividend or divider is not a valid number. 
  if (isNaN(dividend) || isNaN(divider)) {
    //the code sets the innerHTML property of the document's body element to the error message: "Something critical went wrong. Please reload the page".
    document.body.innerHTML = "Something critical went wrong. Please reload the page";
    //This line logs an error message to the console, indicating that there was an invalid input. 
    console.error("Invalid input. Reloading the page...");
    return;
  } //After setting the error message and logging the error, the return statement is used to immediately exit the function.


  const quotient = dividend / divider;               //This line calculates the quotient of the division operation by dividing the dividend by the divider.         
  const wholeNumberQuotient = Math.floor(quotient);  //This line calculates the whole number quotient by using the Math.floor() function on the quotient value.
  //Math.floor() function rounds down a number to the nearest integer less than or equal to that number.

  //SCENARIO: AN INVALID DIVISION SHOULD LOG AN ERROR IN THE CONSOLE
  // if (!Number.isInteger(quotient)) {
  //   result.innerText = "Division not performed. Invalid number provided. Try again.";
  //   console.error("Invalid division. Quotient is not a whole number.");
  //   return;
  // }

  //This line sets the innerText property of the result element. 
  //It converts the wholeNumberQuotient value to a string using the toString() method and assigns it to the innerText property. 
  result.innerText = wholeNumberQuotient.toString();
});
