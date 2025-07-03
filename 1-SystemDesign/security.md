1. OAuth (Open Authorization):
   Purpose: OAuth is an authorization framework that allows users to grant third-party applications access to their resources on another service (like accessing your Facebook profile from a game) without sharing your username and password directly with the third-party application.
   Focus: Authorization (granting access).
   How it works: Users grant permissions to an application via the authorization server (e.g., Facebook). The application then receives an access token, which it uses to access the user's resources on the authorized service.
   Use cases: Social logins, third-party app access to user data.
2. SAML (Security Assertion Markup Language):
   Purpose: SAML is an XML-based protocol for exchanging authentication and authorization data between an identity provider (IdP) and service providers (SP). It enables single sign-on (SSO), allowing users to authenticate once and access multiple applications.
   Focus: Authentication (verifying identity) and authorization.
   How it works: When a user tries to access a service provider, they are redirected to the identity provider for authentication. If successful, the IdP sends a SAML assertion (an XML document containing user information) to the service provider, granting the user access.
   Use cases: Enterprise SSO, accessing cloud services with corporate credentials.
3. OpenID Connect (OIDC):
   Purpose: OIDC is an authentication layer built on top of OAuth 2.0. It provides a standardized way for an application to verify a user's identity and obtain basic profile information.
   Focus: Authentication (verifying identity) and user information.
   How it works: Similar to OAuth, OIDC involves an authorization server (OP) and a relying party (RP). The OP authenticates the user and issues an ID token (a JWT) that contains user information.
   Use cases: Web and mobile app logins, social logins, SSO.
4. JWT (JSON Web Token):
   Purpose: JWT is a compact, URL-safe means of representing claims to be transferred between two parties. It's often used as an access token in OAuth and as an ID token in OpenID Connect.
   Focus: Securely transmitting information as a JSON object.
   How it works: JWTs are digitally signed, allowing the receiver to verify their authenticity. They consist of a header, payload, and signature.
   Use cases: API authentication, stateless session management, single sign-on.

   In short:
   OAuth is for authorization, granting access to resources.
   SAML is for authentication and SSO: across different applications, particularly in enterprise environments.
   OpenID Connect builds on OAuth: to add authentication, providing a standard way to verify user identity.
   JWT is a format for securely transmitting information, often used with OAuth and OpenID Connect.
