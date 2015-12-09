var EventEmitter = require("event_emitter"),
    page = require("page"),
    extend = require("extend"),
    virtModal = require("virt-modal"),
    objectMap = require("object-map"),
    request = require("request"),
    i18n = require("i18n"),

    dispatcher = require("./dispatcher"),
    router = require("./router"),

    i18nBound, App, RouteStore, UserStore;


var app = new EventEmitter(-1),

    pages = {},
    modals = {};


module.exports = app;


i18nBound = require("./utils/i18n");
App = require("./components/App");
RouteStore = require("./stores/RouteStore");
UserStore = require("./stores/UserStore");

app.config = null;
app.Component = App;
app.page = page;
app.i18n = i18nBound;
app.dispatcher = dispatcher;
app.router = router;


app.init = function(config) {
    var dispatcher = app.dispatcher,
        page = app.page;

    app.config = config;

    request.defaults.headers["Content-Type"] = "application/json";
    request.defaults.withCredentials = true;

    page.on("request", function onRequest(ctx) {
        dispatcher.handleViewAction({
            actionType: RouteStore.consts.ROUTE_CHANGE,
            ctx: ctx
        });
    });

    dispatcher.register(virtModal.ModalStore.registerCallback);

    UserStore.on("changeLocale", function onChangeLocale() {
        page.reload();
    });

    i18n.flatMode(config.flatLocaleMode);
    i18n.throwMissingError(config.throwMissingTranslationError);
    page.html5Mode(config.html5Mode);

    app.emit("init");

    page.init();
};

app.registerPage = function(name, render) {
    pages[name] = render;
};

app.registerModal = function(name, render, onClose) {
    modals[name] = {
        name: name,
        render: render,
        onClose: onClose
    };
};

app.getPage = function(name) {
    return pages[name];
};

app.getModals = function(ctx) {
    return objectMap(modals, function eachModal(m) {
        var result = extend({}, m),
            modalRender = m.render,
            modalOnClose = m.onClose;

        result.render = function(modal) {
            return modalRender(modal, ctx);
        };

        result.onClose = function(modal) {
            return modalOnClose(modal, ctx);
        };

        return result;
    });
};

require("./views");
require("./routes");
