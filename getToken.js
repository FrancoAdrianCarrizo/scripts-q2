const querystring = require("querystring");
const oauthUrl = process.env.OAUTH_URL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const getToken = async () => {
  const oauthHeaders = await generateToken(
    "assessment-backend:read",
    "assessment-backend:write",
    "statement-backend:read",
    "statement-backend:write"
  );
  return {
    headers: oauthHeaders,
  };
};

async function generateToken(scope, scope2) {
  const tokenUrl = `${oauthUrl}/menu/api/oauth2/token`;
  const payload = querystring.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
    scope: `${scope},${scope2}`,
  });

  console.log("making request");
  // console.log('payload: ' + payload);
  // console.log('token_url: ' + tokenUrl);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: "XSRF-TOKEN=046a0733-7088-487c-ab5d-1eaa4069ea8b",
    },
    body: payload,
  };

  const response = await fetch(tokenUrl, options);
  const data = await response.json();

  const headers = createHeaders(data.access_token);
  return headers;
}

function createHeaders(accessToken) {
  return {
    "Content-Type": "application/json",
    Authorization: `bearer ${accessToken}`,
  };
}

module.exports = getToken;
