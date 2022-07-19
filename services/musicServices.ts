import httpMethod from "services/httpMethod";
import { music } from "constants/api";
import { IAlbum, ITrack } from "../interfaces";

class MusicService {
  getListAlbums() {
    return httpMethod.get(music.ALBUM);
  }

  createAlbum(body: IAlbum) {
    return httpMethod.post(music.ALBUM, body);
  }

  getListGenre() {
    return httpMethod.get(`${music.GENRE}`);
  }

  getListVersion() {
    return httpMethod.get(music.VERSION);
  }

  getTrackByAlbumId(album_id: string) {
    return httpMethod.get(music.CRUD_ALBUM(album_id));
  }

  createTrack(album_id: string, body: any) {
    return httpMethod.post(music.TRACK(album_id), body);
  }

  deleteTrack(album_id: string, track_id: string) {
    return httpMethod.delete(music.TRACK_DELETE(album_id, track_id));
  }

  submitTrack(album_id: string) {
    return httpMethod.post(music.SUBMIT(album_id), {});
  }

  uploadImage(file: any) {
    return httpMethod.post(music.UPLOAD, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  getListPlan() {
    return httpMethod.get(music.PLANS);
  }

  deleteAlbum(id: string) {
    return httpMethod.delete(music.CRUD_ALBUM(id));
  }

  confirmEmail(code: string) {
    return httpMethod.post(music.CONFIRM_EMAIL + `?code=${code}`, {});
  }
}

export default new MusicService();
