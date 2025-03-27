# Cookie-based SSO in Keycloak and Angular applications

This repository demonstrates how cookie-based SSO in Keycloak works with two Angular applications hosted on separate domains (different FQDNs)

## Prerequisites
Just have Docker installed on your computer.

## How to run
Just do the following:
```
git clone https://github.com/TorinKS/sso-mfe-keycloak.git
# docker compose up --build (in case you need to rebuild images)
docker compose up
chmod u+x ./configure.sh
./configure.sh

# add hosts names to /etc/hosts
echo -e "127.0.0.1 mfe-a.home.arpa\n127.0.0.1 mfe-b.home.arpa\n127.0.0.1 sso.home.arpa" | sudo tee -a /etc/hosts
```

## Architecture
### The High-level architecture
The high-level architecture of the solution is the following
![High-level architecture](./documentation/high-level-architecture.svg)


### Authorization Code Flow in Keycloak without SSO and Simple User/Password Authentication

Below is the simple authorization code flow with login and password authentication in Keycloak. You can see 3 steps:
- GET request to /auth endpoints that returns the authentication flow
- POST request to /authenticate endpoint with login and password
- POST request to /token endpoint for exchanging the authorization code from step 2 for a token
![Authorization Code Flow without SSO](./documentation/authorization-code-flow-without-sso.svg)

If SSO cookies exist (for example, if authentication was successful in this browser previously for another application), these cookies are reused by Keycloak for authentication. This is the default first step of the 'browser' built-in authentication flow.

### Authorization Code Flow in Keycloak with SSO Cookies

When a user has already authenticated, the OAuth/OIDC angular integration redirects the browser to sso.home.arpa (Keycloak). The browser automatically sends the SSO cookies set previously for the sso.home.arpa domain. These cookies trigger automatic authentication in Keycloak, which returns a set of tokens:
- Access token
- ID token
- Refresh token
![Authorization Code Flow with SSO](./documentation/authorization-code-flow-sso-cookies-authentication.svg)

### Detailed Explanation
A detailed explanation of this configuration, Angular apps, and Keycloak configurations can be found in the post "Keycloak cookie-based SSO" (<a href="https://recallfor.xyz/keycloak-cookie-based-sso-on-real-example/">Keycloak cookie based SSO</a>).

## Specific Configuration Notes
1. We use the home.arpa domain to enable the HTTP protocol for traffic capturing and analysis and to make it work with browsers that typically enforce HTTPS
2. Docker Compose configuration uses NETWORK_SUBNET=10.0.0.0/8, which is probably the best option for running this example in home networks where 192.168.0.0 subnet is more popular. In case you have a 10.0.0.0 subnet, replace IP addresses in the .env file to use NETWORK_SUBNET=192.168.0.0/255.255.0.0.
3. We use HAProxy to work with domain names as-is and to implement a configuration that is more suitable for production environments with reverse proxies (nginx, HAProxy, etc.) in front of Keycloak and your frontend applications.
4. You need to add these lines to your /etc/hosts file:
    - 127.0.0.1 mfe-a.home.arpa
    - 127.0.0.1 mfe-b.home.arpa
    - 127.0.0.1 sso.home.arpa
