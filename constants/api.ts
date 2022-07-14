export const baseURl = "http://localhost:8088/";
// export const baseURl = 'https://9140-2405-4802-118-6b90-382b-a742-972b-ff2b.ap.ngrok.io/'

export const auth = {
  LOGIN: "api/signin",
  REGISTER: "api/signup",
  PROFILE: "api/profile",
};

export const music = {
  ALBUM: "/api/albums",
  CRUD_ALBUM: (idAlbum: string) => `/api/albums/${idAlbum}`,
  GENRE: "/api/genres",
  VERSION: "/api/versions",
  TRACK: (idAlbum: string) => `/api/albums/${idAlbum}/tracks`,
  TRACK_DELETE: (idAlbum: string, idTrack: string) =>
    `/api/albums/${idAlbum}/tracks/${idTrack}`,
  SUBMIT: (idAlbum: string) => `/api/albums/${idAlbum}/submit`,
  UPLOAD: "/api/upload",
  PLANS: "/api/plans",
  CONFIRM_EMAIL: "/api/confirm-otp",
};
