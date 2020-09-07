import { Component, OnInit, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { StarShipsService, IApiResponse, IStarShips } from './star-ships.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditStarshipComponent } from '@app/create-edit-starship/create-edit-starship.component';
import { untilDestroyed } from '@app/@core';
import { DeleteStarshipComponent } from '@app/delete-starship/delete-starship.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  starshipsResp!: IApiResponse;
  isLoading = false;

  constructor(
    private starShipsService: StarShipsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.loadShips(1);
  }

  ngOnDestroy() { }

  onPageChange(event: any) {
    this.isLoading = true;
    this.loadShips(event.pageIndex + 1);
  }

  callCreateModal() {
    const _dialog = this.dialog.open(CreateEditStarshipComponent, {
      width: '700px',
      data: {}
    });
    _dialog.afterClosed().pipe(untilDestroyed(this)).subscribe(data => {
      if (data !== '') {
        this.starshipsResp.results = [data].concat(this.starshipsResp.results);
      }
    });
  }

  callEditModal(starShip: IStarShips = {}) {
    const _url = starShip.url;
    const dialogResult = this.dialog.open(CreateEditStarshipComponent, {
      width: '700px',
      data: { starShip }
    });
    dialogResult.afterClosed().pipe(untilDestroyed(this)).subscribe(result => {
      if (result) {
        const index = this.starshipsResp.results.findIndex(x => x.url === _url);
        if (index !== -1) {
          this.starshipsResp.results[index] = result;
        }
      }
    });
  }

  callDeleteModal(starShip: IStarShips) {
    const _url = starShip.url;
    const dialogResult = this.dialog.open(DeleteStarshipComponent, {
      width: '500px',
      data: { starShip }
    });
    dialogResult.afterClosed().pipe(untilDestroyed(this)).subscribe((result: IStarShips)  => {
      if (result) {
        this.starshipsResp.results = this.starshipsResp.results.filter(x => x.url !== result.url);
        this.starshipsResp.count -= 1;
      }
    });
  }

  private loadShips(index: number) {
    this.starShipsService
      .get(index)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe((resp: IApiResponse) => {
        this.starshipsResp = resp;
      });
  }
}
