import { KeycloakEvent, KeycloakEventType, KeycloakOptions, KeycloakService } from 'keycloak-angular';

const KC_OPTIONS: KeycloakOptions = {
  config: {
    url: 'http://sso.home.arpa/auth',
    realm: 'company-external',
    clientId: 'mfe-b',
  },
  initOptions: {    
    onLoad: 'login-required',    
    flow: 'standard',
    checkLoginIframe: true,
    enableLogging: true,
    useNonce: true,
    adapter: 'default',
    pkceMethod: 'S256',
    
  },
  loadUserProfileAtStartUp: true
};

export function initializeKeycloak(keycloak: KeycloakService): Function {
  return () => keycloak.init(KC_OPTIONS)
    .then(
      () => {
        const KC = keycloak.getKeycloakInstance();
        console.log("%cKeycloak instance:", "color:darkgreen", KC);

        keycloak.keycloakEvents$.subscribe(
          (event: KeycloakEvent): void => {
            console.log("%cKeycloak event:", "color:green", KeycloakEventType[event.type]);
          }
        );
      }
    );
}
