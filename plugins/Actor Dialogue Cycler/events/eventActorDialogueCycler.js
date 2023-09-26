// Provide easy addition of logic swapping for dialogue branches.
// Easy addition of dialogue branches... Maybe able to import Twine? Oh god that would be A Lot
//const l10n = require("../helpers/l10n").default;

export const id = "EVENT_ACTOR_DIALOGUE_CYCLER";
export const groups = ["EVENT_GROUP_ACTOR", "EVENT_GROUP_DIALOGUE"];
export const name = "Actor Dialogue Cycler";
export const description = "Do you want an actor to cycle through a bunch of dialogue options? Here you go!";
export const MAX_OPTIONS = 16;


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
      label: "Shuffle Order",
      description: "Randomize the order they cycle through. Currently does nothing",
      type: "checkbox",
      width: "50%",
      defaultValue: false,
      alignCheckbox: true,
    },
    {
      key: "randomPick",
      label: "Random Pick",
      description: "Picks at random from the list every time it triggers.",
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
    variableSetToValue, getNextLabel, variableSetToRandom, _jump, variableValueOperation} = helpers;

  _addComment("Actor Dialogue Cycler");

  // Get our goto label, nevermind, we aren't actually doing a loop, lol
  //const loopId = getNextLabel();

  // If our variable is not within the bounds of our number of choices, reset it to zero:
  if (input.randomPick){
    _addComment("Get Random dialogue option");
    variableSetToRandom(input.variable, 0, input.items);
  }
  else{
    _addComment("Get Next dialogue option");
    ifExpression(input.variable+"<0||" +input.variable+">="+input.items, () => { variableSetToValue(input.variable, 0);});
  }

  // // If we have more than 16 items...
  // if (input.items > 16)
  // {
  //   numSwitches = Math.ceil(input.items/16);
  //   currentNum = -1;
  //   const choiceSets = Array(numSwitches)
  //               .fill()
  //               .reduce((memo, _, i) => {
  //                 choiceSets[i] = Array(input.items)
  //                 .fill()
  //               .reduce((memo, _, j) => {
  //                 currentNum = currentNum + 1;
  //                 const key = currentNum;
  //                 if (!memo[key]) {
  //                   return {
  //                     ...memo,
  //                     [key]: input[`option${currentNum}`],//textDialogue(input[`option${i}`] || " ", input[`avatarId${i}`]),
  //                   };
  //                 }
  //                 return memo;
  //               }, {});
  //               });
  
  //   for (let i = 0; i < numSwitches; i++)
  //   {
  //     // At this point we've aggressed the code from inside the "caseVariableValue" helper function function
  //   const caseKeys = Object.keys(choiceSets[i]);
  //   //const numCases = caseKeys.length;

  //   const caseLabels = caseKeys.map(() => getNextLabel());
  //   }

  //   const endLabel = getNextLabel();

  //   _addComment(`Switch Variable`);
  //   _switchVariable(
  //     input.variable,
  //     caseLabels.map((label, i) => [Number(caseKeys[i]), `${label}$`]),
  //     0
  //   );
  //   _addNL();

  //     if (i > 0)
  //     {

  //     }
  //   // "Else option, for more than 16"
  //   //this._compilePath(falsePath);
  //   //this._jump(endLabel);

  //   // Cases
  //   for (let i = 0; i < input.items; i++) {
  //     _addComment(`case ${i}:`);
  //     _label(caseLabels[i]);
  //     // There the original code compiled path options, we instead just show the text dialogue
  //     textDialogue(input[`option${i}`] || " ", input[`avatarId${i}`])
  //     _jump(endLabel);
  //   }
  //   _label(endLabel);

  //   _addNL();
  //   }
  // }
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

    // At this point we've aggressed the code from inside the "caseVariableValue" helper function function
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

    // "Else option, for more than 16?"
    //this._compilePath(falsePath);
    //this._jump(endLabel);

    // Cases
    for (let i = 0; i < input.items; i++) {
      _addComment(`case ${i}:`);
      _label(caseLabels[i]);
      // There the original code compiled path options, we instead just show the text dialogue
      textDialogue(input[`option${i}`] || " ", input[`avatarId${i}`])
      _jump(endLabel);
    }
    _label(endLabel);

    _addNL();

  if (!input.randomPick){
  // Increment variable number, we don't have to bother if we're randomly picking
  variableValueOperation(input.variable, ".ADD", 1);
  }
  


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