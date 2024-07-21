const generateLabels = (interval: string) => {
  switch (interval) {
    case '1h':
      return ['04:16', '06:54', '09:18', '14:57', '16:29'];
    case '24h':
      return ['00:00', '06:00', '12:00', '18:00'];
    case '1w':
      return ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    case '1m':
      return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    case '6m':
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    case '1y':
      return ['Jan', 'Apr', 'Jul', 'Oct'];
    default:
      return [];
  }
};

export default generateLabels;
