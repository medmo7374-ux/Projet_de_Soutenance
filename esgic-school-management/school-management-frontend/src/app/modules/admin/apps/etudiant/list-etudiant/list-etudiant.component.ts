import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSortModule} from "@angular/material/sort";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {debounceTime, Subject, switchMap, takeUntil} from "rxjs";
import {
    EtudiantService,
} from "../../../../../../@externals/authentication/services/etudiant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {DialogService} from "../../../../../main/helpers/dialog/dialog.service";
import {Etudiant, EtudiantPage} from "../../../../../main/models/etudiant.model";
import {Helpers} from "../../../../../main/helpers/Helpers";

@Component({
  selector: 'app-list-etudiant',
  standalone: true,
    imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule, MatSortModule, ReactiveFormsModule],
  templateUrl: './list-etudiant.component.html',
  styleUrl: './list-etudiant.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
    styles: [
        /* language=SCSS */
        `
            .etudiants-grid {
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

                @media (max-width: 768px) {
                    grid-template-columns: 1fr; // Une seule colonne sur les petits écrans
                }
            }
        `,
    ],
})
export class ListEtudiantComponent implements OnInit, OnDestroy {

    currentPage = 0;
    pageSize = 10;
    totalElements = 0;
    initialDataSource: EtudiantPage;
    etudiants: Array<Etudiant>;
    isLoading = true;

    searchInputControl = new FormControl('');
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private etudiantService: EtudiantService,
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
                this.etudiants = this.initialDataSource.content;
                this.totalElements = this.initialDataSource.totalElements;
                this.isLoading = false;
            }
        });

        this.loadData();
    }

    createEtudiant() {
        this.router.navigateByUrl('/apps/etudiants/save');
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
                    return this.etudiantService.search(

                        this.currentPage,
                        this.pageSize,
                        query
                    );
                })
            )
            .subscribe({
                next: (data) => {
                    this.initialDataSource = data;
                    this.etudiants = this.initialDataSource.content;
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
        this.etudiantService.search(

            this.currentPage,
            this.pageSize,
            this.searchInputControl.value,

        ).subscribe(data => {
            this.initialDataSource = data;
            this.etudiants = this.initialDataSource.content;
            this.totalElements = data.totalElements;
            this.isLoading = false;
            this._changeDetectorRef.markForCheck();
        });
    }

    trackByFn(index: number, item: any): any {
        return item.id;
    }

    goToEtudiantDetails(d: Etudiant) {
        this.router.navigateByUrl(`apps/etudiants/${d?.id}/display`);
    }

    navigateToUpdateEtudiant(id: number) {
       // this.router.navigateByUrl(`apps/etudiants/update-etudiant/${id}`);
    }

    protected readonly Helpers = Helpers;
}
