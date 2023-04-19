const createLog = (lastLog: string) => {
    let src = "";
    if (lastLog === "/branch1.png" || lastLog === "/branch2.png") {
      return "/trunk1.png";
    }
    if (Math.random() * 4 <= 1) {
      src = Math.random() > 0.5 ? "/trunk1.png" : "/trunk2.png";
    } else {
      if (Math.random() > 0.5) {
        src = "/branch1.png";
      } else {
        src = "/branch2.png";
      }
    }
    return src;
  };

const generateTree = (length: number) => {
  const arr = [];
  let prevLog = "/trunk1.png";
  for (let i = 0; i < length; i++) {
    const log = createLog(prevLog);
    arr.push(log);
    prevLog = log;
  }

  return [...arr, "/trunk1.png"];
};

export { generateTree, createLog }