var virt = require("virt"),
    propTypes = require("prop_types"),
    app = require("../index"),
    Theme = require("../theme"),
    RouteStore = require("../stores/RouteStore");


var AppPrototype;


module.exports = App;


function App(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.theme = new Theme();
    this.size = null;

    this.state = {
        render: null
    };

    this.onChange = function() {
        return _this.__onChange();
    };

    this.onResize = function(data, next, messenger) {
        return _this.__onResize(data, next, messenger);
    };
}
virt.Component.extend(App, "App");
AppPrototype = App.prototype;

App.childContextTypes = {
    theme: propTypes.object.isRequired,
    size: propTypes.object
};

AppPrototype.getChildContext = function() {
    return {
        theme: this.theme,
        size: this.size
    };
};

AppPrototype.__onChange = function() {
    var pageState = RouteStore.getState(),
        renderPage = app.getPage(pageState);

    if (renderPage) {
        this.setState({
            ctx: RouteStore.getContext(),
            render: renderPage
        });
    } else {
        throw new Error("App onChange no page state found named " + pageState);
    }
};

AppPrototype.__onResize = function(data, next) {
    this.size = data;
    this.forceUpdate();
    next();
};

AppPrototype.componentDidMount = function() {
    var _this = this;

    RouteStore.addChangeListener(this.onChange);
    this.onMessage("virt.resize", this.onResize);

    this.emitMessage("virt.getDeviceDimensions", null, function(error, data) {
        if (!error) {
            _this.size = data;
        }
    });
};

AppPrototype.componentWillUnmount = function() {
    RouteStore.removeChangeListener(this.onChange);
    this.offMessage("virt.resize", this.onResize);
};

AppPrototype.render = function() {
    if (this.state.render) {
        return (
            virt.createView("div", {
                className: "App"
            }, this.state.render(this.state.ctx))
        );
    } else {
        return (
            virt.createView("div", {
                className: "App"
            })
        );
    }
};
