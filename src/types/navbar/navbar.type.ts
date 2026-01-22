export type NavbarItem = {
  label: string;
  match: (pathname: string) => boolean;
};
