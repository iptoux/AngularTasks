import {Component, OnInit} from '@angular/core';
import {VersionService} from '../../services/version.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  version: string = '';  // I fixed the typo in "vesion" to "version"

  constructor(private versionService: VersionService) {}

  ngOnInit(): void {
    this.version = this.versionService.getVersion();
  }

}
