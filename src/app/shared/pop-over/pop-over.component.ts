import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-pop-over',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pop-over.component.html',
  styleUrl: './pop-over.component.scss'
})
export class PopOverComponent implements AfterViewInit {
  @Input() title: string = "";
  @Input() content: string = "";
  @Input() isOpen: boolean = false;

  ngAfterViewInit(): void {
    const divContent = document.getElementById('div_content');
    if(divContent){
      divContent.innerHTML = this.content;
    }
  }
}
