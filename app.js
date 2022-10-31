const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "*", "/"];
const ids = ["#plus", "#minus", "#times", "#divide"];
input = "0";
result = "";
lastOperation = "";
lastInput = "";
equalPressed = true;
const LIMIT = 14;

function btnPress(btn) {
    const display = document.querySelector("#result");
    if (result == "Infinity")
    {
        result = "";
    }

    // Get new input
    if (equalPressed || lastOperation != "")
    {
        // Start new input
        if (nums.includes(btn) && input == "0")
        {
            input = btn;
            display.innerText = input;
            if (equalPressed)
            {
                result = "";
            }
        }
        else
        {
            // Append to current input, given limit not exceeded
            if (input.length < LIMIT)
            {
                if (nums.includes(btn))
                {
                    input += btn;
                }
                else if (btn == ".")
                {
                    let containDecimal = /\d+\./;
                    if (!containDecimal.test(input))
                    {
                        input += btn;
                    }
                }
                display.innerText = input;
            }
        }
    }

    // Does intermediary operation and shows result
    if (operators.includes(btn) || btn == "=")
    {
        if (result == "")
        {
            result = Number(input);
        }
        else if (equalPressed && btn == "=")
        {
            switch (lastOperation)
            {
                case "+":
                    result += Number(lastInput);
                    break;
                case "-":
                    result -= Number(lastInput);
                    break;
                case "*":
                    result *= Number(lastInput);
                    break;
                case "/":
                    result /= Number(lastInput);
                    break;
            }
        }
        else
        {
            switch (lastOperation)
            {
                case "+":
                    result += Number(input);
                    break;
                case "-":
                    result -= Number(input);
                    break;
                case "*":
                    result *= Number(input);
                    break;
                case "/":
                    result /= Number(input);
                    break;
            }
            lastInput = input;
        }

        input = "0";
        display.innerText = result;
    }

    // Check for non-num input
    switch (btn)
    {
        case "+":
            lastOperation = "+";
            equalPressed = false;
            break;
        case "-":
            lastOperation = "-";
            equalPressed = false;
            break;
        case "*":
            lastOperation = "*";
            equalPressed = false;
            break;
        case "/":
            lastOperation = "/";
            equalPressed = false;
            break;
        case "=":
            equalPressed = true;
            break;
        case "AC":
            input = 0;
            result = "";
            lastOperation = "";
            equalPressed = true;
            display.innerText = "0";
            break;
        case "DEL":
            if (input != "")
            {
                input = input.slice(0, -1);
                if (input == "")
                {
                    display.innerText = 0;
                }
                else
                {
                    display.innerText = input;
                }
            }
            else
            {
                result = result.toString().slice(0, -1);
                if (result == "")
                {
                    display.innerText = 0;
                }
                else
                {
                    display.innerText = result;
                    result = Number(result);
                }
            }
    }

    // Check if result is beyond display
    resultString = result.toString();
    if (resultString.length > 14)
    {
        let containDecimal = /\d+\./;
        if (!containDecimal.test(resultString))
        {
            result = "";
            display.innerText = "LIMIT ERROR";
        }
        else
        {
            result = resultString.slice(0, 14);
            display.innerText = result;
        }
    }

    // Turn on corresponding indicator
    for (var i = 0; i < 4; i++)
    {
        if (lastOperation == operators[i])
        {
            document.querySelector(ids[i]).style.opacity = 100;
        }
        else
        {
            document.querySelector(ids[i]).style.opacity = 0;
        }
    }
}

// Gets keyboard presses as input
window.onload = function() {

    window.addEventListener("keydown", function(event) {
        if (event.key == "Enter")
        {
            btnPress("=");
        }
        else if (event.key == "Delete" || event.key == "Backspace")
        {
            btnPress("DEL");
        }
        else if (event.key == "Escape")
        {
            btnPress("AC");
        }
        else
        {
            btnPress(event.key);
        }
    })
}