function calculateFields(data) {
    const result = {};
    console.log(data);
  
    // Заявка по курсу в рублях
    if (data.sum_order && data.money_rate) {
      const courseSum = data.sum_order * data.money_rate;
      if (data.client === "Совком" || data.client === "Вектрум") {
        result.order_rate_rub =
          courseSum - (courseSum * (data.commision_plus_percent || 0)) / 100;
      } else {
        result.order_rate_rub = courseSum;
      }
    }
  
    // Агентское вознаграждение
    if (
      data.sum_order &&
      data.money_rate &&
      data.commision_plus_percent !== undefined
    ) {
      const courseSum = data.sum_order * data.money_rate;
      if (data.client === "Совком" || data.client === "Вектрум") {
        result.agency_award = courseSum * (data.commision_plus_percent / 100);
      } else if (result.order_rate_rub) {
        const baseCommission =
          ((data.vip_commission || 0) + (data.commision_plus_percent || 0)) / 100;
  
        switch (data.calc_condition) {
          case "Предоплата":
          case "Постоплата":
            result.agency_award = result.order_rate_rub * baseCommission;
            break;
          case "Аккредитив":
            result.agency_award =
              result.order_rate_rub * ((data.commision_plus_accredit || 0) / 100);
            break;
          case "Эскроу":
            result.agency_award =
              result.order_rate_rub * ((data.commision_plus_escrow || 0) / 100);
            break;
          default:
            result.agency_award = 0;
        }
      }
    }
  
    // Фактическое вознаграждение
    if (
      data.hide_money_rate &&
      data.sum_order &&
      data.hide_commission !== undefined
    ) {
      result.real_award =
        (data.hide_money_rate * data.sum_order * data.hide_commission) / 100;
    }
  
    // Агентское не наше
    if (
      data.vip_commission > 1 &&
      data.sum &&
      data.hide_money_rate &&
      data.hide_commission !== undefined
    ) {
      result.not_ours_award =
        data.sum -
        data.hide_money_rate * data.sum_order * (1 + data.hide_commission / 100);
    } else {
      result.not_ours_award = 0;
    }
  
    // ИТОГО
    if (
      result.order_rate_rub !== undefined &&
      result.agency_award !== undefined
    ) {
      result.sum = result.order_rate_rub + result.agency_award;
    }
  
    // Цикл сделки
    if (data.date_hired || data.date_close_deal) {
      const startDate = new Date(data.date_hired || new Date());
      const endDate = data.date_close_deal
        ? new Date(data.date_close_deal)
        : new Date();
      result.cycle_deal = Math.ceil(
        (endDate - startDate) / (1000 * 60 * 60 * 24)
      );
    }
  
    console.log(result);
    return result;
  }
  
  module.exports = calculateFields;
  