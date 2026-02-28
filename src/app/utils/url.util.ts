import {ActivatedRoute, Router} from "@angular/router";

export class UrlUtil{
  static apiUrl = 'http://localhost:3000';
  // static apiUrl = 'https://s7-mall-management-server.vercel.app';

  static async refreshCurrentRoute(route: ActivatedRoute, router: Router): Promise<void> {
    try {
      // Récupérer les paramètres actuels
      const currentParams = route.snapshot.params;
      const currentQueryParams = route.snapshot.queryParams;
      const currentUrl = router.url.split('?')[0]; // URL sans query params

      console.log('🔄 Rafraîchissement route:', {
        url: currentUrl,
        params: currentParams,
        queryParams: currentQueryParams
      });

      // Recharger la même route avec les mêmes paramètres
      await router.navigateByUrl('/', { skipLocationChange: true });
      await router.navigate([currentUrl, ...Object.values(currentParams)], {
        queryParams: currentQueryParams
      });

      console.log('✅ Route rafraîchie avec succès');
    } catch (error) {
      console.error('❌ Erreur lors du rafraîchissement:', error);
    }
  }

}
