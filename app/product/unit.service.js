import { units } from '../dataMocks';

export default class UnitService {
  constructor($q) {
    this.$q = $q;
  }

  getUnit(unitId) {
    return this.$q((resolve, reject) => {
      setTimeout(() => {
        const found = units.find((u) => u.id === unitId);
        if (found) {
          resolve(found);
        } else {
          reject(`Unit ${unitId} not found.`);
        }
      }, 500);
    });
  }
}
