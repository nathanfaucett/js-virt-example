var virt = require("virt"),
    propTypes = require("prop_types");


var FooterPrototype;


module.exports = Footer;


function Footer(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Footer, "Footer");

FooterPrototype = Footer.prototype;

Footer.contextTypes = {
    i18n: propTypes.func.isRequired,
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

FooterPrototype.getStyles = function() {
    var styles = {
        root: {}
    };

    return styles;
};

FooterPrototype.render = function() {
    var styles = this.getStyles();

    return (
        virt.createView("div", {
            className: "Footer",
            style: styles.root
        })
    );
};
