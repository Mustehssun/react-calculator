import { useEffect, useState } from "react";

export default function Screen(props) {
    const changeValueWeird = event => event.target.value = props.screenText;

    const styles = {
        div: {
            border: "3px solid black",
            padding: "5px",
            width: "200px",
            margin: "18px",
            marginRight: "auto",
            marginLeft: "auto",
            backgroundColor: "white"
        },
        input: {
            width: "200px",
            border: "none",
            backgroundColor: "white",
            color: "black",
            fontSize: "20px",
            fontWeight: "bold"
        }
    };

    return (
            <div style={styles.div}>
                <input style={styles.input}
                    type="text"
                    label="text"
                    placeholder="0"
                    id="text"
                    name="text"
                    value={props.screenText}
                    onChange={changeValueWeird}
                />
            </div>
    );
}