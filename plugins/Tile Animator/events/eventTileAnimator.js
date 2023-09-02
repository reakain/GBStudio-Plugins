// Give it a tile to animate, and one tiles to cycle through
// https://gbstudiocentral.com/tips/animating-background-tiles-3-1/
export const id = "EVENT_TILE_ANIMATOR";
export const groups = ["EVENT_GROUP_ACTOR"];
export const name = "Tile Animator";
export const description = "Animate background tiles.";

// VM_REPLACE_TILE_XY https://www.gbstudio.dev/docs/scripting/gbvm/gbvm-operations/#vm_replace_tile_xy
// VM_SET_CONST https://www.gbstudio.dev/docs/scripting/gbvm/gbvm-operations#vm_set_const
// VM_POP https://www.gbstudio.dev/docs/scripting/gbvm/gbvm-operations#vm_pop

export const fields = [].concat(
    [
        // Target tile
        {
            key: "target_x",
            label: "X",
            type: "number",
            min: -96,
            max: 96,
            defaultValue: 0,
            width: "50%",
          },
          {
            key: "target_y",
            label: "Y",
            type: "number",
            min: -96,
            max: 96,
            defaultValue: 0,
            width: "50%",
          }
    ],
    [
        // Source tile
        {
            key: "source_idx",
            label: "Tile Index",
            type: "number",
            min: -96,
            max: 96,
            defaultValue: 0,
            width: "50%",
          },
          {
            key: "source_name",
            label: "Tilemap Source",
            type: "text",
            placeholder: "",
            multiple: false,
            defaultValue: "",
            flexBasis: "100%",
          }
    ]
)

export const compile = (input, helpers) => {
    const { appendRaw } = helpers;
    const { target_x, target_y, source_idx, source_name } = input;
    appendRaw(`
    ; start of GBVM script; lines starting with ; are comments and are ignored by the compiler

    ; Use VM_PUSH_CONST to store value we want to be called by START_IDX onto the stack, it can be accessed by the alias .ARG0 in the command.

    VM_PUSH_CONST {source_idx}

    ; call the swap function by passing the START_IDX using .ARG0 alias

    VM_REPLACE_TILE_XY {target_x}, {target_y}, ___bank_bg_{source_name}_tileset, _bg_{source_name}_tileset, .ARG0

    ; free memory assigned to .ARG0 with VM_POP

    VM_POP 1

    ; end of GBVM script
    `)
}