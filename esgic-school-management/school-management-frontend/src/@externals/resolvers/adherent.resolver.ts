import {ResolveFn} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {AdherentService} from "../authentication/services/adherent.service";
import {catchError, forkJoin, throwError} from "rxjs";
import {AdherentPage} from "../../app/main/Utils/adherent.page";
import {SpecialiteService} from "../authentication/services/specialite.service";
import {EtablissementService} from "../authentication/services/etablissement.service";
import {PromotionService} from "../authentication/services/promotion.service";
import {ProfileService} from "../authentication/services/profile.service";
import {Location} from "@angular/common";
import {CommuneService} from "../authentication/services/commune.service";


@Injectable({ providedIn: "root" })
export class AdherentResolver {

    constructor(private _adherentService: AdherentService, private _specService: SpecialiteService, private _etabService: EtablissementService, private _promoService: PromotionService, private _profileService: ProfileService, private _villeService: CommuneService) {}

    getAllPage(): any {
        return this._adherentService.getAllAdherentPage(0, 10, '', '');
    }

    getAllEtabs(): any {
        return this._etabService.getAllEtabs()
    }

    getAllPromos(): any {

        return this._promoService.getAllPromotions()

    }

    getAllSpecs(): any {

        return this._specService.getAllSpecialite()

    }

    getAllProfiles(): any {

        return this._profileService.getAllProfile();

    }

    getAllVilles() : any {
        return this._villeService.allVilles();
    }

}

export const adherentResolver: ResolveFn<any> = (route, state) => {
    const adhResolver = inject(AdherentResolver)
    const location = inject(Location)
    return forkJoin<any>([
        adhResolver.getAllPage().toPromise(),
        adhResolver.getAllPromos().toPromise(),
        adhResolver.getAllEtabs().toPromise(),
        adhResolver.getAllSpecs().toPromise(),
        adhResolver.getAllProfiles().toPromise(),
        adhResolver.getAllVilles().toPromise()
    ]).pipe(catchError(err => {
        location.back()
        return throwError(() => err)
    }));
};
