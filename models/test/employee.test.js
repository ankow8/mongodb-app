const Employee = require('../employee.models');
const expect = require('chai').expect;

describe('Employee', () => {
  it('should throw an error if no any arg', () => {
    const emp = new Employee({});
    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });
  it('should throw an error if args is not a string', () => {
    const emp = new Employee({firstName: {}, lastName: [], department: undefined});
    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });
  it('should not throw an error if args is OK', () =>{
    const emp = new Employee({firstName: 'John', lastName: 'Doe', department: 'IT'});
    emp.validate(err => {
      expect(err).to.not.exist;
    });
  });
});
