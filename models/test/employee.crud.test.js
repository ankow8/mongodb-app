const Employee = require('../employee.models');
const expect = require('chai').expect;
const mongoose = require('mongoose');
describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });
  describe('Reading data', () => {
    before(async () => {
      const testEmpOne = new Employee({firstName: 'John', lastName: 'Doe', department: 'IT'});
      await testEmpOne.save();
      const testEmpTwo = new Employee({firstName: 'Adam', lastName: 'Smith', department: 'Marketing'});
      await testEmpTwo.save();
    });
    after(async () => {
      await Employee.deleteMany();
    });
    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const employeesLength = 2;
      expect(employees.length).to.be.equal(employeesLength);
    });
    it('should return proper document by various params with findOne method', async () => {
      const employee = await Employee.findOne({firstName: 'Adam'});
      const expectedFirstName = 'Adam';
      expect(employee.firstName).to.be.equal(expectedFirstName);
    });
  });
  describe('Creating data', () => {
    it('should insert new document with insertOne method', async () => {
      const employee = new Employee({firstName: 'Adam', lastName: 'Smith', department: 'Marketing'});
      await employee.save();
      const savedEmployee = await Employee.findOne({firstName: 'Adam'});
      expect(savedEmployee).to.not.be.null;
    });
    after(async () => {
      await Employee.deleteMany();
    });
  });
  describe('Updating data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({firstName: 'John', lastName: 'Doe', department: 'IT'});
      await testEmpOne.save();
      const testEmpTwo = new Employee({firstName: 'Adam', lastName: 'Smith', department: 'Marketing'});
      await testEmpTwo.save();
    });
    afterEach(async () => {
      await Employee.deleteMany();
    });
    it('should properly update one document with updateOne method', async () => {
      await Employee.updateOne({firstName: 'Adam'}, {$set: {firstName: '-Adam-', lastName: '-Smith-'}});
      const updateEmployee = await Employee.findOne({firstName: '-Adam-'});
      expect(updateEmployee).to.not.be.null;
    });
    it('should properly update one document with save method', async () => {
      const employee = await Employee.findOne({firstName: 'Adam'});
      employee.firstName = '-Adam-';
      employee.lastName = '-Smith-';
      await employee.save();
      const updatedEmployee = await Employee.findOne({firstName: '-Adam-'});
      expect(updatedEmployee).to.not.be.null;
    });
    it('should properly update multiple documents with updateMany method', async () => {
      await Employee.updateMany({firstName: 'Updated!'});
      const updatedEmployee = await Employee.find({firstName: 'Updated!'});
      expect(updatedEmployee.length).to.be.equal(2);
    });
  });
  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({firstName: 'John', lastName: 'Doe', department: 'IT'});
      await testEmpOne.save();
      const testEmpTwo = new Employee({firstName: 'Adam', lastName: 'Smith', department: 'Marketing'});
      await testEmpTwo.save();
    });
    afterEach(async () => {
      await Employee.deleteMany();
    });
    it('should properly remove one document with deleteOne method', async () => {
      await Employee.deleteOne({firstName: 'Adam'});
      const removeEmployee = await Employee.findOne({firstName: 'Adam'});
      expect(removeEmployee).to.be.null;
    });
    it('should properly remove one document with remove method', async () => {
      const employee = await Employee.findOne({firstName: 'Adam'});
      await employee.remove();
      const removedEmployee = await Employee.findOne({firstName: 'Adam'});
      expect(removedEmployee).to.be.null;
    });
    it('should properly remove multiple documents with deleteMany method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });
  });
});
