// Give it a tile to animate, and one tiles to cycle through
// https://gbstudiocentral.com/tips/animating-background-tiles-3-1/
export const id = "EVENT_CALENDAR_UPDATER";
export const groups = ["EVENT_GROUP_SCENE"];
export const name = "Calendar Updater";
export const description = "Handle Drawing our calendar image";

// VM_REPLACE_TILE_XY https://www.gbstudio.dev/docs/scripting/gbvm/gbvm-operations/#vm_replace_tile_xy
// VM_SET_CONST https://www.gbstudio.dev/docs/scripting/gbvm/gbvm-operations#vm_set_const
// VM_POP https://www.gbstudio.dev/docs/scripting/gbvm/gbvm-operations#vm_pop

export const swapTile = (sourceIDX, targetIDX, mapX, mapY, sourceName, helpers) => {
  const { _addComment, appendRaw, getVariableAlias} = helpers;
  _addComment("Swapping tile");
  appendRaw(`VM_PUSH_CONST ${sourceIDX}`);
  appendRaw(`VM_GET_TILE_XY ${getVariableAlias(targetIDX)}, ${getVariableAlias(mapX)}, ${getVariableAlias(mapY)}`)
  appendRaw(`VM_REPLACE_TILE ${getVariableAlias(targetIDX)}, ___bank_bg_${sourceName}, _bg_${sourceName}, .ARG0, 1`);
  appendRaw(`VM_POP 1`);
};

export const fields = [].concat(
  [
    {
      key: "current_day",
      label: "Current Day",
      description: "The variable you hold your current day info in",
      type: "variable",
      defaultValue: "LAST_VARIABLE"
    },
    {
      key: "loopCount",
      label: "Temp Var 0",
      description: "Which variable to use for internal operations",
      type: "variable",
      defaultValue: "LAST_VARIABLE"
    },
    {
      key: "isSingle",
      label: "Temp Var 1",
      description: "Which variable to use for internal operations",
      type: "variable",
      defaultValue: "LAST_VARIABLE"
    },
    {
      key: "currentX",
      label: "Temp Var 2",
      description: "Which variable to use for internal operations",
      type: "variable",
      defaultValue: "LAST_VARIABLE"
    },
    {
      key: "currentY",
      label: "Temp Var 3",
      description: "Which variable to use for internal operations",
      type: "variable",
      defaultValue: "LAST_VARIABLE"
    },
    {
      key: "tileIDX",
      label: "Temp Var 4",
      description: "Which variable to use for internal operations",
      type: "variable",
      defaultValue: "LAST_VARIABLE"
    }
  ],
    [
        // Target tile
        {
            key: "target_x",
            label: "X",
            description: "First day tile X index.",
            type: "number",
            min: -96,
            max: 96,
            defaultValue: 2,
            width: "50%",
          },
          {
            key: "target_y",
            label: "Y",
            description: "First day tile y index.",
            type: "number",
            min: -96,
            max: 96,
            defaultValue: 6,
            width: "50%",
          },
          {
            key: "space_x",
            label: "X Spacing",
            description: "Number of tiles between calendar days horizontally",
            type: "number",
            min: 0,
            max: 96,
            defaultValue: 1,
            width: "50%",
          },
          {
            key: "space_y",
            label: "Y Spacing",
            description: "Number of tiles between calendar days vertically",
            type: "number",
            min: 0,
            max: 96,
            defaultValue: 2,
            width: "50%",
          },
          {
            key: "numDaysRow",
            label: "Days per Row",
            description: "The number of day tiles per row in the calendar",
            type: "number",
            min: 1,
            max: 96,
            defaultValue: 7,
            width: "50%",
          },
          {
            key: "numDays",
            label: "Num Days",
            description: "Number of days in your calendar",
            type: "number",
            min: 1,
            max: 96,
            defaultValue: 28,
            width: "50%",
          },
          {
            key: "startTileType",
            label: "Starting Tile Type",
            description: "Is your first tile a double or single width tile?",
            type: "select",
            options: [
              ["single", "single"],
              ["double", "double"]
            ],
            defaultValue: "single",
          },
          {
            key: "tileSizeType",
            label: "Tile Size Type",
            description: "Do your tiles alternate between single and double, or are they all singles or all doubles?",
            type: "select",
            options: [
              ["alternate","alternate"],
              ["single", "single"],
              ["double", "double"]
            ],
            defaultValue: "alternate",
          }
    ],
    [
        // Source tile
        {
          key: "source_name",
          label: "Tilemap Source",
          type: "text",
          description: "The name of the background you are getting tiles from. from the GBVM name it should be the _bg_[Tilemap source name here]",
          multiple: false,
          defaultValue: "calendartiles_tileset",
          flexBasis: "100%",
        },
        {
          key: "blank1_idx",
          label: "Blank Single Index",
          description: "Tilebank index for the empty calendar tile that's a single 8x8 tile",
          type: "number",
          min: 0,
          max: 96,
          defaultValue: 8,
          width: "50%",
        },
        {
          key: "blank2_idx",
          label: "Blank Double Index",
          description: "Tilebank index for the empty calendar tile that's two 8x8 tiles. Assumes this + 1 is the second tile index",
          type: "number",
          min: 0,
          max: 96,
          defaultValue: 6,
          width: "50%",
        },
        {
          key: "x1_idx",
          label: "X Single Index",
          description: "Tilebank index for the crossed out calendar tile that's a single 8x8 tile",
          type: "number",
          min: 0,
          max: 96,
          defaultValue: 5,
          width: "50%",
        },
        {
          key: "x2_idx",
          label: "X Double Index",
          description: "Tilebank index for the crossed out calendar tile that's two 8x8 tiles. Assumes this + 1 is the second tile index",
          type: "number",
          min: 0,
          max: 96,
          defaultValue: 3,
          width: "50%",
        },
        {
          key: "o1_idx",
          label: "O Single Index",
          description: "Tilebank index for the circled calendar tile that's a single 8x8 tile",
          type: "number",
          min: 0,
          max: 96,
          defaultValue: 2,
          width: "50%",
        },
        {
          key: "o2_idx",
          label: "O Double Index",
          description: "Tilebank index for the circled calendar tile that's two 8x8 tiles. Assumes this + 1 is the second tile index",
          type: "number",
          min: 0,
          max: 96,
          defaultValue: 0,
          width: "50%",
        }
    ]
);

