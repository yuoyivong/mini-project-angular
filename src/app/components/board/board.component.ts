import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  data = [
    {
      date: 'Thu, Apr 6',
      title: 'Useless',
      description: 'Useless is not always bad.',
      status: 'Review',
    },
    {
      date: 'Thu, Apr 6',
      title: 'Useless',
      description: 'Useless is not always bad.',
      status: 'Done',
    },
    {
      date: 'Thu, Apr 6',
      title: 'Useless',
      description: 'Useless is not always bad.',
      status: 'Not Yet',
    },
    {
      date: 'Thu, Apr 6',
      title: 'Useless',
      description: 'Useless is not always bad.',
      status: 'In Progress',
    },
  ];

  statusChangebg() {
    // for (let item of this.data) {
    //   console.log('Item : ', item.status);
    //   if (item.status == 'Review') {
    //     return 'bg-orange-500';
    //   } else if (item.status == 'Done') {
    //     return 'bg-green-500';
    //   } else if (item.status == 'Not Yet') {
    //     return 'bg-slate-300';
    //   } else {
    //     return 'bg-blue-500';
    //   }
    // }
  }
}
