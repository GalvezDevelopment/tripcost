/**
 * Helper function to validate an UUID.
 * @param id UUID to validate
 * @returns true if valid, otherwise false
 */
export function validateId(id: string): boolean {
  return /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/gm.test(
    id
  );
}
