//* Common interface
export interface List<T> extends Array<T> {
  [index: number]: T;
}

export interface ResponseGenerator<T = any> {
  config?: any;
  data?: T;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export interface IAccount {
  email: string;
  fb_id?: string;
  gg_id?: string;
  password: string;
  last_name: string;
  first_name: string;
  address?: string;
  bio?: string;
  phone?: string;
  type: TypeAccount;
  organization_name?: string;
  organization_id?: string;
  avatar?: string;
}

export interface IAlbum {
  title: string;
  description?: "";
  artists: string[];
  cover?: string;
  released_date: Date;
  format: string;
  genre_id: string;
  has_explicit_content: boolean;
  label?: string;
  distribution_platform: string;
}

export interface ITrack {
  id?: string;
  album_id: string;
  title: string;
  download_link?: string;
  irsc?: string;
  version_id: string;
  artists: [
    {
      name: string;
      link: string;
    }
  ];
  producers?: [
    {
      name: string;
      link: string;
    }
  ];
  composers: [
    {
      name: string;
      link: string;
    }
  ];
  lyricists: [
    {
      name: string;
      link: string;
    }
  ];
}

export interface ISelect {
  label: string;
  value: string;
}

export enum TypeAccount {
  Personal = "personal",
  Smes = "smes",
  Corporate = "corporate",
}

export enum TypeButton {
  Submit = "submit",
  Reset = "reset",
  Button = "button",
}

export enum TypeInput {
  Text = "text",
  Password = "password",
  Search = "search",
  Number = "number",
  Url = "url",
  Time = "time",
  Date = "date",
}

export enum Size {
  Xs = "xs",
  Sm = "sm",
  Md = "md",
  Lg = "lg",
  Xl = "xl",
}

export enum Color {
  Default = "default",
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Warning = "warning",
  Error = "error",
  Gradient = "gradient",
}
