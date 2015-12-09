var cookies = require("cookies"),
    indexOf = require("index_of"),
    emptyFunction = require("empty_function"),
    HEADER_LOCALE = require("../consts/HEADER_LOCALE"),
    app = require("../"),
    Store = require("./Store");


var UserStore = module.exports = new Store(),

    consts = UserStore.setConsts([
        "USER_CHANGE_LOCALE"
    ]),

    navigatorLanguage = (
        navigator.language ||
        (navigator.userLanguage && navigator.userLanguage.replace(/-[a-z]{2}$/, String.prototype.toUpperCase)) ||
        "en"
    ),

    defaultLocale;


app.on("init", function() {
    var locales = app.config.locales,
        locale = cookies.get(HEADER_LOCALE);

    if (indexOf(locales, locale) === -1) {
        locale = indexOf(locales, navigatorLanguage) !== -1 ? navigatorLanguage : locales[0];
    }

    defaultLocale = locale;
    setLocale(defaultLocale);
});


UserStore.user = {
    locale: null
};

UserStore.toJSON = function() {
    return {
        user: UserStore.user
    };
};

UserStore.fromJSON = function(json) {
    UserStore.user.locale = json.locale || defaultLocale;
};

UserStore.setLocale = function(value, callback) {
    var changed = setLocale(value);
    (callback || emptyFunction)();
    return changed;
};

function setLocale(value) {
    var last = UserStore.user.locale;

    value = indexOf(app.config.locales, value) === -1 ? app.config.locales[0] : value;

    if (last !== value) {
        UserStore.user.locale = value;
        cookies.set(HEADER_LOCALE, value);
        return true;
    } else {
        return false;
    }
}

UserStore.register(function onUserPayload(payload) {
    var action = payload.action;

    switch (action.actionType) {
        case consts.USER_CHANGE_LOCALE:
            if (UserStore.setLocale(action.locale)) {
                UserStore.emit("changeLocale");
            }
            break;
    }
});
