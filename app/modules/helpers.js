import moment from "moment/moment";

class DateHelper {
  constructor(date) {
    this.date = moment(date);
  }

  addYears(years) {
    this.date.add(years, "years");
    return this;
  }

  subtractYears(years) {
    this.date.subtract(years, "years");
    return this;
  }

  addMonths(months) {
    this.date.add(months, "months");
    return this;
  }

  subtractMonths(months) {
    this.date.subtract(months, "months");
    return this;
  }

  addDays(days) {
    this.date.add(days, "days");
    return this;
  }

  subtractDays(days) {
    this.date.subtract(days, "days");
    return this;
  }

  addHours(hours) {
    this.date.add(hours, "hours");
    return this;
  }

  subtractHours(hours) {
    this.date.subtract(hours, "hours");
    return this;
  }

  addMinutes(minutes) {
    this.date.add(minutes, "minutes");
    return this;
  }

  subtractMinutes(minutes) {
    this.date.subtract(minutes, "minutes");
    return this;
  }

  addSeconds(seconds) {
    this.date.add(seconds, "seconds");
    return this;
  }

  subtractSeconds(seconds) {
    this.date.subtract(seconds, "seconds");
    return this;
  }

  toDate() {
    return this.date.toDate();
  }
}
function formatDate(date, format = "YYYY-MM-DD") {
  return moment(date).format(format);
}
function createFormData(data) {
  const formData = new FormData();

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];

      if (Array.isArray(value)) {
        for (const item of value) {
          formData.append(key, item);
        }
      } else if (value instanceof FileList) {
        for (const item of value) {
          formData.append(key, item);
        }
      } else if (typeof value === "Object") {
        formData.append(key, JSON.stringify(value));
      } else value&&formData.append(key, value);
    }
  }

  return formData;
}
function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
}
const copyToClipboard = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};
const getRandomColor = () => {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
};
const getAsBool = (value) => {
  return value == "true" || value == "True";
};
const formattedPrice = (price) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD', // Adjust the currency code as needed
    minimumFractionDigits: 0,
  });
};


const types={
  videos:[".mp4",".avi",".webm"],
  images:[".jpeg",".jpg","png","gif",".JPG"],
  audios:[".wav",".mp3",".m4a"]
}
function checkType(file){
    if(types["videos"].some(x=>file.endsWith(x)))
    return "video"
    else if(types["images"].some(x=>file.endsWith(x)))
    return "image"
    else
    return "file"
    }
    function checkTypeAll(file){
        if(types["videos"].some(x=>file.endsWith(x)))
        return "video"
        else if(types["images"].some(x=>file.endsWith(x)))
        return "image"
        else if(types["audios"].some(x=>file.endsWith(x)))
        return "audio"
        else
        return "file"
        }


export {
  createFormData,
  DateHelper,
  formatDate,
  objectToQueryString,
  copyToClipboard,
  getRandomColor,
  getAsBool,
  formattedPrice,
  checkType,checkTypeAll
};


