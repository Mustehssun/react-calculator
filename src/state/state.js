const states = {
    accumulatingOperand1: "accumulating operand1",
    accumulatingOperand2: "accumulating operand2",
    syntaxError: "syntax error"
};

const actions = {
    operator: "operator",
    number: "number",
    syntaxError: "syntax error"
};

const consState = () => {
    return () => states.accumulatingOperand1;
}

const transition = (state, action) => {
    if(action == actions.operator) {
        if(state() == states.accumulatingOperand1) {
            return () => states.accumulatingOperand2;
        }
        else if(state() == states.accumulatingOperand2) {
            return () => states.accumulatingOperand1;
        }
    }
    else if(action == actions.number) {
        return state;
    }
    else if(action == actions.syntaxError || state() == states.syntaxError) {
        return () => states.syntaxError;
    }
}

module.exports = {
    consState,
    transition,
    states,
    actions
};