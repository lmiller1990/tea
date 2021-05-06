"use strict";
function flip() {
    const elm = document.querySelector('#box');
    // First: get the current bounds
    const first = elm.getBoundingClientRect();
    // execute the script that causes layout change
    elm.classList.toggle('left');
    elm.classList.toggle('right');
    // Last: get the final bounds
    const last = elm.getBoundingClientRect();
    // Invert: determine the delta between the
    // first and last bounds to invert the element
    const deltaX = first.left - last.left;
    const deltaY = first.top - last.top;
    const deltaW = first.width / last.width;
    const deltaH = first.height / last.height;
    requestAnimationFrame(() => console.log('Calling requestAnimationFrame'));
    console.log('Animating');
    // Play: animate the final element from its first bounds
    // to its last bounds (which is no transform)
    elm.animate([{
            transformOrigin: 'top left',
            transform: `
    translate(${deltaX}px, ${deltaY}px)
    scale(${deltaW}, ${deltaH})
  `
        }, {
            transformOrigin: 'top left',
            transform: 'none'
        }], {
        duration: 300,
        easing: 'ease-in-out',
        fill: 'both'
    });
}
