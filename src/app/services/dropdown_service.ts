import { Injectable } from '@angular/core';
import { Component, inject, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DropdownMenu {
    selectedActive: string = "active";
    selectedCategory: string = "";
    isDropdownOpen = false;
    dropdownText = signal("");

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }
}