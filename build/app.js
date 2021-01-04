var data = {
  message: null,
};


function everyFiveSeconds() {
  // TODO(salikh): Implement autosave.
}

window.addEventListener('load', function() {
  window.app = new Vue({
    el: "#app",
    data: data,
    methods: {
    }
  })
  window.setInterval(everyFiveSeconds, 5000);
})

