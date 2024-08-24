## Config OAuth

- go to https://console.cloud.google.com/
- Left menu: OAuth consent screen
- For localhost, No need for Authorized domains
- Create Credentials / Create OAuth client ID
- Application Type: Web Application
- Authorized JavaScript origins: http://localhost:3000
- Authorized redirect URIs: http://localhost:3000
- Copy ClienID and Secret

### Provider

- Docs: https://next-auth.js.org/getting-started/rest-api#getpost-apiauthcallbackprovider
- On google console, select Credentials / OAuth 2.0 Client IDs / The Web Client / Authorized redirect URIs
- http://localhost:3000/api/auth/callback/google

## MongoDB Authentication (Atlas)

- https://cloud.mongodb.com/
- On the left side menu, select **Database Access**
- Select Edit username, Edit Password and generate password
- Add username/password to MONGODB_URI
- To view the data, select on the left menu, Database, the Cluster, Collections

### MongoDB whitelist IP (Access denied)

- https://cloud.mongodb.com/
- On the left side menu, select **Network Access**, and **Ip Access List**
- Add the client IP

## Troubleshooting

Fixing the NextJs Error: Invalid src prop on `next/image`, hostname is not configured under images

- Open next.config.mjs
- add the image domain
