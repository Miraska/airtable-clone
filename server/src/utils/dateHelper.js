const moment = require('moment');

const formatDate = (date, format = 'YYYY-MM-DD') => {
  return moment(date).format(format);
};

module.exports = {
  formatDate,
};
