import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatOptionModule} from "@angular/material/core";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, Subject, switchMap, takeUntil} from "rxjs";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FuseConfirmationService} from "../../../../../../../@fuse/services/confirmation";
import {DialogService} from "../../../../../../main/helpers/dialog/dialog.service";
import {MatDialog} from "@angular/material/dialog";
import {UtilisateurEntity, UtilisateurPage} from "../../../../../../main/Utils/utilisateur.page";
import {Helpers} from "../../../../../../main/helpers/Helpers";
import {UtilisateurService} from "@externals/authentication/services/utilisateur.service";

@Component({
    selector: 'app-list-utilisateur',
    standalone: true,
    imports: [CommonModule, CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule, ReactiveFormsModule, RouterLink],
    templateUrl: './list-utilisateur.component.html',
    styleUrl: './list-utilisateur.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
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
export class ListUtilisateurComponent implements OnInit, OnDestroy {

    displayedColumns = ['prenom', 'nom', 'telephone', 'username', 'email', 'actions'];
    currentPage = 0;
    pageSize = 10;
    totalElements = 0;
    initialDataSource: UtilisateurPage;
    users: Array<UtilisateurEntity>;
    isLoading = true;

    searchInputControl = new FormControl('');
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private route: ActivatedRoute
        , private _fuseConfirmationService: FuseConfirmationService,
        public router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialogService: DialogService,
        private utilisateurService: UtilisateurService,
        private location: Location,
        private matDialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            if (data.data) {
                this.initialDataSource = data.data[0];
                this.users = this.initialDataSource.content;
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
                    return this.utilisateurService.getAllUsersByCriteria(
                        this.currentPage,
                        this.pageSize,
                        query
                    );
                })
            )
            .subscribe({

                    next: (data) => {

                        this.initialDataSource = data;
                        this.users = this.initialDataSource.content;
                        this.totalElements = data.totalElements;
                        this.isLoading = false;
                        this._changeDetectorRef.markForCheck();
                    }
                    , error: (err) => {

                        console.error('Une erreur s\'est produite lors de la recherche :', err);
                        this.isLoading = false;
                    }
                }
            );
    }

    reloadDataForPagination() {
        this.isLoading = true;
        this.utilisateurService.getAllUsersByCriteria(
            this.currentPage,
            this.pageSize,
            this.searchInputControl.value
        ).subscribe(data => {
            this.initialDataSource = data;
            this.users = this.initialDataSource.content;
            this.totalElements = data.totalElements;
            this.isLoading = false;
            this._changeDetectorRef.markForCheck()
        });
    }

    goBack() {
        this.location.back()
    }

    deleteUtilisateur(id: number) {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Suppression d\'utilisateur',
            message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
            actions: {
                confirm: {
                    label: 'Supprimer',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                this.utilisateurService.deleteUser(id).subscribe({
                    next: data => {
                        this.reloadDataForPagination();
                        this._dialogService.openDialog("Utilisateur supprimé avec succès", true);

                    },
                    error: err => {
                        this._dialogService.openDialog(err.error, false);
                    }
                })
            }
        });
    }

    openResetPasswordDialog(userId: number) {
    }

    protected readonly Helpers = Helpers;
}
