// Provide easy addition of logic swapping for dialogue branches.
// Easy addition of dialogue branches... Maybe able to import Twine? Oh god that would be A Lot
//const l10n = require("../helpers/l10n").default;

export const id = "EVENT_DIALOGUE_TREE_BUILDER";
export const groups = ["EVENT_GROUP_DIALOGUE"];
export const name = "Dialogue Tree Builder";


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
  ],
  // logic
  [
    {
      key: "expression",
      type: "matharea",
      rows: 5,
      placeholder: "e.g. $health >= 0...",
      defaultValue: "",
    },
    {
      key: "__scriptTabs",
      type: "tabs",
      defaultValue: "eventTrue",
      values: {
        eventTrue: "If True...",
        eventFalse: "If False..."
      },
    },
  ],
  [
    {
      key: "eventTrue",
      label: "If True...",
      type: "events",
      conditions: [
        {
          key: "__scriptTabs",
          in: ["eventTrue"],
        },
      ],
    },
  ],
  [
    {
      key: "eventFalse",
      label: "If False...",
      type: "events",
      conditions: [
        {
          key: "__scriptTabs",
          in: ["eventFalse"],
        },
      ],
    },
  ],
);

export const compile = (input, helpers) => {
  const { textDialogue, ifExpression, _addComment} = helpers;
  const truePath = input.eventTrue;
  const falsePath = input.eventFalse;

  _addComment("Dialogue Tree Logic");

  // Print initial text
  textDialogue(input.text || " ", input.avatarId);

  // Check expression
 ifExpression(input.expression || "0", truePath, falsePath);

};


module.exports = {
  id,
  name,
  groups,
  fields,
  compile,
  waitUntilAfterInitFade: true,
};