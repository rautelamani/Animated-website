
function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
 locomotiveAnimation();

 //navigation bar animation
 function navbarAnimation(){
    gsap.to("#nav-part1 svg",{
        transform:"translateY(-100%)",
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            markers:false,
            start:"top 0",
            end:"top -5%",
            scrub:true,
        }
     })
    
     gsap.to("#nav-part2 #links",{
        transform:"translateY(-100%)",
        opacity:0,
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            start:"top 0",
            end:"top -5%",
            scrub:true,
        }
     })
 }
 navbarAnimation()

//video animation
function videoconAnimation() {
    var videocon = document.querySelector('#video-container');
    var playbtn = document.querySelector('#play');

    videocon.addEventListener("mouseenter", function () {
        //the play btn that we hide earlier in our css we are making it visible when the curser is hovering over the video.
        // with gsap it will give animation
        gsap.to(playbtn, {
            scale: 1,
            opacity: 1,
        })
        /*
         without gsap
         playbtn.style.opacity=1;
         playbtn.style.scale=1;
        */

    })

    videocon.addEventListener("mouseleave", function () {
        // making the play btn invisible again when the mouse gose away
        gsap.to(playbtn, {
            scale: 0,
            opacity: 0,
        })
    })

    videocon.addEventListener("mousemove", function (dets) {
        // dets, which presumably holds information about the mouse movement.
        // making the play btn invisible again when the mouse gose away
        gsap.to(playbtn, {
            left: dets.x - 70,
            top: dets.y - 80,
        })
        // These lines are animating the "left" and "top" CSS properties of the playbtn element. It sets these properties to the current X and Y coordinates of the mouse cursor, which are represented by dets.x and dets.y
    })
}
videoconAnimation();

//text loading animation
function loadingAnimation() {
    // gsap.from is a GSAP method used to animate an element from a starting state to its current state.
    gsap.from("#page1 h1", {
        y: 100, // Animate by moving it 30 pixels down from its initial position. 
        opacity: 0,
        delay: 0.5,
        duration: 0.9,
        stagger: 0.3, // It specifies a delay between the start times of individual animations for each element in the selection. one after the other.
    })
    //for video 
    gsap.from("#page1 #video-container", {
        scale: 0.9,
        opacity: 0,
        delay: 1.3,
        duration: 0.3,
        stagger: 0.3,
    })
}
loadingAnimation();

// mouse movement in page 3(behind the products)
function cursorAnimation(){

    document.addEventListener("mousemove", function (dets) {
        gsap.to("#cursor", {
            left: dets.x,
            top: dets.y,
        });
    });
    
    document.querySelectorAll(".child").forEach(function (elem) {
        elem.addEventListener("mouseenter",function(){
            gsap.to("#cursor", {
                transform: "translate(-50%,-50%) scale(1)",
            });
        });
        elem.addEventListener("mouseleave",function(){
            gsap.to("#cursor", {
                transform: "translate(-50%,-50%) scale(0)",
            });
        });
    });
}
cursorAnimation();

