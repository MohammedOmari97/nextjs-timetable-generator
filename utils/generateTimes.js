const times1 = [8, 9, 10, 11, 12, 1, 2, 3, 4];
const times2 = [8, 9.5, 11, 12.5, 2, 3, 4];
const days1 = ["sat", "mon", "wed"];
const days2 = ["sun", "tue"];

export default function generateTimes(hours) {
  // 1 hour
  if (hours === 1) {
    let randomPack = Math.round(Math.random());
    if (randomPack === 0) {
      let randomDay = days1[Math.floor(Math.random() * days1.length)];
      let { startTime, endTime } = pickRandom1(hours);
      return { days: [randomDay], startTime, endTime };
    } else if (randomPack === 1) {
      let randomDay = days2[Math.floor(Math.random() * days2.length)];
      let { startTime, endTime } = pickRandom2(hours);
      return { days: [randomDay], startTime, endTime };
    }
  }

  // 2 hours
  if (hours === 2) {
    let randomPack = Math.round(Math.random());
    if (randomPack === 0) {
      let random1day = days1[Math.floor(Math.random() * days1.length)];
      let random2day = days1[Math.floor(Math.random() * days1.length)];
      while (random1day === random2day) {
        random1day = days1[Math.floor(Math.random() * days1.length)];
        random2day = days1[Math.floor(Math.random() * days1.length)];
      }
      let { startTime, endTime } = pickRandom1(1);
      return { days: [random1day, random2day], startTime, endTime };
    } else if (randomPack === 1) {
      let day1 = days2[0];
      let day2 = days2[1];
      let { startTime, endTime } = pickRandom2(1);
      return { days: [day1, day2], startTime, endTime };
    }
  }

  // 3 hours
  if (hours === 3) {
    let randomPack = Math.round(Math.random());
    if (randomPack === 0) {
      let day1 = days1[0];
      let day2 = days1[1];
      let day3 = days1[2];
      let { startTime, endTime } = pickRandom1(1);
      return { days: [day1, day2, day3], startTime, endTime };
    } else if (randomPack === 1) {
      let day1 = days2[0];
      let day2 = days2[1];
      let { startTime, endTime } = pickRandom2(3);
      return { days: [day1, day2], startTime, endTime };
    }
  }

  // 4 hours
  if (hours === 4) {
    let days = [];
    while (days.length < 2) {
      let random = days1[Math.floor(Math.random() * days1.length)];
      if (!days.includes(random)) {
        days.push(random);
      }
    }

    console.log(days);

    let { startTime, endTime } = pickRandom1(2);

    return { days, startTime, endTime };
  }
}

// picks random start time from times1
const pickRandom1 = function (hours) {
  let startTime = times1[Math.floor(Math.random() * (times1.length - hours))];
  let endTime = times1[times1.indexOf(startTime) + hours];
  return { startTime, endTime };
};

const pickRandom2 = function (hours) {
  if (hours === 1) {
    let times1range = times2.slice(4);
    let startTime =
      times1range[Math.floor(Math.random() * (times1range.length - hours))];
    let endTime = times1range[times1range.indexOf(startTime) + hours];
    return { startTime, endTime };
  } else if (hours === 3) {
    let times3range = times2.slice(0, 5);
    let startTime =
      times3range[Math.floor(Math.random() * (times3range.length - 1))];
    let endTime = times3range[times3range.indexOf(startTime) + 1];
    return { startTime, endTime };
  }
};
