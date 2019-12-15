import { Component, OnInit } from "@angular/core";
import { Filter, Filtration } from "../service/filtration.service";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { User } from "../model/user.model";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"]
})
export class FilterComponent implements OnInit {
  public dropdownSettings = {};
  public users = [];

  constructor(public filtration: Filtration) {}

  ngOnInit() {
    this.users = this.generateUsers();

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

  public onFilterSelect(event: any, property: string) {}
  public onFilterSelectAll(event: any, property: string) {}

  private generateUsers(): User[] {
    return [
      {
        name: "mike",
        gender: "male",
        music: ["rock", "blues"],
        film: ["horror", "action"]
      },
      {
        name: "lera",
        gender: "female",
        music: ["pop", "blues", "jazz"],
        film: ["adventure", "action", "comedy"]
      },
      {
        name: "john",
        gender: "male",
        music: ["techno", "blues"],
        film: ["comedy", "horror"]
      },
      {
        name: "dasha",
        gender: "female",
        music: ["techno", "pop", "rock"],
        film: ["action", "horror"]
      }
    ];
  }

  private generateFilters(): Filter {
    let filter = new Filter();
    filter.gender = [
      { id: "male", text: "male" },
      { id: "female", text: "female" }
    ];

    filter.film = [
      { id: "action", text: "action" },
      { id: "adventure", text: "adventure" },
      { id: "comedy", text: "comedy" },
      { id: "horror", text: "horror" }
    ];

    filter.music = [
      { id: "rock", text: "rock" },
      { id: "jazz", text: "jazz" },
      { id: "blues", text: "blues" },
      { id: "pop", text: "pop" },
      { id: "techno", text: "techno" }
    ];

    return filter;
  }
}
