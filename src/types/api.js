/**
 * @typedef {'user' | 'host' | 'admin'} UserRole
 * @typedef {'email_verification' | 'phone_verification' | 'password_reset'} OtpType
 * @typedef {'pending' | 'submitted' | 'verified' | 'rejected'} KycStatus
 */

/**
 * @typedef {Object} ValidationError
 * @property {string} field
 * @property {string} message
 */

/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} fullName
 * @property {string} email
 * @property {string} [phone]
 * @property {UserRole} role
 * @property {string} [profileImage]
 * @property {boolean} isEmailVerified
 * @property {boolean} isPhoneVerified
 * @property {boolean} isBlocked
 * @property {boolean} isHost
 * @property {number} rating
 * @property {number} totalReviews
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} RegisterPayload
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} [phone]
 * @property {string} password
 */

/**
 * @typedef {Object} LoginPayload
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} VerifyOtpPayload
 * @property {string} identifier
 * @property {string} otp
 * @property {OtpType} type
 */

/**
 * @typedef {Object} SendOtpPayload
 * @property {string} identifier
 * @property {OtpType} type
 */

/**
 * @typedef {Object} ResetPasswordPayload
 * @property {string} email
 * @property {string} otp
 * @property {string} newPassword
 */

/**
 * @typedef {Object} LoginData
 * @property {User} user
 * @property {string} accessToken
 * @property {string} refreshToken
 */

/**
 * @typedef {Object} RegisterData
 * @property {User} user
 * @property {string} message
 * @property {string} [devOtp]
 */

export {};
