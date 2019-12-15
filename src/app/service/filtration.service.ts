import { filter, intersectionBy, some, unionBy } from "lodash-es";

export class Filter {
  public gender = []; //property - coverageType
  public music = []; //array
  public film = []; //array
}

export class Filtration {
  public filter = new Filter();
  public selectedFilter = new Filter();

  private propertyNames = ["gender", "music", "film"];

  public getPropertyNames(): string[] {
    return this.propertyNames;
  }

  public hasFilter(): boolean {
    let hasFilter = false;

    this.propertyNames.forEach(property => {
      if (
        this.selectedFilter[property] &&
        this.selectedFilter[property].length > 0
      ) {
        hasFilter = true;
      }
    });

    return hasFilter;
  }

  public doFiltration(array: any[], filtrationType: string) {
    if (!this.hasFilter()) return array;

    let result = new Filter();

    let filtredArray = array;

    this.propertyNames.forEach(property => {
      if (
        !this.selectedFilter[property] ||
        this.selectedFilter[property].length == 0
      ) {
        return;
      }

      if (filtrationType === "and") {
        this.and(property, array, result);
      } else {
        this.or(property, array, result);
      }

      filtredArray = intersectionBy(filtredArray, result[property], "id"); //return duplicates
    });

    return filtredArray;
  }

  private and(propertyName: string, array: any[], filterResult: filter) {
    filterResult[propertyName] = array;

    this.selectedFilter[propertyName].forEach(filterType => {
      if (propertyName === "gender") {
        filterResult[propertyName] = filter(filterResult[propertyName], {
          gender: filterType.id
        });
      } else {
        filterResult[propertyName] = filter(
          filterResult[propertyName],
          item => {
            return some(item[propertyName], { id: filterType.id });
          }
        );
      }
    });
  }

  private or(propertyName: string, array: any[], filterResult: filter) {
    this.selectedFilter[propertyName].forEach(filterType => {
      let filtration = [];

      if (propertyName === "gender") {
        filtration = filter(array, { gender: filterType.id });
      } else {
        filtration = filter(array, item => {
          return some(item[propertyName], { id: filterType.id });
        });
      }

      filterResult[propertyName] = unionBy(
        filterResult[propertyName],
        filtration,
        "id"
      );
    });
  }
}
