// helper: add operation to a definition
const addOperation = (operation = {}) => ({
  to: definition => {
    definition.operations = definition.operations || [];
    definition.operations.push(operation);
  }
});

// helper: context shortcuts
const metaContext = definition => ({
  default: default_(definition),
  describe: describe(definition)
});

const dependencyContext = definition => ({
  using: using(definition)
});

const mathContext = definition => ({
  add: add(definition),
  subtract: subtract(definition),
  addOne: addOne(definition),
  subtractOne: subtractOne(definition),
  calculate: calculate(definition)
});

// entry point: define
const define = (definition = {}) => (name = "") => {
  definition.name = name;
  definition.type = "definition";

  return {
    ...dependencyContext(definition),
    ...metaContext(definition)
  };
};

// entry point: modifier
const modifier = (definition = {}) => (name = "") => {
  definition.name = name;
  definition.type = "modifier";
  return { describe: describe(definition), modifies: modifies(definition) };
};

const modifies = (definition = {}) => target => {
  addOperation({
    type: "modifies",
    target
  }).to(definition);

  return {
    ...mathContext(definition)
  };
};

const describe = (definition = {}) => (description = null) => {
  definition.description = description;

  return {
    ...metaContext(definition),
    ...dependencyContext(definition),
    ...mathContext(definition)
  };
};

const default_ = (definition = {}) => value => {
  definition.defaultValue = value;

  return { using: using(definition), describe: describe(definition) };
};

const using = (definition = {}) => (...targets) => {
  addOperation({
    type: "using",
    targets: [...targets]
  }).to(definition);

  return {
    ...mathContext(definition)
  };
};

const add = (definition = {}) => value => {
  addOperation({
    type: "add",
    value
  }).to(definition);

  return {
    ...mathContext(definition),
    modifies: modifies(definition)
  };
};

const subtract = (definition = {}) => value => {
  addOperation({
    type: "subtract",
    value
  }).to(definition);

  return {
    ...mathContext(definition)
  };
};

const addOne = (definition = {}) => target => ({
  forEvery: n => {
    addOperation({
      type: "addOneForEvery",
      target,
      n
    }).to(definition);

    return {
      ...mathContext(definition)
    };
  }
});

const subtractOne = (definition = {}) => target => ({
  forEvery: n => {
    addOperation({
      type: "subtractOneForEvery",
      target,
      n
    }).to(definition);

    return {
      ...mathContext(definition)
    };
  }
});

const calculate = (definition = {}) => fn => {
  addOperation({
    type: "calculate",
    fn
  }).to(definition);

  return {
    ...mathContext(definition)
  };
};

const inventory = (definition = {}) => ({
  give: give(definition),
  take: take(definition)
});

const give = (definition = {}) => (name, quantity = 1) => {
  definition.inventory = definition.inventory || [];
  while (quantity--) definition.inventory.push(name);

  return {
    give: give(definition),
    take: take(definition)
  };
};

const take = (definition = {}) => (name, quantity = 1) => {
  definition.inventory = definition.inventory || [];
  definition.inventory = definition.inventory.filter(inv => {
    if (inv === name && quantity--) return false;
    return true;
  });

  return {
    give: give(definition),
    take: take(definition)
  };
};

export default { define, modifier, inventory };
