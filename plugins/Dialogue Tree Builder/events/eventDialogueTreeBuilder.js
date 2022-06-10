// Handle over length dialogue -> From Herr Leise
// Provide easy addition of logic checks
// Easy addition of dialogue branches... Maybe able to import Twine? Oh god that would be A Lot

export const id = "EVENT_DIALOGUE_TREE_BUILDER";
export const groups = ["EVENT_GROUP_DIALOGUE"];
export const name = "Dialogue Logic Tree Builder";


// Text length handling re-used from Herr Leise
// Github:  https://github.com/HerrLeise/GB-Studio-Plugins
// Itch.io: https://herr-leise.itch.io/

// Shorten a string to less than maxLen characters without truncating words.
function shorten(str, maxLen, separator = ' ') {
	if (str.length <= maxLen) return str;
	return str.substr(0, str.lastIndexOf(separator, maxLen));
}

// make textblocks always the high of 4 rows
function setTextToDefaultHeight(str){
	// in ideation
}

// Split Text into Blocks and take care of formatting
function splitTextIntoBlocks(textToSplit,maxPerLine,maxTotal){
	
	let returnBlocks = new Array(); //return Text Blocks Array
	let scope_text = textToSplit;
	/* Testing (392 Chars, 6 Lines)
	Hello, I'm a dialogue text block, that will exceed the maximum allowed
	length by far. So we are going to split this paragraph into the
	necessary amount of text blocks to display all text.
	In addition we keep word boundaries and will not cut words in halfes.
	Also, we need to ensure, that we don't have leading or trailing
	whitespaces, and unnecessary new lines in between.
	*/
	let temp_txtLength = scope_text.length; // determine the absolute length
	let temp_blocksCountNeeded = Math.ceil(temp_txtLength / maxTotal); // determine how many blocks we will approx need - this number will change, after we perform wordboundary respecting block shorten
	
	for (let j = 0; j < temp_blocksCountNeeded; j++) {
		// extract the first shorten, then determine the shorten length and progressively strip from original block text from left to right
		let shortenText = shorten(scope_text, maxTotal);

		let shortenLength = shortenText.length;
		// after extraction and calculation of absolute width trim extracted text
		shortenText = shortenText.trim();
		
		// push the extract to the return text blocks array
		returnBlocks.push(shortenText);
		
		// NEXT:
		scope_text = scope_text.substring(shortenLength); // get everything after the original extracted text index
		scope_text = scope_text.trim(); //remove the shorten text from the original block and trim potential generated leading or trailing whitespaces with trim()

		
	}
	
	return returnBlocks;
	
	
}

// Generate Text Blocks automatically based on the length of the text (blocks) string lengths
function autoGenerateTextBlocks(dialogueText,maxPerLine,maxTotal){

	
	let newDialogueTextArray = new Array(); //What we will return if we have multiple text blocks
	let newSingleDialogueText; //the single block text we will return if no array present
	
	
	if (Array.isArray(dialogueText)) { 
		//Check if our passed text is already multiple blocks
		//if is array loop through it and test each block if it applies to the rules:
		// text should not be longer than the maxlength, if it is humanly split it
		// and add the next out of this split generated block onto the newDialogueTextArray
		for (let j = 0; j < dialogueText.length; j++) {
			let temp_rowText = dialogueText[j];
			let temp_rowLength = temp_rowText.length;
			
			// first check if the current text block is longer than it should be (maxTotal)
			if (temp_rowText.length >= maxTotal) {
				// if the current block is too long, determine how much too long
				let tempArr = splitTextIntoBlocks(temp_rowText,maxPerLine,maxTotal);
				if (Array.isArray(tempArr)) { 
					for (let i = 0; i < tempArr.length; i++) {
						let t_arr_text = tempArr[i];
						newDialogueTextArray.push( t_arr_text );
					}
				} else {
					newDialogueTextArray.push( tempArr );
				}
				
				
			} else {
				// if the current row is not to long, just place it into the return block
				newDialogueTextArray.push(temp_rowText);
			}
			
		}
		return newDialogueTextArray;
		
		
	} else { // if not test the text block if it is applicable to be split into multiple blocks
		if (dialogueText.length > maxTotal) {
			let tempArr = splitTextIntoBlocks(dialogueText,maxPerLine,maxTotal);
			if (Array.isArray(tempArr)) { 
				for (let i = 0; i < tempArr.length; i++) {
					let t_arr_text = tempArr[i];
					newDialogueTextArray.push( t_arr_text );
				}
			} else {
				newDialogueTextArray.push( tempArr );
			}
			return newDialogueTextArray;
			
		} else {
			return dialogueText; // we have nothing to do, so just return the original text
		}
	}
	
	
}


