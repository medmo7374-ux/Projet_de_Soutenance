import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignalementService} from "../../../../../../@externals/authentication/services/signalement.service";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../../../main/helpers/dialog/dialog.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Signalement, SignalementPage} from "../../../../../main/models/signalement.model";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import { Subject, debounceTime, takeUntil, switchMap } from "rxjs";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import { Helpers} from "app/main/helpers/Helpers";

@Component({
    selector: 'app-signalement-list',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatProgressBarModule, MatSortModule, MatMenuModule, MatPaginatorModule],
    templateUrl: './signalement-list.component.html',
    styleUrl: './signalement-list.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
    styles: [
        /* language=SCSS */
        `
            .signalements-grid {
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

                @media (max-width: 768px) {
                    grid-template-columns: 1fr; // Une seule colonne sur les petits écrans
                }
            }
        `,
    ],
})
export class SignalementListComponent implements OnInit, OnDestroy {

    currentPage = 0;
    pageSize = 10;
    totalElements = 0;
    initialDataSource: SignalementPage;
    signalements: Array<Signalement>;
    isLoading = true;

    searchInputControl = new FormControl('');
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private signalementService: SignalementService,
        private route: ActivatedRoute,
        private _fuseConfirmationService: FuseConfirmationService,
        public router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialogService: DialogService,
    ) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            if (data && data.data) {
                this.initialDataSource = data.data[0];
                this.signalements = this.initialDataSource.content;
                this.totalElements = this.initialDataSource.totalElements;
                this.isLoading = false;
            }
        });

        this.loadData();
    }

    createSignalement() {
        this.router.navigateByUrl('/signaler');
    }

    onPageChange(page: number) {
        this.currentPage = page;
        this.loadData();
    }

    ngOnDestroy() {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    handlePageEvent(event: PageEvent) {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.reloadDataForPagination();
    }

    // Recherche
    onSearch() {
        this.currentPage = 0;
        this.loadData();
    }

    // loadData
    loadData() {
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap(query => {
                    this.isLoading = true;
                    return this.signalementService.searchByCriteria(
                        query,
                        this.currentPage,
                        this.pageSize
                    );
                })
            )
            .subscribe({
                next: (data) => {
                    this.initialDataSource = data;
                    this.signalements = this.initialDataSource.content;
                    this.totalElements = data.totalElements;
                    this.isLoading = false;
                    this._changeDetectorRef.markForCheck();
                },
                error: (err) => {
                    console.error('Une erreur s\'est produite lors de la recherche :', err);
                    this.isLoading = false;
                }
            });
    }

    reloadDataForPagination() {
        this.isLoading = true;
        this.signalementService.searchByCriteria(
            this.searchInputControl.value,
            this.currentPage,
            this.pageSize,

        ).subscribe(data => {
            this.initialDataSource = data;
            this.signalements = this.initialDataSource.content;
            this.totalElements = data.totalElements;
            this.isLoading = false;
            this._changeDetectorRef.markForCheck();
        });
    }

    trackByFn(index: number, item: any): any {
        return item.id;
    }

    goToSignalementDetails(signalement: Signalement) {
        this.router.navigateByUrl(`apps/signalements/${signalement?.id}/display`);
    }

    navigateToUpdateSignalement(id: number) {
        this.router.navigateByUrl(`apps/signalements/update-signalement/${id}`);
    }

    protected readonly Helpers = Helpers;
}
