var mouse = {
    x: undefined,
    y: undefined,
    scroll: {
        x: undefined,
        y: undefined,
        deltaX: 0,
        deltaY: 0
    }
};
var topsection = {
    element: document.getElementById('top-section'),
    translateY: 0
};

// Scroll bar animation
{
var div = document.getElementById('top-section-section2'), topsectionanimation = {animationId: undefined, dir: 0.5, status: 0};
function startScrollAnimation() {
    topsectionanimation.animationId = requestAnimationFrame(scrollContent);
    topsectionanimation.status = 1;
}
function stopScrollAnimation() {
    cancelAnimationFrame(topsectionanimation.animationId);
    topsectionanimation.status = 0;
}
function scrollContent() {
    if(div.scrollLeft === (div.scrollWidth - div.clientWidth)) {
        setTimeout(function(event) {
            topsectionanimation.dir = -0.75;
        }, 1000);
        
    } else if(div.scrollLeft === 0) {
        setTimeout(function(event) {
            topsectionanimation.dir = 0.75;
        }, 1000);
    }
    
    if (!(div.scrollLeft === 0 && topsectionanimation.dir === -0.75) && !(div.scrollLeft === div.scrollWidth - div.clientWidth && topsectionanimation.dir === 0.75)) {
        div.scrollLeft += topsectionanimation.dir;
    } 
    
    topsectionanimation.animationId = requestAnimationFrame(scrollContent);
}
div.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});
div.addEventListener('mousedown', function(event) {
    stopScrollAnimation();
    
});
document.addEventListener('mousemove', function(event) {
        if(div.matches(':active') === true) {
            div.scrollLeft -= event.movementX;
        }
    });
div.addEventListener('touchstart', function(event) {
    stopScrollAnimation();
});
document.addEventListener('mouseup', function(event) {
    if(topsectionanimation.status === 0) {
        setTimeout(() => {
            startScrollAnimation();
        }, 1000);
        
    }
});
div.addEventListener('touchend', function(event) {
    if(!div.matches(':active') && topsectionanimation.status === 0) {
        setTimeout(() => {
            startScrollAnimation();
        }, 1000);
    }
});
}

// top-section movement
document.addEventListener('scroll', (event) => {
    mouse.scroll.deltaX = window.scrollX - (mouse.scroll.x || window.scrollX);
    mouse.scroll.deltaY = window.scrollY - (mouse.scroll.y || window.scrollY);
    mouse.scroll.x = window.scrollX;
    mouse.scroll.y = window.scrollY;

    topsection.translateY -= mouse.scroll.deltaY;
    topsection.translateY = Math.min(Math.max(topsection.translateY, -topsection.element.clientHeight), 0);
    document.getElementById('top-section').style.transform = `translateY(${topsection.translateY}px)`;
});

window.onload = function(event) {
    startScrollAnimation();
};
