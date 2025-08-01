import type { ResizeOptions, WebpOptions } from 'sharp';
import { getEnvVar } from './utils/getEnvVar.js';

// paths based on project root I guess
// #TODO un-hardcode all paths, and base them from root
// #TODO also probably simplify the datapaths to ./data or /db or whatever and ./uploads

// Auto-generate config from service key
const SERVICE_KEYS = ['AUTH', 'USER', 'SCORE', 'GATEWAY'] as const;
export type ServiceConfigType = (typeof ServiceConfig)[keyof typeof ServiceConfig];

// Auto-generate the entire config
export const ServiceConfig = {
  ...Object.fromEntries(
    SERVICE_KEYS.map((key) => [
      key,
      {
        serviceName: `${key.toLowerCase()}-service`,
        dbFile: `${key.toLowerCase()}.db`,
        initSql: 'src/db/init.sql' as const,
        baseDir: getEnvVar('OVERRIDE_DATABASE_DIR', '') || ('./database' as const),
      },
    ]),
  ),
} as {
  [K in (typeof SERVICE_KEYS)[number]]: {
    serviceName: `${Lowercase<K>}-service`;
    dbFile: `${Lowercase<K>}.db`;
    initSql: 'src/db/init.sql';
    baseDir: './database';
  };
};

export const UserConfig = {
  OFFLINE_TIMEOUT_MINUTES: 0,
  CLEANUP_INTERVAL_MINUTES: 1,
} as const;

export const AuthConfig = {
  ACCESS_TOKEN_EXPIRE_MS: 2 * 60 * 1000, // 2 min
  REFRESH_TOKEN_EXPIRE_MS: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;

export const AvatarConfig = {
  MEDIA_DIR: '/media/',
  UPLOADED_AVATARS: 'avatars/',
  DEFAULT_AVATARS: 'defaults/',

  MAX_FILE_SIZE: 10 * 1024 * 1024, //10 mb

  // Dimensions
  WIDTH: 300 as const,
  HEIGHT: 300 as const,

  // Sharp resize options (directly from Sharp types)
  RESIZE_OPTIONS: {
    fit: 'cover',
    position: 'center',
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  } satisfies ResizeOptions,

  // Output format
  OUTPUT_FORMAT: 'webp' as const,

  // Format-specific options
  WEBP_OPTIONS: {
    quality: 80,
    effort: 4,
    lossless: false,
  } satisfies WebpOptions,

  // Default avatar settings
  DEFAULT_AVATAR: {
    FILENAME: 'avatarCat1.avif' as const,
    PREFIX_FILTER: 'avatarCat' as const, // Filter for default avatars
  },

  // Random cats API settings
  RANDOM_CATS: {
    DEFAULT_LIMIT: 10 as const,
    DEFAULT_IMAGE_SIZE: 'med' as const, // 'small', 'med', 'full'
    DEFAULT_MIME_TYPES: 'jpeg,jpg,avif,png' as const,
    API_URL: 'https://api.thecatapi.com/v1/images/search' as const,
  },
} as const;
