var keyMirror = require("key_mirror"),
    dispatcher = require("../dispatcher"),
    EventEmitter = require("event_emitter");


var EVENT_CHANGE = "change",
    StorePrototype;


module.exports = Store;


function Store() {

    EventEmitter.call(this, -1);

    this.consts = null;
}
EventEmitter.extend(Store);
StorePrototype = Store.prototype;

StorePrototype.setConsts = function(object) {
    return (this.consts = keyMirror(object));
};

StorePrototype.emitChange = function() {
    this.emit(EVENT_CHANGE);
    return this;
};

StorePrototype.addChangeListener = function(callback) {
    this.on(EVENT_CHANGE, callback);
    return this;
};

StorePrototype.removeChangeListener = function(callback) {
    this.off(EVENT_CHANGE, callback);
    return this;
};

StorePrototype.register = function(callback) {
    dispatcher.register(callback);
    return this;
};
