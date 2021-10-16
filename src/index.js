import observe from "./observe";
import Watcher from "./Watcher";

const data = {
  dinnerPrice: {
    rice: 4,
    meat: 20,
    juice: 2
  },
  dinnerPriceTotal: 0,
  tip: 2,
  total: 0
}
window.data = data;
observe(data)

new Watcher(data, 'dinnerPrice.rice', function () {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log(arguments)
  data.dinnerPriceTotal = data.dinnerPrice.rice
    + data.dinnerPrice.meat
    + data.dinnerPrice.juice;
  
  document.getElementById('dinnerPrice').innerText = data.dinnerPriceTotal + '';
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>')
})
data.dinnerPrice.rice = 4

console.log(data)