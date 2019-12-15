import { Component, OnInit } from "@angular/core";
import { Filter, Filtration } from "../service/filtration.service";
import { IDropdownSettings } from "ng-multiselect-dropdown";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"]
})
export class FilterComponent implements OnInit {
  public dropdownSettings = {};
  constructor(public filtration: Filtration) {}

  ngOnInit() {
    this.filtration.filter = this.generateFilters();

    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 10,
      allowSearchFilter: false
    } as IDropdownSettings;
  }

  public onFilterSelect(event: any, property: string){

  }
  public onFilterSelectAll(event: any, property: string){
    
  }

  private generateUsers() {}

  private generateFilters(): Filter {
    let filter = new Filter();
    filter.gender = [
      { id: "male", text: "male" },
      { id: "female", text: "female" },
    ];

    filter.film = [
      { id: "action", text: "action" },
      { id: "adventure", text: "adventure" },
      { id: "comedy", text: "comedy" },
      { id: "actihorroron", text: "horror" },
    ];

    filter.music = [
      { id: "rock", text: "rock" },
      { id: "jazz", text: "jazz" },
      { id: "blues", text: "blues" },
      { id: "pop", text: "pop" },
      { id: "techno", text: "techno" },
    ];

    return filter;
  }
}
