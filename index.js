let currentState = {};

const reducer = (action) => {

  const r = {
      ...action,
      log: "reducer",
  }

  currentState= r;
}

const chain = (...funcs) => {
  if (funcs.length === 0) {
    return (x) => x;
  }


  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))

  /*
  const last = funcs[funcs.length - 1];
  const rest = funcs.slice(0, -1);

  return rest.reduceRight((acc, f) => f(acc), last((x) =>x));
  */
} 

const log1 = (next) => (a) => {
  console.log("log1 before");
  if(!true){

    next({...a, log: 1});
  }
  console.log("log1 after");
};

const log2 = (next) => (a) =>  {
  console.log("log2 before");
  next({...a, log: 2});
  console.log("log2 after");
};

const log3 = (next) => (a) =>  {
  console.log("log3 before");
  next({...a, log: 3});
  console.log("log3 after");
};


console.log("--------------------------")

chain(log1, log2, log3)(reducer)({type: "todo/add", payload: "Buy some potatoes"});
console.log("newState", currentState);

console.log("--------------------------")

