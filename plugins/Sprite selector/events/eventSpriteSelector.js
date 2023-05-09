// Give it a list of sprites, and it'll handle building all the logic hell
export const id = "EVENT_SPRITE_SELECTOR";
export const groups = ["EVENT_GROUP_ACTOR"];
export const name = "Sprite Selector";
export const description = "Let characters select a sprite with this script.";

const MAX_OPTIONS = 16;

export const fields = [].concat(
    [
        {
            key: "variableSelectedSprite",
            type: "variable",
            label: "Selected sprite variable",
            description: "Variable for tracking which of the sprites we have currently selected.",
            defaultValue: "LAST_VARIABLE",
        },
        {
            key: "variableCurrentSprite",
            type: "variable",
            label: "Current sprite variable",
            description: "Variable for tracking which of the sprites we have currently selected.",
            defaultValue: "LAST_VARIABLE",
        },
        {
          key: "isStandardButtons",
          type: "checkbox",
          defaultValue: true,
          label: "Use Standard Buttons",
          width: "50%",
          alignCheckbox: true,
      },
      {
        key: "inputAccept",
        label: "Accept Selected Sprite",
        type: "input",
        defaultValue: ["a","start","select"],
        conditions: [
          {
            key: "isStandardButtons",
            eq: false,
          },
        ],
      },
      {
        key: "inputReject",
        label: "Reject Changes",
        type: "input",
        defaultValue: ["b"],
        conditions: [
          {
            key: "isStandardButtons",
            eq: false,
          },
        ],
      },
      {
        key: "__scriptTabs",
        type: "tabs",
        defaultValue: "Accept",
        values: {
          accept: "Accept Events",
          cancel: "Cancel Events",
        },
      },
      {
        key: "eventsAccept",
        label: "Accept Events",
        type: "events",
        allowedContexts: ["global", "entity"],
        conditions: [
          {
            key: "__scriptTabs",
            in: ["accept"],
          },
        ],
      },
      {
        key: "eventsCancel",
        label: "Cancel Events",
        type: "events",
        allowedContexts: ["global", "entity"],
        conditions: [
          {
            key: "__scriptTabs",
            in: ["cancel"],
          },
        ],
      },
        {
          key: "isPlayer",
          type: "checkbox",
          defaultValue: true,
          label: "Select Player Sprite",
          width: "50%",
          alignCheckbox: true,
      },
      {
          key: "persist",
          type: "checkbox",
          defaultValue: true,
          label: "Persistant",
          width: "50%",
          alignCheckbox: true,
          conditions: [
              {
                key: "isPlayer",
                eq: true,
              },
            ],
      },
      {
          key: "actorId",
          label: "Actor to Set",
          description: "Which actor you want to use for sprite selector",
          type: "actor",
          defaultValue: "$self$",
          width: "50%",
          conditions: [
              {
                key: "isPlayer",
                eq: false,
              },
            ],
        },
        
        {
            key: "items",
            label: "Number of Options",
            description: "The number of sprites you want as options",
            type: "number",
            width: "50%",
            min: 2,
            max: MAX_OPTIONS,
            defaultValue: 2,
          },
        ...Array(MAX_OPTIONS)
          .fill()
          .reduce((arr, _, i) => {
            const idx = i+1;
            arr.push(
              {
                key: `spriteSheetId${idx}`,
                label: `Spritesheet '${idx}'`,
                type: "sprite",
                defaultValue: "LAST_SPRITE",
                conditions: [
                    {
                        key: "items",
                        gte: idx,
                      },
                    ],
              },
            );
            return arr;
          }, []),
          
    ],
);

export const compile = (input, helpers) => {
    const {_addComment, event, actorSetActive, actorSetSprite, variableSetToValue,
        variableInc, variableDec, inputScriptSet} = helpers;
    variableSetToValue(input.variableSelectedSprite, 0);
    // Increment selected sheet
    // inputScriptSet(["right"], true, EVENTS, event.symbol );
    // Decrement selected sheet
    // inputScriptSet(["left"], true, EVENTS, event.symbol );
    // // Setting our sprite bits
    // if (input.isPlayer) {
    //     playerSetSprite(input.spriteSheetId, input.persist);
    // }
    // else{
    //     actorSetActive(input.actorId);
    //     actorSetSprite(input.spriteSheetId);
    // }
    
    
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
