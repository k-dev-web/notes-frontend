import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotesProvider} from '../../providers/providers/notes';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private notes: NotesProvider,
  ) {
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.notes.getNotes();
  }

}
