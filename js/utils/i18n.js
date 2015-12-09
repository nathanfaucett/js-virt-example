var i18n = require("i18n"),
    fastSlice = require("fast_slice"),
    UserStore = require("../stores/UserStore");


module.exports = i18nBound;


function i18nBound(key) {
    return i18n(UserStore.user.locale, key, fastSlice(arguments, 1));
}
