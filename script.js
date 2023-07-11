var mouse = {
    position: {
        x: undefined,
        y: undefined,
        deltaX: 0,
        deltaY: 0
    },
    scroll: {
        x: undefined,
        y: undefined,
        deltaX: 0,
        deltaY: 0
    }
};
var topsection = {
    element: document.getElementById('top-section'),
    translateY: 0,
    menubutton: document.getElementById('top-section-menu-button'),
    menu: {
        element: document.getElementById('top-section-menu'),
        slidebar: document.getElementById('top-section-menu-slide-bar'),
        exitbutton: document.getElementById('top-section-menu-exit-button')
    }
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

// top-section-menu movement
topsection.menu.slidebar.addEventListener('touchmove', (event) => {
    if(topsection.menu.element.style.transition !== '0s') {
        topsection.menu.element.style.transition = '0s';
    }
    mouse.position.deltaX = event.touches[event.touches.length - 1].clientX - (mouse.position.x || event.touches[event.touches.length - 1].clientX);
    mouse.position.deltaY = event.touches[event.touches.length - 1].clientY - (mouse.position.y || event.touches[event.touches.length - 1].clientY);
    mouse.position.x = event.touches[event.touches.length - 1].clientX;
    mouse.position.y = event.touches[event.touches.length - 1].clientY;
    topsection.menu.slidebar.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    topsection.menu.element.style.transform = `translateX(${(Math.min(Math.max(mouse.position.x, 0), topsection.menu.element.clientWidth) - topsection.menu.element.clientWidth)}px)`;
});
topsection.menu.slidebar.addEventListener('touchend', (event) => {
    topsection.menu.element.style.transition = '0.3s';
    topsection.menu.slidebar.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    if(Math.min(Math.max(mouse.position.x, 0), topsection.menu.element.clientWidth) < topsection.menu.element.clientWidth * 0.7 && mouse.position.deltaX <= 0) {
        topsection.menu.element.style.transform = 'translateX(-100%)';
    } else if(mouse.position.deltaX < -5) {
        topsection.menu.element.style.transform = 'translateX(-100%)';
    } else {
        topsection.menu.element.style.transform = 'translateX(0%)';
    }
});
document.addEventListener('mousemove', (event) => {
    if(topsection.menu.slidebar.matches(':active') === true) {
        if(topsection.menu.element.style.transition !== '0s') {
            topsection.menu.element.style.transition = '0s';
        }
        mouse.position.deltaX = event.clientX - (mouse.position.x || event.clientX);
        mouse.position.deltaY = event.clientY - (mouse.position.y || event.clientX);
        mouse.position.x = event.clientX;
        mouse.position.y = event.clientY;
        topsection.menu.element.style.transform = `translateX(${(Math.min(Math.max(mouse.position.x, 0), topsection.menu.element.clientWidth) - topsection.menu.element.clientWidth)}px)`;
    }
});
document.addEventListener('mouseup', (event) => {
    if(topsection.menu.element.style.transition !== '0.3s') {
        topsection.menu.element.style.transition = '0.3s';
    }
});
topsection.menubutton.addEventListener('click', (event) => {
    if((Math.min(Math.max(mouse.position.x, 0), topsection.menu.element.clientWidth) - topsection.menu.element.clientWidth) === -topsection.menu.element.clientWidth || topsection.menu.element.style.transform === 'translateX(-100%)') {
        topsection.menu.element.style.transform = 'translateX(0%)';
    } else {
        topsection.menu.element.style.transform = 'translateX(-100%)';
    }
});
topsection.menu.exitbutton.addEventListener('click', (event) => {
    topsection.menu.element.style.transform = 'translateX(-100%)';
});



window.onload = function(event) {
    startScrollAnimation();
};
