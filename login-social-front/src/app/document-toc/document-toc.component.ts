import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-document-toc',
  imports: [NgFor],
  templateUrl: './document-toc.component.html',
  styleUrl: './document-toc.component.css',
})
export class DocumentTocComponent implements AfterViewInit, OnDestroy {
  sections = [
    { id: 'sec1', title: 'Sección 1' },
    { id: 'sec2', title: 'Sección 2' },
    { id: 'sec3', title: 'Sección 3' },
    { id: 'sec4', title: 'Sección 4' },
  ];

  activeSection: string = '';
  observer!: IntersectionObserver;

  ngAfterViewInit(): void {
    const cssActiveName: string = 'document-toc-link-selected';
    const cssName: string = 'document-toc-link';

    const sectionElements = document.querySelectorAll('#content section');

    // const navLinks = document.querySelectorAll('.' + cssName);

    this.observer = new IntersectionObserver((entries) => {
      let mostVisibleSection: string | null = null;
      let maxRatio = 0;

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisibleSection = entry.target.id;
        }
      });

      if (mostVisibleSection) {
        this.activeSection = mostVisibleSection;
      }
    }, {
      threshold: [0.1, 0.6, 1], // Varias intersecciones para detectar cambios suaves
      rootMargin: "0px 0px -50% 0px" // Ajuste para evitar cambios bruscos
    });
    sectionElements.forEach(section => {this.observer.observe(section)});
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
