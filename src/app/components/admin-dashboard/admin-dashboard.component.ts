import { Component } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  private modalInstance!: Modal | null;
  ngAfterViewInit() {
    const modalElement = document.getElementById('specializationModal');
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
    }
  }

  openModal() {
    this.modalInstance?.show();
  }

  closeModal() {
    this.modalInstance?.hide();
  }
}
