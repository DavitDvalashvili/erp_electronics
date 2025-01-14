import mariadb from "mariadb";

const { DB_HOST, DB_NAME, DB_USER, DB_PORT, DB_PASSWORD, SQL_PORT } =
  process.env;

const mariadbPoolConfig: mariadb.PoolConfig = {
  host: DB_HOST,
  //port: 3308,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  multipleStatements: true,
};

const mariadbPool: mariadb.Pool = mariadb.createPool(mariadbPoolConfig);

export const createConnection = async (): Promise<mariadb.PoolConnection> => {
  return mariadbPool
    .getConnection()
    .then((connection: mariadb.PoolConnection) => {
      return connection;
    })
    .catch((err) => {
      console.log("Error establishing a database connection", err);
      throw err;
    });
};
