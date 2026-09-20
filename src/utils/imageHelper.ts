/**
 * Utility to parse and normalize image URLs, especially Google Drive sharing links.
 * Google Drive sharing links point to a web HTML preview, not direct image streams.
 * We automatically extract the file ID and convert it into Google's high-speed CDN direct image URL:
 * https://lh3.googleusercontent.com/d/{FILE_ID}
 */

export function extractGoogleDriveFileId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;

  // Patterns for Google Drive URLs:
  // 1. https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // 2. https://drive.google.com/open?id=FILE_ID
  // 3. https://drive.google.com/uc?id=FILE_ID or uc?export=view&id=FILE_ID
  // 4. https://lh3.googleusercontent.com/d/FILE_ID
  const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) {
    return fileDMatch[1];
  }

  const idQueryMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idQueryMatch && idQueryMatch[1]) {
    return idQueryMatch[1];
  }

  const lh3Match = url.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
  if (lh3Match && lh3Match[1]) {
    return lh3Match[1];
  }

  return null;
}

export function isGoogleDriveUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('drive.google.com') || url.includes('googleusercontent.com/d/');
}

export function normalizeImageUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // If it's a data URL (base64 from local upload), return directly
  if (trimmed.startsWith('data:image/')) {
    return trimmed;
  }

  // Check if it's Google Drive
  const driveId = extractGoogleDriveFileId(trimmed);
  if (driveId) {
    // Google high-speed direct CDN endpoint:
    return `https://lh3.googleusercontent.com/d/${driveId}`;
  }

  return trimmed;
}
