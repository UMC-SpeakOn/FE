export type HeaderItem = {
  label: string;
  match: (pathname: string) => boolean;
};
