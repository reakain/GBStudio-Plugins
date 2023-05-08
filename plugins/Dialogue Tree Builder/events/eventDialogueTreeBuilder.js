// Provide easy addition of logic swapping for dialogue branches.
// Easy addition of dialogue branches... Maybe able to import Twine? Oh god that would be A Lot
//const l10n = require("../helpers/l10n").default;

export const id = "EVENT_DIALOGUE_TREE_BUILDER";
export const groups = ["EVENT_GROUP_DIALOGUE"];
export const name = "Dialogue Tree Builder";
export const description = "A maybe better way to build dialogue trees with various events, logic, and options.";
export const MAX_OPTIONS = 8;


export const fields = [].concat(
  // text group
  [
    {
      key: "text",
      type: "textarea",
      placeholder: "Text...",
      multiple: true,
      defaultValue: "",
      flexBasis: "100%",
    },
    {
      key: "avatarId",
      type: "avatar",
      toggleLabel: "Add Avatar",
      label: "Avatar",
      defaultValue: "",
      optional: true,
    },
    {
      key: "operation",
      type: "select",
      options: [
        ["mathlogic", "Math Expression"],
        ["yesno", "Yes/No"],
        ["textopts", "Text Options"],
      ],
      defaultValue: "mathlogic",
      width: "50%",
    },
  ],
  
  [
    // math logic
    {
      key: "expression",
      type: "matharea",
      rows: 5,
      placeholder: "e.g. $health >= 0...",
      defaultValue: "",
      conditions: [
        {
          key: "operation",
          eq: "mathlogic",
        },
      ],
    },
    // Yes/No text options
    {
      key: "variable",
      label: "Set Variable",
      type: "variable",
      defaultValue: "LAST_VARIABLE",
      conditions: [
        {
          key: "operation",
          in: ["yesno", "textopts"],
        },
      ],
    },
    {
      key: "layout",
      type: "select",
      label: "Layout",
      width: "50%",
      options: [
        ["dialogue", "Dialogue"],
        ["menu", "Menu"],
      ],
      defaultValue: "dialogue",
      conditions: [
        {
          key: "operation",
          in: ["yesno", "textopts"],
        },
      ],
    },
    {
      key: "changeOptions",
      type: "checkbox",
      label: "Change Yes/No text?",
      width: "50%",
      defaultValue: false,
      alignCheckbox: true,
      conditions: [
        {
          key: "operation",
          eq: "yesno",
        },
      ],
    },
    {
      key: "yesText",
      type: "text",
      label: "Yes Text",
      defaultValue: "Yes",
      width: "50%",
      conditions: [
        {
          key: "operation",
          eq: "yesno",
        },
        {
          key: "changeOptions",
          eq: true,
        },
      ],
    },
    {
      key: "noText",
      type: "text",
      label: "No Text",
      defaultValue: "No",
      width: "50%",
      conditions: [
        {
          key: "operation",
          eq: "yesno",
        },
        {
          key: "changeOptions",
          eq: true,
        },
      ],
    },
    // True/False tab events
    {
      key: "__scriptTabs",
      type: "tabs",
      defaultValue: "eventTrue",
      values: {
        eventTrue: "If True/Yes",
        eventFalse: "If False/No"
      },
      conditions: [
        {
          key: "operation",
          in: ["mathlogic", "yesno"],
        },
      ],
    },
    {
      key: "eventTrue",
      label: "If True/Yes",
      type: "events",
      conditions: [
        {
          key: "__scriptTabs",
          in: ["eventTrue"],
        },
        {
          key: "operation",
          in: ["mathlogic", "yesno"],
        },
      ],
    },
    {
      key: "eventFalse",
      label: "If False/No",
      type: "events",
      conditions: [
        {
          key: "__scriptTabs",
          in: ["eventFalse"],
        },
        {
          key: "operation",
          in: ["mathlogic", "yesno"],
        },
      ],
    },
  // text options
    {
      key: "items",
      label: "Number of Options",
      type: "number",
      width: "50%",
      min: 2,
      max: MAX_OPTIONS,
      defaultValue: 2,
      conditions: [
        {
          key: "operation",
          eq: "textopts",
        },
      ],
    },
  ...Array(MAX_OPTIONS)
    .fill()
    .reduce((arr, _, i) => {
      const idx = i + 1;
      arr.push(
        {
          key: `__collapseCase${idx}`,
          label: `When: $$option${idx}$$`,
          conditions: [
            {
              key: "items",
              gte: idx,
            },
            {
              key: "operation",
              eq: "textopts",
            },
          ],
          type: "collapsable",
          defaultValue: false,
        },
        {
          key: `option${idx}`,
          label: `Set to '${idx}' if`,
          type: "text",
          defaultValue: "",
          placeholder: `Option ${idx}`,
          conditions: [
            {
              key: `__collapseCase${idx}`,
              ne: true,
            },
            {
              key: "items",
              gte: idx,
            },
            {
              key: "operation",
              eq: "textopts",
            },
          ],
        },
        {
          key: `eventOption${idx}`,
          label: `${idx}`,
          type: "events",
          conditions: [
            {
              key: `__collapseCase${idx}`,
              ne: true,
            },
            {
              key: "items",
              gte: idx,
            },
            {
              key: "operation",
              eq: "textopts",
            },
          ],
        }
      );
      return arr;
    }, []),
  ],
);

export const compile = (input, helpers) => {
  const { textDialogue, ifExpression, _addComment, textChoice, 
    ifVariableTrue, textMenu, caseVariableValue} = helpers;
  const truePath = input.eventTrue;
  const falsePath = input.eventFalse;
  const operation = input.operation;

  _addComment("Dialogue Tree Logic");

  // Print initial text
  textDialogue(input.text || " ", input.avatarId);

  // If we're doing a math logic switch
  if (operation === "mathlogic")
  {
    // Check expression
    ifExpression(input.expression || "0", truePath, falsePath);
  } 
  // If we're just asking the user yes/no
  else if (operation === "yesno") {
    textMenu(input.variable, [input.yesText, input.noText], input.layout);
    caseVariableValue(input.variable, {1:truePath, 2:falsePath});
  }
  // If we're doing text options switch
  else if (operation === "textopts") {
    const choiceLookup = Array(input.items)
      .fill()
      .reduce((memo, _, i) => {
        const key = i+1;
        if (!memo[key]) {
          return {
            ...memo,
            [key]: input[`eventOption${key}`],
          };
        }
        return memo;
      }, {});
    textMenu(input.variable,
      [
        input.option1,
        input.option2,
        input.option3,
        input.option4,
        input.option5,
        input.option6,
        input.option7,
        input.option8,
      ].splice(0,input.items),
      input.layout);
    caseVariableValue(input.variable, choiceLookup, []);
  }

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