export const fields = [].concat(
  [
    {
      key: "__scriptTabs",
      type: "tabs",
      defaultValue: "text",
      values: {
        text: "Text",
        nameTag: "Name Tag",
        avatar: "Avatar",
      },
    },
  ],
  [
    {
      key: "text",
      type: "textarea",
      placeholder: "Text...",
      multiple: true,
      defaultValue: "",
      flexBasis: "100%",
      conditions: [
        {
          key: "__scriptTabs",
          in: ["text"],
        },
      ],
    },
  ],
  [
    {
      key: "nameTag",
      type: "textarea",
      placeholder: "Name",
      defaultValue: "",
      flexBasis: "100%",
      conditions: [
        {
          key: "__scriptTabs",
          in: ["nameTag"],
        },
      ],
    },
    {
      key: "nameX",
      label: "X Position",
      type: "number",
      min: 1,
      max: 20,
      defaultValue: 2,
      conditions: [
        {
          key: "__scriptTabs",
          in: ["nameTag"],
        },
      ],
    },
  ],
  {
    type: "group",
    conditions: [
      {
        key: "__scriptTabs",
        in: ["avatar"],
      },
    ],
    fields: [
      {
        key: "avatarType",
        type: "select",
        label: "Avatar Type",
        options: [
          ["small", "16x16 (from assets/avatars)"],
          ["large", "Large (made of text)"],
        ],
        defaultValue: "small",
      },
      {
        key: "avatarId",
        type: "avatar",
        toggleLabel: "Add Avatar",
        label: "Avatar",
        defaultValue: "",
        optional: true,
        conditions: [
          {
            key: "avatarType",
            eq: "small",
          },
        ],
      },
      {
        key: "largeAvatar",
        type: "textarea",
        placeholder: "Avatar",
        defaultValue: "",
        flexBasis: "100%",
        conditions: [
          {
            key: "avatarType",
            eq: "large",
          },
        ],
      },
    ]
  },  
  {
    type: "group",
    conditions: [
      {
        key: "__scriptTabs",
        in: ["avatar"],
      },
      {
        key: "avatarType",
        eq: "large",
      },
    ],
    fields: [
      {
        key: "avatarX",
        label: "X Position",
        type: "number",
        min: 1,
        max: 20,
        defaultValue: 2,
      },
      {
        key: "avatarY",
        label: "Y Position",
        type: "number",
        min: 1,
        max: 18,
        defaultValue: 2,
      },
      {
        key: "avatarWidth",
        label: "Width (in tiles)",
        type: "number",
        min: 1,
        max: 18,
        defaultValue: 3,
        conditions: [
          {
            key: "orientation",
            eq: "left",
          },
        ]
      },
      {
        key: "orientation",
        label: "Orientation",
        type: "select",
        options: [
          ["left", "Left of text"],
          ["right", "Right of text"],
        ],
        defaultValue: "left",
      },
    ]
  }
);
export const compile = (input, helpers) => {
  const { textDialogue, _getMemInt8, _addComment, _stackPushConst, _stackPop, ifVariableValue, _set, getVariableAlias} = helpers;
  _addComment("Dialogue With Name Tag/Large Avatar");
  _stackPushConst(0);
  _getMemInt8(".ARG0", "text_draw_speed")
  _set(getVariableAlias("T2"), ".ARG0");
  _stackPop(1);
  if (input.avatarType === "small") {
    for (i = 0; i <= 5; i++) {
      ifVariableValue("T2", ".EQ", 2 ** i - 1, () => {
        textDialogue(input.text.map(e => `\\001\\001\\003\\${input.nameX}\\001${input.nameTag}\\003\\${input.avatarId ? 4 : 2}\\002\\002\\001\\001\\00${i + 1}${e || " "}`), input.avatarId);
      }, []);
    }
  } else {
    input.text.forEach((e, i) => {
      input.text[i] += "\n".repeat(Math.max((input.largeAvatar.match(/\n/g) || []).length - (e.match(/\n/g) || []).length, 0));
    });
    [...input.largeAvatar.matchAll(/\n/g)].forEach((e, i) => {
      input.largeAvatar = input.largeAvatar.replace('\n', `\\003\\${oct(input.avatarX)}\\${oct(input.avatarY + i + 1)}`)
    });
    input.text[0] = "\\002\\001" + input.text[0]
    
    for (i = 0; i <= 5; i++) {
      ifVariableValue("T2", ".EQ", 2 ** i - 1, () => {
        textDialogue(input.text.map(e => `\\001\\001\\003\\${oct(input.nameX)}\\001${input.nameTag}\\003\\${oct(input.avatarX)}\\${oct(input.avatarY)}\\002\\001${input.largeAvatar}\\003\\${oct(input.orientation == "left" ? input.avatarWidth + input.avatarX : 2)}\\002\\001\\${oct(i + 1)}${e || " "}`));
      }, []);
    }
  }
};

const oct = num => ((256 + (num % 256)) % 256).toString(8).padStart(3, "0");
