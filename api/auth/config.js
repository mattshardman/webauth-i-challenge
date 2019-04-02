function sessionConfig(session) {
  const SessionStore = require("connect-session-knex")(session);

  return {
    name: "connect.sid",
    secret: "A long secret that no-one will get",
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
    store: new SessionStore({
      knex: require("../knexfile"),
      tablename: "active_sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 1000 * 60 * 60
    })
  };
}

module.exports = sessionConfig;
