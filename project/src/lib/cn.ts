/**
 * Utility for conditionally joining Tailwind CSS class names.
 * Accepts strings, undefined, null, or false values and joins truthy ones with a space.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
