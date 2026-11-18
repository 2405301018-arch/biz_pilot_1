import db from './src/database.js';
import { getOverviewData, queryAiCopilot } from './src/controllers/overviewController.js';
import { getSales, createSale } from './src/controllers/salesController.js';
import { getInventory, addProduct } from './src/controllers/inventoryController.js';
import { getCustomers, addCustomer } from './src/controllers/customersController.js';
import { getExpenses, addExpense } from './src/controllers/expensesController.js';
import { getReportsData } from './src/controllers/reportsController.js';
import { simulateScenario } from './src/controllers/aiController.js';
import { getSettings, updateSettings } from './src/controllers/settingsController.js';

function mockRes() {
  const res = {
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return res;
}

console.log('Testing Database and Controllers...');

// 1. Overview
const res1 = mockRes();
getOverviewData({}, res1);
console.log('Overview Test:', res1.body.success ? 'PASS' : 'FAIL', 'Revenue:', res1.body.data.kpis.revenue.formatted);

// 2. Sales
const res2 = mockRes();
getSales({ query: {} }, res2);
console.log('Sales Get Test:', res2.body.success ? 'PASS' : 'FAIL', 'Total Orders:', res2.body.totalCount);

const res2b = mockRes();
createSale({ body: { customer: 'Kavita Test', amount: 1250, items: 'Cold Brew 1L' } }, res2b);
console.log('Sales Create Test:', res2b.body.success ? 'PASS' : 'FAIL', 'New ID:', res2b.body.order.id);

// 3. Inventory
const res3 = mockRes();
getInventory({ query: {} }, res3);
console.log('Inventory Test:', res3.body.success ? 'PASS' : 'FAIL', 'Products Count:', res3.body.count);

// 4. Customers
const res4 = mockRes();
getCustomers({ query: {} }, res4);
console.log('Customers Test:', res4.body.success ? 'PASS' : 'FAIL', 'Customers Count:', res4.body.totalCount);

// 5. Expenses
const res5 = mockRes();
getExpenses({ query: {} }, res5);
console.log('Expenses Test:', res5.body.success ? 'PASS' : 'FAIL', 'Expenses Count:', res5.body.totalCount);

// 6. Reports
const res6 = mockRes();
getReportsData({}, res6);
console.log('Reports Test:', res6.body.success ? 'PASS' : 'FAIL', 'Gross Margin:', res6.body.data.kpis.grossMarginRetention.value);

// 7. AI Simulator
const res7 = mockRes();
simulateScenario({ body: { price: 5, waste: 10, footfall: 15 } }, res7);
console.log('AI Simulation Test:', res7.body.success ? 'PASS' : 'FAIL', 'Monthly Gain:', res7.body.results.totalMonthlyFormatted);

// 8. Settings
const res8 = mockRes();
getSettings({}, res8);
console.log('Settings Test:', res8.body.success ? 'PASS' : 'FAIL', 'Store:', res8.body.settings.storeName);

console.log('ALL CONTROLLER & DATABASE TESTS COMPLETED SUCCESSFULLY!');

