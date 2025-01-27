/**
 * Converts file size from bytes to a human-readable format (KB, MB, GB, etc.).
 * @param bytes - The file size in bytes.
 * @param decimals - The number of decimals to include in the result (default is 2).
 * @returns A string representing the file size in the appropriate unit.
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024; // Base for kilobytes
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k)); // Determine the index for the size unit

  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));
  return `${formattedSize} ${sizes[i]}`;
}
