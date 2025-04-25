export function contentIdToViewTransitionName(contentId: string): string {
  return "a" + contentId.replace("/", "-");
}
