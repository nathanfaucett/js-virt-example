var RouteStore = require("../stores/RouteStore"),
    app = require("../index");


app.router.route(
    "/",
    function handleRoot(ctx, next) {
        app.dispatcher.handleViewAction({
            actionType: RouteStore.consts.ROUTE_UPDATE,
            state: "home",
            ctx: ctx
        });
        ctx.end();
        next();
    }
);
