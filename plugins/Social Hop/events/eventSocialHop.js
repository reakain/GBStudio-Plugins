const id = "EVENT_SOCIAL_HOP";
const name = "Social Hop";
const groups = ["EVENT_GROUP_ACTOR"];

const fields = [
    {
        key: "actorIdFirst",
        label: "First Actor",
        type: "actor",
        defaultValue: "$self$",
        width: "100%",
    },
    {
      key: "actorIdSecond",
      label: "Second Actor",
      type: "actor",
      defaultValue: "$self$",
      width: "100%",
  },
    {
      key: `numHops`,
      label: "Max Hop Sequence",
      type: "number",
      min: 1,
      max: 250,
      width: "50%",
      defaultValue: 1,
    },
    {
      key: `frameWait`,
      label: "Frames Between Hop Sets",
      type: "number",
      min: 0,
      max: 250,
      width: "50%",
      defaultValue: 6,
    },
  ];
  
  const compile = (input, helpers) => {
    const {
      _addComment,
      actorSetPositionRelative,
      actorSetActive ,
      wait
    } = helpers;
    const {actorIdFirst, actorIdSecond, numHops, frameWait} = input;
  
    _addComment("Social Hop");
    
    for (let i = 1; i <= numHops; i++) { 

      if (i % 2 != 0) {
        actorSetActive(actorIdFirst);
      }
      else {
        actorSetActive(actorIdSecond);
      }
    
      for (let j = 1; j <= i; j++) {
        actorSetPositionRelative(0, -1);

        wait(6);

        actorSetPositionRelative(0,1);

        wait(12);
      }
      wait(frameWait);
    
    }

  };
  
  module.exports = {
    id,
    name,
    groups,
    fields,
    compile,
    waitUntilAfterInitFade: true,
  };
