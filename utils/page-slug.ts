const SLUG_REGEX =
  /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/;

export class PageSlug {
  private constructor(public readonly value: string) {}

  static create(input: string): PageSlug {
    if (!SLUG_REGEX.test(input)) {
      throw new Error(`Invalid page slug: ${input}`);
    }
    return new PageSlug(input);
  }

  toString(): string {
    return this.value;
  }
}
