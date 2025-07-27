import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {
  private userId: string;
  private username: string;
  private favorites: string[];
  private settings: any;
  private isAuthenticated: boolean;
  constructor() {
    this.userId = '';
    this.username = '';
    this.favorites = [];
    this.settings = {};
    this.isAuthenticated = false;
  }
}
