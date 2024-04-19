import { useEffect, useState } from "react";
import Pad from "./pad";
import Screen from "./screen";
import { consState, transition, states, actions } from "../../state/state";

export default function Calculator() {
    const SYNTAX_ERROR = "Syntax Error";

    let [operand1, setOperand1] = useState(0);
    let [operand2, setOperand2] = useState(0);
    let [calculatorState, setCalculatorState] = useState(consState);
    let [operator, setOperator] = useState("");

    const [screenText, setScreenText] = useState("0");

    const handleNumberPress = numText => {
        const num = Number.parseInt(numText);

        if(calculatorState() == states.accumulatingOperand1) {
            operand1 = (operand1 * 10) + num;
            setOperand1(operand1);

            calculatorState = transition(calculatorState, actions.number);
            setCalculatorState(() => calculatorState);

            setScreenText(operand1);
        }
        else if(calculatorState() == states.accumulatingOperand2) {
            operand2 = (operand2 * 10) + num;
            setOperand2(operand2);

            calculatorState = transition(calculatorState, actions.number);
            setCalculatorState(() => calculatorState);

            setScreenText(operand2);
        }
    }

    const calculate = () => {
        if(operator == "+") {
            return operand1 + operand2;
        }
        else if(operator == "-") {
            return operand1 - operand2;
        }
        else if(operator == "*") {
            return operand1 * operand2;
        }
        else if(operator == "/") {
            return operand1 / operand2;
        }
        else {
            return operand1;
        }
    }  

    const handleClear = () => {
        operand1 = 0;
        setOperand1(operand1);

        operand2 = 0;
        setOperand2(operand2);

        operator = "";
        setOperator(operator);

        calculatorState = consState();
        setCalculatorState(() => calculatorState);

        setScreenText(operand1);
    };

    const handleEquals = () => {
        if(isNaN(calculate())) {  //edge case
            calculatorState = transition(calculatorState, actions.syntaxError);
            setCalculatorState(() => calculatorState);

            setScreenText(SYNTAX_ERROR);
        }
        else if(calculatorState() == states.accumulatingOperand2) {
            const result = calculate();
            setOperand1(result);

            console.log(result);
            
            setOperand2(0);
            setScreenText(result);
            
            calculatorState = transition(calculatorState, actions.operator);
            setCalculatorState(() => calculatorState);
        }
    }

    const handleOperator = operatorText => {
        if(calculatorState() == states.accumulatingOperand1) {
            operator = operatorText;
            setOperator(operator);

            calculatorState = transition(calculatorState, actions.operator);
            setCalculatorState(() => calculatorState);

            setScreenText(operand2);
        }
        else if(calculatorState() == states.accumulatingOperand2) {
            handleEquals();
            
            operator = operatorText;
            setOperator(operator);

            calculatorState = transition(calculatorState, actions.operator);
            setCalculatorState(() => calculatorState);
        }
    }

    const isOp = text => ["+", "-", "*", "/"].includes(text);

    const isSyntaxError = () => calculatorState() == states.syntaxError;

    const handleSyntaxError = () => {
        setScreenText(SYNTAX_ERROR);
    };

    const handleButtonPress = text => {
        if(isSyntaxError() && text != "C") {
            handleSyntaxError();
        }
        else if(isOp(text)) {
            handleOperator(text);
        }
        else if(text == "=") {
            handleEquals();
        }
        else if(text == "C") {
            handleClear();
        }
        else {
            handleNumberPress(text);
        }
    };

    const styles = {
        div: {
            border: "6px solid black",
            padding: "5px",
            width: "250px",
            marginRight: "auto",
            marginLeft: "auto",
            backgroundColor: "#454b45"
        }
    };

    return (
        <div style={styles.div}>
            <Screen screenText={screenText} whatsOnScreen={console.log} />
            <Pad handleButtonPress={handleButtonPress} />
        </div>
    );
}