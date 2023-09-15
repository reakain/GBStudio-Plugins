// So we can horde starter variable values externally/easier to track em maybe
// INCOMPLETE
export const id = "EVENT_LOAD_VARIABLES_FROM_JSON";
export const groups = ["EVENT_GROUP_VARIABLES"];
export const name = "Variable Loader";
export const description = "Loads our starting variable names and values from a json file";

export const loadJSONFile = () => {
    fetch('./variableData.json')
        .then((fields) => fields.json())
        .then((json) => console.log(json));
};

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
          key: "persist",
          type: "checkbox",
          defaultValue: true,
          label: "Persistant",
          width: "50%",
          alignCheckbox: true,
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
    const {_addComment, event, actorSetActive, playerSetSprite, caseVariableValue,
        variableInc, variableDec, inputScriptSet} = helpers;
    // const spriteLookup = Array(input.items)
    //     .fill()
    //     .reduce((memo, _, i) => {
    //         const idx = i+1;
    //         if (!memo[idx]) {
    //             return {
    //                 ...memo,
    //                 [idx]: playerSetSprite(input[`spriteSheetId${idx}`], input.persist),
    //             };
    //         }
    //         return memo;
    //     }, {});
    // caseVariableValue(input.variable, spriteLookup, []);
    loadJSONFile();
    
};

module.exports = {
    id,
    name,
    description,
    groups,
    fields,
    compile,
    waitUntilAfterInitFade: false,
    };
