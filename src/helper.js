const getShortHand = (style, ...values) => {
  if (values.length === 1) {
    return { [style]: values[0] }
  }
  const _genCss = (...values) => ({
    [style + 'Top']: values[0],
    [style + 'Right']: values[1],
    [style + 'Bottom']: values[2],
    [style + 'Left']: values[3],
  })
  if (values.length === 2) {
    return _genCss(values[0], values[1], values[0], values[1])
  }
  if (values.length === 3) {
    return _genCss(values[0], values[1], values[2], values[1])
  }
  return _genCss(values[0], values[1], values[2], values[3])
}

export const padding = (...values) => getShortHand('padding', ...values)
export const margin = (...values) => getShortHand('margin', ...values)

////// utils
export const clamp = (x, a, b) =>
  Math.max(a, Math.min(x, b));

////// parse weather server data

// averages all the values of a given object (typescript abomination but very useful in our case)
const avg = (data) => {
  if (data == undefined || data == null) {
    console.error("avg called on null or undefined");
    return 0;
  }
  return (
    Object.values(data).reduce((average, value) =>
      typeof value === "number"
        ? average + value
        : console.error("avg called on object with non number values")
    ) / Object.values(data).length
  );
};

// meter per second to knots
const mps2kts = (a) => a * 1.943844;

// precipitations in mm per hour (equivalent to  kg/m²) to risk of rain percentage, considering 3.33 mm per hour 100% rain
const mmph2riskOfRainPercent = (a) => clamp(a * 30, 0, 100);

const sum = (arr) => arr.reduce((a, b) => a + b);

const degToRad = (a) => (Math.PI / 180) * a;

const meanAngleDeg = (arr) =>
  ((180 / Math.PI) *
    Math.atan2(
      sum(arr.map(degToRad).map(Math.sin)) / arr.length,
      sum(arr.map(degToRad).map(Math.cos)) / arr.length
    ) +
    360) %
  360;

// averages all the angle values (in degree) of a given object
const avgAngle = (data) => {
  if (data == undefined || data == null) {
    console.error("avgAngle called on null or undefined");
    return 0;
  }
  return meanAngleDeg(Object.values(data));
};

// rawHourlyDataresult of a stormglass api fetch
export const makeWWWData = (rawHourlyData) => {
  const wavesData =
    rawHourlyData.waveDirection && rawHourlyData.waveHeight
      ? {
        direction: avgAngle(rawHourlyData.waveDirection),
        height: avg(rawHourlyData.waveHeight),
        // seaLevel:
        //   rawHourlyData.seaLevel === undefined
        //     ? 0 // todo fixx !
        //     : avg(rawHourlyData.seaLevel) * 20,
        tide: "rising", // todo
      }
      : undefined;

  return {
    time: new Date(rawHourlyData.time),
    weatherData: {
      cloudCover: avg(rawHourlyData.cloudCover),
      riskOfRain: mmph2riskOfRainPercent(avg(rawHourlyData.precipitation)),
      temperature: avg(rawHourlyData.airTemperature),
    },
    windData: {
      direction: avgAngle(rawHourlyData.windDirection),
      speed: mps2kts(avg(rawHourlyData.windSpeed)),
      gusts: mps2kts(avg(rawHourlyData.gust)),
    },
    wavesData: wavesData,
  };
};

export const isSameDay = (a, b) => {
  if (!a || !b) console.error("isSameDay got bad inputs");
  const res = a && b && a.toDateString() == b.toDateString();
  return res;
};

//unused misc
export const minMax = (array, fn) =>
  array.reduce((item, acc, arr) => ({
    min: fn(item, acc.min) ? item : acc.min,
    max: fn(acc.max, item) ? item : acc.min,
  }));

//downloads json data on the clients computer
const handleSaveToPC = (jsonData, filename) => {
  const fileData = JSON.stringify(jsonData);
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${filename}.json`;
  link.href = url;
  link.click();
};

// throttle the rate at which a callback can be called
// usage :
// window.addEventListener("resize", throttle(handleResize, 200));
export const throttle = (
  callback,
  interval
) => {
  let enableCall = true;

  return (...args) => {
    if (!enableCall) return;

    enableCall = false;
    setTimeout(() => {
      callback.apply(this, args);
      enableCall = true;
    }, interval);
  };
};
