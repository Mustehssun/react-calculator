import { serialSequenceGenerator } from "mustehssun-key-generator";
import { mapNthElement, reverseRange } from "../../utils/listUtils";

export default function Pad(props) {
    const generateKey = serialSequenceGenerator("span");

    const styles = {
        outerPad: {
            border: "3px solid #2f0404",
            borderRadius: "3%",
            margin: "5px",
            padding: "5px",
            width: "200px",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "rgb(50 28 28)",
            boxShadow: "1px 2px"
        },
        button: {
            borderRadius: "50%",
            margin: "10px",
            width: "40px",
            height: "40px",
            backgroundColor: "rgb(164 26 26)",
            color: "white",
            fontSize: "20px"
        }
    };

    const reversedButtons = reverseRange(0, 9).map(num => (
        <span key={num}>
            <button
            style={styles.button}
            onClick={() => props.handleButtonPress(num)} 
            id={num} 
            key={num}>
                {num}
            </button> 
            &nbsp; 
        </span>
    ));

    return (
        <div style={styles.outerPad}>
            {mapNthElement(reversedButtons, 3, button => (<span key={generateKey()}><br />{button}</span>))}
            <br />
            <button style={styles.button} onClick={() => props.handleButtonPress("+")} id="+">+</button>&nbsp;
            <button style={styles.button} onClick={() => props.handleButtonPress("-")} id="-">-</button>&nbsp;
            <button style={styles.button} onClick={() => props.handleButtonPress("*")} id="*">X</button>&nbsp;
            <button style={styles.button} onClick={() => props.handleButtonPress("/")} id="/">/</button>&nbsp;
            <br />
            <button style={styles.button} onClick={() => props.handleButtonPress("=")} id="=">=</button>&nbsp;
            <button style={styles.button} onClick={() => props.handleButtonPress("C")} id="C">C</button>&nbsp;
        </div>
    );
}