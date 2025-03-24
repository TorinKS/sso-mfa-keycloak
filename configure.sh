#!/bin/sh

# to exec to container
# docker exec -it sso-mfe-poc_keycloak /bin/sh


docker exec sso-mfe-poc_keycloak /bin/sh -c "
  # Authenticate to Keycloak
  /opt/keycloak/bin/kcadm.sh config credentials \
    --server http://localhost:8080/auth \
    --realm master \
    --user admin \
    --password admin

  # Create a realm
  /opt/keycloak/bin/kcadm.sh create realms \
    -s realm=company-external \
    -s enabled=true || echo 'Realm may already exist'

  # Create OIDC client for MFE-A
  /opt/keycloak/bin/kcadm.sh create clients \
    -r company-external \
    -s clientId=mfe-a \
    -s enabled=true \
    -s publicClient=true \
    -s 'redirectUris=[\"http://mfe-a.home.arpa/*\"]' \
    -s 'webOrigins=[\"http://mfe-a.home.arpa\"]' || echo 'Client mfe-a may already exist'

  # Create OIDC client for MFE-B
  /opt/keycloak/bin/kcadm.sh create clients \
    -r company-external \
    -s clientId=mfe-b \
    -s enabled=true \
    -s publicClient=true \
    -s 'redirectUris=[\"http://mfe-b.home.arpa/*\"]' \
    -s 'webOrigins=[\"http://mfe-b.home.arpa\"]' || echo 'Client mfe-b may already exist'

# Create a test user
  /opt/keycloak/bin/kcadm.sh create users \
    -r company-external \
    -s username=test-user \
    -s enabled=true || echo 'User test-user may already exist'
  
 /opt/keycloak/bin/kcadm.sh set-password \
    -r company-external \
    --username test-user \
    --new-password test-user || echo 'Password may already be set'
"
