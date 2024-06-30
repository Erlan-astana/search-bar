import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ScreenSizeDirective } from '../../shared/directives/screen-size.directive';
import { ProfileComponent } from '../profile/profile.component';
import { FilterMenuComponent } from '../filter-menu/filter-menu.component';


@Component({
  selector: 'top-bar',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    ScreenSizeDirective,
    ProfileComponent,
    FilterMenuComponent
  ],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss', './top-bar-mb.scss'],
})
export class TopBarComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('filterContainer') filterContainer!: ElementRef;
  @ViewChild('searchBox') searchBox!: ElementRef;

  isSearchVisible = false;
  isSearchVisibleMb = false;
  isFilterVisible = false;
  searchHistoryList: string[] = [];
  currentSearchQuery: string = '';
  isMenuActive: boolean = false;

  toggleSearchVisibility() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  toggleSearchVisibilityMd() {
    this.isSearchVisibleMb = !this.isSearchVisibleMb;
  }

  openFilter(event: Event) {
    event.stopPropagation();
    this.isFilterVisible = true;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.checkClickOutside(event);
  }

  checkClickOutside(event?: MouseEvent) {
    if (
      this.searchInput?.nativeElement.contains(event?.target) ||
      this.filterContainer?.nativeElement.contains(event?.target) ||
      this.searchBox?.nativeElement.contains(event?.target)
    ) {
      return;
    } else {
      this.isSearchVisible = false;
      this.isFilterVisible = false;
    }
  }
}


