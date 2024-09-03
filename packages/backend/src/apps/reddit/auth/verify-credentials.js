import getCurrentUser from '../common/get-current-user.js';
import { URLSearchParams } from 'url';

const verifyCredentials = async ($) => {
  if ($.auth.data.originalState !== $.auth.data.state) {
    throw new Error(`The 'state' parameter does not match.`);
  }
  const oauthRedirectUrlField = $.app.auth.fields.find(
    (field) => field.key == 'oAuthRedirectUrl'
  );
  const redirectUri = oauthRedirectUrlField.value;
  const headers = {
    Authorization: `Basic ${Buffer.from(
      $.auth.data.clientId + ':' + $.auth.data.clientSecret
    ).toString('base64')}`,
  };
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: $.auth.data.code,
    redirect_uri: redirectUri,
  });

  const { data } = await $.http.post(
    'https://www.reddit.com/api/v1/access_token',
    params.toString(),
    { headers }
  );

  await $.auth.set({
    accessToken: data.access_token,
    tokenType: data.token_type,
  });

  const currentUser = await getCurrentUser($);
  const screenName = currentUser?.name;

  await $.auth.set({
    clientId: $.auth.data.clientId,
    clientSecret: $.auth.data.clientSecret,
    scope: $.auth.data.scope,
    expiresIn: data.expires_in,
    refreshToken: data.refresh_token,
    screenName,
  });
};

export default verifyCredentials;
