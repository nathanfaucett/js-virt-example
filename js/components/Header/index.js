var virt = require("virt"),
    propTypes = require("prop_types");


var HeaderPrototype;


module.exports = Header;


function Header(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Header, "Header");

HeaderPrototype = Header.prototype;

Header.contextTypes = {
    i18n: propTypes.func.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

HeaderPrototype.getStyles = function() {
    var styles = {
        root: {}
    };

    return styles;
};

HeaderPrototype.render = function() {
    var styles = this.getStyles();

    return (
        virt.createView("div", {
            className: "Header",
            style: styles.root
        })
    );
};
