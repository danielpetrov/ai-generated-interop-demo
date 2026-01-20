/**
 * Application configuration
 * Reads environment variables from .env file
 */

export const config = {
    licenseKey: import.meta.env.VITE_IOCONNECT_LICENSE_KEY as string,
}
