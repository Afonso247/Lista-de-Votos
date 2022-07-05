/*function generate() {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);

}*/

function generate() {
    let id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return id;

};

generate();