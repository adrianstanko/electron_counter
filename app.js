const counterElement = document.getElementById('counter');

let counter = 0;

window.electronAPI.initialCounter((event, initialCounter) => {
  // Update the counter value when a message is received
  console.log('initial value received!');
  counter = initialCounter;
  counterElement.textContent = counter;
});

document.getElementById('increment').addEventListener('click', () => {
  counter++;
  counterElement.textContent = counter;
  window.electronAPI.updateCounter(counter);
});

document.getElementById('decrement').addEventListener('click', () => {
  counter--;
  counterElement.textContent = counter;
  window.electronAPI.updateCounter(counter);
});
