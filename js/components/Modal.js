var virt = require("virt"),
    propTypes = require("prop_types"),
    app = require("..");


var ModalPrototype;


module.exports = Modal;


function Modal(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Modal, "Modal");

Modal.propTypes = {
    render: propTypes.func.isRequired,
    modal: propTypes.object.isRequired,
    ctx: propTypes.object.isRequired,
    i18n: propTypes.func.isRequired
};

Modal.childContextTypes = {
    ctx: propTypes.object.isRequired,
    modal: propTypes.object.isRequired,
    i18n: propTypes.func.isRequired
};

Modal.getChildContext = function() {
    return {
        ctx: this.props.ctx,
        modal: this.props.modal,
        i18n: this.props.i18n
    };
};

ModalPrototype = Modal.prototype;

ModalPrototype.componentDidMount = function() {
    app.page.on("request", this.props.modal.close);
};

ModalPrototype.componentWillUnmount = function() {
    app.page.off("request", this.props.modal.close);
};

ModalPrototype.getStyles = function() {
    var styles = {
        root: {
            position: "relative"
        }
    };

    return styles;
};

ModalPrototype.render = function() {
    var props = this.props,
        styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Modal",
                style: styles.root
            },
            props.render(props.ctx)
        )
    );
};
