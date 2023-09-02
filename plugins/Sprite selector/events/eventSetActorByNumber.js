// Give it a list of sprites, and it'll handle building all the logic hell
export const id = "EVENT_SET_ACTOR_SPRITE_BY_NUMBER";
export const groups = ["EVENT_GROUP_ACTOR"];
export const name = "Set Actor Sprite By Number";
export const description = "Set an actor to a spritesheet by number";

const MAX_OPTIONS = 32;

export const fields = [].concat(
    [
        {
            key: "variable",
            type: "variable",
            label: "Spritesheet to Set",
            description: "Variable for tracking which of the sprites we have currently selected.",
            defaultValue: "LAST_VARIABLE",
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
    const {_addComment, event, actorSetActive, actorSetSprite, caseVariableValue,
        variableInc, variableDec, inputScriptSet} = helpers;
    //variableSetToValue(input.variableSelectedSprite, 0);
    // actorSetActive(input.actorId);
    // const spriteLookup = Array(input.items)
    //   .fill()
    //   .reduce((memo, _, i) => {
    //       const idx = i+1;
    //       if (!memo[idx]) {
    //           return {
    //               ...memo,
    //               [idx]: actorSetSprite(input[`spriteSheetId${idx}`]),
    //           };
    //       }
    //       return memo;
    //   }, {});
    // actorSetActive(input.actorId);
    // caseVariableValue(input.variable, spriteLookup, []);
    const varia = parseInt(input.variable, 10);
    if (varia === 1)
    {
      actorSetActive(input.actorId);
      actorSetSprite(input["spriteSheetId1"]);
    }
    else if (varia === 2)
    {
      actorSetActive(input.actorId);
      actorSetSprite(input["spriteSheetId2"]);
    }
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
    //waitUntilAfterInitFade: false,
    };
