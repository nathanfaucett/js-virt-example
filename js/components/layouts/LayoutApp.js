var virt = require("virt"),
    virtModal = require("virt-modal"),
    propTypes = require("prop_types"),
    Header = require("../Header"),
    Footer = require("../Footer"),
    app = require("../..");


var LayoutAppPrototype;


module.exports = LayoutApp;


function LayoutApp(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(LayoutApp, "LayoutApp");
LayoutAppPrototype = LayoutApp.prototype;

LayoutApp.propTypes = {
    ctx: propTypes.object.isRequired,
    i18n: propTypes.func.isRequired,
    render: propTypes.func.isRequired
};

LayoutApp.contextTypes = {
    theme: propTypes.object.isRequired
};

LayoutApp.childContextTypes = {
    ctx: propTypes.object.isRequired,
    i18n: propTypes.func.isRequired
};

LayoutAppPrototype.getChildContext = function() {
    return {
        ctx: this.props.ctx,
        i18n: this.props.i18n
    };
};

LayoutAppPrototype.render = function() {
    return (
        virt.createView("div", {
                className: "Layout"
            },
            virt.createView("div",
                virt.createView(Header),
                this.props.render(this.props.ctx),
                virt.createView(Footer),
                virt.createView(virtModal.Modals, {
                    modals: app.getModals(this.props.ctx)
                })
            )
        )
    );
};
