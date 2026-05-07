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
import {Gravite, GravitePage} from "../../../../../main/models/gravite.model";
import {GraviteService} from '@externals/authentication/services/gravite.service';
import {UpdateGraviteComponent} from "../../configuration/update-gravite/update-gravite.component";
import {SaveGraviteDialogComponent} from "../../../../../../@externals/components/save-gravite-dialog/save-gravite-dialog.component";

@Component({
    selector: 'app-list-gravite',
    standalone: true,
    imports: [CommonModule, CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatTableModule, ReactiveFormsModule],
    templateUrl: './list-gravite.component.html',
    styleUrl: './list-gravite.component.scss',
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
export class ListGraviteComponent implements OnInit, OnDestroy {

    displayedColumns = ['id', 'libelle', 'montant', 'createdBy', 'createdAt', 'actions'];
    currentPage = 0;
    pageSize = 10;
    totalElements = 0;
    initialDataSource: GravitePage;
    gravites: Array<Gravite>;
    isLoading = true;

    searchInputControl = new FormControl('');
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private route: ActivatedRoute,
        private _fuseConfirmationService: FuseConfirmationService,
        public router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialogService: DialogService,
        private graviteService: GraviteService,
        private location: Location,
        private matDialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            if (data.data) {
                this.initialDataSource = data.data[0];
                this.gravites = this.initialDataSource.content;
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
                    return this.graviteService.getAllPage(
                        this.currentPage,
                        this.pageSize,
                        query
                    );
                })
            )
            .subscribe({
                next: (data) => {
                    this.initialDataSource = data;
                    this.gravites = this.initialDataSource.content;
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
        this.graviteService.getAllPage(
            this.currentPage,
            this.pageSize,
            this.searchInputControl.value
        ).subscribe(data => {
            this.initialDataSource = data;
            this.gravites = this.initialDataSource.content;
            this.totalElements = data.totalElements;
            this.isLoading = false;
            this._changeDetectorRef.markForCheck();
        });
    }

    goBack() {
        this.location.back();
    }

    viewGravite(gravite: Gravite) {
        this.matDialog.open(UpdateGraviteComponent, {autoFocus: false, data: {gravite}, width: '600px'});
    }

    openSaveGraviteDialog(): void {
        this.matDialog.open(SaveGraviteDialogComponent, {
            autoFocus: false,
            width: '600px'
        }).beforeClosed().subscribe({
            next: value => {
                this.graviteService.getAllPage(0, 10, '').subscribe({
                    next: data => {
                        this.initialDataSource = data;
                        this.gravites = this.initialDataSource.content;
                        this.totalElements = data.totalElements;
                        this.isLoading = false;
                        this._changeDetectorRef.markForCheck();
                    }
                });
            }
        });
    }

    deleteGravite(element: Gravite) {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Suppression de Niveau d\'étude',
            message: 'Êtes-vous sûr de vouloir supprimer ce niveau ?',
            actions: {
                confirm: {
                    label: 'Supprimer',
                },
            },
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.graviteService.delete(element?.id).subscribe({
                    next: data => {
                        this.reloadDataForPagination();
                        this._dialogService.openDialog("Niveau supprimé avec succès", true);
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
