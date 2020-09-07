import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IStarShips, StarShipsService } from '@app/home/star-ships.service';
import { untilDestroyed } from '@app/@core';

@Component({
  selector: 'app-delete-starship',
  templateUrl: './delete-starship.component.html',
  styleUrls: ['./delete-starship.component.scss']
})
export class DeleteStarshipComponent implements OnInit, OnDestroy {

  constructor(
    private starShipsService: StarShipsService,
    public dialogRef: MatDialogRef<DeleteStarshipComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { starShip: IStarShips },
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() { }

  excDelete() {
    this.starShipsService.delete(this.data.starShip)
    .pipe(untilDestroyed(this))
    .subscribe((resp: any) => {
      this.dialogRef.close(resp);
    });
    
  }
}
