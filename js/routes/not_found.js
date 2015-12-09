var RouteStore = require("../stores/RouteStore"),
    app = require("../index");


app.router.use(
    function handleNotFound(ctx, next) {
        if (ctx.route) {
            next();
        } else {
            app.dispatcher.handleViewAction({
                actionType: RouteStore.consts.ROUTE_UPDATE,
                state: "not_found",
                ctx: ctx
            });
            ctx.end();
            next();
        }
    }
);
