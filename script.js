var div = document.getElementById('top-section-section2'), topsectionanimation = {animationId: undefined, dir: 1, status: 0};
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
            topsectionanimation.dir = -1;
        }, 1000);
        
    } else if(div.scrollLeft === 0) {
        setTimeout(function(event) {
            topsectionanimation.dir = 1;
        }, 1000);
    }
    
    if (!(div.scrollLeft === 0 && topsectionanimation.dir === -1) && !(div.scrollLeft === div.scrollWidth - div.clientWidth && topsectionanimation.dir === 1)) {
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
div.addEventListener('mousemove', function(event) {
        if(div.matches(':active') === true) {
            div.scrollLeft -= event.movementX;
        }
    });
div.addEventListener('touchstart', function(event) {
    stopScrollAnimation();
});
document.addEventListener('mouseup', function(event) {
    if(topsectionanimation.status === 0) {
        startScrollAnimation();
    }
});
div.addEventListener('touchend', function(event) {
    if(!div.matches(':active') && topsectionanimation.status === 0) {
        startScrollAnimation();
    }
});

window.onload = function(event) {
    startScrollAnimation();
};
