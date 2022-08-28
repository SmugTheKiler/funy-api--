module.exports = function helloPlugin() {

    var app = this;

    app.hello = function (name) {
      console.log('hello, ' + name || 'anonymous');
      // To pass the name, in the app.hello(STRING)
      // See more info about plugins in ../info/plugins.md
    };

  };