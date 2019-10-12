import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.page.html',
    styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

    @ViewChild('app_google_map', {static: true}) appGoogleMap;

    constructor() {
    }

    ngOnInit() {
        // this.appGoogleMap.changeRouteOnMap([6.053518500000001, 80.22097729999996, 7.180272, 79.88408,
        //     "ij}c@seshN`NdD`Gh@fQrCjGy@tDiCdKxAzB`JB|DbK`OdAhJzI~GzCjMxDa@aIhRyCvJoKr_@gFpVsHxFoUt^uQl`@wDzF}FxAmPpBoUpHgNzK{LtM_CdKkWt^uTbZaOjc@}T`\kQzXaHbDeHDoWvSuKpKkJxFyMpT{FjM}RxUyC~JoIzGuL|OwW|FeVZsKxJs`@bc@g^tXeXtj@wXh[c]bKeb@pAgIq@gG~AoS]wl@jZsNbPwq@rMcg@n^sT~W_z@n`Ao[r\aM|NeRfEqT{HiVw@}W|DiXjKsj@dQ_T~CkWfJ_RnGgLGyf@UqU`A{J~BoB|ELxJgM`MsXjU}h@xXqWnPwZzC{UrIgHwC{JsJ{FMgFaHsF`AgNaAa\oG}f@cDuT~A{Ps@gUxEiPbH}Vt@oK~DeItMuDfCcMTeSsCc\`LaIfCkEe@kD}HuMEyfA`Wwb@bVoXrK{b@|\ajAva@m[dM}Lx@eh@vKmQoBke@jF_Z~Hua@dIaJQaZ`HkYjJqXvGsVj@_e@}GcLlD}DzMyDzFqRa@yMaG_GEawAxt@c`@rUo_@vKwF_AuIcHwXk@e[hBy_AhVoo@qA{tApNcHvDmOiAc\oE}QkDcQlEyi@`LmQmDkmAjUat@hNcy@fUq`AzLwy@tV_u@rPkTzD}C`B_WpBk^hBmOjCmRtK}e@fQoZbPwcAj^ow@dTwr@vRyHaAqTbHoI~E_I^mLnC{h@vIkn@pWc`@fOep@~YmqBhz@_^vJoVzMm^fJyOt@_l@U{a@rEgH|FcBn[eKvSgg@~Owi@`MuaAfZsu@|QeY|G{[vAma@lDiMe@ab@}Jm]kEym@kQeb@jA}PzH}NdLi[lPo^hc@qh@n^ob@~Mc^lDg^a@e]fFwy@|Ban@nIqR|ByFt@iAfDP`BdAjIaB~CqS`Cib@hEaT`Dq|AhUsz@xOo_@|GeRfAqDcCyDx@yRhEu\`I_Af@uTxFeVzIyShGyRcCh@}FiAkDgFa@{DwSeSkYqb@oU}DsAbDyRfAyWrJ_BcD{NyUoY_QwR_^iGuVuEkDgUwB{EeN{Aoo@eVuQeLqWcKwPhGsSeCcFmA}RyNeWuPa[iSiSgBaW|Fg]hAoY{Eg\_ImNc@iWs@_KfG}SvCcUyCwq@z@yv@|J_LgC_Ox@}Ho@_Q|FmRrHgPjD{G@sKeDon@fOyYrCkRsAcb@fH}^nL{h@bRye@bB_SzHkf@fJy`AjTslCrYud@dH{DMMsC_JkOkVuSyj@}e@gLaLeSoQoSyNuJpOxBdB~HnFaBbCb@^"
        // ]);
    }


}
