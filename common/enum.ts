export enum CalloutQueryParameterType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}

export enum SupabaseAuthErrorCodes {
  /** Anonymous provider is disabled */
  ANONYMOUS_PROVIDER_DISABLED = "anonymous_provider_disabled",

  /** Code verifier is incorrect or malformed */
  BAD_CODE_VERIFIER = "bad_code_verifier",

  /** JSON payload is invalid */
  BAD_JSON = "bad_json",

  /** JWT token is invalid or malformed */
  BAD_JWT = "bad_jwt",

  /** OAuth callback parameters are invalid */
  BAD_OAUTH_CALLBACK = "bad_oauth_callback",

  /** OAuth state mismatch or invalid */
  BAD_OAUTH_STATE = "bad_oauth_state",

  /** Captcha verification failed */
  CAPTCHA_FAILED = "captcha_failed",

  /** Conflict occurred, resource already exists */
  CONFLICT = "conflict",

  /** Email address format is invalid */
  EMAIL_ADDRESS_INVALID = "email_address_invalid",

  /** Email address is not authorized for this operation */
  EMAIL_ADDRESS_NOT_AUTHORIZED = "email_address_not_authorized",

  /** Email conflict: identity cannot be deleted */
  EMAIL_CONFLICT_IDENTITY_NOT_DELETABLE = "email_conflict_identity_not_deletable",

  /** Email address is already in use */
  EMAIL_EXISTS = "email_exists",

  /** Email address is not confirmed */
  EMAIL_NOT_CONFIRMED = "email_not_confirmed",

  /** Email-based authentication provider is disabled */
  EMAIL_PROVIDER_DISABLED = "email_provider_disabled",

  /** Flow state has expired */
  FLOW_STATE_EXPIRED = "flow_state_expired",

  /** Flow state was not found */
  FLOW_STATE_NOT_FOUND = "flow_state_not_found",

  /** Hook payload has an invalid Content-Type */
  HOOK_PAYLOAD_INVALID_CONTENT_TYPE = "hook_payload_invalid_content_type",

  /** Hook payload exceeds size limit */
  HOOK_PAYLOAD_OVER_SIZE_LIMIT = "hook_payload_over_size_limit",

  /** Hook execution timed out */
  HOOK_TIMEOUT = "hook_timeout",

  /** Hook retry attempts timed out */
  HOOK_TIMEOUT_AFTER_RETRY = "hook_timeout_after_retry",

  /** Identity already exists in the system */
  IDENTITY_ALREADY_EXISTS = "identity_already_exists",

  /** Identity was not found */
  IDENTITY_NOT_FOUND = "identity_not_found",

  /** Auth Level is too low for the requested action */
  INSUFFICIENT_AAL = "insufficient_aal",

  /** Invitation token not found */
  INVITE_NOT_FOUND = "invite_not_found",

  /** Credentials provided are invalid */
  INVALID_CREDENTIALS = "invalid_credentials",

  /** Manual linking is disabled */
  MANUAL_LINKING_DISABLED = "manual_linking_disabled",

  /** MFA challenge has expired */
  MFA_CHALLENGE_EXPIRED = "mfa_challenge_expired",

  /** MFA factor name conflicts with an existing factor */
  MFA_FACTOR_NAME_CONFLICT = "mfa_factor_name_conflict",

  /** MFA factor was not found */
  MFA_FACTOR_NOT_FOUND = "mfa_factor_not_found",

  /** MFA IP address mismatch detected */
  MFA_IP_ADDRESS_MISMATCH = "mfa_ip_address_mismatch",

  /** MFA phone enrollment is not enabled */
  MFA_PHONE_ENROLL_NOT_ENABLED = "mfa_phone_enroll_not_enabled",

  /** MFA phone verification is not enabled */
  MFA_PHONE_VERIFY_NOT_ENABLED = "mfa_phone_verify_not_enabled",

  /** MFA TOTP enrollment is not enabled */
  MFA_TOTP_ENROLL_NOT_ENABLED = "mfa_totp_enroll_not_enabled",

  /** MFA TOTP verification is not enabled */
  MFA_TOTP_VERIFY_NOT_ENABLED = "mfa_totp_verify_not_enabled",

  /** MFA verification failed */
  MFA_VERIFICATION_FAILED = "mfa_verification_failed",

  /** MFA verification was rejected */
  MFA_VERIFICATION_REJECTED = "mfa_verification_rejected",

  /** Verified MFA factor already exists */
  MFA_VERIFIED_FACTOR_EXISTS = "mfa_verified_factor_exists",

  /** MFA WebAuthn enrollment is not enabled */
  MFA_WEB_AUTHN_ENROLL_NOT_ENABLED = "mfa_web_authn_enroll_not_enabled",

  /** MFA WebAuthn verification is not enabled */
  MFA_WEB_AUTHN_VERIFY_NOT_ENABLED = "mfa_web_authn_verify_not_enabled",

  /** No authorization header or token was provided */
  NO_AUTHORIZATION = "no_authorization",

  /** The user is not an admin */
  NOT_ADMIN = "not_admin",

  /** OAuth provider is not supported */
  OAUTH_PROVIDER_NOT_SUPPORTED = "oauth_provider_not_supported",

  /** OTP-based login is disabled */
  OTP_DISABLED = "otp_disabled",

  /** OTP code has expired */
  OTP_EXPIRED = "otp_expired",

  /** Email sending rate limit exceeded */
  OVER_EMAIL_SEND_RATE_LIMIT = "over_email_send_rate_limit",

  /** Request rate limit exceeded */
  OVER_REQUEST_RATE_LIMIT = "over_request_rate_limit",

