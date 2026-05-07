import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSortModule} from '@angular/material/sort';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {debounceTime, Subject, switchMap, takeUntil} from 'rxjs';
import {InscriptionService} from '../../../../../../@externals/authentication/services/inscription.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FuseConfirmationService} from '../../../../../../@fuse/services/confirmation';
import {DialogService} from '../../../../../main/helpers/dialog/dialog.service';
import {Inscription, InscriptionPage} from '../../../../../main/models/inscription.model';
import {FuseLoadingBarComponent} from '../../../../../../@fuse/components/loading-bar';
import {StatutInscription} from "../../../../../../@externals/enums/statut-inscription";

@Component({
    selector: 'app-list-inscription',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSortModule,
        ReactiveFormsModule,
        FuseLoadingBarComponent
    ],
    templateUrl: './list-inscription.component.html',
    styleUrl: './list-inscription.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})
export class ListInscriptionComponent implements OnInit, OnDestroy {
    currentPage = 0;
    pageSize = 10;
    totalElements = 0;
    initialDataSource: InscriptionPage;
    inscriptions: Array<Inscription>;
    isLoading = true;
    searchInputControl = new FormControl('');
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private inscriptionService: InscriptionService,
        private route: ActivatedRoute,
        private _fuseConfirmationService: FuseConfirmationService,
        private router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialogService: DialogService
    ) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            if (data && data.data) {
                this.initialDataSource = data.data[0];
                this.inscriptions = this.initialDataSource.content;
                this.totalElements = this.initialDataSource.totalElements;
                this.isLoading = false;
                this._changeDetectorRef.markForCheck();
            }
        });

        this.loadData();
    }

    createInscription() {
        this.router.navigateByUrl('/apps/inscriptions/save');
    }

    onSearch() {
        this.currentPage = 0;
        this.loadData();
    }

    handlePageEvent(event: PageEvent) {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.reloadDataForPagination();
    }

    loadData() {
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap(query => {
                    this.isLoading = true;
                    return this.inscriptionService.search(this.currentPage, this.pageSize, query);
                })
            )
            .subscribe({
                next: (data) => {
                    this.initialDataSource = data;
                    this.inscriptions = this.initialDataSource.content;
                    this.totalElements = data.totalElements;
                    this.isLoading = false;
                    this._changeDetectorRef.markForCheck();
                },
                error: (err) => {
                    this.isLoading = false;
                    this._dialogService.openDialog('Erreur lors de la recherche des inscriptions.', false);
                    this._changeDetectorRef.markForCheck();
                }
            });
    }

    reloadDataForPagination() {
        this.isLoading = true;
        this.inscriptionService.search(this.currentPage, this.pageSize, this.searchInputControl.value)
            .subscribe({
                next: (data) => {
                    this.initialDataSource = data;
                    this.inscriptions = this.initialDataSource.content;
                    this.totalElements = data.totalElements;
                    this.isLoading = false;
                    this._changeDetectorRef.markForCheck();
                },
                error: (err) => {
                    this.isLoading = false;
                    this._dialogService.openDialog('Erreur lors du chargement des données.', false);
                    this._changeDetectorRef.markForCheck();
                }
            });
    }

    goToInscriptionDetails(inscription: Inscription) {
        this.router.navigateByUrl(`apps/inscriptions/${inscription.id}/display`);
    }

    approveInscription(inscription: Inscription) {
        this._fuseConfirmationService.open({
            title: 'Confirmer l\'acceptation',
            message: `Voulez-vous accepter l'inscription de ${inscription.etudiant.prenom} ${inscription.etudiant.nom} ?`,
            actions: {
                confirm: {
                    label: 'Accepter',
                    color: 'primary'
                },
                cancel: {
                    label: 'Annuler'
                }
            }
        }).afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                this.inscriptionService.approve(inscription.id).subscribe({
                    next: () => {
                        inscription.statutInscription = StatutInscription.VALIDER;
                        this._dialogService.openDialog('Inscription acceptée avec succès !', true);
                        this._changeDetectorRef.markForCheck();
                    },
                    error: () => {
                        this._dialogService.openDialog('Erreur lors de l\'acceptation de l\'inscription.', false);
                        this._changeDetectorRef.markForCheck();
                    }
                });
            }
        });
    }

    rejectInscription(inscription: Inscription) {
        this._fuseConfirmationService.open({
            title: 'Confirmer le refus',
            message: `Voulez-vous refuser l'inscription de ${inscription.etudiant.prenom} ${inscription.etudiant.nom} ?`,
            actions: {
                confirm: {
                    label: 'Refuser',
                    color: 'warn'
                },
                cancel: {
                    label: 'Annuler'
                }
            }
        }).afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                this.inscriptionService.cancel(inscription.id).subscribe({
                    next: () => {
                        inscription.statutInscription = StatutInscription.ANNULER;
                        this._dialogService.openDialog('Inscription refusée avec succès !', true);
                        this._changeDetectorRef.markForCheck();
                    },
                    error: () => {
                        this._dialogService.openDialog('Erreur lors du refus de l\'inscription.', false);
                        this._changeDetectorRef.markForCheck();
                    }
                });
            }
        });
    }

    trackByFn(index: number, item: Inscription): any {
        return item.id;
    }

    ngOnDestroy() {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
