

document.addEventListener("DOMContentLoaded", function () {
    const volumeSlider = document.getElementById("volume-slider");
    const volumeButton = document.getElementById("volume-button");
    const textToResize = document.getElementById("text-to-resize");
    const backgroundFilling = document.getElementById("background-filling");

    //===================== initialTextSize in percent===============================

    const computedStyle = window.getComputedStyle(textToResize);
    // Get the font size property
    const fontSize = computedStyle.getPropertyValue("font-size");
    
    // Parse the font size as a numeric value
    const numericFontSize = parseFloat(fontSize);
    
    // Calculate the font size in percxentage
    const initialFontSizeInPercent = (numericFontSize / parseFloat(computedStyle.getPropertyValue("font-size", "em"))) * 100;

    //=======================initialTextSize in percent==============================


    let isDragging = false;
  
    volumeButton.addEventListener("mousedown", function (event) {
      isDragging = true;
    });
  
    document.addEventListener("mousemove", function (event) {
      if (isDragging) {
        const sliderWidth = volumeSlider.clientWidth;
        const buttonWidth = volumeButton.clientWidth;
        let newPosition = event.clientX - (volumeSlider.getBoundingClientRect().left + buttonWidth / 2); // mouseCurrentposition = mouse click location - volume slider.left (650-600=50)
  
        // Ensure the button stays within the slider boundaries
        newPosition = Math.max(0, Math.min(newPosition, sliderWidth - (buttonWidth + (buttonWidth/3))));
  
        // Update the button position
        volumeButton.style.left = newPosition + "px";

        // Update the background color filling
        backgroundFilling.style.width = newPosition + buttonWidth / 2 + "px";

        // Change text size based on button position
        const percentage = ((newPosition / (sliderWidth - buttonWidth)) * 100)*2.5;

        textToResize.style.fontSize = (percentage + initialFontSizeInPercent) + "%";
      }
    });
  
    document.addEventListener("mouseup", function () {
      if (isDragging) {
        isDragging = false;
      }
    });
  
  });
