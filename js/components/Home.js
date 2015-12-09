var virt = require("virt"),
    propTypes = require("prop_types");


var HomePrototype;


module.exports = Home;


function Home(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Home, "Home");

HomePrototype = Home.prototype;

Home.contextTypes = {
    i18n: propTypes.func.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

HomePrototype.getStyles = function() {
    var styles = {
        root: {}
    };

    return styles;
};

HomePrototype.render = function() {
    var styles = this.getStyles();

    return (
        virt.createView("div", {
            className: "Home",
            style: styles.root
        })
    );
};
