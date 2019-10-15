import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MapsAPILoader} from "@agm/core";
declare var google;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})

export class GoogleMapComponent implements OnInit {

    map: any;
    polyline: any;
    marker1: any;
    marker2: any;
    allowHighway: boolean = true;
    googleMapRoutes: Array<object> = new Array<object>();
    // placeLatLong: Array<number> = new Array<number>();
    @Output() googleMapRoutesOut: EventEmitter<any> = new EventEmitter();

    constructor(
        // private mapsAPILoader: MapsAPILoader,
    ) {
    }

    ngOnInit() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 9,
            center: {lat: 6.053519, lng: 80.220978},
            // mapTypeId: 'terrain'
        });
        this.changeRouteOnMap([6.053518500000001, 80.22097729999996, 7.180272, 79.88408,
            // "ij}c@seshN`NdDhY|DjGy@tDiCdKxAzB`JB|DbK`OdAhJzI~GzCjMxDa@aIhRyCvJoKr_@gFpVsHxFoUt^uQl`@uLtImPpBoUpHgNzK{PzYam@xy@aOjc@}T`kQzXgQhDed@h`@kJxFyMpT{FjM}RxUyC~JoIzGuL|OwW|FeVZsKxJs`@bc@g^tXeXtj@wXh[c]bKut@~BoS]wl@jZsNbPwq@rMcg@n^sT~W_z@n`Ao[raM|NeRfEqT{HiVw@gq@hQsj@dQkl@fO_RnGgLGyf@UqU`AkN|ILxJgM`MsXjU}h@xXqWnPwZzC{UrIcTkO{FMgFaH{U?aoG}f@cDuT~A{Ps@gUxEiPbH}Vt@oK~DeItMyR|CeSsCc`LmO`BkD}HuMEyfA`Wwb@bVoXrK{b@|ajAva@m[dM}Lx@eh@vKmQoBke@jFu|@dSaJQaZ`HkYjJqXvGsVj@_e@}GcLlD}DzMyDzFqRa@yUgGawAxt@c`@rUo_@vKmQcJwXk@e[hBy_AhVoo@qA{tApNcHvDmOiAcoE}QkDcQlEyi@`LmQmDkmAjUat@hNcy@fUq`AzLwy@tV_u@rPkTzD}[rEk^hBmOjCmRtK}e@fQoZbPwcAj^ow@dTi]bJ_FWw@cAOq@?iB{BqOcF{RnFuVnBgIgGyAqDuBsUgSiQmGiQ{TkOk]_PmNuOqLiQwCqRb@yPyEyLrBsNDcVuHkJgGoPmUmQ_N{tFiNzA_HkF{OiL}FiMoVgHaKkQwIoNcQzBge@tE_QpHEH{W`TyQvCoJmDoRtAkQzCgKzL}BzKyQvEsN`BgQ|Nag@dPoIjIYfPsMzb@wCtZwCjNsFg@sLfFgGjFeIlb@iGlC}aA_DcJvKuHfDkVxKg^vB}NiC{W|Fe^pJsIi@cSfGgNv`@_FpY}Zdj@iMxMyNfCg]dHkf@lWcg@lReZrd@af@fS_MlHyTbEyOfKeUDaf@wBaExQBfB_F]uO}CaIcDwBhG_GfJiJhJoE~NkS~e@oZlQaDvOwJ~CsIJeOd@{F_Cmr@}@o}Ag@qaD}Dau@O}i@k@wVgS{MgEcBj@gWdIsYoFwr@w]c}MyK`DySC{PoDmn@mb@wJqJgSqGgr@vGiZm@_\iHqRcEu\[cTfJkz@aCom@vFyk@hD_Ze@oMjAiTxIyMjGwM\}GoCqRhCau@bOq_@iAoc@zKcc@hM_T`Is[rEeZnAgPpHuo@nMw`A`SmrApM}iArNgGdAuBuAmEmMiu@ao@eU}RoO}PsSoOaHyEoD@wH|LzKtH]~D"
            'ij}c@seshN`NdDhY|DjGy@tDiCdKxAzB`JB|DbK`OdAhJzI~GzCjMxDa@aIhRyCvJoKr_@gFpVsHxFoUt^uQl`@uLtImPpBoUpHgNzK{PzYam@xy@aOjc@}T`\\kQzXgQhDed@h`@kJxFyMpT{FjM}RxUyC~JoIzGuL|OwW|FeVZsKxJs`@bc@g^tXeXtj@wXh[c]bKut@~BoS]wl@jZsNbPwq@rMcg@n^sT~W_z@n`Ao[r\\aM|NeRfEqT{HiVw@gq@hQsj@dQkl@fO_RnGgLGyf@UqU`AkN|ILxJgM`MsXjU}h@xXqWnPwZzC{UrIcTkO{FMgFaH{U?a\\oG}f@cDuT~A{Ps@gUxEiPbH}Vt@oK~DeItMyR|CeSsCc\\`LmO`BkD}HuMEyfA`Wwb@bVoXrK{b@|\\ajAva@m[dM}Lx@eh@vKmQoBke@jFu|@dSaJQaZ`HkYjJqXvGsVj@_e@}GcLlD}DzMyDzFqRa@yUgGawAxt@c`@rUo_@vKmQcJwXk@e[hBy_AhVoo@qA{tApNcHvDmOiAc\\oE}QkDcQlEyi@`LmQmDkmAjUat@hNcy@fUq`AzLwy@tV_u@rPkTzD}[rEk^hBmOjCmRtK}e@fQoZbPwcAj^ow@dTi]bJ_FWw@cAOq@?iB{BqOcF{RnFuVnBgIgGyAqDuBsUgSiQmGiQ{TkOk]_PmNuOqLiQwCqRb@yPyEyLrBsNDcVuHkJgGoPmUmQ_N{\\tFiNzA_HkF{OiL}FiMoVgHaKkQwIoNcQzBge@tE_QpHEH{W`TyQvCoJmDoRtAkQzCgKzL}BzKyQvEsN`BgQ|Nag@dPoIjIYfPsMzb@wCtZwCjNsFg@sLfFgGjFeIlb@iGlC}aA_DcJvKuHfDkVxKg^vB}NiC{W|Fe^pJsIi@cSfGgNv`@_FpY}Zdj@iMxMyNfCg]dHkf@lWcg@lReZrd@af@fS_MlHyTbEyOfKeUDaf@wBaExQBfB_F]uO}CaIcDwBhG_GfJiJhJoE~NkS~e@oZlQaDvOwJ~CsIJeOd@{F_Cmr@}@o}Ag@qaD}Dau@O}i@k@wVgS{MgEcBj@gWdIsYoFwr@w]c\\}MyK`DySC{PoDmn@mb@wJqJgSqGgr@vGiZm@_\\iHqRcEu\\[cTfJkz@aCom@vFyk@hD_Ze@oMjAiTxIyMjGwM\\}GoCqRhCau@bOq_@iAoc@zKcc@hM_T`Is[rEeZnAgPpHuo@nMw`A`SmrApM}iArNgGdAuBuAmEmMiu@ao@eU}RoO}PsSoOaHyEoD@wH|LzKtH]~D'
        ]);
        // this.mapsAPILoader.load().then(() => {
        //
        //     }
        // );
    }

    // setRoutes(placeLatLong) {
    //     // console.log(this.placeLatLong)
    //     this.placeLatLong = placeLatLong;
    //     this.googleMapRoutes = new Array();
    //     if (this.placeLatLong[0] != undefined && this.placeLatLong[1] != undefined && this.placeLatLong[2] != undefined && this.placeLatLong[3] != undefined) {
    //         if (this.placeLatLong[0] != this.placeLatLong[2] && this.placeLatLong[1] != this.placeLatLong[3]) {
    //             var self = this;
    //             let origin = new google.maps.LatLng(this.placeLatLong[0], this.placeLatLong[1]);
    //             let destination = new google.maps.LatLng(this.placeLatLong[2], this.placeLatLong[3]);
    //             new google.maps.DirectionsService().route(
    //                 {
    //                     origin: origin,
    //                     destination: destination,
    //                     travelMode: google.maps.TravelMode.DRIVING,
    //                     provideRouteAlternatives: true,
    //                     avoidHighways: this.allowHighway,
    //                 },
    //                 (response, status) => {
    //                     if (status == google.maps.DirectionsStatus.OK) {
    //                         self.setPlaces(response, origin, destination);
    //                         // self.ref.detectChanges();
    //                     }
    //                 });
    //         }
    //     }
    // }
    //
    // setPlaces(response, origin, destination) {
    //     let routes = response.routes;
    //     for (let i = 0; i < routes.length; i++) {
    //         let mapRoute = new Array();
    //         mapRoute[0] = routes[i].summary;
    //         mapRoute[1] = routes[i].legs[0].distance.text;
    //         mapRoute[2] = routes[i].legs[0].duration.text;
    //         mapRoute[3] = routes[i].overview_polyline;
    //         mapRoute[4] = origin;
    //         mapRoute[5] = destination;
    //
    //         this.googleMapRoutes.push(mapRoute);
    //     }
    //     this.googleMapRoutesOut.emit(this.googleMapRoutes);
    //     // console.log(response)
    // }

    changeRouteOnMap(mapRoute) {
        let origin = new google.maps.LatLng(mapRoute[0], mapRoute[1]);
        let destination = new google.maps.LatLng(mapRoute[2], mapRoute[3]);
        if (this.polyline != undefined && this.marker1 != undefined && this.marker2 != undefined) {
            this.polyline.setMap(null);
            this.marker1.setMap(null);
            this.marker2.setMap(null);
        }

        if (mapRoute != null) {
            this.polyline = new google.maps.Polyline({
                path: new google.maps.geometry.encoding.decodePath(mapRoute[4]),
                map: this.map,
                strokeColor: '#4872ff',
                strokeWeight: 5,
                strokeOpacity: 0.7,
            });

            this.marker1 = new google.maps.Marker({
                position: origin,
                map: this.map,
                // title: 'Hello World!'
            });

            this.marker2 = new google.maps.Marker({
                position: destination,
                map: this.map,
                // title: 'Hello World!'
            });
        }
    }

    // setAllow(allowHighway) {
    //     this.allowHighway = allowHighway;
    //     this.setRoutes(this.placeLatLong);
    // }


}
