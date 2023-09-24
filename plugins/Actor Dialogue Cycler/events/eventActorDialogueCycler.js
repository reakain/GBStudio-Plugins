// Provide easy addition of logic swapping for dialogue branches.
// Easy addition of dialogue branches... Maybe able to import Twine? Oh god that would be A Lot
//const l10n = require("../helpers/l10n").default;

export const id = "EVENT_ACTOR_DIALOGUE_CYCLER";
export const groups = ["EVENT_GROUP_ACTOR", "EVENT_GROUP_DIALOGUE"];
export const name = "Actor Dialogue Cycler";
export const description = "Do you want an actor to cycle through a bunch of dialogue options? Here you go!";
export const MAX_OPTIONS = 99;


export const fields = [].concat(
  [
    // Dialogue tracker variable
    {
      key: "variable",
      label: "Dialogue Tracker",
      description: "Variable to track which dialogue option to play next, should probably use a local variable",
      type: "variable",
      defaultValue: "LAST_VARIABLE",
    },
    
  // text options
    {
      key: "items",
      label: "Number of Options",
      description: "The number of dialogue options you want to have",
      type: "number",
      width: "50%",
      min: 2,
      max: MAX_OPTIONS,
      defaultValue: 2,
    },
    {
      key: "randomShuffle",
      label: "Randomize",
      description: "RAndomize the order they cycle through. Currently does nothing",
      type: "checkbox",
      width: "50%",
      defaultValue: false,
      alignCheckbox: true,
    },
    {
      type: "break",
    }
  ],
  Array(MAX_OPTIONS)
    .fill()
    .reduce((arr, _, i) => {
      const idx = i+1;
      arr.push(
        {
          key: `option${i}`,
          label: `Dialogue ${i}`,
          type: "textarea",
          placeholder: "Text...",
          multiple: true,
          defaultValue: "",
          flexBasis: "100%",
          conditions: [
            {
              key: "items",
              gt: i,
            },
          ],
        });
        arr.push(
        {
          key: `avatarId${i}`,
          type: "avatar",
          toggleLabel: "Add Avatar",
          label: "Avatar",
          defaultValue: "",
          optional: true,
          conditions: [
            {
              key: "items",
              gt: i,
            },
          ],
        }
      );
      return arr;
    }, []),
);

export const compile = (input, helpers) => {
  const { textDialogue, ifExpression, _addComment, _switchVariable, _addNL, _label, 
    variableSetToValue, getNextLabel, caseVariableValue, _jump, variableValueOperation} = helpers;

  _addComment("Actor Dialogue Cycler");

  // Get our goto label, nevermind, we aren't actually doing a loop, lol
  //const loopId = getNextLabel();

  // If our variable is not within the bounds of our number of choices, reset it to zero:
  ifExpression(input.variable+"<0||" +input.variable+">="+input.items, () => { variableSetToValue(input.variable, 0);});

  // Play dialogue associated with current variable number
  const choiceLookup = Array(input.items)
      .fill()
    .reduce((memo, _, i) => {
      const key = i;
      if (!memo[key]) {
        return {
          ...memo,
          [key]: input[`option${i}`],//textDialogue(input[`option${i}`] || " ", input[`avatarId${i}`]),
        };
      }
      return memo;
    }, {});
    
    //caseVariableValue(input.variable, choiceLookup, []);

    const caseKeys = Object.keys(choiceLookup);
    //const numCases = caseKeys.length;

    const caseLabels = caseKeys.map(() => getNextLabel());
    const endLabel = getNextLabel();

    _addComment(`Switch Variable`);
    _switchVariable(
      input.variable,
      caseLabels.map((label, i) => [Number(caseKeys[i]), `${label}$`]),
      0
    );
    _addNL();

    // Cases
    for (let i = 0; i < input.items; i++) {
      _addComment(`case ${i}:`);
      _label(caseLabels[i]);
      textDialogue(input[`option${i}`] || " ", input[`avatarId${i}`])
      //this._compilePath(cases[caseKeys[i]]);
      _jump(endLabel);
    }
    _label(endLabel);

    _addNL();

  // Increment variable number
  variableValueOperation(input.variable, ".ADD", 1);
  


  // Print initial text
  //textDialogue(input.text || " ", input.avatarId);

  // If we're doing a math logic switch
  // if (operation === "mathlogic")
  // {
  //   // Check expression
  //   ifExpression(input.expression || "0", truePath, falsePath);
  // } 
  // // If we're just asking the user yes/no
  // else if (operation === "yesno") {
  //   textMenu(input.variable, [input.yesText, input.noText], input.layout);
  //   caseVariableValue(input.variable, {1:truePath, 2:falsePath});
  // }
  // // If we're doing text options switch
  // else if (operation === "textopts") {
  //   const choiceLookup = Array(input.items)
  //     .fill()
  //     .reduce((memo, _, i) => {
  //       const key = i+1;
  //       if (!memo[key]) {
  //         return {
  //           ...memo,
  //           [key]: input[`eventOption${key}`],
  //         };
  //       }
  //       return memo;
  //     }, {});
  //   textMenu(input.variable,
  //     [
  //       input.option1,
  //       input.option2,
  //       input.option3,
  //       input.option4,
  //       input.option5,
  //       input.option6,
  //       input.option7,
  //       input.option8,
  //     ].splice(0,input.items),
  //     input.layout);
  //   caseVariableValue(input.variable, choiceLookup, []);
  //}

};


module.exports = {
  id,
  name,
  description,
  groups,
  fields,
  compile,
  waitUntilAfterInitFade: true,
};