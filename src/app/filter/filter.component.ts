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
  public allUsers = [];
  public filtredUsers = [];
  public filtrationtype = "or";

  constructor(public filtration: Filtration) {}

  ngOnInit() {
    this.allUsers = this.generateUsers();
    this.filtredUsers = this.allUsers;

    this.filtration.filter = this.generateFilters();

    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "text",
      itemsShowLimit: 10,
      allowSearchFilter: false,
      enableCheckAll: false,
    } as IDropdownSettings;
  }

  public onFilterChange(event: any) {
    this.filtredUsers = this.filtration.doFiltration(this.allUsers, this.filtrationtype);
  }

  public onChangeFiltrationType(){
    if(this.filtrationtype === "or" ) {
      this.filtrationtype = "and";
    }
    else if(this.filtrationtype === "and" ) {
      this.filtrationtype = "or";
    }

    this.onFilterChange(null);
  }

  private generateUsers(): User[] {
    return [
      {
        id: "1",
        name: "mike",
        gender: "male",
        music: [
          { id: "rock" },
          { id: "blues" }
        ],
        film: [
          { id: "horror" },
          { id: "action" }
        ]
      },
      {
        id: "2",
        name: "lera",
        gender: "female",
        music: [
          { id: "rock" },
          { id: "jazz" },
          { id: "blues" }
        ],
        film: [
          { id: "adventure" },
          { id: "action" },
          { id: "comedy" }
        ]
      },
      {
        id: "3",
        name: "john",
        gender: "male",
        music: [
          { id: "techno" },
          { id: "blues" }
        ],
        film: [
          { id: "comedy" },
          { id: "horror" }
        ]
      },
      {
        id: "4",
        name: "dasha",
        gender: "female",
        music: [
          { id: "techno" },
          { id: "pop" },
          { id: "rock" }
        ],
        film: [
          { id: "action" },
          { id: "horror" }
        ]
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
