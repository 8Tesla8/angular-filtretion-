import { filter, intersectionBy, some, unionBy } from 'lodash-es'


export class Filter {
    public gender: FilterItem[]; //property - coverageType
    public music: FilterItem[];  //array
    public film: FilterItem[];   //array
}

export class FilterItem {
    public id: string;
    public text: string;
}

export class Filtration {
    public filter = new Filter();
    public selectedFilter = new Filter();

    private propertyNames = [
        'gender',  
        'music',  
        'film',    
    ];

    public getPropertyNames(): string[] {
        return this.propertyNames;
    }

    public hasFilter(): boolean {
        let hasFilter = false;

        this.propertyNames.forEach(property => {

            if (this.selectedFilter[property] && 
                this.selectedFilter[property].length > 0) {
                hasFilter = true;
            }
        });

        return hasFilter;
    }

    public doFiltrationAnd(installers: any[]) {
        if (!this.hasFilter())
            return undefined;

        let result = new Filter();

        let filtredInstallers = installers;

        this.propertyNames.forEach(property => {
            if (!this.selectedFilter[property] ||
                this.selectedFilter[property].length == 0) {
                return
            }

            result[property] = installers;

            this.selectedFilter[property].forEach(filterType => {
                if (property === 'gender') {
                    result[property] = filter(result[property], { coverageType: filterType.id });
                }
                else {
                    result[property] = filter(result[property], (installer => {
                        return some(installer[property], { id: filterType.id });
                    }));
                }
            });

            filtredInstallers = intersectionBy(filtredInstallers, result[property], 'locationUuid'); //return duplicates
        });

        return filtredInstallers;
    }

    public doFiltrationOr(installers: any[]) {
        if (!this.hasFilter())
            return installers;

        let result = new Filter();

        let filtredInstallers = installers;

        this.propertyNames.forEach(property => {
            if (!this.selectedFilter[property] ||
                this.selectedFilter[property].length == 0) {
                return;
            }

            //
            this.selectedFilter[property].forEach(filterType => {
                let filtration = [];

                if (property === 'gender') {
                    filtration = filter(installers, { coverageType: filterType.id });
                }
                else {
                    filtration = filter(installers, (installer => {
                        return some(installer[property], { id: filterType.id });
                    }));
                }

                result[property] = unionBy(result[property], filtration, 'locationUuid'); 
            });
            //

            filtredInstallers = intersectionBy(filtredInstallers, result[property], 'locationUuid'); //return duplicates
        });

        return filtredInstallers;
    }


    private and(propertyName: string, filterResult: filter) {

    }

    private or(propertyName: string, filterResult: filter) {

    }
}
