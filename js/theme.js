var Theme = require("theme"),
    css = require("css");


var AppThemePrototype;


module.exports = AppTheme;


function AppTheme() {

    Theme.call(this);

    this.fontFamily = "Roboto, sans-serif";
}
Theme.extend(AppTheme, "AppTheme");
AppThemePrototype = AppTheme.prototype;

AppThemePrototype.getSpacing = function() {
    return {
        iconSize: 24,
        desktopGutter: 24,
        desktopGutterMore: 32,
        desktopGutterLess: 16,
        desktopGutterMini: 8,
        desktopKeylineIncrement: 64,
        desktopDropDownMenuItemHeight: 32,
        desktopDropDownMenuFontSize: 15,
        desktopLeftNavMenuItemHeight: 48,
        desktopSubheaderHeight: 48,
        desktopToolbarHeight: 56
    };
};

AppThemePrototype.getPalette = function() {
    return {
        primaryColor: "#c00",
        accentColor: "#4c5664",
        textColor: "rgba(0, 0, 0, 0.87)",
        canvasColor: css.colors.white,
        black: css.colors.black,
        borderColor: css.colors.white,
        disabledColor: "rgba(0, 0, 0, 0.262)"
    };
};

AppThemePrototype.getStyles = function(palette /*, spacing */ ) {
    var styles = {
        link: {
            color: palette.canvasColor,
            hoverColor: palette.primaryColor,
            focusColor: palette.primaryColor,
            downColor: palette.primaryColor
        }
    };
    return styles;
};
