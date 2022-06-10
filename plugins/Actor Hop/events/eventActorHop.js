const id = "EVENT_ACTOR_HOP";
const name = "Actor Hop";
const groups = ["EVENT_GROUP_ACTOR"];

const fields = [
    {
        key: "actorId",
        label: "Actor",
        type: "actor",
        defaultValue: "$self$",
        width: "100%",
    },
    {
      key: `numHops`,
      label: "Number of Hops",
      type: "number",
      min: 1,
      max: 250,
      width: "50%",
      defaultValue: 1,
    },
    {
      key: `frameWait`,
      label: "Frames Between Hops",
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
    const {actorId, numHops, frameWait} = input;
  
    _addComment("Actor Hop");

    actorSetActive(actorId);
    for (let i = 1; i <= numHops; i++) { 

    actorSetPositionRelative(0, -1);

    wait(6);

    actorSetPositionRelative(0,1);

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
