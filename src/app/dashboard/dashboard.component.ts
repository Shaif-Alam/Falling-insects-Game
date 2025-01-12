import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  time: string = '';

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000); // Update time every second
  }

  updateTime(): void {
    const now = new Date();  // Get the current date and time
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const isAm = hours < 12;

    // Format the time as HH:MM AM/PM
    this.time = `${String(hours % 12 || 12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${isAm ? 'AM' : 'PM'}`;
  }
}