export const compile = (input, helpers) => {
    const { _addComment,
      labelDefine,
      labelGoto,
      getNextLabel,
      getVariableAlias,
    compileEvents,
    ifVariableValue,
    ifVariableCompare,
    ifVariableTrue,
    ifVariableFalse,
    variableValueOperation,
    variablesOperation,
    variableSetToValue,
    variableSetToFalse,
    variableSetToTrue,
    ifExpression,
    variableCopy,
    whileExpression,
    warnings,
      appendRaw } = helpers;
    const isSingleStart = input.startTileType == "single";
    const isAlternate = input.tileSizeType == "alternate";
    const current_day = input.current_day;
    const source_name = input.source_name.toLowerCase();
    const { loopCount, isSingle, currentX, currentY, tileIDX,
      target_x, target_y, 
      space_x, space_y, 
      numDaysRow, numDays, 
      blank1_idx, blank2_idx,
      x1_idx, x2_idx,
      o1_idx, o2_idx
     } = input;
    _addComment("Calendar Updating");
    
    const loopId = getNextLabel();

    //x = target_x;
    //y = target_y;
    //isSingle = isSingleStart;
    // Set our starting type of tile to the defined one
    if(isSingleStart) {variableSetToTrue(isSingle);}
    else {variableSetToFalse(isSingle);}
    variableSetToValue(currentX, target_x);
    variableSetToValue(currentY, target_y);
    variableSetToValue(loopCount, 1);
    labelDefine(loopId);
    // Our for loop to cycle through all the days
    ifVariableValue(loopCount, ".LTE", numDays, () => {
      _addComment("We keep iterating our loop");
      ifVariableCompare(loopCount, ".LT", current_day, () => {
        _addComment("If less than our current day, add an x");
        ifVariableTrue(isSingle, () => {
          //If we're a single
          swapTile(x1_idx, tileIDX, currentX, currentY, source_name, {_addComment, appendRaw, getVariableAlias});
          if(isAlternate){variableSetToFalse(isSingle);}
        }, () => {
          // If we're a double
          swapTile(x2_idx, tileIDX, currentX, currentY, source_name, {_addComment, appendRaw, getVariableAlias});
          variableValueOperation(currentX, ".ADD", 1);
          swapTile(x2_idx+1, tileIDX, currentX, currentY, source_name, {_addComment, appendRaw, getVariableAlias});
          if(isAlternate){variableSetToTrue(isSingle);}
        });
      }, () => {
        ifVariableCompare(loopCount, ".EQ", current_day, () => {
          _addComment("If equal to our current day, add a circle");
          ifVariableTrue(isSingle, () => {
            //If we're a single
            swapTile(o1_idx, tileIDX, currentX, currentY, source_name, {_addComment, appendRaw, getVariableAlias});
            if(isAlternate){variableSetToFalse(isSingle);}
          }, () => {
            // If we're a double
            swapTile(o2_idx, tileIDX, currentX, currentY, source_name, {_addComment, appendRaw, getVariableAlias});
            variableValueOperation(currentX, ".ADD", 1);
            swapTile(o2_idx+1, tileIDX, currentX, currentY, source_name, {_addComment, appendRaw, getVariableAlias});
            if(isAlternate){variableSetToTrue(isSingle);}
          });
        }, () => {
          _addComment("If greater than our current day, make it blank");
          ifVariableTrue(isSingle, () => {
            //If we're a single
            swapTile(blank1_idx, tileIDX, currentX, currentY, source_name, {_addComment, appendRaw, getVariableAlias});
            if(isAlternate){variableSetToFalse(isSingle);}
          }, () => {
            // If we're a double
            swapTile(blank2_idx, tileIDX, currentX, currentY, source_name, {_addComment, appendRaw, getVariableAlias});
            variableValueOperation(currentX, ".ADD", 1);
            swapTile(blank2_idx+1, tileIDX, currentX, currentY, source_name, {_addComment, appendRaw, getVariableAlias});
            if(isAlternate){variableSetToTrue(isSingle);}
          });
        });
      });
      ifExpression(loopCount+"%" +numDaysRow+"==0", () => {
        _addComment("If we've reached the end of a row, reset x, increment y");
        if(isAlternate) {if(isSingleStart) {variableSetToTrue(isSingle);}
        else {variableSetToFalse(isSingle);}}
        variableSetToValue(currentX, target_x);
        variableValueOperation(currentY, ".ADD", 1+space_y);
      }, () => {
        variableValueOperation(currentX, ".ADD", 1+space_x);
      });
      // Increment our loop count and jump back to the top
      variableValueOperation(loopCount, ".ADD", 1);
      labelGoto(loopId);
    });
};

module.exports = {
  id,
  name,
  groups,
  fields,
  compile,
};