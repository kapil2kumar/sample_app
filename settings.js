module.exports = {
  // the 'strength' of our bcrypt hashing algorithm
  // 14 is a good strength at the present time based on the strength of
  // commodity computers
  BCRYPT_WORK_FACTOR: 14,

  // sessions will last for 1 full day
  SESSION_DURATION: 1000 * 60 * 60 * 24,

  // use stronger-than-normal security for signing our JWTs
  JWT_SIGNING_ALGORITHM: "HS512",

  //username to generate static token
  JWT_USERNAME:"kapilboon2012@gmail.com",

  //password to generate static token
  JWT_USER_PASSWORD:"Pass@123",


  // the 256-byte JWT signing key that we'll use to sign all user tokens.  this
  // should never be checked into version control, but should be the same among
  // all servers.  you can generate this using the secure-random library:
  //
  // const secureRandom = require("secure-random");
  // console.log(secureRandom(512, { type: "Buffer" }).toString("base64"));
  JWT_SIGNING_KEY: "nt5FGqKS4+mseAOImNN9hJex2Kyve9xaBkg1spam15fCkOrvsY53SPq1/bkDPzE4D7xylHYWAYklzqwXKlDkT3oq9VsrvjauUWva8pMJqxxayfDHIdDJvU+3iXSEDPldeLszthAFuyXaH87j2yuulUqsOWMBhrSov5dxcO75Pmel9utKxLts18ugfPMfhNHcQ7eNgRtiaQALwl+forN/PiOU287Ey1+ohvx5U93KECS0ErjoFD37ueu4GrH19WdblMTcADu+WDil/8TJqeE7gRtoD/bq8lnrOZy5f08RQ2jnAGZ1iyQ5n/XI8BpdXVLxG+Ge+qmHud8ZoxJabcVLh3GiyXxn0F1zkt5FujQo6lDzAZjd4aFzAz/W7cV2CYgzSb+QcXfWYcZK0AMevIgvzRhHskQNtQ+R/zB1eumun1mzIbn+4vPfQmvdQB0EPOzwV9chVNjM+2OTZb9o1zJc3lstykCs20UK/8i9VyfcJnNTXsiIba5TjOq5l8vjdTVUlJw0vTvTYT/cmW+NCoYWMA1GeZeT2lNWnPvv3MlyWZtd4j5nzZQIezLAmRMhCwaNTiAuvrTOp4DcPJl77571q9jxcGYMz0Bj3b0LPf25qkGXaImPK5QQ/lPOdeFf6wAirIFMNJwRRsNzhn0hcoS5P9VrK3cWI2rzY+GD+1b7AZE="
};
