var schedule = require('node-schedule');
 
var membershipRule = new schedule.RecurrenceRule();
membershipRule.hour = 24;
module.exports.membership = membershipRule;

