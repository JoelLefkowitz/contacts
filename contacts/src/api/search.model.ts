export enum SortOption {
  firstName = "First name",
  lastName = "Last name",
}
export interface SearchConfig {
  sortBy: SortOption;
  exactMatch: boolean;
}

export const defaultSearchConfig = {
  sortBy: SortOption.firstName,
  exactMatch: false,
};
