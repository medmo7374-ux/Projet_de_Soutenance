import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, Subject, switchMap, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {DialogService} from "../../../../../main/helpers/dialog/dialog.service";
import {MatDialog} from "@angular/material/dialog";
import {Helpers} from "../../../../../main/helpers/Helpers";
import {Statut, StatutPage} from "../../../../../main/models/statut.model";
import {StatutService} from '@externals/authentication/services/statut.service';
import {UpdateStatutComponent} from "../../configuration/update-statut/update-statut.component";
import {SaveStatutDialogComponent} from "../../../../../../@externals/components/save-statut-dialog/save-statut-dialog.component";

@Component({
    selector: 'app-list-statut',
    standalone: true,
    imports: [CommonModule, CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatTableModule, ReactiveFormsModule],
    templateUrl: './list-statut.component.html',
    styleUrl: './list-statut.component.scss',
    styles: [
        /* language=SCSS */
        `
            .members-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
                }
            }
        `,
    ],
})
export class ListStatutComponent implements OnInit, OnDestroy {

    displayedColumns = ['id', 'libelle', 'createdBy', 'createdAt', 'actions'];
    currentPage = 0;
    pageSize = 10;
    totalElements = 0;
    initialDataSource: StatutPage;
    statuts: Array<Statut>;
    isLoading = true;

    searchInputControl = new FormControl('');
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private route: ActivatedRoute,
        private _fuseConfirmationService: FuseConfirmationService,
        public router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialogService: DialogService,
        private statutService: StatutService,
        private location: Location,
        private matDialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            if (data.data) {
                this.initialDataSource = data.data[0];
                this.statuts = this.initialDataSource.content;
                this.isLoading = false;
            }
        })
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

    onSearch() {
        this.currentPage = 0;
        this.loadData();
    }

    loadData() {
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap(query => {
                    this.isLoading = true;
                    return this.statutService.getAllPage(
                        this.currentPage,
                        this.pageSize,
                        query
                    );
                })
            )
            .subscribe({
                next: (data) => {
                    this.initialDataSource = data;
                    this.statuts = this.initialDataSource.content;
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
        this.statutService.getAllPage(
            this.currentPage,
            this.pageSize,
            this.searchInputControl.value
        ).subscribe(data => {
            this.initialDataSource = data;
            this.statuts = this.initialDataSource.content;
            this.totalElements = data.totalElements;
            this.isLoading = false;
            this._changeDetectorRef.markForCheck();
        });
    }

    goBack() {
        this.location.back();
    }

    viewStatut(statut: Statut) {
        this.matDialog.open(UpdateStatutComponent, {autoFocus: false, data: {statut}, width: '600px'});
    }

    openSaveStatutDialog(): void {
        this.matDialog.open(SaveStatutDialogComponent, {
            autoFocus: false,
            width: '600px'
        }).beforeClosed().subscribe({
            next: value => {
                this.statutService.getAllPage(0, 10, '').subscribe({
                    next: data => {
                        this.initialDataSource = data;
                        this.statuts = this.initialDataSource.content;
                        this.totalElements = data.totalElements;
                        this.isLoading = false;
                        this._changeDetectorRef.markForCheck();
                    }
                });
            }
        });
    }

    deleteStatut(element: Statut) {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Suppression de Statut',
            message: 'Êtes-vous sûr de vouloir supprimer ce statut ?',
            actions: {
                confirm: {
                    label: 'Supprimer',
                },
            },
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.statutService.delete(element?.id).subscribe({
                    next: data => {
                        this.reloadDataForPagination();
                        this._dialogService.openDialog("Statut supprimé avec succès", true);
                    },
                    error: err => {
                        this._dialogService.openDialog(err.error.message || err.error, false);
                    }
                });
            }
        });
    }

    protected readonly Helpers = Helpers;
}
