import { Component, OnInit } from '@angular/core';

import { HomePageService } from '../home-page.service';

declare var $ :any;
declare var Swiper :any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  data: any;
  filters = ['popular','top rated', 'upcoming'];
  selectedItem = this.filters[0];
  currentPage: number;
  
  constructor(private homePageService: HomePageService) { }
  
  ngOnInit() {
    this.activeSlider();
    this.getData();
  }
  
  activeSlider(): any {
    $(function () {
      let swiper = new Swiper('.banner-slider', {
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: {
          delay: 5000
        }
      });
    });
  }

  getData(): void {
    this.currentPage = 0;
    this.homePageService.getData(this.currentPage)
        .subscribe(responseData => {
          this.data = responseData.results;
          this.sortNumber('popular');
          let ele_loading = document.querySelector('.loading-icon');
          ele_loading.classList.add('hidden');
        });
  }

  selectFilter(index): void {
    this.selectedItem = this.filters[index];
    this.sortNumber(this.selectedItem);
  }

  sortNumber(type): void {
    let byNumber = this.data.slice(0);
    byNumber.sort((a,b) => {
      if ( type === this.filters[0] ) {
        return b.popularity - a.popularity;
      } else if ( type === this.filters[1] ) {
        return b.vote_average - a.vote_average;
      } else {
        return b.id - a.id;
      }
    });
    this.data = byNumber;
  }
}
