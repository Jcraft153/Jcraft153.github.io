// Repository bento configuration.
// I don't want some repos to appear by default as I want to present work I'm happy with.

export const repositoryBentoConfig = {
  // Forks are hidden by default because they are not original work - mostly forked for testing or local-copy purposes.
  hideForks: true,

  // Explicit exclusion list, not case sensitive.
  // Example: ['scratch-project', 'experimental-fork']
  excludedRepositoryNames: ['Jcraft153', 'anthropic-leaked-source-code'],
}
