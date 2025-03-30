/**
 * Formats an amount of bytes to a string
 *
 * @param {number} bytes - Total amount of bytes to format
 * @param {number} decimals - Decimal points to format to. Defaults to 2
 * @returns {string} Formatted byte amount
 */
const formatBytes = (bytes, decimals = 2) => {
  // This should never be less than 0, but check just in case
  if (bytes <= 0) {
    return '0 Bytes'
  }

  const kilo = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'Kb', 'Mb', 'Gb', 'Tb'];

  const sizesIndex = Math.floor(Math.log(bytes) / Math.log(kilo));

  return `${parseFloat((bytes / Math.pow(kilo, sizesIndex)).toFixed(dm))} ${sizes[sizesIndex]}`;
}

export { formatBytes };
