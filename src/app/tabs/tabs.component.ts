import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Input() selectedIndex!: number;
  @Input() tabs!: Array<{ tabTitle: string; tabContent: string }>;
  selectedTab = 0;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.tabs;
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }

  selectTabById(id: string) {
    const tabIndex = this.tabs.findIndex((tab: any) => tab.id === id);
    this.selectedTab = tabIndex !== -1 ? tabIndex : 0;
  }
}
