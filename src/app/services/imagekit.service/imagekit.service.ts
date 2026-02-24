// services/imagekit.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ImageKit from 'imagekit-javascript';
import { firstValueFrom } from 'rxjs';
import { UrlUtil } from "../../utils/url.util";

@Injectable({
  providedIn: 'root'
})
export class ImagekitService {
  private imagekit: any;

  constructor(private http: HttpClient) {}

  // 1. Méthode pour initialiser ImageKit - VERSION CORRIGÉE
  async initializeImageKit() {
    // Récupère les paramètres d'auth depuis le backend
    const authResponse = await firstValueFrom(
      this.http.get<{
        signature: string;
        expire: number;
        token: string;
        publicKey: string;
      }>(`${UrlUtil.apiUrl}/api/imagekit/auth`)
    );

    // Initialisation CORRECTE - SANS authenticationEndpoint
    this.imagekit = new ImageKit({
      publicKey: authResponse.publicKey,
      urlEndpoint: 'https://ik.imagekit.io/0sgoznb6kl'
    });

    return this.imagekit;
  }

  // 2. Méthode pour uploader un fichier - VERSION CORRIGÉE
  async uploadImage(file: File|undefined, folder: string = '/main'): Promise<string> {
    if (!file) {
      throw new Error('Aucun fichier fourni pour l\'upload');
    }
    try {
      // 1. Récupère les paramètres d'auth pour CET upload
      const authResponse = await firstValueFrom(
        this.http.get<{
          signature: string;
          expire: number;
          token: string;
          publicKey: string;
        }>(`${UrlUtil.apiUrl}/api/imagekit/auth`)
      );

      // 2. Initialise ImageKit pour CET upload
      const imagekit = new ImageKit({
        publicKey: authResponse.publicKey,
        urlEndpoint: 'https://ik.imagekit.io/0sgoznb6kl'
      });

      // 3. Upload avec les paramètres d'auth dans les options
      return new Promise((resolve, reject) => {
        imagekit.upload(
          {
            file: file,
            fileName: file.name,
            tags: ['photo'],
            folder: folder,
            useUniqueFileName: true,
            // 👇 Les paramètres d'auth sont DANS L'OBJET D'UPLOAD, PAS dans l'initialisation
            signature: authResponse.signature,
            token: authResponse.token,
            expire: authResponse.expire
          },
          (err: any, result: any) => {
            if (err) {
              console.error('❌ Erreur upload:', err);
              reject(err);
            } else {
              console.log('✅ Upload réussi:', result);
              resolve(result.url);
            }
          }
        );
      });
    } catch (error) {
      console.error('❌ Erreur:', error);
      throw error;
    }
  }
}
