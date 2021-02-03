/*
Creo una interface para adaptar clases que sean Mapeables
*/
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
  color: string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }

  /*
  Esta es una posible solucion para la reutilizacion del addMarker
  en ambas clases User y Company, pero no es la mejor

    addMarker(mappable: Mappable): void {
            new google.maps.Marker({
              map: this.googleMap,
              position: {
                lat: mappable.location.lat,
                lng: mappable.location.lng,
      },
    });
  }

  */

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });
      infoWindow.open(this.googleMap, marker);
    });
  }

  /*
  Se necesita refactorizar metodos
  para no tener codigo duplicado y que sea reusable
   */

  //   addCompanyMarker(company: Company): void {
  //     new google.maps.Marker({
  //       map: this.googleMap,
  //       position: {
  //         lat: company.location.lat,
  //         lng: company.location.lng,
  //       },
  //     });
  //   }
}