  /** SMS sending rate limit exceeded */
  OVER_SMS_SEND_RATE_LIMIT = "over_sms_send_rate_limit",

  /** Phone number is already in use */
  PHONE_EXISTS = "phone_exists",

  /** Phone number is not confirmed */
  PHONE_NOT_CONFIRMED = "phone_not_confirmed",

  /** Phone provider is disabled */
  PHONE_PROVIDER_DISABLED = "phone_provider_disabled",

  /** Authentication provider is disabled */
  PROVIDER_DISABLED = "provider_disabled",

  /** OAuth provider requires email verification */
  PROVIDER_EMAIL_NEEDS_VERIFICATION = "provider_email_needs_verification",

  /** Re-authentication is required */
  REAUTHENTICATION_NEEDED = "reauthentication_needed",

  /** Re-authentication token is invalid */
  REAUTHENTICATION_NOT_VALID = "reauthentication_not_valid",

  /** Refresh token was not found */
  REFRESH_TOKEN_NOT_FOUND = "refresh_token_not_found",

  /** Refresh token was already used */
  REFRESH_TOKEN_ALREADY_USED = "refresh_token_already_used",

  /** Request timed out */
  REQUEST_TIMEOUT = "request_timeout",

  /** New password is the same as the old one */
  SAME_PASSWORD = "same_password",

  /** SAML assertion did not include an email address */
  SAML_ASSERTION_NO_EMAIL = "saml_assertion_no_email",

  /** SAML assertion did not include a user ID */
  SAML_ASSERTION_NO_USER_ID = "saml_assertion_no_user_id",

  /** SAML entity ID does not match */
  SAML_ENTITY_ID_MISMATCH = "saml_entity_id_mismatch",

  /** SAML Identity Provider already exists */
  SAML_IDP_ALREADY_EXISTS = "saml_idp_already_exists",

  /** SAML Identity Provider not found */
  SAML_IDP_NOT_FOUND = "saml_idp_not_found",

  /** Failed to fetch SAML metadata */
  SAML_METADATA_FETCH_FAILED = "saml_metadata_fetch_failed",

  /** SAML provider is disabled */
  SAML_PROVIDER_DISABLED = "saml_provider_disabled",

  /** SAML relay state has expired */
  SAML_RELAY_STATE_EXPIRED = "saml_relay_state_expired",

  /** SAML relay state was not found */
  SAML_RELAY_STATE_NOT_FOUND = "saml_relay_state_not_found",

  /** Session has expired */
  SESSION_EXPIRED = "session_expired",

  /** Session was not found */
  SESSION_NOT_FOUND = "session_not_found",

  /** Signups are disabled */
  SIGNUP_DISABLED = "signup_disabled",

  /** Single identity cannot be deleted */
  SINGLE_IDENTITY_NOT_DELETABLE = "single_identity_not_deletable",

  /** SMS sending failed */
  SMS_SEND_FAILED = "sms_send_failed",

  /** SSO domain already exists */
  SSO_DOMAIN_ALREADY_EXISTS = "sso_domain_already_exists",

  /** SSO provider was not found */
  SSO_PROVIDER_NOT_FOUND = "sso_provider_not_found",

  /** Too many MFA factors enrolled */
  TOO_MANY_ENROLLED_MFA_FACTORS = "too_many_enrolled_mfa_factors",

  /** Audience is unexpected or invalid */
  UNEXPECTED_AUDIENCE = "unexpected_audience",

  /** An unexpected server-side failure occurred */
  UNEXPECTED_FAILURE = "unexpected_failure",

  /** User already exists */
  USER_ALREADY_EXISTS = "user_already_exists",

  /** User is banned */
  USER_BANNED = "user_banned",

  /** User was not found */
  USER_NOT_FOUND = "user_not_found",

  /** User is managed by SSO and cannot perform this action */
  USER_SSO_MANAGED = "user_sso_managed",

  /** Input validation failed */
  VALIDATION_FAILED = "validation_failed",

  /** Password strength is insufficient */
  WEAK_PASSWORD = "weak_password",
}

export enum RadixColorOptions {
  GRAY = "gray",
  GOLD = "gold",
  BRONZE = "bronze",
  BROWN = "brown",
  YELLOW = "yellow",
  AMBER = "amber",
  ORANGE = "orange",
  TOMATO = "tomato",
  RED = "red",
  RUBY = "ruby",
  CRIMSON = "crimson",
  PINK = "pink",
  PLUM = "plum",
  PURPLE = "purple",
  VIOLET = "violet",
  IRIS = "iris",
  INDIGO = "indigo",
  BLUE = "blue",
  CYAN = "cyan",
  TEAL = "teal",
  JADE = "jade",
  GREEN = "green",
  GRASS = "grass",
  LIME = "lime",
  MINT = "mint",
  SKY = "sky",
}

export enum AUTH_ROUTES {
  SIGN_IN = "/sign-in",
  SIGN_UP = "/sign-up",
  FORGOT_PASSWORD = "/forgot-password",
  RESET_PASSWORD = "/settings/reset-password",
  AUTH_CALLBACK = "/auth/callback",
}

export enum BRAINWAVE_BANDS {
  DELTA = "delta",
  THETA = "theta",
  ALPHA = "alpha",
  IOBETA = "ioBeta",
  BETA = "beta",
  HIBETA = "hiBeta",
  GAMMA = "gamma",
  ALPHA1 = "alpha1",
  ALPHA2 = "alpha2",
}

// Brain Lobes
export enum BRAINL_LOBE {
  Frontal = "Frontal",
  Parietal = "Parietal",
  Temporal = "Temporal",
  Occipital = "Occipital",
}
